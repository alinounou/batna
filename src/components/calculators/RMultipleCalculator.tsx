"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Target, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function RMultipleCalculator() {
  const [riskAmount, setRiskAmount] = useState<string>("");
  const [profitLoss, setProfitLoss] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const risk = parseFloat(riskAmount);
    const pl = parseFloat(profitLoss);
    if (risk && risk > 0) {
      setResult(pl / risk);
    }
  };

  const resetForm = () => {
    setRiskAmount("");
    setProfitLoss("");
    setResult(null);
  };

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-orange-500/20">
            <Target className="h-5 w-5 text-orange-400" />
          </div>
          R-Multiple Calculator
        </CardTitle>
        <CardDescription>Calculate R-multiples to measure trade performance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="riskAmount">Initial Risk ($)</Label>
            <Input
              id="riskAmount"
              type="number"
              placeholder="100"
              value={riskAmount}
              onChange={(e) => setRiskAmount(e.target.value)}
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profitLoss">Profit/Loss ($)</Label>
            <Input
              id="profitLoss"
              type="number"
              placeholder="200"
              value={profitLoss}
              onChange={(e) => setProfitLoss(e.target.value)}
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

        {result !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-gradient-to-r from-infinity-blue/20 to-infinity-teal/20 border border-infinity-blue/30 text-center"
          >
            <p className="text-sm text-muted-foreground mb-1">R-Multiple</p>
            <p className={`text-4xl font-bold ${result >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {result.toFixed(2)}R
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
