'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Seeded random for consistent SSR
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const generatePortfolioData = (days: number) => {
  const data = [];
  let balance = 45000;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const seed = days - i + 1;
    const change = (seededRandom(seed) - 0.45) * 400;
    balance = Math.max(38000, Math.min(52000, balance + change));
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(balance * 100) / 100,
      pnl: change,
    });
  }

  return data;
};

const timeframes = [
  { label: '1W', days: 7 },
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: '1Y', days: 365 },
  { label: 'All', days: 730 },
];

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      date: string;
      value: number;
      pnl: number;
    };
  }>;
  label?: string;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass-card rounded-lg p-3 border border-white/10">
        <p className="text-sm text-muted-foreground">{data.date}</p>
        <p className="text-lg font-bold text-white">${data.value.toLocaleString()}</p>
        <p className={`text-sm ${data.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {data.pnl >= 0 ? '+' : ''}{data.pnl.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
}

export default function PortfolioChart() {
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframes[1]);
  const [mounted, setMounted] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      requestAnimationFrame(() => setMounted(true));
    }
  }, []);

  const data = useMemo(() => generatePortfolioData(selectedTimeframe.days), [selectedTimeframe.days]);

  const currentValue = data[data.length - 1]?.value || 0;
  const startValue = data[0]?.value || 0;
  const totalChange = currentValue - startValue;
  const percentChange = ((totalChange / startValue) * 100).toFixed(2);
  const isPositive = totalChange >= 0;

  // Calculate statistics
  const maxDrawdown = useMemo(() => {
    let peak = data[0]?.value || 0;
    let maxDD = 0;
    for (const point of data) {
      if (point.value > peak) peak = point.value;
      const dd = (peak - point.value) / peak;
      if (dd > maxDD) maxDD = dd;
    }
    return (maxDD * 100).toFixed(2);
  }, [data]);

  if (!mounted) {
    return (
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">Portfolio Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading chart...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-4">
          <CardTitle className="text-lg">Portfolio Performance</CardTitle>
          <Badge className={`${isPositive ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
            {isPositive ? '+' : ''}{percentChange}%
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          {timeframes.map((tf) => (
            <Button
              key={tf.label}
              variant={selectedTimeframe.label === tf.label ? 'default' : 'ghost'}
              size="sm"
              className={`h-8 px-3 ${
                selectedTimeframe.label === tf.label
                  ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                  : 'text-muted-foreground hover:text-white'
              }`}
              onClick={() => setSelectedTimeframe(tf)}
            >
              {tf.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div>
            <p className="text-sm text-muted-foreground">Current Value</p>
            <p className="text-xl font-bold text-white">${currentValue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Change</p>
            <p className={`text-xl font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{totalChange.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Max Drawdown</p>
            <p className="text-xl font-bold text-amber-400">-{maxDrawdown}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Performance</p>
            <p className={`text-xl font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{percentChange}%
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isPositive ? '#22c55e' : '#ef4444'} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={isPositive ? '#22c55e' : '#ef4444'} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="date"
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
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={isPositive ? '#22c55e' : '#ef4444'}
                strokeWidth={2}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
