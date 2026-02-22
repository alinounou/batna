"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sigma, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function ExpectancyCalculator() {
  const [winRate, setWinRate] = useState<string>("");
  const [avgWin, setAvgWin] = useState<string>("");
  const [avgLoss, setAvgLoss] = useState<string>("");
  const [result, setResult] = useState<{ expectancy: number; rating: string } | null>(null);

  const calculate = () => {
    const wr = parseFloat(winRate) / 100;
    const aw = parseFloat(avgWin);
    const al = parseFloat(avgLoss);
    if (wr && aw && al) {
      const expectancy = (wr * aw) - ((1 - wr) * al);
      let rating = expectancy > 0 ? "Positive" : "Negative";
      if (expectancy > al * 0.5) rating = "Excellent";
      setResult({ expectancy, rating });
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
          <div className="p-2 rounded-lg bg-amber-500/20">
            <Sigma className="h-5 w-5 text-amber-400" />
          </div>
          Expectancy Calculator
        </CardTitle>
        <CardDescription>Calculate expected value of your trading strategy</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="winRate">Win Rate (%)</Label>
            <Input id="winRate" type="number" placeholder="60" value={winRate} onChange={(e) => setWinRate(e.target.value)} className="bg-white/5 border-white/10" />
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-xl bg-gradient-to-r from-infinity-blue/20 to-infinity-teal/20 border border-infinity-blue/30 text-center">
            <p className="text-sm text-muted-foreground mb-1">Expectancy per Trade</p>
            <p className={`text-4xl font-bold ${result.expectancy >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${result.expectancy.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Rating: <span className="text-infinity-teal font-semibold">{result.rating}</span></p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
