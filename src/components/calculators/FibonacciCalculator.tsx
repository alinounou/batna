"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface FibLevel {
  level: number;
  price: number;
  type: 'retracement' | 'extension';
  label: string;
}

export function FibonacciCalculator() {
  const { t } = useTranslation();
  const [swingHigh, setSwingHigh] = useState<string>("2500");
  const [swingLow, setSwingLow] = useState<string>("2400");
  const [trendDirection, setTrendDirection] = useState<"up" | "down">("up");

  const retracementLevels = [0.236, 0.382, 0.5, 0.618, 0.786];
  const extensionLevels = [1.0, 1.272, 1.618, 2.0, 2.618];

  const calculatedLevels = useMemo(() => {
    const high = parseFloat(swingHigh) || 0;
    const low = parseFloat(swingLow) || 0;
    const diff = high - low;

    if (diff <= 0) return { retracements: [], extensions: [] };

    const retracements: FibLevel[] = retracementLevels.map((level) => ({
      level,
      price: trendDirection === "up"
        ? low + diff * level
        : high - diff * level,
      type: 'retracement',
      label: `${(level * 100).toFixed(1)}%`,
    }));

    const extensions: FibLevel[] = extensionLevels.map((level) => ({
      level,
      price: trendDirection === "up"
        ? low + diff * level
        : high - diff * level,
      type: 'extension',
      label: `${level.toFixed(3)}x`,
    }));

    return { retracements, extensions };
  }, [swingHigh, swingLow, trendDirection]);

  const high = parseFloat(swingHigh) || 0;
  const low = parseFloat(swingLow) || 0;
  const diff = high - low;

  return (
    <Card className="glass-card border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Calculator className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">{t.fib.title}</CardTitle>
            <CardDescription>
              {t.fib.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="swingHigh">{t.fib.swingHigh}</Label>
            <Input
              id="swingHigh"
              type="number"
              value={swingHigh}
              onChange={(e) => setSwingHigh(e.target.value)}
              placeholder="e.g., 2500"
              className="bg-white/5 border-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="swingLow">{t.fib.swingLow}</Label>
            <Input
              id="swingLow"
              type="number"
              value={swingLow}
              onChange={(e) => setSwingLow(e.target.value)}
              placeholder="e.g., 2400"
              className="bg-white/5 border-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="trend">{t.fib.trendDirection}</Label>
            <Select
              value={trendDirection}
              onValueChange={(v) => setTrendDirection(v as "up" | "down")}
            >
              <SelectTrigger className="bg-white/5 border-primary/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="up">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    {t.fib.uptrend}
                  </div>
                </SelectItem>
                <SelectItem value="down">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-red-500" />
                    {t.fib.downtrend}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Info Banner */}
        <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20">
          <TrendingUp className="w-5 h-5 text-primary shrink-0" />
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-medium">{t.fib.swingRange}:</span>{" "}
            {diff.toFixed(2)} points |{" "}
            <span className="text-foreground font-medium">{t.fib.direction}:</span>{" "}
            {trendDirection === "up" ? t.fib.buyDip : t.fib.sellRally}
          </p>
        </div>

        {/* Retracement Levels */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              {t.fib.retracements}
            </Badge>
            {t.fib.retracementsDesc}
          </h4>
          <div className="grid gap-2">
            {calculatedLevels.retracements.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-primary/20 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-16 text-sm font-mono text-primary">
                    {item.label}
                  </span>
                  <div className="w-32 h-2 level-bar-bg">
                    <div
                      className="level-bar-fill bg-gradient-to-r from-primary to-accent-foreground"
                      style={{ width: `${item.level * 100}%` }}
                    />
                  </div>
                </div>
                <span className="font-mono font-semibold text-foreground">
                  {item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Extension Levels */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
              {t.fib.extensions}
            </Badge>
            {t.fib.extensionsDesc}
          </h4>
          <div className="grid gap-2">
            {calculatedLevels.extensions.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-primary/20 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-16 text-sm font-mono text-green-400">
                    {item.label}
                  </span>
                  <div className="w-32 h-2 level-bar-bg">
                    <div
                      className="level-bar-fill bg-gradient-to-r from-green-400 to-emerald-400"
                      style={{ width: `${Math.min((item.level / 3) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <span className="font-mono font-semibold text-foreground">
                  {item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => {
              setSwingHigh("2500");
              setSwingLow("2400");
              setTrendDirection("up");
            }}
            className="gap-2 border-primary/30"
          >
            <RefreshCw className="w-4 h-4" />
            {t.calculators.reset}
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-primary to-accent-foreground">
            {t.fib.addToChart}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
