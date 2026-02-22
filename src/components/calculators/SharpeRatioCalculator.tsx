"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gauge, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function SharpeRatioCalculator() {
  const [avgReturn, setAvgReturn] = useState<string>("");
  const [riskFreeRate, setRiskFreeRate] = useState<string>("");
  const [stdDev, setStdDev] = useState<string>("");
  const [result, setResult] = useState<{ sharpe: number; rating: string } | null>(null);

  const calculate = () => {
    const ret = parseFloat(avgReturn);
    const rf = parseFloat(riskFreeRate);
    const sd = parseFloat(stdDev);
    if (ret && sd) {
      const sharpe = (ret - rf) / sd;
      let rating = "Poor";
      if (sharpe > 2) rating = "Excellent";
      else if (sharpe > 1) rating = "Good";
      else if (sharpe > 0) rating = "Acceptable";
      setResult({ sharpe, rating });
    }
  };

  const resetForm = () => {
    setAvgReturn("");
    setRiskFreeRate("");
    setStdDev("");
    setResult(null);
  };

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-sky-500/20">
            <Gauge className="h-5 w-5 text-sky-400" />
          </div>
          Sharpe Ratio Calculator
        </CardTitle>
        <CardDescription>Calculate risk-adjusted return using Sharpe ratio</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="avgReturn">Average Return (%)</Label>
            <Input id="avgReturn" type="number" placeholder="15" value={avgReturn} onChange={(e) => setAvgReturn(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="riskFreeRate">Risk-Free Rate (%)</Label>
            <Input id="riskFreeRate" type="number" placeholder="2" value={riskFreeRate} onChange={(e) => setRiskFreeRate(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stdDev">Std Deviation (%)</Label>
            <Input id="stdDev" type="number" placeholder="10" value={stdDev} onChange={(e) => setStdDev(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate} className="bg-infinity-blue hover:bg-infinity-blue/80">Calculate</Button>
          <Button variant="outline" size="sm" onClick={resetForm} className="border-white/10"><RotateCcw className="h-4 w-4 mr-2" />Reset</Button>
        </div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-xl bg-gradient-to-r from-infinity-blue/20 to-infinity-teal/20 border border-infinity-blue/30 text-center">
            <p className="text-sm text-muted-foreground mb-1">Sharpe Ratio</p>
            <p className="text-4xl font-bold text-infinity-blue">{result.sharpe.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-2">Rating: <span className="text-infinity-teal font-semibold">{result.rating}</span></p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
