"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function PositionRiskCalculator() {
  const [accountSize, setAccountSize] = useState<string>("");
  const [positions, setPositions] = useState<string>("");
  const [riskPerPosition, setRiskPerPosition] = useState<string>("");
  const [result, setResult] = useState<{ totalRisk: number; totalRiskPercent: number; perPosition: number } | null>(null);

  const calculate = () => {
    const account = parseFloat(accountSize);
    const pos = parseFloat(positions);
    const risk = parseFloat(riskPerPosition);
    if (account && pos && risk) {
      const totalRisk = pos * risk;
      const totalRiskPercent = (totalRisk / account) * 100;
      setResult({ totalRisk, totalRiskPercent, perPosition: risk });
    }
  };

  const resetForm = () => {
    setAccountSize("");
    setPositions("");
    setRiskPerPosition("");
    setResult(null);
  };

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-500/20">
            <Shield className="h-5 w-5 text-emerald-400" />
          </div>
          Position Risk Calculator
        </CardTitle>
        <CardDescription>Calculate risk per position and portfolio</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="accountSize">Account Size ($)</Label>
            <Input id="accountSize" type="number" placeholder="10000" value={accountSize} onChange={(e) => setAccountSize(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="positions">Number of Positions</Label>
            <Input id="positions" type="number" placeholder="5" value={positions} onChange={(e) => setPositions(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="riskPerPosition">Risk per Position ($)</Label>
            <Input id="riskPerPosition" type="number" placeholder="100" value={riskPerPosition} onChange={(e) => setRiskPerPosition(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate} className="bg-infinity-blue hover:bg-infinity-blue/80">Calculate</Button>
          <Button variant="outline" size="sm" onClick={resetForm} className="border-white/10"><RotateCcw className="h-4 w-4 mr-2" />Reset</Button>
        </div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div className="p-4 rounded-lg bg-infinity-blue/20 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Portfolio Risk</p>
              <p className="text-2xl font-bold text-infinity-blue">${result.totalRisk.toFixed(2)}</p>
            </div>
            <div className={`p-4 rounded-lg ${result.totalRiskPercent > 6 ? 'bg-red-500/20' : 'bg-infinity-teal/20'} text-center`}>
              <p className="text-sm text-muted-foreground mb-1">Risk Percentage</p>
              <p className={`text-2xl font-bold ${result.totalRiskPercent > 6 ? 'text-red-400' : 'text-infinity-teal'}`}>{result.totalRiskPercent.toFixed(2)}%</p>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
