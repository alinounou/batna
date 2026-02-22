'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ReferenceLine,
} from 'recharts';

// Generate multi-year XAUUSD data with seeded random for consistency
const generateXAUUSDData = (years: number = 10) => {
  const data: ChartDataPoint[] = [];
  let price = 1500; // Starting price from 10 years ago
  const now = new Date();
  const totalDays = years * 365;
  
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed * 9999) * 10000;
    return x - Math.floor(x);
  };
  
  for (let i = totalDays; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const seed = totalDays - i;
    const volatility = (seededRandom(seed) - 0.5) * 25;
    const trend = price * 0.0002; // Slight upward trend
    const momentum = Math.sin(i / 60) * 8;
    
    price = Math.max(1200, Math.min(3100, price + trend + volatility + momentum));
    
    data.push({
      date: date.toISOString().split('T')[0],
      displayDate: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      price: Math.round(price * 100) / 100,
      ema20: 0,
      ema50: 0,
      rsi: 50,
      volume: Math.round(1000000 + seededRandom(seed + 1) * 500000),
    });
  }
  
  // Calculate EMA
  const prices = data.map(d => d.price);
  const ema20Multiplier = 2 / 21;
  const ema50Multiplier = 2 / 51;
  
  let ema20Sum = 0;
  let ema50Sum = 0;
  
  for (let i = 0; i < data.length; i++) {
    // EMA 20
    if (i < 20) {
      ema20Sum += prices[i];
      data[i].ema20 = ema20Sum / (i + 1);
    } else if (i === 20) {
      ema20Sum += prices[i];
      data[i].ema20 = ema20Sum / 20;
    } else {
      data[i].ema20 = (prices[i] - data[i - 1].ema20) * ema20Multiplier + data[i - 1].ema20;
    }
    
    // EMA 50
    if (i < 50) {
      ema50Sum += prices[i];
      data[i].ema50 = ema50Sum / (i + 1);
    } else if (i === 50) {
      ema50Sum += prices[i];
      data[i].ema50 = ema50Sum / 50;
    } else {
      data[i].ema50 = (prices[i] - data[i - 1].ema50) * ema50Multiplier + data[i - 1].ema50;
    }
    
    // RSI (simplified)
    const change = i > 0 ? prices[i] - prices[i - 1] : 0;
    const gain = change > 0 ? change : 0;
    const loss = change < 0 ? Math.abs(change) : 0;
    const avgGain = i > 14 ? (gain * 13 + data[i - 1].rsi > 50 ? gain : 0) / 14 : gain;
    const avgLoss = i > 14 ? (loss * 13 + data[i - 1].rsi < 50 ? loss : 0) / 14 : loss;
    const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    data[i].rsi = 100 - (100 / (1 + rs));
  }
  
  return data;
};

const timeframes = [
  { label: '1Y', years: 1 },
  { label: '3Y', years: 3 },
  { label: '5Y', years: 5 },
  { label: '10Y', years: 10 },
];

interface ChartDataPoint {
  date: string;
  displayDate: string;
  price: number;
  ema20: number;
  ema50: number;
  rsi: number;
  volume: number;
}

export default function XAUUSDChart() {
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframes[3]);
  const [mounted, setMounted] = useState(false);
  const mountedRef = useRef(false);
  
  // Generate data once
  const allData = useMemo(() => generateXAUUSDData(10), []);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      // Use requestAnimationFrame to avoid synchronous setState
      requestAnimationFrame(() => setMounted(true));
    }
  }, []);

  const data = useMemo(() => {
    const days = selectedTimeframe.years * 365;
    return allData.slice(-days);
  }, [allData, selectedTimeframe.years]);

  const currentPrice = data[data.length - 1]?.price || 0;
  const previousPrice = data[data.length - 2]?.price || currentPrice;
  const dailyChange = currentPrice - previousPrice;
  const dailyChangePercent = ((dailyChange / previousPrice) * 100).toFixed(2);
  const isPositive = dailyChange >= 0;
  
  const highestPrice = Math.max(...data.map(d => d.price));
  const lowestPrice = Math.min(...data.map(d => d.price));
  const avgPrice = data.reduce((sum, d) => sum + d.price, 0) / data.length;
  const currentRSI = data[data.length - 1]?.rsi || 50;
  
  const ema20Current = data[data.length - 1]?.ema20 || 0;
  const ema50Current = data[data.length - 1]?.ema50 || 0;
  const emaTrend = ema20Current > ema50Current ? 'bullish' : 'bearish';

  if (!mounted) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">XAUUSD Gold Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading chart...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-yellow-500">⬡</span>
                XAUUSD
                <Badge variant="outline" className="text-xs">Gold/USD</Badge>
              </CardTitle>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-2xl font-bold text-white">${currentPrice.toFixed(2)}</span>
                <Badge className={`${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {isPositive ? '+' : ''}{dailyChangePercent}%
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {timeframes.map((tf) => (
              <Button
                key={tf.label}
                variant={selectedTimeframe.label === tf.label ? 'default' : 'ghost'}
                size="sm"
                className={`h-8 px-3 ${
                  selectedTimeframe.label === tf.label
                    ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                    : 'text-muted-foreground hover:text-white'
                }`}
                onClick={() => setSelectedTimeframe(tf)}
              >
                {tf.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4 p-3 rounded-lg bg-black/20">
          <div>
            <p className="text-xs text-muted-foreground">High</p>
            <p className="text-sm font-semibold text-green-400">${highestPrice.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Low</p>
            <p className="text-sm font-semibold text-red-400">${lowestPrice.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Average</p>
            <p className="text-sm font-semibold text-white">${avgPrice.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">RSI (14)</p>
            <p className={`text-sm font-semibold ${currentRSI > 70 ? 'text-red-400' : currentRSI < 30 ? 'text-green-400' : 'text-white'}`}>
              {currentRSI.toFixed(1)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">EMA Trend</p>
            <p className={`text-sm font-semibold ${emaTrend === 'bullish' ? 'text-green-400' : 'text-red-400'}`}>
              {emaTrend === 'bullish' ? '↑ Bullish' : '↓ Bearish'}
            </p>
          </div>
        </div>

        {/* Main Price Chart */}
        <div className="h-[300px] mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="displayDate"
                stroke="#6b7280"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="#6b7280"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${v.toFixed(0)}`}
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(0, 0, 0, 0.9)',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#FFD700' }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#FFD700"
                strokeWidth={2}
                fill="url(#goldGradient)"
              />
              <Line
                type="monotone"
                dataKey="ema20"
                stroke="#00D4FF"
                strokeWidth={1}
                dot={false}
                strokeDasharray="5 5"
              />
              <Line
                type="monotone"
                dataKey="ema50"
                stroke="#FF6B6B"
                strokeWidth={1}
                dot={false}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* RSI Chart */}
        <div className="h-[100px]">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-muted-foreground">RSI (14)</span>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <YAxis
                stroke="#6b7280"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
                ticks={[30, 50, 70]}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(0, 0, 0, 0.9)',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                  borderRadius: '8px',
                }}
              />
              <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="3 3" />
              <ReferenceLine y={30} stroke="#22c55e" strokeDasharray="3 3" />
              <ReferenceLine y={50} stroke="#6b7280" strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="rsi"
                stroke="#A855F7"
                strokeWidth={1.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-yellow-500" />
            <span>Price</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-cyan-400" style={{ borderStyle: 'dashed' }} />
            <span>EMA 20</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-red-400" style={{ borderStyle: 'dashed' }} />
            <span>EMA 50</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-purple-500" />
            <span>RSI</span>
          </div>
        </div>

        {/* Academy Promotion */}
        <div className="mt-4 p-3 rounded-lg text-center" style={{
          background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 165, 0, 0.1))',
          border: '1px solid rgba(255, 215, 0, 0.2)'
        }}>
          <p className="text-xs text-gray-400">
            🎓 Learn Gold Trading at 
            <a href="https://infinityalgoacademy.net" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:underline font-semibold ml-1">
              Infinity Algo Academy
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
