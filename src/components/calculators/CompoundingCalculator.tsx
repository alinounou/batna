"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function CompoundingCalculator() {
  const [initialCapital, setInitialCapital] = useState<string>("");
  const [monthlyReturn, setMonthlyReturn] = useState<string>("");
  const [months, setMonths] = useState<string>("");
  const [result, setResult] = useState<{ final: number; totalReturn: number } | null>(null);

  const calculate = () => {
    const capital = parseFloat(initialCapital);
    const returnRate = parseFloat(monthlyReturn) / 100;
    const periods = parseInt(months);
    if (capital && returnRate && periods) {
      const final = capital * Math.pow(1 + returnRate, periods);
      setResult({ final, totalReturn: ((final - capital) / capital) * 100 });
    }
  };

  const resetForm = () => {
    setInitialCapital("");
    setMonthlyReturn("");
    setMonths("");
    setResult(null);
  };

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-green-500/20">
            <TrendingUp className="h-5 w-5 text-green-400" />
          </div>
          Compounding Calculator
        </CardTitle>
        <CardDescription>Project account growth with compound interest</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="initialCapital">Initial Capital ($)</Label>
            <Input
              id="initialCapital"
              type="number"
              placeholder="10000"
              value={initialCapital}
              onChange={(e) => setInitialCapital(e.target.value)}
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthlyReturn">Monthly Return (%)</Label>
            <Input
              id="monthlyReturn"
              type="number"
              placeholder="5"
              value={monthlyReturn}
              onChange={(e) => setMonthlyReturn(e.target.value)}
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="months">Months</Label>
            <Input
              id="months"
              type="number"
              placeholder="12"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
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
              <p className="text-sm text-muted-foreground mb-1">Final Balance</p>
              <p className="text-4xl font-bold text-green-400">${result.final.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
              <p className="text-sm text-muted-foreground mt-2">Total Return: <span className="text-green-400 font-semibold">{result.totalReturn.toFixed(1)}%</span></p>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
