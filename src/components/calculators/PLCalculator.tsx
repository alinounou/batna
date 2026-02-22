"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function PLCalculator() {
  const [entryPrice, setEntryPrice] = useState<string>("");
  const [exitPrice, setExitPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [result, setResult] = useState<{ pl: number; plPercent: number } | null>(null);

  const calculate = () => {
    const entry = parseFloat(entryPrice);
    const exit = parseFloat(exitPrice);
    const qty = parseFloat(quantity);
    if (entry && exit && qty) {
      const pl = (exit - entry) * qty;
      const plPercent = ((exit - entry) / entry) * 100;
      setResult({ pl, plPercent });
    }
  };

  const resetForm = () => {
    setEntryPrice("");
    setExitPrice("");
    setQuantity("");
    setResult(null);
  };

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-500/20">
            <BarChart3 className="h-5 w-5 text-indigo-400" />
          </div>
          P/L Calculator
        </CardTitle>
        <CardDescription>Calculate profit or loss for any trade</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="entryPrice">Entry Price</Label>
            <Input id="entryPrice" type="number" placeholder="100" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="exitPrice">Exit Price</Label>
            <Input id="exitPrice" type="number" placeholder="110" value={exitPrice} onChange={(e) => setExitPrice(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" type="number" placeholder="100" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate} className="bg-infinity-blue hover:bg-infinity-blue/80">Calculate</Button>
          <Button variant="outline" size="sm" onClick={resetForm} className="border-white/10"><RotateCcw className="h-4 w-4 mr-2" />Reset</Button>
        </div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-xl bg-gradient-to-r from-infinity-blue/20 to-infinity-teal/20 border border-infinity-blue/30 text-center">
            <p className="text-sm text-muted-foreground mb-1">Profit/Loss</p>
            <p className={`text-4xl font-bold ${result.pl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {result.pl >= 0 ? '+' : ''}{result.pl.toLocaleString(undefined, { maximumFractionDigits: 2 })}$
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Return: <span className={`font-semibold ${result.plPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {result.plPercent >= 0 ? '+' : ''}{result.plPercent.toFixed(2)}%
              </span>
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
