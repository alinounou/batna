'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  Target,
  Scale,
  Layers,
  DollarSign,
  TrendingUp,
  BarChart3,
  Percent,
  Activity,
  Zap,
  Shield,
  Clock,
  Coins,
  Bitcoin,
  AlertCircle,
  LineChart,
  RefreshCw,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  calculatePositionSize,
  calculateRiskReward,
  calculateLotSize,
  calculateMargin,
  calculatePipValue,
  calculateFibonacciRetracement,
  calculateFibonacciExtension,
  calculateCompounding,
  calculateDrawdown,
  calculateBreakEven,
  calculateATRStopLoss,
  calculateVolatility,
  calculatePortfolioRisk,
  calculateCorrelation,
  calculateNewsImpact,
  calculateSessionTiming,
  calculateGoldPip,
  calculateCryptoPositionSize,
  calculateFuturesTickValue,
  calculateTradeExpectancy,
} from '@/lib/calculations';

// Calculator wrapper component
interface CalculatorCardProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

function CalculatorCard({ title, icon: Icon, children }: CalculatorCardProps) {
  return (
    <Card className="glass-card glass-card-hover">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className="w-5 h-5 text-blue-400" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

// Result display component
interface ResultDisplayProps {
  label: string;
  value: string | number;
  suffix?: string;
  highlight?: boolean;
}

function ResultDisplay({ label, value, suffix, highlight }: ResultDisplayProps) {
  return (
    <div
      className={`flex justify-between items-center p-2 rounded-lg ${
        highlight ? 'bg-blue-500/20' : 'bg-white/5'
      }`}
    >
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`font-mono font-medium ${highlight ? 'text-blue-400' : 'text-white'}`}>
        {value}
        {suffix && <span className="text-muted-foreground ml-1">{suffix}</span>}
      </span>
    </div>
  );
}

// 1. Position Size Calculator
function PositionSizeCalc() {
  const [accountBalance, setAccountBalance] = useState('10000');
  const [riskPercent, setRiskPercent] = useState('2');
  const [stopLossPips, setStopLossPips] = useState('50');
  const [result, setResult] = useState<ReturnType<typeof calculatePositionSize> | null>(null);

  const handleCalculate = () => {
    const r = calculatePositionSize(
      parseFloat(accountBalance) || 0,
      parseFloat(riskPercent) || 0,
      parseFloat(stopLossPips) || 0
    );
    setResult(r);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">Balance ($)</Label>
          <Input
            value={accountBalance}
            onChange={(e) => setAccountBalance(e.target.value)}
            className="h-9 bg-white/5 border-white/10"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Risk (%)</Label>
          <Input
            value={riskPercent}
            onChange={(e) => setRiskPercent(e.target.value)}
            className="h-9 bg-white/5 border-white/10"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">SL (pips)</Label>
          <Input
            value={stopLossPips}
            onChange={(e) => setStopLossPips(e.target.value)}
            className="h-9 bg-white/5 border-white/10"
          />
        </div>
      </div>
      <Button onClick={handleCalculate} className="w-full btn-primary" size="sm">
        Calculate
      </Button>
      {result && (
        <div className="space-y-2">
          <ResultDisplay label="Lot Size" value={result.lotSize} highlight />
          <ResultDisplay label="Risk Amount" value={`$${result.riskAmount}`} />
          <ResultDisplay label="Units" value={result.units.toLocaleString()} />
        </div>
      )}
    </div>
  );
}

// 2. Risk/Reward Calculator
function RiskRewardCalc() {
  const [entry, setEntry] = useState('1.0850');
  const [stopLoss, setStopLoss] = useState('1.0820');
  const [takeProfit, setTakeProfit] = useState('1.0910');
  const [result, setResult] = useState<ReturnType<typeof calculateRiskReward> | null>(null);

  const handleCalculate = () => {
    const r = calculateRiskReward(parseFloat(entry) || 0, parseFloat(stopLoss) || 0, parseFloat(takeProfit) || 0);
    setResult(r);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">Entry</Label>
          <Input value={entry} onChange={(e) => setEntry(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Stop Loss</Label>
          <Input value={stopLoss} onChange={(e) => setStopLoss(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Take Profit</Label>
          <Input value={takeProfit} onChange={(e) => setTakeProfit(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
      </div>
      <Button onClick={handleCalculate} className="w-full btn-primary" size="sm">
        Calculate
      </Button>
      {result && (
        <div className="space-y-2">
          <ResultDisplay label="R:R Ratio" value={`1:${result.riskRewardRatio}`} highlight />
          <ResultDisplay label="Risk Pips" value={result.riskPips} />
          <ResultDisplay label="Reward Pips" value={result.rewardPips} />
          <ResultDisplay label="Risk Amount" value={`$${result.riskAmount}`} />
          <ResultDisplay label="Reward Amount" value={`$${result.rewardAmount}`} />
        </div>
      )}
    </div>
  );
}

// 3. Lot Size Calculator
function LotSizeCalc() {
  const [units, setUnits] = useState('100000');
  const [lotType, setLotType] = useState<'standard' | 'mini' | 'micro'>('standard');
  const [result, setResult] = useState<ReturnType<typeof calculateLotSize> | null>(null);

  const handleCalculate = () => {
    const r = calculateLotSize(parseInt(units) || 0, lotType);
    setResult(r);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">Units</Label>
          <Input value={units} onChange={(e) => setUnits(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Lot Type</Label>
          <Select value={lotType} onValueChange={(v) => setLotType(v as typeof lotType)}>
            <SelectTrigger className="h-9 bg-white/5 border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="mini">Mini</SelectItem>
              <SelectItem value="micro">Micro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleCalculate} className="w-full btn-primary" size="sm">
        Calculate
      </Button>
      {result && (
        <div className="space-y-2">
          <ResultDisplay label="Lots" value={result.lots} highlight />
          <ResultDisplay label="Description" value={result.description} />
        </div>
      )}
    </div>
  );
}

// 4. Margin Calculator
function MarginCalc() {
  const [positionSize, setPositionSize] = useState('1');
  const [leverage, setLeverage] = useState('100');
  const [result, setResult] = useState<ReturnType<typeof calculateMargin> | null>(null);

  const handleCalculate = () => {
    const r = calculateMargin(parseFloat(positionSize) || 0, parseInt(leverage) || 1);
    setResult(r);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">Position (Lots)</Label>
          <Input value={positionSize} onChange={(e) => setPositionSize(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Leverage</Label>
          <Select value={leverage} onValueChange={setLeverage}>
            <SelectTrigger className="h-9 bg-white/5 border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">1:10</SelectItem>
              <SelectItem value="50">1:50</SelectItem>
              <SelectItem value="100">1:100</SelectItem>
              <SelectItem value="200">1:200</SelectItem>
              <SelectItem value="500">1:500</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleCalculate} className="w-full btn-primary" size="sm">
        Calculate
      </Button>
      {result && (
        <div className="space-y-2">
          <ResultDisplay label="Required Margin" value={`$${result.requiredMargin}`} highlight />
          <ResultDisplay label="Risk Level" value={result.marginLevel} />
        </div>
      )}
    </div>
  );
}

// 5. Pip Value Calculator
function PipValueCalc() {
  const [pair, setPair] = useState('EUR/USD');
  const [lotSize, setLotSize] = useState('1');
  const [result, setResult] = useState<ReturnType<typeof calculatePipValue> | null>(null);

  const handleCalculate = () => {
    const r = calculatePipValue(pair, parseFloat(lotSize) || 0);
    setResult(r);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">Pair</Label>
          <Select value={pair} onValueChange={setPair}>
            <SelectTrigger className="h-9 bg-white/5 border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EUR/USD">EUR/USD</SelectItem>
              <SelectItem value="GBP/USD">GBP/USD</SelectItem>
              <SelectItem value="USD/JPY">USD/JPY</SelectItem>
              <SelectItem value="XAU/USD">XAU/USD</SelectItem>
              <SelectItem value="BTC/USD">BTC/USD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Lot Size</Label>
          <Input value={lotSize} onChange={(e) => setLotSize(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
      </div>
      <Button onClick={handleCalculate} className="w-full btn-primary" size="sm">
        Calculate
      </Button>
      {result && (
        <div className="space-y-2">
          <ResultDisplay label="Pip Value" value={`$${result.pipValue}`} highlight />
          <ResultDisplay label="Info" value={result.description} />
        </div>
      )}
    </div>
  );
}

// 6. Fibonacci Calculator
function FibonacciCalc() {
  const [high, setHigh] = useState('1.1000');
  const [low, setLow] = useState('1.0800');
  const [type, setType] = useState<'retracement' | 'extension'>('retracement');
  const [result, setResult] = useState<ReturnType<typeof calculateFibonacciRetracement> | null>(null);

  const handleCalculate = () => {
    const r = calculateFibonacciRetracement(parseFloat(high) || 0, parseFloat(low) || 0);
    setResult(r);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">High</Label>
          <Input value={high} onChange={(e) => setHigh(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Low</Label>
          <Input value={low} onChange={(e) => setLow(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant={type === 'retracement' ? 'default' : 'outline'}
          size="sm"
          className="flex-1"
          onClick={() => setType('retracement')}
        >
          Retracement
        </Button>
        <Button
          variant={type === 'extension' ? 'default' : 'outline'}
          size="sm"
          className="flex-1"
          onClick={() => setType('extension')}
        >
          Extension
        </Button>
      </div>
      <Button onClick={handleCalculate} className="w-full btn-primary" size="sm">
        Calculate
      </Button>
      {result && (
        <div className="space-y-1 max-h-40 overflow-y-auto custom-scrollbar">
          {result.map((level) => (
            <ResultDisplay key={level.level} label={level.level} value={level.price.toFixed(5)} />
          ))}
        </div>
      )}
    </div>
  );
}

// 7. Compounding Calculator
function CompoundingCalc() {
  const [startingBalance, setStartingBalance] = useState('1000');
  const [monthlyReturn, setMonthlyReturn] = useState('10');
  const [months, setMonths] = useState('12');
  const [result, setResult] = useState<ReturnType<typeof calculateCompounding> | null>(null);

  const handleCalculate = () => {
    const r = calculateCompounding(
      parseFloat(startingBalance) || 0,
      parseFloat(monthlyReturn) || 0,
      parseInt(months) || 1
    );
    setResult(r);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">Start ($)</Label>
          <Input value={startingBalance} onChange={(e) => setStartingBalance(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Return %</Label>
          <Input value={monthlyReturn} onChange={(e) => setMonthlyReturn(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Months</Label>
          <Input value={months} onChange={(e) => setMonths(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
      </div>
      <Button onClick={handleCalculate} className="w-full btn-primary" size="sm">
        Calculate
      </Button>
      {result && (
        <div className="space-y-2">
          <ResultDisplay label="Final Balance" value={`$${result.finalBalance.toLocaleString()}`} highlight />
          <ResultDisplay label="Total Profit" value={`$${result.totalProfit.toLocaleString()}`} />
          <ResultDisplay label="Profit %" value={`${result.profitPercentage}%`} />
        </div>
      )}
    </div>
  );
}

// 8. Drawdown Calculator
function DrawdownCalc() {
  const [peak, setPeak] = useState('10000');
  const [trough, setTrough] = useState('8000');
  const [result, setResult] = useState<ReturnType<typeof calculateDrawdown> | null>(null);

  const handleCalculate = () => {
    const r = calculateDrawdown(parseFloat(peak) || 0, parseFloat(trough) || 0);
    setResult(r);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">Peak ($)</Label>
          <Input value={peak} onChange={(e) => setPeak(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Trough ($)</Label>
          <Input value={trough} onChange={(e) => setTrough(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
      </div>
      <Button onClick={handleCalculate} className="w-full btn-primary" size="sm">
        Calculate
      </Button>
      {result && (
        <div className="space-y-2">
          <ResultDisplay label="Drawdown %" value={`${result.drawdownPercentage}%`} highlight />
          <ResultDisplay label="Amount" value={`$${result.drawdownAmount}`} />
          <ResultDisplay label="Recovery %" value={`${result.recoveryPercentage}%`} />
        </div>
      )}
    </div>
  );
}

// 9. Break-Even Calculator
function BreakEvenCalc() {
  const [wins, setWins] = useState('60');
  const [losses, setLosses] = useState('40');
  const [avgWin, setAvgWin] = useState('150');
  const [avgLoss, setAvgLoss] = useState('100');
  const [result, setResult] = useState<ReturnType<typeof calculateBreakEven> | null>(null);

  const handleCalculate = () => {
    const r = calculateBreakEven(
      parseInt(wins) || 0,
      parseInt(losses) || 0,
      parseFloat(avgWin) || 0,
      parseFloat(avgLoss) || 0
    );
    setResult(r);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">Wins</Label>
          <Input value={wins} onChange={(e) => setWins(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Losses</Label>
          <Input value={losses} onChange={(e) => setLosses(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Avg Win ($)</Label>
          <Input value={avgWin} onChange={(e) => setAvgWin(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Avg Loss ($)</Label>
          <Input value={avgLoss} onChange={(e) => setAvgLoss(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
      </div>
      <Button onClick={handleCalculate} className="w-full btn-primary" size="sm">
        Calculate
      </Button>
      {result && (
        <div className="space-y-2">
          <ResultDisplay label="Break-Even Win Rate" value={`${result.breakEvenWinRate}%`} highlight />
          <ResultDisplay label="Current Win Rate" value={`${result.currentWinRate}%`} />
          <ResultDisplay label="Expectancy" value={`$${result.expectancy}`} />
          <ResultDisplay label="Profit Factor" value={result.profitFactor} />
        </div>
      )}
    </div>
  );
}

// 10. ATR Stop Loss Calculator
function ATRStopLossCalc() {
  const [price, setPrice] = useState('1.0850');
  const [atr, setAtr] = useState('0.0050');
  const [multiplier, setMultiplier] = useState('2');
  const [direction, setDirection] = useState<'long' | 'short'>('long');
  const [result, setResult] = useState<ReturnType<typeof calculateATRStopLoss> | null>(null);

  const handleCalculate = () => {
    const r = calculateATRStopLoss(
      parseFloat(price) || 0,
      parseFloat(atr) || 0,
      parseFloat(multiplier) || 1,
      direction
    );
    setResult(r);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">Price</Label>
          <Input value={price} onChange={(e) => setPrice(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">ATR</Label>
          <Input value={atr} onChange={(e) => setAtr(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">Multiplier</Label>
          <Input value={multiplier} onChange={(e) => setMultiplier(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Direction</Label>
          <Select value={direction} onValueChange={(v) => setDirection(v as 'long' | 'short')}>
            <SelectTrigger className="h-9 bg-white/5 border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="long">Long</SelectItem>
              <SelectItem value="short">Short</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleCalculate} className="w-full btn-primary" size="sm">
        Calculate
      </Button>
      {result && (
        <div className="space-y-2">
          <ResultDisplay label="Stop Loss" value={result.stopLoss.toFixed(5)} highlight />
          <ResultDisplay label="Distance" value={result.stopDistance.toFixed(5)} />
          <ResultDisplay label="Percentage" value={`${result.stopPercentage}%`} />
        </div>
      )}
    </div>
  );
}

// 11. Session Timing Calculator
function SessionTimingCalc() {
  const [result, setResult] = useState<ReturnType<typeof calculateSessionTiming> | null>(null);

  const handleCalculate = () => {
    const r = calculateSessionTiming();
    setResult(r);
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleCalculate} className="w-full btn-primary" size="sm">
        Check Market Sessions
      </Button>
      {result && (
        <div className="space-y-2">
          {result.map((session) => (
            <div
              key={session.session}
              className={`flex justify-between items-center p-2 rounded-lg ${
                session.active ? 'bg-green-500/20' : 'bg-white/5'
              }`}
            >
              <span className="text-sm font-medium">{session.session}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{session.volume}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    session.active ? 'bg-green-500/30 text-green-400' : 'bg-gray-500/30 text-gray-400'
                  }`}
                >
                  {session.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 12. Trade Expectancy Calculator
function TradeExpectancyCalc() {
  const [winRate, setWinRate] = useState('60');
  const [avgWin, setAvgWin] = useState('200');
  const [avgLoss, setAvgLoss] = useState('100');
  const [trades, setTrades] = useState('100');
  const [result, setResult] = useState<ReturnType<typeof calculateTradeExpectancy> | null>(null);

  const handleCalculate = () => {
    const r = calculateTradeExpectancy(
      parseFloat(winRate) || 0,
      parseFloat(avgWin) || 0,
      parseFloat(avgLoss) || 0,
      parseInt(trades) || 0
    );
    setResult(r);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">Win Rate %</Label>
          <Input value={winRate} onChange={(e) => setWinRate(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Avg Win ($)</Label>
          <Input value={avgWin} onChange={(e) => setAvgWin(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Avg Loss ($)</Label>
          <Input value={avgLoss} onChange={(e) => setAvgLoss(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground"># Trades</Label>
          <Input value={trades} onChange={(e) => setTrades(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
      </div>
      <Button onClick={handleCalculate} className="w-full btn-primary" size="sm">
        Calculate
      </Button>
      {result && (
        <div className="space-y-2">
          <ResultDisplay label="Expectancy" value={`$${result.expectancy}`} highlight />
          <ResultDisplay label="Expected Profit" value={`$${result.expectedProfit}`} />
          <ResultDisplay label="Kelly Criterion" value={result.kellyCriterion.toString()} />
        </div>
      )}
    </div>
  );
}

// 13. Volatility Calculator
function VolatilityCalc() {
  const [prices, setPrices] = useState('1.0850,1.0860,1.0855,1.0870,1.0865,1.0880,1.0875');
  const [result, setResult] = useState<ReturnType<typeof calculateVolatility> | null>(null);

  const handleCalculate = () => {
    const priceArray = prices.split(',').map(p => parseFloat(p.trim())).filter(p => !isNaN(p));
    const r = calculateVolatility(priceArray);
    setResult(r);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-xs text-muted-foreground">Prices (comma separated)</Label>
        <Textarea
          value={prices}
          onChange={(e) => setPrices(e.target.value)}
          className="h-16 bg-white/5 border-white/10 text-sm"
          placeholder="1.0850, 1.0860, 1.0855..."
        />
      </div>
      <Button onClick={handleCalculate} className="w-full btn-primary" size="sm">
        Calculate
      </Button>
      {result && (
        <div className="space-y-2">
          <ResultDisplay label="Average Price" value={result.averagePrice.toFixed(5)} />
          <ResultDisplay label="Std Deviation" value={result.standardDeviation.toFixed(5)} />
          <ResultDisplay label="Volatility %" value={`${result.volatilityPercentage}%`} highlight />
          <ResultDisplay label="Price Range" value={result.priceRange.toFixed(5)} />
        </div>
      )}
    </div>
  );
}

// 14. Portfolio Risk Calculator
function PortfolioRiskCalc() {
  const [result, setResult] = useState<{ totalRisk: number; averageRisk: number; positions: number } | null>(null);

  const handleCalculate = () => {
    const positions = [
      { pair: 'EUR/USD', lotSize: 0.5, stopLossPips: 30, pipValue: 10 },
      { pair: 'GBP/USD', lotSize: 0.3, stopLossPips: 40, pipValue: 10 },
      { pair: 'XAU/USD', lotSize: 0.1, stopLossPips: 50, pipValue: 10 },
    ];
    const r = calculatePortfolioRisk(positions);
    setResult({ totalRisk: r.totalRisk, averageRisk: r.averageRisk, positions: positions.length });
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleCalculate} className="w-full btn-primary" size="sm">
        Calculate Portfolio Risk
      </Button>
      {result && (
        <div className="space-y-2">
          <ResultDisplay label="Total Risk" value={`$${result.totalRisk}`} highlight />
          <ResultDisplay label="Average Risk" value={`$${result.averageRisk}`} />
          <ResultDisplay label="Open Positions" value={result.positions.toString()} />
        </div>
      )}
    </div>
  );
}

// 15. Correlation Calculator
function CorrelationCalc() {
  const [series1, setSeries1] = useState('1.0850,1.0860,1.0855,1.0870,1.0865');
  const [series2, setSeries2] = useState('1.2650,1.2670,1.2660,1.2690,1.2680');
  const [result, setResult] = useState<ReturnType<typeof calculateCorrelation> | null>(null);

  const handleCalculate = () => {
    const s1 = series1.split(',').map(p => parseFloat(p.trim())).filter(p => !isNaN(p));
    const s2 = series2.split(',').map(p => parseFloat(p.trim())).filter(p => !isNaN(p));
    const r = calculateCorrelation(s1, s2);
    setResult(r);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-xs text-muted-foreground">Series 1</Label>
        <Input value={series1} onChange={(e) => setSeries1(e.target.value)} className="h-9 bg-white/5 border-white/10" />
      </div>
      <div>
        <Label className="text-xs text-muted-foreground">Series 2</Label>
        <Input value={series2} onChange={(e) => setSeries2(e.target.value)} className="h-9 bg-white/5 border-white/10" />
      </div>
      <Button onClick={handleCalculate} className="w-full btn-primary" size="sm">
        Calculate
      </Button>
      {result && (
        <div className="space-y-2">
          <ResultDisplay label="Correlation" value={result.correlation.toString()} highlight />
          <ResultDisplay label="Strength" value={result.strength} />
          <ResultDisplay label="Direction" value={result.direction} />
        </div>
      )}
    </div>
  );
}

// 16. News Impact Calculator
function NewsImpactCalc() {
  const [eventType, setEventType] = useState<'high' | 'medium' | 'low'>('high');
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState<ReturnType<typeof calculateNewsImpact> | null>(null);

  const handleCalculate = () => {
    const r = calculateNewsImpact(eventType, currency);
    setResult(r);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">Impact Level</Label>
          <Select value={eventType} onValueChange={(v) => setEventType(v as 'high' | 'medium' | 'low')}>
            <SelectTrigger className="h-9 bg-white/5 border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Currency</Label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="h-9 bg-white/5 border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
              <SelectItem value="JPY">JPY</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleCalculate} className="w-full btn-primary" size="sm">
        Analyze Impact
      </Button>
      {result && (
        <div className="space-y-2">
          <ResultDisplay label="Expected Volatility" value={result.expectedVolatility} highlight />
          <ResultDisplay label="Pip Range" value={result.pipRange} />
          <div className="p-2 bg-amber-500/10 rounded-lg">
            <p className="text-xs text-amber-400">{result.holdingRecommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// 17. Gold Pip Calculator
function GoldPipCalc() {
  const [lotSize, setLotSize] = useState('1');
  const [entryPrice, setEntryPrice] = useState('2025.50');
  const [exitPrice, setExitPrice] = useState('2030.00');
  const [result, setResult] = useState<ReturnType<typeof calculateGoldPip> | null>(null);

  const handleCalculate = () => {
    const r = calculateGoldPip(
      parseFloat(lotSize) || 0,
      parseFloat(entryPrice) || 0,
      parseFloat(exitPrice) || 0
    );
    setResult(r);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">Lot Size</Label>
          <Input value={lotSize} onChange={(e) => setLotSize(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Entry</Label>
          <Input value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Exit</Label>
          <Input value={exitPrice} onChange={(e) => setExitPrice(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
      </div>
      <Button onClick={handleCalculate} className="w-full btn-primary" size="sm">
        Calculate
      </Button>
      {result && (
        <div className="space-y-2">
          <ResultDisplay label="Pips" value={result.pips.toString()} highlight />
          <ResultDisplay label="Profit/Loss" value={`$${result.profit}`} />
          <ResultDisplay label="Pip Value" value={`$${result.pipValue}`} />
        </div>
      )}
    </div>
  );
}

// 18. Crypto Position Size Calculator
function CryptoPositionSizeCalc() {
  const [accountBalance, setAccountBalance] = useState('10000');
  const [riskPercent, setRiskPercent] = useState('2');
  const [entryPrice, setEntryPrice] = useState('42500');
  const [stopLoss, setStopLoss] = useState('41000');
  const [result, setResult] = useState<ReturnType<typeof calculateCryptoPositionSize> | null>(null);

  const handleCalculate = () => {
    const r = calculateCryptoPositionSize(
      parseFloat(accountBalance) || 0,
      parseFloat(riskPercent) || 0,
      parseFloat(entryPrice) || 0,
      parseFloat(stopLoss) || 0
    );
    setResult(r);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">Balance ($)</Label>
          <Input value={accountBalance} onChange={(e) => setAccountBalance(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Risk (%)</Label>
          <Input value={riskPercent} onChange={(e) => setRiskPercent(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">Entry Price</Label>
          <Input value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Stop Loss</Label>
          <Input value={stopLoss} onChange={(e) => setStopLoss(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
      </div>
      <Button onClick={handleCalculate} className="w-full btn-primary" size="sm">
        Calculate
      </Button>
      {result && (
        <div className="space-y-2">
          <ResultDisplay label="Position Size" value={`$${result.positionSize}`} highlight />
          <ResultDisplay label="Units" value={result.units.toString()} />
          <ResultDisplay label="Risk Amount" value={`$${result.riskAmount}`} />
        </div>
      )}
    </div>
  );
}

// 19. Futures Tick Value Calculator
function FuturesTickValueCalc() {
  const [contract, setContract] = useState('ES');
  const [tickSize, setTickSize] = useState('0.25');
  const [tickValue, setTickValue] = useState('12.50');
  const [priceChange, setPriceChange] = useState('5.5');
  const [result, setResult] = useState<ReturnType<typeof calculateFuturesTickValue> | null>(null);

  const handleCalculate = () => {
    const r = calculateFuturesTickValue(
      contract,
      parseFloat(tickSize) || 0,
      parseFloat(tickValue) || 0,
      parseFloat(priceChange) || 0
    );
    setResult(r);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">Contract</Label>
          <Select value={contract} onValueChange={setContract}>
            <SelectTrigger className="h-9 bg-white/5 border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ES">ES (S&P 500)</SelectItem>
              <SelectItem value="NQ">NQ (Nasdaq)</SelectItem>
              <SelectItem value="CL">CL (Crude Oil)</SelectItem>
              <SelectItem value="GC">GC (Gold)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Tick Size</Label>
          <Input value={tickSize} onChange={(e) => setTickSize(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">Tick Value ($)</Label>
          <Input value={tickValue} onChange={(e) => setTickValue(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Price Change</Label>
          <Input value={priceChange} onChange={(e) => setPriceChange(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
      </div>
      <Button onClick={handleCalculate} className="w-full btn-primary" size="sm">
        Calculate
      </Button>
      {result && (
        <div className="space-y-2">
          <ResultDisplay label="Ticks" value={result.ticks.toString()} />
          <ResultDisplay label="P&L" value={`$${result.profitLoss}`} highlight />
          <ResultDisplay label="Contract Value" value={`$${result.contractValue}`} />
        </div>
      )}
    </div>
  );
}

// 20. Fibonacci Extension Calculator
function FibonacciExtensionCalc() {
  const [swingLow, setSwingLow] = useState('1.0800');
  const [swingHigh, setSwingHigh] = useState('1.0900');
  const [pullbackLow, setPullbackLow] = useState('1.0830');
  const [result, setResult] = useState<ReturnType<typeof calculateFibonacciExtension> | null>(null);

  const handleCalculate = () => {
    const r = calculateFibonacciExtension(
      parseFloat(swingLow) || 0,
      parseFloat(swingHigh) || 0,
      parseFloat(pullbackLow) || 0
    );
    setResult(r);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">Swing Low</Label>
          <Input value={swingLow} onChange={(e) => setSwingLow(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Swing High</Label>
          <Input value={swingHigh} onChange={(e) => setSwingHigh(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Pullback</Label>
          <Input value={pullbackLow} onChange={(e) => setPullbackLow(e.target.value)} className="h-9 bg-white/5 border-white/10" />
        </div>
      </div>
      <Button onClick={handleCalculate} className="w-full btn-primary" size="sm">
        Calculate Extensions
      </Button>
      {result && (
        <div className="space-y-1 max-h-40 overflow-y-auto custom-scrollbar">
          {result.map((level) => (
            <ResultDisplay key={level.level} label={level.level} value={level.price.toFixed(5)} />
          ))}
        </div>
      )}
    </div>
  );
}

// Main Calculator Grid Component
export default function CalculatorGrid() {
  const categories = [
    {
      name: 'Position & Risk',
      calculators: [
        { id: 'position-size', title: 'Position Size', icon: Target, component: PositionSizeCalc },
        { id: 'risk-reward', title: 'Risk/Reward', icon: Scale, component: RiskRewardCalc },
        { id: 'lot-size', title: 'Lot Size', icon: Layers, component: LotSizeCalc },
        { id: 'margin', title: 'Margin', icon: DollarSign, component: MarginCalc },
        { id: 'pip-value', title: 'Pip Value', icon: TrendingUp, component: PipValueCalc },
      ],
    },
    {
      name: 'Technical Analysis',
      calculators: [
        { id: 'fibonacci', title: 'Fibonacci Retracement', icon: BarChart3, component: FibonacciCalc },
        { id: 'fib-extension', title: 'Fibonacci Extension', icon: BarChart3, component: FibonacciExtensionCalc },
        { id: 'atr-stop', title: 'ATR Stop Loss', icon: Activity, component: ATRStopLossCalc },
        { id: 'volatility', title: 'Volatility', icon: AlertCircle, component: VolatilityCalc },
      ],
    },
    {
      name: 'Performance',
      calculators: [
        { id: 'compounding', title: 'Compounding', icon: TrendingUp, component: CompoundingCalc },
        { id: 'drawdown', title: 'Drawdown', icon: Percent, component: DrawdownCalc },
        { id: 'break-even', title: 'Break-Even', icon: Zap, component: BreakEvenCalc },
        { id: 'expectancy', title: 'Trade Expectancy', icon: LineChart, component: TradeExpectancyCalc },
      ],
    },
    {
      name: 'Market Tools',
      calculators: [
        { id: 'sessions', title: 'Market Sessions', icon: Clock, component: SessionTimingCalc },
        { id: 'correlation', title: 'Correlation', icon: Activity, component: CorrelationCalc },
        { id: 'news-impact', title: 'News Impact', icon: AlertCircle, component: NewsImpactCalc },
      ],
    },
    {
      name: 'Asset Specific',
      calculators: [
        { id: 'gold-pip', title: 'Gold Pip Calculator', icon: Coins, component: GoldPipCalc },
        { id: 'crypto-size', title: 'Crypto Position', icon: Bitcoin, component: CryptoPositionSizeCalc },
        { id: 'futures-tick', title: 'Futures Tick Value', icon: BarChart3, component: FuturesTickValueCalc },
      ],
    },
    {
      name: 'Portfolio',
      calculators: [
        { id: 'portfolio-risk', title: 'Portfolio Risk', icon: Shield, component: PortfolioRiskCalc },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <div key={category.name}>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-400" />
            {category.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {category.calculators.map((calc) => {
              const CalcComponent = calc.component;
              return (
                <motion.div
                  key={calc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CalculatorCard title={calc.title} icon={calc.icon}>
                    <CalcComponent />
                  </CalculatorCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
