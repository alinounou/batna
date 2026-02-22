"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalculatorConfig } from "@/config/calculators";
import { Calculator, RefreshCw, TrendingUp } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface CalculatorStubProps {
  config: CalculatorConfig;
}

export function CalculatorStub({ config }: CalculatorStubProps) {
  const { t } = useTranslation();
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleCalculate = () => {
    // Mock calculation
    const val1 = parseFloat(input1) || 0;
    const val2 = parseFloat(input2) || 0;
    const val3 = parseFloat(input3) || 1;
    
    // Different mock results based on calculator type
    let mockResult = "0.00";
    switch (config.id) {
      case "risk-reward":
        mockResult = val2 > 0 ? (val1 / val2).toFixed(2) : "0.00";
        break;
      case "r-multiple":
        mockResult = val2 > 0 ? ((val1 - val2) / val2).toFixed(2) : "0.00";
        break;
      case "pnl":
        mockResult = ((val1 * val2) - (val1 * val3)).toFixed(2);
        break;
      default:
        mockResult = ((val1 * val2) / val3).toFixed(2);
    }
    setResult(mockResult);
  };

  const getInputLabels = () => {
    switch (config.category) {
      case "risk":
        return ["Entry Price", "Stop Loss", "Take Profit"];
      case "position":
        return ["Account Size", "Risk %", "Stop Loss (pips)"];
      case "technical":
        return ["High Price", "Low Price", "Period"];
      case "performance":
        return ["Win Rate %", "Avg Win", "Avg Loss"];
      default:
        return ["Value 1", "Value 2", "Value 3"];
    }
  };

  const labels = getInputLabels();

  return (
    <Card className="glass-card border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Calculator className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">{config.name}</CardTitle>
            <CardDescription>{config.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="input1">{labels[0]}</Label>
            <Input
              id="input1"
              type="number"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              placeholder={`Enter ${labels[0].toLowerCase()}`}
              className="bg-white/5 border-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="input2">{labels[1]}</Label>
            <Input
              id="input2"
              type="number"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
              placeholder={`Enter ${labels[1].toLowerCase()}`}
              className="bg-white/5 border-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="input3">{labels[2]}</Label>
            <Input
              id="input3"
              type="number"
              value={input3}
              onChange={(e) => setInput3(e.target.value)}
              placeholder={`Enter ${labels[2].toLowerCase()}`}
              className="bg-white/5 border-primary/20"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <Button
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-primary to-accent-foreground"
        >
          {t.calculators.calculate}
        </Button>

        {/* Results */}
        {result && (
          <div className="p-6 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">{t.calculators.result}</span>
            </div>
            <p className="text-4xl font-bold text-foreground">{result}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Calculated based on your inputs
            </p>
          </div>
        )}

        {/* Info */}
        <div className="p-4 rounded-lg bg-white/5 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              Pro Tip
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {config.description}. Use this calculator to make informed trading decisions
            and manage your risk effectively.
          </p>
        </div>

        {/* Reset */}
        <Button
          variant="outline"
          onClick={() => {
            setInput1("");
            setInput2("");
            setInput3("");
            setResult(null);
          }}
          className="gap-2 border-primary/30"
        >
          <RefreshCw className="w-4 h-4" />
          {t.calculators.reset}
        </Button>
      </CardContent>
    </Card>
  );
}
