"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const sessions = {
  sydney: { name: "Sydney", open: "17:00", close: "02:00" },
  tokyo: { name: "Tokyo", open: "19:00", close: "04:00" },
  london: { name: "London", open: "03:00", close: "12:00" },
  newyork: { name: "New York", open: "08:00", close: "17:00" },
};

export function SessionRangeCalculator() {
  const [symbol, setSymbol] = useState<string>("");
  const [session, setSession] = useState<string>("");
  const [result, setResult] = useState<{ name: string; open: string; close: string } | null>(null);

  const calculate = () => {
    if (session && sessions[session as keyof typeof sessions]) {
      const s = sessions[session as keyof typeof sessions];
      setResult({ name: s.name, open: s.open, close: s.close });
    }
  };

  const resetForm = () => {
    setSymbol("");
    setSession("");
    setResult(null);
  };

  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-cyan-500/20">
            <Globe className="h-5 w-5 text-cyan-400" />
          </div>
          Session Range Calculator
        </CardTitle>
        <CardDescription>Calculate trading session ranges and overlaps</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="symbol">Symbol (Optional)</Label>
            <Input id="symbol" placeholder="XAUUSD" value={symbol} onChange={(e) => setSymbol(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="session">Session</Label>
            <Select value={session} onValueChange={setSession}>
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue placeholder="Select session" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sydney">Sydney</SelectItem>
                <SelectItem value="tokyo">Tokyo</SelectItem>
                <SelectItem value="london">London</SelectItem>
                <SelectItem value="newyork">New York</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate} className="bg-infinity-blue hover:bg-infinity-blue/80">Calculate</Button>
          <Button variant="outline" size="sm" onClick={resetForm} className="border-white/10"><RotateCcw className="h-4 w-4 mr-2" />Reset</Button>
        </div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-xl bg-gradient-to-r from-infinity-blue/20 to-infinity-teal/20 border border-infinity-blue/30 text-center">
            <p className="text-sm text-muted-foreground mb-1">{result.name} Session</p>
            <p className="text-2xl font-bold text-infinity-blue">{result.open} - {result.close} EST</p>
            <p className="text-sm text-muted-foreground mt-2">Times shown in EST timezone</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
