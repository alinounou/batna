'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  ZoomIn,
  ZoomOut,
  Move,
  Crosshair,
  Grid3X3,
  Layers,
  Settings,
  ChevronDown,
  LineChart,
  BarChart3,
  CandlestickChart,
} from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ReferenceLine,
  Area,
  ComposedChart,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { generateCandlestickData, calculateRSI, calculateMACD } from '@/lib/calculations';

const timeframes = ['1m', '5m', '15m', '1H', '4H', '1D'];

const indicators = [
  { id: 'rsi', label: 'RSI', color: '#a855f7' },
  { id: 'macd', label: 'MACD', color: '#3b82f6' },
  { id: 'ma20', label: 'MA 20', color: '#22c55e' },
  { id: 'ma50', label: 'MA 50', color: '#f59e0b' },
  { id: 'bb', label: 'Bollinger', color: '#ec4899' },
];

const pairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'XAU/USD', 'BTC/USD'];

export default function TradingChart() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1H');
  const [selectedPair, setSelectedPair] = useState('EUR/USD');
  const [chartType, setChartType] = useState<'candle' | 'line' | 'area'>('area');
  const [activeIndicators, setActiveIndicators] = useState<string[]>(['ma20', 'ma50']);
  const [showVolume, setShowVolume] = useState(true);

  const chartData = useMemo(() => {
    return generateCandlestickData(100);
  }, []);

  const prices = chartData.map(d => d.close);
  const rsiValues = calculateRSI(prices);
  const macdValues = calculateMACD(prices);

  const chartDataWithIndicators = chartData.map((d, i) => ({
    ...d,
    rsi: rsiValues[i],
    macd: macdValues.macd[i],
    macdSignal: macdValues.signal[i],
    macdHistogram: macdValues.histogram[i],
    ma20: i >= 19 ? prices.slice(i - 19, i + 1).reduce((a, b) => a + b, 0) / 20 : null,
    ma50: i >= 49 ? prices.slice(i - 49, i + 1).reduce((a, b) => a + b, 0) / 50 : null,
  }));

  const currentPrice = chartData[chartData.length - 1]?.close || 0;
  const previousPrice = chartData[chartData.length - 2]?.close || 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = (priceChange / previousPrice) * 100;
  const isPositive = priceChange >= 0;

  return (
    <div className="glass-card rounded-xl p-4 lg:p-6">
      {/* Chart Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        {/* Pair and Price Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <select
              value={selectedPair}
              onChange={(e) => setSelectedPair(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            >
              {pairs.map((pair) => (
                <option key={pair} value={pair} className="bg-gray-900">
                  {pair}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{currentPrice.toFixed(5)}</div>
            <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{isPositive ? '+' : ''}{priceChange.toFixed(5)}</span>
              <span>({isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%)</span>
            </div>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="flex items-center gap-2">
          <ToggleGroup type="single" value={selectedTimeframe} onValueChange={(v) => v && setSelectedTimeframe(v)}>
            {timeframes.map((tf) => (
              <ToggleGroupItem
                key={tf}
                value={tf}
                className="px-3 py-1.5 text-xs font-medium data-[state=on]:bg-blue-500/20 data-[state=on]:text-blue-400"
              >
                {tf}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-4 pb-4 border-b border-white/10">
        {/* Chart Type */}
        <ToggleGroup type="single" value={chartType} onValueChange={(v) => v && setChartType(v as 'candle' | 'line' | 'area')}>
          <ToggleGroupItem value="candle" className="px-3 py-1.5" aria-label="Candlestick chart">
            <CandlestickChart className="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="line" className="px-3 py-1.5" aria-label="Line chart">
            <LineChart className="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="area" className="px-3 py-1.5" aria-label="Area chart">
            <BarChart3 className="w-4 h-4" />
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="w-px h-6 bg-white/10" />

        {/* Drawing Tools */}
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Crosshair className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Move className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Grid3X3 className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-white/10" />

        {/* Indicators */}
        <div className="flex items-center gap-1">
          {indicators.slice(0, 3).map((ind) => (
            <Button
              key={ind.id}
              variant={activeIndicators.includes(ind.id) ? 'default' : 'ghost'}
              size="sm"
              className={`h-8 px-2 text-xs ${
                activeIndicators.includes(ind.id)
                  ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                  : ''
              }`}
              onClick={() => {
                setActiveIndicators((prev) =>
                  prev.includes(ind.id) ? prev.filter((i) => i !== ind.id) : [...prev, ind.id]
                );
              }}
            >
              {ind.label}
            </Button>
          ))}
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Layers className="w-4 h-4" />
          </Button>
        </div>

        <div className="ml-auto">
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Chart */}
      <div className="h-[400px] lg:h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartDataWithIndicators}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={['auto', 'auto']}
              stroke="#6b7280"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => v.toFixed(5)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 15, 25, 0.95)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              labelStyle={{ color: '#9ca3af' }}
            />
            
            {/* Volume Bars */}
            {showVolume && (
              <Bar
                dataKey="volume"
                fill="rgba(59, 130, 246, 0.3)"
                yAxisId={0}
              />
            )}
            
            {/* Price Area/Line */}
            {chartType === 'area' && (
              <Area
                type="monotone"
                dataKey="close"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#colorPrice)"
              />
            )}
            {chartType === 'line' && (
              <Line
                type="monotone"
                dataKey="close"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
            )}
            
            {/* Moving Averages */}
            {activeIndicators.includes('ma20') && (
              <Line
                type="monotone"
                dataKey="ma20"
                stroke="#22c55e"
                strokeWidth={1.5}
                dot={false}
              />
            )}
            {activeIndicators.includes('ma50') && (
              <Line
                type="monotone"
                dataKey="ma50"
                stroke="#f59e0b"
                strokeWidth={1.5}
                dot={false}
              />
            )}

            {/* Supply/Demand Zones */}
            <ReferenceLine y={Math.min(...prices) + 0.001} stroke="#22c55e" strokeDasharray="5 5" strokeOpacity={0.5} />
            <ReferenceLine y={Math.max(...prices) - 0.001} stroke="#ef4444" strokeDasharray="5 5" strokeOpacity={0.5} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Indicator Panels */}
      {activeIndicators.length > 0 && (
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {activeIndicators.includes('rsi') && (
            <div className="glass-card rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-purple-400">RSI (14)</span>
                <span className="text-sm text-white">
                  {rsiValues[rsiValues.length - 1]?.toFixed(2) || 'N/A'}
                </span>
              </div>
              <div className="h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={chartDataWithIndicators}>
                    <YAxis domain={[0, 100]} hide />
                    <Line type="monotone" dataKey="rsi" stroke="#a855f7" strokeWidth={1.5} dot={false} />
                    <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="3 3" strokeOpacity={0.5} />
                    <ReferenceLine y={30} stroke="#22c55e" strokeDasharray="3 3" strokeOpacity={0.5} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
          {activeIndicators.includes('macd') && (
            <div className="glass-card rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-400">MACD</span>
                <span className="text-sm text-white">
                  {macdValues.macd[macdValues.macd.length - 1]?.toFixed(5) || 'N/A'}
                </span>
              </div>
              <div className="h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartDataWithIndicators}>
                    <YAxis hide />
                    <Bar dataKey="macdHistogram" fill="#3b82f6" opacity={0.5} />
                    <Line type="monotone" dataKey="macd" stroke="#3b82f6" strokeWidth={1.5} dot={false} />
                    <Line type="monotone" dataKey="macdSignal" stroke="#f59e0b" strokeWidth={1.5} dot={false} />
                    <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chart Pattern Detection */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          Double Bottom Detected
        </Badge>
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
          Support at 1.0845
        </Badge>
        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
          Bullish Divergence
        </Badge>
      </div>
    </div>
  );
}
