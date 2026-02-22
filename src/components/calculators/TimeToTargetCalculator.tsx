"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function TimeToTargetCalculator() {
  const [currentBalance, setCurrentBalance] = useState<string>("");
  const [targetBalance, setTargetBalance] = useState<string>("");
  const [monthlyReturn, setMonthlyReturn] = useState<string>("");
  const [result, setResult] = useState<{ months: number; years: number } | null>(null);

  const calculate = () => {
    const current = parseFloat(currentBalance);
    const target = parseFloat(targetBalance);
    const monthly = parseFloat(monthlyReturn) / 100;
    if (current && target && monthly) {
      const months = Math.log(target / current) / Math.log(1 + monthly);
      setResult({ months: Math.ceil(months), years: months / 12 });
    }
  };

  const resetForm = () => {
    setCurrentBalance("");
    setTargetBalance("");
    setMonthlyReturn("");
    setResult(null);
  };

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-rose-500/20">
            <Clock className="h-5 w-5 text-rose-400" />
          </div>
          Time to Target Calculator
        </CardTitle>
        <CardDescription>Estimate time to reach profit targets</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="currentBalance">Current Balance ($)</Label>
            <Input id="currentBalance" type="number" placeholder="10000" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetBalance">Target Balance ($)</Label>
            <Input id="targetBalance" type="number" placeholder="50000" value={targetBalance} onChange={(e) => setTargetBalance(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthlyReturn">Monthly Return (%)</Label>
            <Input id="monthlyReturn" type="number" placeholder="5" value={monthlyReturn} onChange={(e) => setMonthlyReturn(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate} className="bg-infinity-blue hover:bg-infinity-blue/80">Calculate</Button>
          <Button variant="outline" size="sm" onClick={resetForm} className="border-white/10"><RotateCcw className="h-4 w-4 mr-2" />Reset</Button>
        </div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-xl bg-gradient-to-r from-infinity-blue/20 to-infinity-teal/20 border border-infinity-blue/30 text-center">
            <p className="text-sm text-muted-foreground mb-1">Time to Target</p>
            <p className="text-4xl font-bold text-infinity-blue">{result.months} months</p>
            <p className="text-sm text-muted-foreground mt-2">Approximately <span className="text-infinity-teal font-semibold">{result.years.toFixed(1)} years</span></p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
