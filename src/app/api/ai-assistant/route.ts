import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, context } = body;

    const zai = await ZAI.create();

    const systemPrompt = `You are an expert AI trading assistant for the Infinity Algo platform by Jeremy. You help traders with:

1. Technical Analysis - Chart patterns, indicators, support/resistance levels
2. Market Analysis - Trend identification, market sentiment, economic events
3. Risk Management - Position sizing, stop-loss placement, risk/reward ratios
4. Trading Strategies - Entry and exit points, trade setups, timeframes
5. Trading Psychology - Discipline, emotion management, common mistakes
6. Educational Content - Explaining trading concepts, market mechanics

Always provide:
- Clear, actionable insights
- Risk warnings where appropriate
- Specific price levels when discussing trades
- Confidence levels for predictions (as percentages)
- Both bullish and bearish scenarios

Format your responses with:
- **Analysis sections** for technical breakdowns
- **Key levels** for support/resistance
- **Trade suggestions** with entry, stop, target
- **Risk score** (1-10)
- **Market bias** (Bullish/Bearish/Neutral)

Be professional, precise, and helpful. Never guarantee profits. Always emphasize risk management.`;

    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const response = completion.choices[0]?.message?.content || 'Unable to generate response.';

    // Simulate structured trading analysis
    const analysis = {
      response,
      tradeAnalysis: {
        bias: message.toLowerCase().includes('sell') ? 'Bearish' : 
              message.toLowerCase().includes('buy') ? 'Bullish' : 'Neutral',
        riskScore: Math.floor(Math.random() * 5) + 3,
        probability: Math.floor(Math.random() * 20) + 65,
        confidence: Math.floor(Math.random() * 15) + 75,
      },
      keyLevels: {
        entry: (1.08 + Math.random() * 0.01).toFixed(5),
        stopLoss: (1.078 + Math.random() * 0.005).toFixed(5),
        takeProfit: (1.088 + Math.random() * 0.01).toFixed(5),
      },
      sentiment: {
        overall: Math.random() > 0.5 ? 'Bullish' : 'Bearish',
        strength: Math.floor(Math.random() * 30) + 60,
      },
      mistakes: [
        'Consider waiting for confirmation before entering',
        'Watch for news events that could impact this trade',
        'Ensure proper position sizing based on account balance',
      ],
    };

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('AI Assistant error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}
