"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function BreakEvenCalculator() {
  const [entryPrice, setEntryPrice] = useState<string>("");
  const [commission, setCommission] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const entry = parseFloat(entryPrice);
    const comm = parseFloat(commission) || 0;
    if (entry) {
      setResult(entry + comm);
    }
  };

  const resetForm = () => {
    setEntryPrice("");
    setCommission("");
    setResult(null);
  };

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gray-500/20">
            <Minus className="h-5 w-5 text-gray-400" />
          </div>
          Break-Even Calculator
        </CardTitle>
        <CardDescription>Calculate break-even price including costs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="entryPrice">Entry Price</Label>
            <Input
              id="entryPrice"
              type="number"
              placeholder="100"
              value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)}
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="commission">Commission/Fees ($)</Label>
            <Input
              id="commission"
              type="number"
              placeholder="5"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
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
            <p className="text-sm text-muted-foreground mb-1">Break-Even Price</p>
            <p className="text-4xl font-bold text-infinity-blue">${result.toFixed(2)}</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
