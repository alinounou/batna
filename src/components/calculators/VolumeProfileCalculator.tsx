"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function VolumeProfileCalculator() {
  const [highVolume, setHighVolume] = useState<string>("");
  const [lowVolume, setLowVolume] = useState<string>("");
  const [totalVolume, setTotalVolume] = useState<string>("");
  const [result, setResult] = useState<{ poc: number; vah: number; val: number } | null>(null);

  const calculate = () => {
    const hv = parseFloat(highVolume);
    const lv = parseFloat(lowVolume);
    const tv = parseFloat(totalVolume);
    if (hv && lv && tv) {
      const poc = (hv + lv) / 2;
      const range = hv - lv;
      const vah = hv - range * 0.3;
      const val = lv + range * 0.3;
      setResult({ poc, vah, val });
    }
  };

  const resetForm = () => {
    setHighVolume("");
    setLowVolume("");
    setTotalVolume("");
    setResult(null);
  };

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-orange-500/20">
            <BarChart2 className="h-5 w-5 text-orange-400" />
          </div>
          Volume Profile Calculator
        </CardTitle>
        <CardDescription>Calculate volume profile and value areas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="highVolume">High Volume Node</Label>
            <Input id="highVolume" type="number" placeholder="2500" value={highVolume} onChange={(e) => setHighVolume(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lowVolume">Low Volume Node</Label>
            <Input id="lowVolume" type="number" placeholder="2400" value={lowVolume} onChange={(e) => setLowVolume(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalVolume">Total Volume</Label>
            <Input id="totalVolume" type="number" placeholder="100000" value={totalVolume} onChange={(e) => setTotalVolume(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate} className="bg-infinity-blue hover:bg-infinity-blue/80">Calculate</Button>
          <Button variant="outline" size="sm" onClick={resetForm} className="border-white/10"><RotateCcw className="h-4 w-4 mr-2" />Reset</Button>
        </div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            <div className="flex justify-between p-3 rounded-lg bg-green-500/10"><span>VAH (Value Area High)</span><span className="font-bold text-green-400">{result.vah.toFixed(2)}</span></div>
            <div className="flex justify-between p-3 rounded-lg bg-infinity-blue/20"><span>POC (Point of Control)</span><span className="font-bold text-infinity-blue">{result.poc.toFixed(2)}</span></div>
            <div className="flex justify-between p-3 rounded-lg bg-red-500/10"><span>VAL (Value Area Low)</span><span className="font-bold text-red-400">{result.val.toFixed(2)}</span></div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
