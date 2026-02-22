"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function CorrelationCalculator() {
  const [asset1Returns, setAsset1Returns] = useState<string>("");
  const [asset2Returns, setAsset2Returns] = useState<string>("");
  const [result, setResult] = useState<{ correlation: number; strength: string } | null>(null);

  const calculate = () => {
    const r1 = asset1Returns.split(",").map(Number).filter(n => !isNaN(n));
    const r2 = asset2Returns.split(",").map(Number).filter(n => !isNaN(n));
    
    if (r1.length === r2.length && r1.length > 1) {
      const mean1 = r1.reduce((a, b) => a + b, 0) / r1.length;
      const mean2 = r2.reduce((a, b) => a + b, 0) / r2.length;
      
      let numerator = 0;
      let denom1 = 0;
      let denom2 = 0;
      
      for (let i = 0; i < r1.length; i++) {
        const d1 = r1[i] - mean1;
        const d2 = r2[i] - mean2;
        numerator += d1 * d2;
        denom1 += d1 * d1;
        denom2 += d2 * d2;
      }
      
      const correlation = numerator / Math.sqrt(denom1 * denom2);
      let strength = "None";
      const abs = Math.abs(correlation);
      if (abs > 0.8) strength = "Very Strong";
      else if (abs > 0.6) strength = "Strong";
      else if (abs > 0.4) strength = "Moderate";
      else if (abs > 0.2) strength = "Weak";
      
      setResult({ correlation, strength });
    }
  };

  const resetForm = () => {
    setAsset1Returns("");
    setAsset2Returns("");
    setResult(null);
  };

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-pink-500/20">
            <Link2 className="h-5 w-5 text-pink-400" />
          </div>
          Correlation Calculator
        </CardTitle>
        <CardDescription>Calculate correlation between trading instruments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="asset1">Asset 1 Returns (comma-separated)</Label>
            <Input id="asset1" placeholder="1.2, -0.5, 2.1, 0.8, -1.0" value={asset1Returns} onChange={(e) => setAsset1Returns(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="asset2">Asset 2 Returns (comma-separated)</Label>
            <Input id="asset2" placeholder="0.8, -0.3, 1.5, 0.5, -0.7" value={asset2Returns} onChange={(e) => setAsset2Returns(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate} className="bg-infinity-blue hover:bg-infinity-blue/80">Calculate</Button>
          <Button variant="outline" size="sm" onClick={resetForm} className="border-white/10"><RotateCcw className="h-4 w-4 mr-2" />Reset</Button>
        </div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-xl bg-gradient-to-r from-infinity-blue/20 to-infinity-teal/20 border border-infinity-blue/30 text-center">
            <p className="text-sm text-muted-foreground mb-1">Correlation Coefficient</p>
            <p className={`text-4xl font-bold ${result.correlation >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {result.correlation.toFixed(3)}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Strength: <span className="text-infinity-blue font-semibold">{result.strength}</span></p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
