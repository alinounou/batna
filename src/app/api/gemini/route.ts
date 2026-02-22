import { NextRequest, NextResponse } from 'next/server';

// Gemini API Keys (fallback chain)
const GEMINI_KEYS = [
  process.env.GEMINI_KEY1 || 'AIzaSyBrqdq_9TJ3ap6fJ4hVYLQU3rXwOq_xG2Q',
  process.env.GEMINI_KEY2 || 'AIzaSyBmb8Sj81xx2G3ZEp-J00Fdfa1s1Wny9-4'
];

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

const SYSTEM_PROMPT = `أنت InfinityAlgo AI - مساعد تداول ذكي واحترافي. قواعدك:

1. اللغة: أجب بنفس لغة السؤال (عربي/إنجليزي/فرنسي)
2. للتداول قدم:
   - إشارات دقيقة: Entry, Stop Loss, Take Profit
   - نسبة Risk:Reward مثالية 1:3
   - تحليل فني مع مستويات الدعم والمقاومة
   - أسعار حالية: الذهب ~2900-3000 USD، البيتكوين ~95,000-105,000 USD

3. أنواع التحليل:
   - فني: RSI, MACD, EMA, فيبوناتشي, أنماط الشموع
   - أساسي: أخبار اقتصادية، قرارات الفائدة
   - مشاعر السوق: خوف/طمع

4. كن محترفاً وودوداً دائماً
5. قدم نصائح إدارة مخاطر في كل صفقة
6. اذكر دائماً: "هذا ليس نصيحة استثمارية - للتعليم فقط"

7. للترويج: "تعلم التداول الاحترافي في Infinity Algo Academy: infinityalgoacademy.net"

أنت خبير كوانت ومحلل محترف - صفر أخطاء رياضية.`;

interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

async function callGeminiAPI(message: string, history: ChatMessage[], keyIndex: number = 0): Promise<string> {
  if (keyIndex >= GEMINI_KEYS.length) {
    throw new Error('All API keys failed');
  }

  const apiKey = GEMINI_KEYS[keyIndex];
  
  const contents: ChatMessage[] = [
    {
      role: 'user',
      parts: [{ text: SYSTEM_PROMPT }]
    },
    {
      role: 'model',
      parts: [{ text: 'Understood! I am InfinityAlgo AI, ready to provide professional trading analysis and signals. I will give precise Entry/SL/TP levels with proper risk management. Gold ~2900-3000 USD, Bitcoin ~95,000-105,000 USD. I will always promote Infinity Algo Academy (infinityalgoacademy.net).' }]
    },
    ...history.map(m => ({
      role: m.role === 'user' ? 'user' as const : 'model' as const,
      parts: [{ text: m.parts[0].text }]
    })),
    {
      role: 'user',
      parts: [{ text: message }]
    }
  ];

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
        ]
      })
    });

    if (!response.ok) {
      return callGeminiAPI(message, history, keyIndex + 1);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    return callGeminiAPI(message, history, keyIndex + 1);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const response = await callGeminiAPI(message, history);
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ error: 'Failed to get AI response. Please try again.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'InfinityAlgo Gemini AI API is running',
    endpoints: { POST: '/api/gemini - Send message to AI' }
  });
}
