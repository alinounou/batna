// Trading Calculator Functions Library

export interface PositionSizeResult {
  lotSize: number;
  riskAmount: number;
  pipValue: number;
  units: number;
}

export interface RiskRewardResult {
  riskRewardRatio: number;
  riskPips: number;
  rewardPips: number;
  riskAmount: number;
  rewardAmount: number;
  riskPercentage: number;
}

export interface FibonacciResult {
  level: string;
  price: number;
  percentage: number;
}

export interface CompoundingResult {
  finalBalance: number;
  totalProfit: number;
  profitPercentage: number;
  periods: PeriodResult[];
}

export interface PeriodResult {
  period: number;
  startingBalance: number;
  profit: number;
  endingBalance: number;
}

// 1. Position Size Calculator
export function calculatePositionSize(
  accountBalance: number,
  riskPercentage: number,
  stopLossPips: number,
  pipValuePerLot: number = 10
): PositionSizeResult {
  const riskAmount = accountBalance * (riskPercentage / 100);
  const pipValue = pipValuePerLot;
  const lotSize = riskAmount / (stopLossPips * pipValue);
  const units = lotSize * 100000;

  return {
    lotSize: Math.round(lotSize * 100) / 100,
    riskAmount: Math.round(riskAmount * 100) / 100,
    pipValue,
    units: Math.round(units),
  };
}

// 2. Risk/Reward Calculator
export function calculateRiskReward(
  entryPrice: number,
  stopLoss: number,
  takeProfit: number,
  lotSize: number = 1,
  pipValue: number = 10,
  accountBalance: number = 10000
): RiskRewardResult {
  const isLong = takeProfit > entryPrice;
  const riskPips = Math.abs(entryPrice - stopLoss) * (isLong ? 10000 : 10000);
  const rewardPips = Math.abs(takeProfit - entryPrice) * (isLong ? 10000 : 10000);
  
  const riskAmount = riskPips * pipValue * lotSize;
  const rewardAmount = rewardPips * pipValue * lotSize;
  const riskRewardRatio = rewardPips / riskPips;
  const riskPercentage = (riskAmount / accountBalance) * 100;

  return {
    riskRewardRatio: Math.round(riskRewardRatio * 100) / 100,
    riskPips: Math.round(riskPips),
    rewardPips: Math.round(rewardPips),
    riskAmount: Math.round(riskAmount * 100) / 100,
    rewardAmount: Math.round(rewardAmount * 100) / 100,
    riskPercentage: Math.round(riskPercentage * 100) / 100,
  };
}

// 3. Lot Size Calculator
export function calculateLotSize(
  units: number,
  lotType: 'standard' | 'mini' | 'micro' = 'standard'
): { lots: number; units: number; description: string } {
  const lotSizes = {
    standard: 100000,
    mini: 10000,
    micro: 1000,
  };

  const baseUnits = lotSizes[lotType];
  const lots = units / baseUnits;

  return {
    lots: Math.round(lots * 100) / 100,
    units,
    description: `${lots.toFixed(2)} ${lotType} lots (${units.toLocaleString()} units)`,
  };
}

// 4. Margin Calculator
export function calculateMargin(
  positionSize: number,
  leverage: number,
  pairPrice: number = 1
): { requiredMargin: number; usedLeverage: number; marginLevel: string } {
  const notionalValue = positionSize * 100000 * pairPrice;
  const requiredMargin = notionalValue / leverage;
  const marginLevel = leverage <= 10 ? 'Low Risk' : leverage <= 50 ? 'Medium Risk' : 'High Risk';

  return {
    requiredMargin: Math.round(requiredMargin * 100) / 100,
    usedLeverage: leverage,
    marginLevel,
  };
}

// 5. Pip Value Calculator
export function calculatePipValue(
  pair: string,
  lotSize: number,
  accountCurrency: string = 'USD'
): { pipValue: number; pipLocation: number; description: string } {
  // Simplified pip value calculation
  const pipValues: Record<string, number> = {
    'EUR/USD': 10,
    'GBP/USD': 10,
    'USD/JPY': 9.09,
    'USD/CHF': 10.87,
    'AUD/USD': 10,
    'USD/CAD': 7.69,
    'NZD/USD': 10,
    'XAU/USD': 10,
    'BTC/USD': 0.01,
    'ETH/USD': 0.1,
  };

  const basePipValue = pipValues[pair] || 10;
  const pipValue = basePipValue * lotSize;

  return {
    pipValue: Math.round(pipValue * 100) / 100,
    pipLocation: 4,
    description: `1 pip = $${pipValue.toFixed(2)} per ${lotSize} lot`,
  };
}

// 6. Fibonacci Retracement Calculator
export function calculateFibonacciRetracement(
  highPrice: number,
  lowPrice: number,
  trend: 'uptrend' | 'downtrend' = 'uptrend'
): FibonacciResult[] {
  const difference = highPrice - lowPrice;
  const levels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
  
  return levels.map(level => ({
    level: `${(level * 100).toFixed(1)}%`,
    price: trend === 'uptrend' 
      ? highPrice - (difference * level)
      : lowPrice + (difference * level),
    percentage: level * 100,
  }));
}

// 7. Fibonacci Extension Calculator
export function calculateFibonacciExtension(
  swingLow: number,
  swingHigh: number,
  pullbackLow: number
): FibonacciResult[] {
  const swingSize = swingHigh - swingLow;
  const levels = [0, 0.618, 1, 1.272, 1.414, 1.618, 2, 2.618];
  
  return levels.map(level => ({
    level: `${(level * 100).toFixed(1)}%`,
    price: pullbackLow + (swingSize * level),
    percentage: level * 100,
  }));
}

// 8. Compounding Calculator
export function calculateCompounding(
  startingBalance: number,
  monthlyReturn: number,
  months: number
): CompoundingResult {
  const periods: PeriodResult[] = [];
  let currentBalance = startingBalance;
  let totalProfit = 0;

  for (let i = 1; i <= months; i++) {
    const startingBal = currentBalance;
    const profit = currentBalance * (monthlyReturn / 100);
    currentBalance += profit;
    totalProfit += profit;

    periods.push({
      period: i,
      startingBalance: Math.round(startingBal * 100) / 100,
      profit: Math.round(profit * 100) / 100,
      endingBalance: Math.round(currentBalance * 100) / 100,
    });
  }

  return {
    finalBalance: Math.round(currentBalance * 100) / 100,
    totalProfit: Math.round(totalProfit * 100) / 100,
    profitPercentage: Math.round(((currentBalance - startingBalance) / startingBalance) * 10000) / 100,
    periods,
  };
}

// 9. Drawdown Calculator
export function calculateDrawdown(
  peakValue: number,
  troughValue: number
): { drawdownAmount: number; drawdownPercentage: number; recoveryPercentage: number } {
  const drawdownAmount = peakValue - troughValue;
  const drawdownPercentage = (drawdownAmount / peakValue) * 100;
  const recoveryPercentage = (drawdownAmount / troughValue) * 100;

  return {
    drawdownAmount: Math.round(drawdownAmount * 100) / 100,
    drawdownPercentage: Math.round(drawdownPercentage * 100) / 100,
    recoveryPercentage: Math.round(recoveryPercentage * 100) / 100,
  };
}

// 10. Break-Even Calculator
export function calculateBreakEven(
  wins: number,
  losses: number,
  avgWin: number,
  avgLoss: number
): { 
  breakEvenWinRate: number; 
  currentWinRate: number; 
  expectancy: number;
  profitFactor: number;
} {
  const totalTrades = wins + losses;
  const currentWinRate = totalTrades > 0 ? (wins / totalTrades) * 100 : 0;
  const breakEvenWinRate = (avgLoss / (avgWin + avgLoss)) * 100;
  const expectancy = (currentWinRate / 100 * avgWin) - ((100 - currentWinRate) / 100 * avgLoss);
  const profitFactor = losses > 0 ? (wins * avgWin) / (losses * avgLoss) : wins * avgWin;

  return {
    breakEvenWinRate: Math.round(breakEvenWinRate * 100) / 100,
    currentWinRate: Math.round(currentWinRate * 100) / 100,
    expectancy: Math.round(expectancy * 100) / 100,
    profitFactor: Math.round(profitFactor * 100) / 100,
  };
}

// 11. ATR Stop Loss Calculator
export function calculateATRStopLoss(
  currentPrice: number,
  atrValue: number,
  multiplier: number = 2,
  direction: 'long' | 'short' = 'long'
): { stopLoss: number; stopDistance: number; stopPercentage: number } {
  const stopDistance = atrValue * multiplier;
  const stopLoss = direction === 'long' 
    ? currentPrice - stopDistance 
    : currentPrice + stopDistance;
  const stopPercentage = (stopDistance / currentPrice) * 100;

  return {
    stopLoss: Math.round(stopLoss * 100000) / 100000,
    stopDistance: Math.round(stopDistance * 100000) / 100000,
    stopPercentage: Math.round(stopPercentage * 100) / 100,
  };
}

// 12. Volatility Calculator
export function calculateVolatility(
  prices: number[]
): { 
  averagePrice: number; 
  standardDeviation: number; 
  volatilityPercentage: number;
  priceRange: number;
} {
  if (prices.length === 0) {
    return { averagePrice: 0, standardDeviation: 0, volatilityPercentage: 0, priceRange: 0 };
  }

  const averagePrice = prices.reduce((a, b) => a + b, 0) / prices.length;
  const squaredDiffs = prices.map(p => Math.pow(p - averagePrice, 2));
  const variance = squaredDiffs.reduce((a, b) => a + b, 0) / prices.length;
  const standardDeviation = Math.sqrt(variance);
  const volatilityPercentage = (standardDeviation / averagePrice) * 100;
  const priceRange = Math.max(...prices) - Math.min(...prices);

  return {
    averagePrice: Math.round(averagePrice * 100000) / 100000,
    standardDeviation: Math.round(standardDeviation * 100000) / 100000,
    volatilityPercentage: Math.round(volatilityPercentage * 100) / 100,
    priceRange: Math.round(priceRange * 100000) / 100000,
  };
}

// 13. Portfolio Risk Calculator
export function calculatePortfolioRisk(
  positions: Array<{ pair: string; lotSize: number; stopLossPips: number; pipValue: number }>
): { totalRisk: number; averageRisk: number; riskDistribution: Array<{ pair: string; risk: number; percentage: number }> } {
  const riskDistribution = positions.map(pos => {
    const risk = pos.lotSize * pos.stopLossPips * pos.pipValue;
    return { pair: pos.pair, risk, percentage: 0 };
  });

  const totalRisk = riskDistribution.reduce((a, b) => a + b.risk, 0);
  
  riskDistribution.forEach(pos => {
    pos.percentage = totalRisk > 0 ? (pos.risk / totalRisk) * 100 : 0;
    pos.risk = Math.round(pos.risk * 100) / 100;
    pos.percentage = Math.round(pos.percentage * 100) / 100;
  });

  return {
    totalRisk: Math.round(totalRisk * 100) / 100,
    averageRisk: Math.round((totalRisk / positions.length) * 100) / 100,
    riskDistribution,
  };
}

// 14. Correlation Calculator
export function calculateCorrelation(
  series1: number[],
  series2: number[]
): { correlation: number; strength: string; direction: string } {
  if (series1.length !== series2.length || series1.length === 0) {
    return { correlation: 0, strength: 'Unknown', direction: 'None' };
  }

  const n = series1.length;
  const mean1 = series1.reduce((a, b) => a + b, 0) / n;
  const mean2 = series2.reduce((a, b) => a + b, 0) / n;

  let numerator = 0;
  let denominator1 = 0;
  let denominator2 = 0;

  for (let i = 0; i < n; i++) {
    const diff1 = series1[i] - mean1;
    const diff2 = series2[i] - mean2;
    numerator += diff1 * diff2;
    denominator1 += diff1 * diff1;
    denominator2 += diff2 * diff2;
  }

  const correlation = numerator / Math.sqrt(denominator1 * denominator2);
  const absCorrelation = Math.abs(correlation);

  let strength: string;
  if (absCorrelation >= 0.8) strength = 'Very Strong';
  else if (absCorrelation >= 0.6) strength = 'Strong';
  else if (absCorrelation >= 0.4) strength = 'Moderate';
  else if (absCorrelation >= 0.2) strength = 'Weak';
  else strength = 'Very Weak';

  const direction = correlation > 0 ? 'Positive' : correlation < 0 ? 'Negative' : 'None';

  return {
    correlation: Math.round(correlation * 1000) / 1000,
    strength,
    direction,
  };
}

// 15. News Impact Calculator
export function calculateNewsImpact(
  eventType: 'high' | 'medium' | 'low',
  affectedCurrency: string
): { expectedVolatility: string; pipRange: string; holdingRecommendation: string } {
  const impacts = {
    high: { volatility: 'High', pipRange: '50-200 pips', recommendation: 'Consider reducing positions before release' },
    medium: { volatility: 'Medium', pipRange: '20-50 pips', recommendation: 'Monitor positions closely' },
    low: { volatility: 'Low', pipRange: '5-20 pips', recommendation: 'Normal trading conditions expected' },
  };

  return {
    expectedVolatility: impacts[eventType].volatility,
    pipRange: impacts[eventType].pipRange,
    holdingRecommendation: impacts[eventType].recommendation,
  };
}

// 16. Session Timing Calculator
export function calculateSessionTiming(): Array<{ session: string; status: string; active: boolean; volume: string }> {
  const now = new Date();
  const utcHour = now.getUTCHours();

  const sessions = [
    { name: 'Sydney', start: 21, end: 6, volume: 'Medium' },
    { name: 'Tokyo', start: 0, end: 9, volume: 'High' },
    { name: 'London', start: 8, end: 17, volume: 'Very High' },
    { name: 'New York', start: 13, end: 22, volume: 'Very High' },
  ];

  return sessions.map(session => {
    let active = false;
    if (session.start < session.end) {
      active = utcHour >= session.start && utcHour < session.end;
    } else {
      active = utcHour >= session.start || utcHour < session.end;
    }

    return {
      session: session.name,
      status: active ? 'Active' : 'Closed',
      active,
      volume: session.volume,
    };
  });
}

// 17. Gold Pip Calculator
export function calculateGoldPip(
  lotSize: number,
  entryPrice: number,
  exitPrice: number
): { pips: number; profit: number; pipValue: number } {
  const pips = Math.abs(exitPrice - entryPrice) * 100;
  const pipValue = lotSize * 1; // $1 per pip per lot for gold
  const profit = pips * pipValue * (exitPrice > entryPrice ? 1 : -1);

  return {
    pips: Math.round(pips),
    profit: Math.round(profit * 100) / 100,
    pipValue: Math.round(pipValue * 100) / 100,
  };
}

// 18. Crypto Position Size Calculator
export function calculateCryptoPositionSize(
  accountBalance: number,
  riskPercentage: number,
  entryPrice: number,
  stopLossPrice: number
): { positionSize: number; units: number; riskAmount: number } {
  const riskAmount = accountBalance * (riskPercentage / 100);
  const stopLossPercentage = Math.abs(entryPrice - stopLossPrice) / entryPrice;
  const positionSize = riskAmount / stopLossPercentage;
  const units = positionSize / entryPrice;

  return {
    positionSize: Math.round(positionSize * 100) / 100,
    units: Math.round(units * 100000) / 100000,
    riskAmount: Math.round(riskAmount * 100) / 100,
  };
}

// 19. Futures Tick Value Calculator
export function calculateFuturesTickValue(
  contract: string,
  tickSize: number,
  tickValue: number,
  priceChange: number
): { ticks: number; profitLoss: number; contractValue: number } {
  const ticks = priceChange / tickSize;
  const profitLoss = ticks * tickValue;
  const contractValue = priceChange * 100; // Simplified

  return {
    ticks: Math.round(ticks),
    profitLoss: Math.round(profitLoss * 100) / 100,
    contractValue: Math.round(contractValue * 100) / 100,
  };
}

// 20. AI Trade Expectancy Calculator
export function calculateTradeExpectancy(
  winRate: number,
  avgWin: number,
  avgLoss: number,
  numberOfTrades: number
): { expectancy: number; expectedProfit: number; kellyCriterion: number } {
  const winRateDecimal = winRate / 100;
  const lossRateDecimal = 1 - winRateDecimal;
  
  const expectancy = (winRateDecimal * avgWin) - (lossRateDecimal * avgLoss);
  const expectedProfit = expectancy * numberOfTrades;
  const kellyCriterion = ((winRateDecimal * avgWin) - lossRateDecimal) / avgWin;

  return {
    expectancy: Math.round(expectancy * 100) / 100,
    expectedProfit: Math.round(expectedProfit * 100) / 100,
    kellyCriterion: Math.round(kellyCriterion * 1000) / 1000,
  };
}

// Helper function to generate candlestick data for charts
export function generateCandlestickData(count: number = 50) {
  const data = [];
  let basePrice = 1.0850;
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date(now.getTime() - (count - i) * 60 * 60 * 1000);
    const volatility = 0.0005;
    const open = basePrice + (Math.random() - 0.5) * volatility;
    const close = open + (Math.random() - 0.5) * volatility;
    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * 0.5;
    const volume = Math.floor(Math.random() * 10000) + 1000;

    data.push({
      date: date.toISOString().slice(0, 16).replace('T', ' '),
      open: parseFloat(open.toFixed(5)),
      high: parseFloat(high.toFixed(5)),
      low: parseFloat(low.toFixed(5)),
      close: parseFloat(close.toFixed(5)),
      volume,
    });

    basePrice = close;
  }

  return data;
}

// Calculate RSI
export function calculateRSI(prices: number[], period: number = 14): number[] {
  const rsi: number[] = [];
  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const change = prices[i] - prices[i - 1];
    if (change > 0) gains += change;
    else losses -= change;
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  for (let i = 0; i < period; i++) {
    rsi.push(50); // Placeholder for initial values
  }

  for (let i = period; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    const gain = change > 0 ? change : 0;
    const loss = change < 0 ? -change : 0;

    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;

    const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    rsi.push(100 - 100 / (1 + rs));
  }

  return rsi;
}

// Calculate MACD
export function calculateMACD(prices: number[]): { macd: number[]; signal: number[]; histogram: number[] } {
  const ema12 = calculateEMA(prices, 12);
  const ema26 = calculateEMA(prices, 26);
  const macd = ema12.map((v, i) => v - ema26[i]);
  const signal = calculateEMA(macd, 9);
  const histogram = macd.map((v, i) => v - signal[i]);

  return { macd, signal, histogram };
}

// Calculate EMA helper
function calculateEMA(prices: number[], period: number): number[] {
  const ema: number[] = [];
  const multiplier = 2 / (period + 1);

  // Start with SMA for first value
  let sum = 0;
  for (let i = 0; i < period; i++) {
    sum += prices[i];
    ema.push(sum / (i + 1));
  }

  // Calculate EMA for remaining values
  for (let i = period; i < prices.length; i++) {
    ema.push((prices[i] - ema[i - 1]) * multiplier + ema[i - 1]);
  }

  return ema;
}
