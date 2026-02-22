"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function PivotPointsCalculator() {
  const [high, setHigh] = useState<string>("");
  const [low, setLow] = useState<string>("");
  const [close, setClose] = useState<string>("");
  const [result, setResult] = useState<{ pp: number; r1: number; r2: number; s1: number; s2: number } | null>(null);

  const calculate = () => {
    const h = parseFloat(high);
    const l = parseFloat(low);
    const c = parseFloat(close);
    if (h && l && c) {
      const pp = (h + l + c) / 3;
      const r1 = 2 * pp - l;
      const s1 = 2 * pp - h;
      const r2 = pp + (h - l);
      const s2 = pp - (h - l);
      setResult({ pp, r1, r2, s1, s2 });
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
          <div className="p-2 rounded-lg bg-purple-500/20">
            <GitBranch className="h-5 w-5 text-purple-400" />
          </div>
          Pivot Points Calculator
        </CardTitle>
        <CardDescription>Calculate classic pivot points for support and resistance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="high">High</Label>
            <Input id="high" type="number" placeholder="2500" value={high} onChange={(e) => setHigh(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="low">Low</Label>
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
            <div className="flex justify-between p-3 rounded-lg bg-green-500/10"><span>R2 (Resistance)</span><span className="font-bold text-green-400">{result.r2.toFixed(2)}</span></div>
            <div className="flex justify-between p-3 rounded-lg bg-green-500/5"><span>R1</span><span className="font-semibold text-green-300">{result.r1.toFixed(2)}</span></div>
            <div className="flex justify-between p-3 rounded-lg bg-infinity-blue/20 border border-infinity-blue/30"><span>Pivot Point</span><span className="font-bold text-infinity-blue">{result.pp.toFixed(2)}</span></div>
            <div className="flex justify-between p-3 rounded-lg bg-red-500/5"><span>S1</span><span className="font-semibold text-red-300">{result.s1.toFixed(2)}</span></div>
            <div className="flex justify-between p-3 rounded-lg bg-red-500/10"><span>S2 (Support)</span><span className="font-bold text-red-400">{result.s2.toFixed(2)}</span></div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
