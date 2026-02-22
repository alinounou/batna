"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function ATRStopLossCalculator() {
  const [entryPrice, setEntryPrice] = useState<string>("");
  const [atr, setAtr] = useState<string>("");
  const [multiplier, setMultiplier] = useState<string>("2");
  const [result, setResult] = useState<{ stopLoss: number; distance: number } | null>(null);

  const calculate = () => {
    const entry = parseFloat(entryPrice);
    const atrVal = parseFloat(atr);
    const mult = parseFloat(multiplier);
    if (entry && atrVal && mult) {
      const distance = atrVal * mult;
      setResult({ stopLoss: entry - distance, distance });
    }
  };

  const resetForm = () => {
    setEntryPrice("");
    setAtr("");
    setMultiplier("2");
    setResult(null);
  };

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-cyan-500/20">
            <Activity className="h-5 w-5 text-cyan-400" />
          </div>
          ATR Stop Loss Calculator
        </CardTitle>
        <CardDescription>Calculate stop loss using Average True Range</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="entryPrice">Entry Price</Label>
            <Input id="entryPrice" type="number" placeholder="100" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="atr">ATR Value</Label>
            <Input id="atr" type="number" placeholder="2.5" value={atr} onChange={(e) => setAtr(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="multiplier">Multiplier</Label>
            <Input id="multiplier" type="number" placeholder="2" value={multiplier} onChange={(e) => setMultiplier(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate} className="bg-infinity-blue hover:bg-infinity-blue/80">Calculate</Button>
          <Button variant="outline" size="sm" onClick={resetForm} className="border-white/10"><RotateCcw className="h-4 w-4 mr-2" />Reset</Button>
        </div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-xl bg-gradient-to-r from-infinity-blue/20 to-infinity-teal/20 border border-infinity-blue/30 text-center">
            <p className="text-sm text-muted-foreground mb-1">Stop Loss Price</p>
            <p className="text-4xl font-bold text-red-400">{result.stopLoss.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-2">Distance: <span className="text-infinity-blue font-semibold">{result.distance.toFixed(2)}</span></p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
