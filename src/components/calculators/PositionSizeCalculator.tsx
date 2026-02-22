"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";

export function PositionSizeCalculator() {
  const [accountSize, setAccountSize] = useState<string>("10000");
  const [riskPercent, setRiskPercent] = useState<string>("2");
  const [stopLossPips, setStopLossPips] = useState<string>("50");
  const [pipValue, setPipValue] = useState<string>("10");

  const result = useMemo(() => {
    const account = parseFloat(accountSize) || 0;
    const risk = parseFloat(riskPercent) || 0;
    const slPips = parseFloat(stopLossPips) || 0;
    const pipVal = parseFloat(pipValue) || 0;

    const riskAmount = (account * risk) / 100;
    const positionSize = slPips > 0 && pipVal > 0 
      ? riskAmount / (slPips * pipVal)
      : 0;

    return {
      positionSize,
      riskAmount,
      isValid: positionSize > 0 && riskAmount > 0,
    };
  }, [accountSize, riskPercent, stopLossPips, pipValue]);

  const getRiskLevel = (risk: number) => {
    if (risk <= 1) return { label: "Conservative", color: "text-green-500", bg: "bg-green-500/20" };
    if (risk <= 2) return { label: "Moderate", color: "text-yellow-500", bg: "bg-yellow-500/20" };
    if (risk <= 3) return { label: "Aggressive", color: "text-orange-500", bg: "bg-orange-500/20" };
    return { label: "High Risk", color: "text-red-500", bg: "bg-red-500/20" };
  };

  const riskLevel = getRiskLevel(parseFloat(riskPercent) || 0);

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Calculator className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Position Size Calculator</CardTitle>
            <CardDescription>
              Calculate optimal position size based on your risk parameters
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="accountSize">Account Size ($)</Label>
            <Input
              id="accountSize"
              type="number"
              value={accountSize}
              onChange={(e) => setAccountSize(e.target.value)}
              placeholder="e.g., 10000"
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="riskPercent">Risk per Trade (%)</Label>
            <Input
              id="riskPercent"
              type="number"
              step="0.1"
              value={riskPercent}
              onChange={(e) => setRiskPercent(e.target.value)}
              placeholder="e.g., 2"
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stopLossPips">Stop Loss (Pips/Points)</Label>
            <Input
              id="stopLossPips"
              type="number"
              value={stopLossPips}
              onChange={(e) => setStopLossPips(e.target.value)}
              placeholder="e.g., 50"
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pipValue">Pip Value ($)</Label>
            <Input
              id="pipValue"
              type="number"
              step="0.01"
              value={pipValue}
              onChange={(e) => setPipValue(e.target.value)}
              placeholder="e.g., 10"
              className="bg-white/5 border-white/10"
            />
          </div>
        </div>

        {/* Risk Level Indicator */}
        <div className={`flex items-center gap-3 p-4 rounded-lg ${riskLevel.bg} border border-white/10`}>
          <AlertTriangle className={`w-5 h-5 ${riskLevel.color}`} />
          <div>
            <p className="font-medium">Risk Level: {riskLevel.label}</p>
            <p className="text-sm text-muted-foreground">
              {parseFloat(riskPercent) <= 2
                ? "Recommended for consistent long-term growth"
                : "Higher risk may lead to significant drawdowns"}
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Position Size Card */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-primary/20 to-infinity-teal/20 border border-primary/30">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Position Size</span>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {result.positionSize.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">lots/contracts</p>
          </div>

          {/* Risk Amount Card */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                Risk
              </Badge>
              <span className="text-sm text-muted-foreground">Dollar Risk</span>
            </div>
            <p className="text-3xl font-bold text-foreground">
              ${result.riskAmount.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {riskPercent}% of ${parseFloat(accountSize).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Formula Explanation */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <h4 className="font-semibold mb-2 text-sm">Formula</h4>
          <code className="text-xs text-muted-foreground block">
            Position Size = (Account × Risk%) ÷ (Stop Loss Pips × Pip Value)
          </code>
          <code className="text-xs text-primary block mt-1">
            = (${accountSize} × {riskPercent}%) ÷ ({stopLossPips} × ${pipValue})
          </code>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => {
              setAccountSize("10000");
              setRiskPercent("2");
              setStopLossPips("50");
              setPipValue("10");
            }}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-primary to-infinity-teal">
            Save to Journal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
