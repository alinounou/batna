"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function PositionSizeCalculator() {
  const { t } = useTranslation();
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
    if (risk <= 1) return { label: t.positionSize.conservative, color: "text-green-500", bg: "bg-green-500/20" };
    if (risk <= 2) return { label: t.positionSize.moderate, color: "text-yellow-500", bg: "bg-yellow-500/20" };
    if (risk <= 3) return { label: t.positionSize.aggressive, color: "text-orange-500", bg: "bg-orange-500/20" };
    return { label: t.positionSize.highRisk, color: "text-red-500", bg: "bg-red-500/20" };
  };

  const riskLevel = getRiskLevel(parseFloat(riskPercent) || 0);

  return (
    <Card className="glass-card border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Calculator className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">{t.positionSize.title}</CardTitle>
            <CardDescription>
              {t.positionSize.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="accountSize">{t.positionSize.accountSize}</Label>
            <Input
              id="accountSize"
              type="number"
              value={accountSize}
              onChange={(e) => setAccountSize(e.target.value)}
              placeholder="e.g., 10000"
              className="bg-white/5 border-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="riskPercent">{t.positionSize.riskPerTrade}</Label>
            <Input
              id="riskPercent"
              type="number"
              step="0.1"
              value={riskPercent}
              onChange={(e) => setRiskPercent(e.target.value)}
              placeholder="e.g., 2"
              className="bg-white/5 border-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stopLossPips">{t.positionSize.stopLossPips}</Label>
            <Input
              id="stopLossPips"
              type="number"
              value={stopLossPips}
              onChange={(e) => setStopLossPips(e.target.value)}
              placeholder="e.g., 50"
              className="bg-white/5 border-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pipValue">{t.positionSize.pipValue}</Label>
            <Input
              id="pipValue"
              type="number"
              step="0.01"
              value={pipValue}
              onChange={(e) => setPipValue(e.target.value)}
              placeholder="e.g., 10"
              className="bg-white/5 border-primary/20"
            />
          </div>
        </div>

        {/* Risk Level Indicator */}
        <div className={`flex items-center gap-3 p-4 rounded-lg ${riskLevel.bg} border border-primary/20`}>
          <AlertTriangle className={`w-5 h-5 ${riskLevel.color}`} />
          <div>
            <p className="font-medium">{t.positionSize.riskLevel}: {riskLevel.label}</p>
            <p className="text-sm text-muted-foreground">
              {parseFloat(riskPercent) <= 2
                ? t.positionSize.recommended
                : t.positionSize.higherRisk}
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Position Size Card */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">{t.positionSize.positionSize}</span>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {result.positionSize.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{t.positionSize.lotsContracts}</p>
          </div>

          {/* Risk Amount Card */}
          <div className="p-6 rounded-xl bg-white/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                Risk
              </Badge>
              <span className="text-sm text-muted-foreground">{t.positionSize.dollarRisk}</span>
            </div>
            <p className="text-3xl font-bold text-foreground">
              ${result.riskAmount.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {riskPercent}% {t.positionSize.ofAccount} (${parseFloat(accountSize).toLocaleString()})
            </p>
          </div>
        </div>

        {/* Formula Explanation */}
        <div className="p-4 rounded-lg bg-white/5 border border-primary/20">
          <h4 className="font-semibold mb-2 text-sm">{t.calculators.formula}</h4>
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
            className="gap-2 border-primary/30"
          >
            <RefreshCw className="w-4 h-4" />
            {t.calculators.reset}
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-primary to-accent-foreground">
            {t.positionSize.saveToJournal}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
