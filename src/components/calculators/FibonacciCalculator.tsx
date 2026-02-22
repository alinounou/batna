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

interface FibLevel {
  level: number;
  price: number;
  type: 'retracement' | 'extension';
  label: string;
}

export function FibonacciCalculator() {
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
    <Card className="glass-card border-white/10">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Calculator className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Fibonacci Retracement & Extension</CardTitle>
            <CardDescription>
              Calculate Fibonacci levels for support, resistance, and targets
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="swingHigh">Swing High</Label>
            <Input
              id="swingHigh"
              type="number"
              value={swingHigh}
              onChange={(e) => setSwingHigh(e.target.value)}
              placeholder="e.g., 2500"
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="swingLow">Swing Low</Label>
            <Input
              id="swingLow"
              type="number"
              value={swingLow}
              onChange={(e) => setSwingLow(e.target.value)}
              placeholder="e.g., 2400"
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="trend">Trend Direction</Label>
            <Select
              value={trendDirection}
              onValueChange={(v) => setTrendDirection(v as "up" | "down")}
            >
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="up">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    Uptrend
                  </div>
                </SelectItem>
                <SelectItem value="down">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-red-500" />
                    Downtrend
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
            <span className="text-foreground font-medium">Swing Range:</span>{" "}
            {diff.toFixed(2)} points |{" "}
            <span className="text-foreground font-medium">Direction:</span>{" "}
            {trendDirection === "up" ? "Uptrend (Buy Dip)" : "Downtrend (Sell Rally)"}
          </p>
        </div>

        {/* Retracement Levels */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              Retracements
            </Badge>
            Key support/resistance zones
          </h4>
          <div className="grid gap-2">
            {calculatedLevels.retracements.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-16 text-sm font-mono text-primary">
                    {item.label}
                  </span>
                  <div className="w-32 h-2 level-bar-bg">
                    <div
                      className="level-bar-fill bg-gradient-to-r from-primary to-infinity-teal"
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
              Extensions
            </Badge>
            Profit target zones
          </h4>
          <div className="grid gap-2">
            {calculatedLevels.extensions.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-16 text-sm font-mono text-infinity-teal">
                    {item.label}
                  </span>
                  <div className="w-32 h-2 level-bar-bg">
                    <div
                      className="level-bar-fill bg-gradient-to-r from-infinity-teal to-green-400"
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
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-primary to-infinity-teal">
            Add to Chart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
