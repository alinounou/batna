"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function KellyCriterionCalculator() {
  const [winRate, setWinRate] = useState<string>("");
  const [avgWin, setAvgWin] = useState<string>("");
  const [avgLoss, setAvgLoss] = useState<string>("");
  const [result, setResult] = useState<{ kelly: number; halfKelly: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(winRate) / 100;
    const w = parseFloat(avgWin);
    const l = parseFloat(avgLoss);
    if (p && w && l) {
      const b = w / l;
      const kelly = ((b * p) - (1 - p)) / b;
      setResult({ kelly: kelly * 100, halfKelly: (kelly * 100) / 2 });
    }
  };

  const resetForm = () => {
    setWinRate("");
    setAvgWin("");
    setAvgLoss("");
    setResult(null);
  };

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-violet-500/20">
            <PieChart className="h-5 w-5 text-violet-400" />
          </div>
          Kelly Criterion Calculator
        </CardTitle>
        <CardDescription>Calculate optimal position size using Kelly criterion</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="winRate">Win Rate (%)</Label>
            <Input id="winRate" type="number" placeholder="55" value={winRate} onChange={(e) => setWinRate(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="avgWin">Avg Win ($)</Label>
            <Input id="avgWin" type="number" placeholder="200" value={avgWin} onChange={(e) => setAvgWin(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="avgLoss">Avg Loss ($)</Label>
            <Input id="avgLoss" type="number" placeholder="100" value={avgLoss} onChange={(e) => setAvgLoss(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate} className="bg-infinity-blue hover:bg-infinity-blue/80">Calculate</Button>
          <Button variant="outline" size="sm" onClick={resetForm} className="border-white/10"><RotateCcw className="h-4 w-4 mr-2" />Reset</Button>
        </div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div className="p-4 rounded-lg bg-infinity-blue/20 text-center">
              <p className="text-sm text-muted-foreground mb-1">Kelly %</p>
              <p className="text-2xl font-bold text-infinity-blue">{result.kelly.toFixed(2)}%</p>
            </div>
            <div className="p-4 rounded-lg bg-infinity-teal/20 text-center">
              <p className="text-sm text-muted-foreground mb-1">Half Kelly (Recommended)</p>
              <p className="text-2xl font-bold text-infinity-teal">{result.halfKelly.toFixed(2)}%</p>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
