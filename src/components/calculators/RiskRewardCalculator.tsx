"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Scale, RotateCcw, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function RiskRewardCalculator() {
  const [entryPrice, setEntryPrice] = useState<string>("");
  const [stopLoss, setStopLoss] = useState<string>("");
  const [takeProfit, setTakeProfit] = useState<string>("");
  const [result, setResult] = useState<{ ratio: number; risk: number; reward: number } | null>(null);

  const calculate = () => {
    const entry = parseFloat(entryPrice);
    const sl = parseFloat(stopLoss);
    const tp = parseFloat(takeProfit);

    if (entry && sl && tp) {
      const risk = Math.abs(entry - sl);
      const reward = Math.abs(tp - entry);
      const ratio = reward / risk;
      setResult({ ratio, risk, reward });
    }
  };

  const resetForm = () => {
    setEntryPrice("");
    setStopLoss("");
    setTakeProfit("");
    setResult(null);
  };

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-red-500/20">
            <Scale className="h-5 w-5 text-red-400" />
          </div>
          Risk-Reward Calculator
        </CardTitle>
        <CardDescription>Calculate the risk-to-reward ratio for your trades</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="entryPrice">Entry Price</Label>
            <Input
              id="entryPrice"
              type="number"
              placeholder="1.1000"
              value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)}
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stopLoss">Stop Loss</Label>
            <Input
              id="stopLoss"
              type="number"
              placeholder="1.0950"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="takeProfit">Take Profit</Label>
            <Input
              id="takeProfit"
              type="number"
              placeholder="1.1100"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              className="bg-white/5 border-white/10"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate} className="bg-infinity-blue hover:bg-infinity-blue/80">
            Calculate
          </Button>
          <Button variant="outline" size="sm" onClick={resetForm} className="border-white/10">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-gradient-to-r from-infinity-blue/20 to-infinity-teal/20 border border-infinity-blue/30"
          >
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Risk-Reward Ratio</p>
              <p className="text-4xl font-bold text-gradient-blue">1:{result.ratio.toFixed(2)}</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground">Risk</p>
                <p className="text-lg font-semibold text-red-400">{result.risk.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Reward</p>
                <p className="text-lg font-semibold text-green-400">{result.reward.toFixed(4)}</p>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
