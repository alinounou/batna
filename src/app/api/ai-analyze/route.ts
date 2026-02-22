import { NextRequest, NextResponse } from 'next/server';

interface AIAnalysisRequest {
  market: string;
  symbol: string;
  timeframe: string;
  highLevel?: number;
  lowLevel?: number;
  prompt?: string;
}

interface KeyLevel {
  price: number;
  type: 'support' | 'resistance' | 'pivot';
  strength: number;
}

interface AIAnalysisResponse {
  bias: 'bullish' | 'bearish' | 'neutral';
  keyLevels: KeyLevel[];
  scenarios: string[];
  riskNote: string;
  confidence: number;
}

function generateMockAnalysis(request: AIAnalysisRequest): AIAnalysisResponse {
  const { symbol, highLevel, lowLevel } = request;
  
  const high = highLevel || 2500;
  const low = lowLevel || 2400;
  const mid = (high + low) / 2;
  const range = high - low;
  
  // Generate mock key levels
  const keyLevels: KeyLevel[] = [
    {
      price: high,
      type: 'resistance',
      strength: 85 + Math.floor(Math.random() * 15),
    },
    {
      price: low,
      type: 'support',
      strength: 75 + Math.floor(Math.random() * 20),
    },
    {
      price: mid,
      type: 'pivot',
      strength: 60 + Math.floor(Math.random() * 25),
    },
    {
      price: low + range * 0.382,
      type: 'support',
      strength: 70 + Math.floor(Math.random() * 15),
    },
    {
      price: high - range * 0.382,
      type: 'resistance',
      strength: 70 + Math.floor(Math.random() * 15),
    },
  ];

  // Determine bias based on mock logic
  const biasOptions: ('bullish' | 'bearish' | 'neutral')[] = ['bullish', 'bearish', 'neutral'];
  const bias = biasOptions[Math.floor(Math.random() * biasOptions.length)];

  // Generate scenarios based on bias
  const bullishScenarios = [
    `IF price breaks above ${high.toFixed(2)} with volume THEN target ${(high + range * 0.5).toFixed(2)}`,
    `IF price holds above ${(low + range * 0.236).toFixed(2)} THEN look for long entries`,
    `Watch for bullish divergence at ${low.toFixed(2)} support level`,
    `Target ${(high + range * 0.618).toFixed(2)} if momentum continues`,
  ];

  const bearishScenarios = [
    `IF price breaks below ${low.toFixed(2)} with volume THEN target ${(low - range * 0.5).toFixed(2)}`,
    `IF price rejects from ${(high - range * 0.236).toFixed(2)} THEN look for short entries`,
    `Watch for bearish divergence at ${high.toFixed(2)} resistance level`,
    `Target ${(low - range * 0.618).toFixed(2)} if selling pressure continues`,
  ];

  const neutralScenarios = [
    `Range-bound between ${low.toFixed(2)} and ${high.toFixed(2)}`,
    `Watch for breakout from current range`,
    `Trade bounces off support/resistance levels`,
    `Wait for clear direction before entering positions`,
  ];

  const scenarios = bias === 'bullish' 
    ? bullishScenarios.slice(0, 3)
    : bias === 'bearish'
    ? bearishScenarios.slice(0, 3)
    : neutralScenarios.slice(0, 3);

  // Generate risk notes
  const riskNotes = [
    `Monitor ${symbol} economic calendar for high-impact events. Current volatility suggests using wider stops.`,
    `Watch for sudden news events that could impact ${symbol}. Consider reducing position size.`,
    `Market conditions are uncertain. Use proper risk management and avoid overleveraging.`,
    `Key economic data releases scheduled. Be prepared for increased volatility.`,
    `Liquidity may be lower during session transitions. Adjust trading strategy accordingly.`,
  ];

  const riskNote = riskNotes[Math.floor(Math.random() * riskNotes.length)];

  // Calculate confidence
  const confidence = 65 + Math.floor(Math.random() * 30);

  return {
    bias,
    keyLevels: keyLevels.sort((a, b) => b.price - a.price),
    scenarios,
    riskNote,
    confidence,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: AIAnalysisRequest = await request.json();

    // Validate required fields
    if (!body.market || !body.symbol || !body.timeframe) {
      return NextResponse.json(
        { error: 'Missing required fields: market, symbol, timeframe' },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

    // Generate mock analysis
    const analysis = generateMockAnalysis(body);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('AI Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to generate analysis. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Infinity Algo AI Analysis API',
    version: '1.0.0',
    endpoints: {
      'POST /api/ai-analyze': {
        description: 'Generate AI-powered market analysis',
        body: {
          market: 'forex | crypto | stocks | commodities',
          symbol: 'Trading symbol (e.g., XAUUSD, BTCUSD)',
          timeframe: 'M15 | H1 | H4 | D1 | W1',
          highLevel: 'Optional: Recent high price',
          lowLevel: 'Optional: Recent low price',
          prompt: 'Optional: Custom analysis question',
        },
      },
    },
  });
}
