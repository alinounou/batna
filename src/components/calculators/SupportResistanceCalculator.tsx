"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function SupportResistanceCalculator() {
  const [high, setHigh] = useState<string>("");
  const [low, setLow] = useState<string>("");
  const [close, setClose] = useState<string>("");
  const [result, setResult] = useState<{ resistance: number; support: number; midpoint: number } | null>(null);

  const calculate = () => {
    const h = parseFloat(high);
    const l = parseFloat(low);
    const c = parseFloat(close);
    if (h && l && c) {
      const pivot = (h + l + c) / 3;
      setResult({
        resistance: 2 * pivot - l,
        support: 2 * pivot - h,
        midpoint: pivot
      });
    }
  };

  const resetForm = () => {
    setHigh("");
    setLow("");
    setClose("");
    setResult(null);
  };

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <ArrowUpDown className="h-5 w-5 text-blue-400" />
          </div>
          Support/Resistance Calculator
        </CardTitle>
        <CardDescription>Identify key support and resistance levels</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="high">Period High</Label>
            <Input id="high" type="number" placeholder="2500" value={high} onChange={(e) => setHigh(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="low">Period Low</Label>
            <Input id="low" type="number" placeholder="2400" value={low} onChange={(e) => setLow(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="close">Close</Label>
            <Input id="close" type="number" placeholder="2450" value={close} onChange={(e) => setClose(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate} className="bg-infinity-blue hover:bg-infinity-blue/80">Calculate</Button>
          <Button variant="outline" size="sm" onClick={resetForm} className="border-white/10"><RotateCcw className="h-4 w-4 mr-2" />Reset</Button>
        </div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            <div className="flex justify-between p-3 rounded-lg bg-green-500/10"><span>Resistance</span><span className="font-bold text-green-400">{result.resistance.toFixed(2)}</span></div>
            <div className="flex justify-between p-3 rounded-lg bg-infinity-blue/20"><span>Midpoint</span><span className="font-semibold text-infinity-blue">{result.midpoint.toFixed(2)}</span></div>
            <div className="flex justify-between p-3 rounded-lg bg-red-500/10"><span>Support</span><span className="font-bold text-red-400">{result.support.toFixed(2)}</span></div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
