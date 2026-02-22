"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Percent, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function MarginLeverageCalculator() {
  const [positionSize, setPositionSize] = useState<string>("");
  const [leverage, setLeverage] = useState<string>("");
  const [result, setResult] = useState<{ margin: number; effectiveLeverage: number } | null>(null);

  const calculate = () => {
    const position = parseFloat(positionSize);
    const lev = parseFloat(leverage);
    if (position && lev) {
      setResult({ margin: position / lev, effectiveLeverage: lev });
    }
  };

  const resetForm = () => {
    setPositionSize("");
    setLeverage("");
    setResult(null);
  };

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-yellow-500/20">
            <Percent className="h-5 w-5 text-yellow-400" />
          </div>
          Margin & Leverage Calculator
        </CardTitle>
        <CardDescription>Calculate required margin for leveraged positions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="positionSize">Position Size ($)</Label>
            <Input id="positionSize" type="number" placeholder="100000" value={positionSize} onChange={(e) => setPositionSize(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="leverage">Leverage (1:X)</Label>
            <Input id="leverage" type="number" placeholder="100" value={leverage} onChange={(e) => setLeverage(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate} className="bg-infinity-blue hover:bg-infinity-blue/80">Calculate</Button>
          <Button variant="outline" size="sm" onClick={resetForm} className="border-white/10"><RotateCcw className="h-4 w-4 mr-2" />Reset</Button>
        </div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-xl bg-gradient-to-r from-infinity-blue/20 to-infinity-teal/20 border border-infinity-blue/30 text-center">
            <p className="text-sm text-muted-foreground mb-1">Required Margin</p>
            <p className="text-4xl font-bold text-infinity-blue">${result.margin.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-2">Effective Leverage: <span className="text-infinity-teal font-semibold">1:{result.effectiveLeverage}</span></p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
