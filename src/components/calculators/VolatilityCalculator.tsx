"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function VolatilityCalculator() {
  const [prices, setPrices] = useState<string>("");
  const [result, setResult] = useState<{ avg: number; stdDev: number; volatility: number } | null>(null);

  const calculate = () => {
    const priceArr = prices.split(",").map(Number).filter(n => !isNaN(n));
    if (priceArr.length > 1) {
      const avg = priceArr.reduce((a, b) => a + b, 0) / priceArr.length;
      const variance = priceArr.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / priceArr.length;
      const stdDev = Math.sqrt(variance);
      const volatility = (stdDev / avg) * 100;
      setResult({ avg, stdDev, volatility });
    }
  };

  const resetForm = () => {
    setPrices("");
    setResult(null);
  };

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-yellow-500/20">
            <Zap className="h-5 w-5 text-yellow-400" />
          </div>
          Volatility Calculator
        </CardTitle>
        <CardDescription>Calculate historical volatility</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="prices">Prices (comma-separated)</Label>
          <Input id="prices" placeholder="100, 102, 98, 105, 103, 107" value={prices} onChange={(e) => setPrices(e.target.value)} className="bg-white/5 border-white/10" />
          <p className="text-xs text-muted-foreground">Enter closing prices separated by commas</p>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate} className="bg-infinity-blue hover:bg-infinity-blue/80">Calculate</Button>
          <Button variant="outline" size="sm" onClick={resetForm} className="border-white/10"><RotateCcw className="h-4 w-4 mr-2" />Reset</Button>
        </div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            <div className="flex justify-between p-3 rounded-lg bg-white/5"><span>Average Price</span><span className="font-semibold">{result.avg.toFixed(2)}</span></div>
            <div className="flex justify-between p-3 rounded-lg bg-white/5"><span>Std Deviation</span><span className="font-semibold">{result.stdDev.toFixed(4)}</span></div>
            <div className="flex justify-between p-3 rounded-lg bg-infinity-blue/20"><span>Volatility %</span><span className="font-bold text-infinity-blue">{result.volatility.toFixed(2)}%</span></div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
