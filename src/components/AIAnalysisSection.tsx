"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Brain, Loader2, TrendingUp, TrendingDown, Target, AlertTriangle, Sparkles, ExternalLink } from "lucide-react";

interface AIResult {
  bias: "bullish" | "bearish" | "neutral";
  keyLevels: Array<{ price: number; type: string; strength: number }>;
  scenarios: string[];
  riskNote: string;
  confidence: number;
}

export function AIAnalysisSection() {
  const [market, setMarket] = useState("forex");
  const [symbol, setSymbol] = useState("XAUUSD");
  const [timeframe, setTimeframe] = useState("H1");
  const [highLevel, setHighLevel] = useState("");
  const [lowLevel, setLowLevel] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIResult | null>(null);

  const handleAnalyze = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Mock response
    const mockResult: AIResult = {
      bias: Math.random() > 0.5 ? "bullish" : "bearish",
      keyLevels: [
        { price: parseFloat(highLevel) || 2500, type: "resistance", strength: 85 },
        { price: parseFloat(lowLevel) || 2450, type: "support", strength: 78 },
        { price: 2480, type: "pivot", strength: 65 },
      ],
      scenarios: [
        `IF price breaks above ${parseFloat(highLevel) || 2500} with volume THEN target ${(parseFloat(highLevel) || 2500) + 30}`,
        `IF price holds above ${parseFloat(lowLevel) || 2450} THEN look for long entries near ${parseFloat(lowLevel) || 2450 + 10}`,
        `Watch for rejection at 2480 level for potential reversal`,
      ],
      riskNote: "Monitor USD economic calendar for high-impact events. Current volatility suggests using wider stops.",
      confidence: 72 + Math.floor(Math.random() * 20),
    };
    
    setResult(mockResult);
    setIsLoading(false);
  };

  const getBiasColor = (bias: string) => {
    switch (bias) {
      case "bullish":
        return "text-green-500 bg-green-500/20 border-green-500/30";
      case "bearish":
        return "text-red-500 bg-red-500/20 border-red-500/30";
      default:
        return "text-yellow-500 bg-yellow-500/20 border-yellow-500/30";
    }
  };

  return (
    <section id="ai" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI Market Analysis
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get intelligent market insights powered by advanced AI. Analyze any symbol,
            timeframe, and scenario with natural language prompts.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <CardTitle>Analysis Parameters</CardTitle>
                  <CardDescription>
                    Configure your market analysis request
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Market & Symbol Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Market</Label>
                  <Select value={market} onValueChange={setMarket}>
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="forex">Forex</SelectItem>
                      <SelectItem value="crypto">Crypto</SelectItem>
                      <SelectItem value="stocks">Stocks</SelectItem>
                      <SelectItem value="commodities">Commodities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Symbol</Label>
                  <Input
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    placeholder="e.g., XAUUSD"
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>

              {/* Timeframe & Levels Row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Timeframe</Label>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M15">M15</SelectItem>
                      <SelectItem value="H1">H1</SelectItem>
                      <SelectItem value="H4">H4</SelectItem>
                      <SelectItem value="D1">D1</SelectItem>
                      <SelectItem value="W1">W1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>High Level</Label>
                  <Input
                    type="number"
                    value={highLevel}
                    onChange={(e) => setHighLevel(e.target.value)}
                    placeholder="2500"
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Low Level</Label>
                  <Input
                    type="number"
                    value={lowLevel}
                    onChange={(e) => setLowLevel(e.target.value)}
                    placeholder="2450"
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>

              {/* Prompt */}
              <div className="space-y-2">
                <Label>Your Question</Label>
                <Textarea
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder="e.g., What's the best entry point for a long position? Should I wait for a pullback?"
                  className="bg-white/5 border-white/10 min-h-[100px] resize-none"
                />
              </div>

              {/* Analyze Button */}
              <Button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-primary hover:opacity-90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Analyze Market
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Analysis Results
                {result && (
                  <Badge variant="outline" className={getBiasColor(result.bias)}>
                    {result.bias === "bullish" ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    {result.bias.toUpperCase()}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                {result
                  ? `Confidence: ${result.confidence}%`
                  : "Results will appear here after analysis"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!result ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Brain className="w-16 h-16 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">
                    Configure your analysis and click "Analyze Market"
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Key Levels */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      Key Levels
                    </h4>
                    <div className="space-y-2">
                      {result.keyLevels.map((level, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                        >
                          <div className="flex items-center gap-3">
                            <Badge
                              variant="outline"
                              className={
                                level.type === "resistance"
                                  ? "bg-red-500/20 text-red-400"
                                  : level.type === "support"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }
                            >
                              {level.type}
                            </Badge>
                            <span className="font-mono font-semibold">
                              {level.price.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 level-bar-bg">
                              <div
                                className="level-bar-fill bg-gradient-to-r from-primary to-infinity-teal"
                                style={{ width: `${level.strength}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {level.strength}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scenarios */}
                  <div>
                    <h4 className="font-semibold mb-3">Trading Scenarios</h4>
                    <ul className="space-y-2">
                      {result.scenarios.map((scenario, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-primary mt-1">→</span>
                          {scenario}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Risk Note */}
                  <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-500 mb-1">Risk Note</h4>
                        <p className="text-sm text-muted-foreground">{result.riskNote}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 rounded-lg bg-white/5 border border-white/10 text-center">
          <p className="text-xs text-muted-foreground">
            <strong>Disclaimer:</strong> This AI analysis is for educational purposes only and should not be
            considered financial advice. Always do your own research and consult with a qualified financial
            advisor before making trading decisions. Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </section>
  );
}
