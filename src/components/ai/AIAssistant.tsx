'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Bot,
  User,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Lightbulb,
  Target,
  Shield,
  RefreshCw,
  Copy,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  analysis?: TradeAnalysis;
}

interface TradeAnalysis {
  bias: string;
  riskScore: number;
  probability: number;
  confidence: number;
  keyLevels: {
    entry: string;
    stopLoss: string;
    takeProfit: string;
  };
  sentiment: {
    overall: string;
    strength: number;
  };
  mistakes: string[];
}

const suggestedQuestions = [
  "What's the current outlook for EUR/USD?",
  "Analyze gold support and resistance levels",
  "Best entry strategy for GBP/USD today?",
  "How to manage risk in volatile markets?",
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        analysis: data.tradeAnalysis ? {
          bias: data.tradeAnalysis.bias,
          riskScore: data.tradeAnalysis.riskScore,
          probability: data.tradeAnalysis.probability,
          confidence: data.tradeAnalysis.confidence,
          keyLevels: data.keyLevels,
          sentiment: data.sentiment,
          mistakes: data.mistakes,
        } : undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getBiasIcon = (bias: string) => {
    switch (bias) {
      case 'Bullish':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'Bearish':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="glass-card rounded-xl h-[700px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">AI Trading Assistant</h3>
            <p className="text-xs text-muted-foreground">Powered by Infinity Algo</p>
          </div>
          <Badge className="ml-auto bg-green-500/20 text-green-400 border-green-500/30">Online</Badge>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
              <Bot className="w-10 h-10 text-blue-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">How can I help you today?</h4>
            <p className="text-sm text-muted-foreground mb-6 max-w-md">
              Ask me about technical analysis, trading strategies, risk management, or market insights.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start text-left h-auto py-2 px-3 bg-white/5 border-white/10 hover:bg-white/10"
                  onClick={() => sendMessage(question)}
                >
                  <span className="text-sm text-muted-foreground truncate">{question}</span>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                    <Card className="bg-white/5 border-white/10 inline-block max-w-[85%] text-left">
                      <CardContent className="p-3">
                        <p className="text-sm text-white whitespace-pre-wrap">{message.content}</p>
                        {message.analysis && (
                          <div className="mt-4 space-y-3">
                            {/* Trade Analysis Card */}
                            <div className="bg-white/5 rounded-lg p-3 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">Market Bias</span>
                                <div className="flex items-center gap-1">
                                  {getBiasIcon(message.analysis.bias)}
                                  <span className="text-sm font-medium text-white">
                                    {message.analysis.bias}
                                  </span>
                                </div>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="text-center">
                                  <div className="text-lg font-bold text-blue-400">
                                    {message.analysis.probability}%
                                  </div>
                                  <div className="text-xs text-muted-foreground">Probability</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-bold text-amber-400">
                                    {message.analysis.riskScore}/10
                                  </div>
                                  <div className="text-xs text-muted-foreground">Risk</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-bold text-green-400">
                                    {message.analysis.confidence}%
                                  </div>
                                  <div className="text-xs text-muted-foreground">Confidence</div>
                                </div>
                              </div>
                            </div>

                            {/* Key Levels */}
                            <div className="grid grid-cols-3 gap-2">
                              <div className="bg-blue-500/10 rounded-lg p-2 text-center">
                                <div className="text-xs text-blue-400 mb-1">Entry</div>
                                <div className="text-sm font-mono text-white">
                                  {message.analysis.keyLevels.entry}
                                </div>
                              </div>
                              <div className="bg-red-500/10 rounded-lg p-2 text-center">
                                <div className="text-xs text-red-400 mb-1">Stop Loss</div>
                                <div className="text-sm font-mono text-white">
                                  {message.analysis.keyLevels.stopLoss}
                                </div>
                              </div>
                              <div className="bg-green-500/10 rounded-lg p-2 text-center">
                                <div className="text-xs text-green-400 mb-1">Take Profit</div>
                                <div className="text-sm font-mono text-white">
                                  {message.analysis.keyLevels.takeProfit}
                                </div>
                              </div>
                            </div>

                            {/* Mistakes Alert */}
                            <div className="bg-amber-500/10 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="w-4 h-4 text-amber-400" />
                                <span className="text-xs font-medium text-amber-400">
                                  Common Mistakes to Avoid
                                </span>
                              </div>
                              <ul className="text-xs text-muted-foreground space-y-1">
                                {message.analysis.mistakes.map((mistake, i) => (
                                  <li key={i}>• {mistake}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2"
                            onClick={() => copyToClipboard(message.content, message.id)}
                          >
                            {copiedId === message.id ? (
                              <Check className="w-3 h-3 text-green-400" />
                            ) : (
                              <Copy className="w-3 h-3 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
                      <span className="text-sm text-muted-foreground">Analyzing...</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about trading strategies, analysis, or market insights..."
            className="flex-1 bg-white/5 border-white/10 focus:border-blue-500"
            disabled={isLoading}
          />
          <Button type="submit" className="btn-primary" disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <div className="flex items-center justify-center gap-4 mt-3">
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            <Target className="w-3 h-3 mr-1" />
            Trade Setup
          </Button>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            <Shield className="w-3 h-3 mr-1" />
            Risk Check
          </Button>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            <Lightbulb className="w-3 h-3 mr-1" />
            Strategy Ideas
          </Button>
        </div>
      </div>
    </div>
  );
}
