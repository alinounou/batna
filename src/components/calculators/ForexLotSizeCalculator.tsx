"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function ForexLotSizeCalculator() {
  const [accountBalance, setAccountBalance] = useState<string>("");
  const [riskPercent, setRiskPercent] = useState<string>("");
  const [stopLossPips, setStopLossPips] = useState<string>("");
  const [pipValue, setPipValue] = useState<string>("10");
  const [result, setResult] = useState<{ lots: number; miniLots: number; microLots: number } | null>(null);

  const calculate = () => {
    const balance = parseFloat(accountBalance);
    const risk = parseFloat(riskPercent);
    const sl = parseFloat(stopLossPips);
    const pip = parseFloat(pipValue);
    if (balance && risk && sl && pip) {
      const riskAmount = (balance * risk) / 100;
      const lotSize = riskAmount / (sl * pip);
      setResult({ lots: lotSize / 100000, miniLots: lotSize / 10000, microLots: lotSize / 1000 });
    }
  };

  const resetForm = () => {
    setAccountBalance("");
    setRiskPercent("");
    setStopLossPips("");
    setPipValue("10");
    setResult(null);
  };

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-500/20">
            <DollarSign className="h-5 w-5 text-emerald-400" />
          </div>
          Forex Lot Size Calculator
        </CardTitle>
        <CardDescription>Calculate lot sizes for Forex trading</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="accountBalance">Account Balance ($)</Label>
            <Input id="accountBalance" type="number" placeholder="10000" value={accountBalance} onChange={(e) => setAccountBalance(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="riskPercent">Risk %</Label>
            <Input id="riskPercent" type="number" placeholder="1" value={riskPercent} onChange={(e) => setRiskPercent(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stopLossPips">Stop Loss (Pips)</Label>
            <Input id="stopLossPips" type="number" placeholder="50" value={stopLossPips} onChange={(e) => setStopLossPips(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pipValue">Pip Value ($)</Label>
            <Input id="pipValue" type="number" placeholder="10" value={pipValue} onChange={(e) => setPipValue(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate} className="bg-infinity-blue hover:bg-infinity-blue/80">Calculate</Button>
          <Button variant="outline" size="sm" onClick={resetForm} className="border-white/10"><RotateCcw className="h-4 w-4 mr-2" />Reset</Button>
        </div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-lg bg-white/5 text-center">
              <p className="text-xs text-muted-foreground mb-1">Standard Lots</p>
              <p className="text-xl font-bold text-infinity-blue">{result.lots.toFixed(4)}</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 text-center">
              <p className="text-xs text-muted-foreground mb-1">Mini Lots</p>
              <p className="text-xl font-bold text-infinity-teal">{result.miniLots.toFixed(2)}</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 text-center">
              <p className="text-xs text-muted-foreground mb-1">Micro Lots</p>
              <p className="text-xl font-bold text-infinity-warning">{result.microLots.toFixed(1)}</p>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
