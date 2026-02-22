'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Plus,
  TrendingUp,
  TrendingDown,
  Calendar,
  Image as ImageIcon,
  Save,
  X,
  Filter,
  Search,
  BarChart3,
  Target,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface JournalEntry {
  id: string;
  date: string;
  symbol: string;
  type: 'long' | 'short';
  entryPrice: number;
  exitPrice: number;
  lotSize: number;
  pnl: number;
  emotions: string;
  strategy: string;
  notes: string;
  lessons: string;
  tags: string[];
}

const mockEntries: JournalEntry[] = [
  {
    id: '1',
    date: '2024-01-15',
    symbol: 'EUR/USD',
    type: 'long',
    entryPrice: 1.0845,
    exitPrice: 1.0878,
    lotSize: 0.5,
    pnl: 165,
    emotions: 'Confident, patient',
    strategy: 'Breakout + SMC',
    notes: 'Perfect entry on retest of broken resistance. Waited for confirmation candle.',
    lessons: 'Patience pays off. Wait for retest before entry.',
    tags: ['breakout', 'smc', 'retest'],
  },
  {
    id: '2',
    date: '2024-01-14',
    symbol: 'GBP/USD',
    type: 'short',
    entryPrice: 1.2680,
    exitPrice: 1.2655,
    lotSize: 0.3,
    pnl: 75,
    emotions: 'Slightly nervous',
    strategy: 'Order block',
    notes: 'Entered on order block rejection. Was a bit early but worked out.',
    lessons: 'Could have waited for more confirmation. Early entry added unnecessary stress.',
    tags: ['order-block', 'rejection'],
  },
  {
    id: '3',
    date: '2024-01-13',
    symbol: 'XAU/USD',
    type: 'long',
    entryPrice: 2025.50,
    exitPrice: 2020.00,
    lotSize: 0.1,
    pnl: -55,
    emotions: 'Frustrated',
    strategy: 'Fibonacci retracement',
    notes: 'Entered too early before the level was confirmed. Market continued down.',
    lessons: 'Never enter without confirmation. Always wait for price reaction at levels.',
    tags: ['fibonacci', 'mistake', 'loss'],
  },
];

export default function TradeJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>(mockEntries);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'long' | 'short'>('all');
  
  // Form state
  const [formData, setFormData] = useState({
    symbol: 'EUR/USD',
    type: 'long' as 'long' | 'short',
    entryPrice: '',
    exitPrice: '',
    lotSize: '',
    emotions: '',
    strategy: '',
    notes: '',
    lessons: '',
    tags: '',
  });

  const handleSubmit = () => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      symbol: formData.symbol,
      type: formData.type,
      entryPrice: parseFloat(formData.entryPrice) || 0,
      exitPrice: parseFloat(formData.exitPrice) || 0,
      lotSize: parseFloat(formData.lotSize) || 0,
      pnl: 0, // Would calculate based on actual data
      emotions: formData.emotions,
      strategy: formData.strategy,
      notes: formData.notes,
      lessons: formData.lessons,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    
    setEntries([newEntry, ...entries]);
    setIsDialogOpen(false);
    setFormData({
      symbol: 'EUR/USD',
      type: 'long',
      entryPrice: '',
      exitPrice: '',
      lotSize: '',
      emotions: '',
      strategy: '',
      notes: '',
      lessons: '',
      tags: '',
    });
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.strategy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || entry.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // Calculate analytics
  const totalTrades = entries.length;
  const winCount = entries.filter(e => e.pnl > 0).length;
  const winRate = totalTrades > 0 ? ((winCount / totalTrades) * 100).toFixed(1) : '0';
  const totalPnl = entries.reduce((sum, e) => sum + e.pnl, 0);

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Entries</p>
                <p className="text-xl font-bold text-white">{totalTrades}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20">
                <Target className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Win Rate</p>
                <p className="text-xl font-bold text-white">{winRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <BarChart3 className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total P&L</p>
                <p className={`text-xl font-bold ${totalPnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {totalPnl >= 0 ? '+' : ''}${totalPnl}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <CheckCircle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-xl font-bold text-white">{winCount}/{totalTrades}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 w-full sm:w-64"
            />
          </div>
          <Select value={filterType} onValueChange={(v) => setFilterType(v as 'all' | 'long' | 'short')}>
            <SelectTrigger className="w-28 bg-white/5 border-white/10">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="long">Long</SelectItem>
              <SelectItem value="short">Short</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              New Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Add Journal Entry</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <Label className="text-muted-foreground">Symbol</Label>
                <Select value={formData.symbol} onValueChange={(v) => setFormData({...formData, symbol: v})}>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR/USD">EUR/USD</SelectItem>
                    <SelectItem value="GBP/USD">GBP/USD</SelectItem>
                    <SelectItem value="USD/JPY">USD/JPY</SelectItem>
                    <SelectItem value="XAU/USD">XAU/USD</SelectItem>
                    <SelectItem value="BTC/USD">BTC/USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-muted-foreground">Type</Label>
                <Select value={formData.type} onValueChange={(v) => setFormData({...formData, type: v as 'long' | 'short'})}>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="long">Long</SelectItem>
                    <SelectItem value="short">Short</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-muted-foreground">Entry Price</Label>
                <Input
                  value={formData.entryPrice}
                  onChange={(e) => setFormData({...formData, entryPrice: e.target.value})}
                  className="bg-white/5 border-white/10"
                  placeholder="1.0850"
                />
              </div>
              <div>
                <Label className="text-muted-foreground">Exit Price</Label>
                <Input
                  value={formData.exitPrice}
                  onChange={(e) => setFormData({...formData, exitPrice: e.target.value})}
                  className="bg-white/5 border-white/10"
                  placeholder="1.0880"
                />
              </div>
              <div>
                <Label className="text-muted-foreground">Lot Size</Label>
                <Input
                  value={formData.lotSize}
                  onChange={(e) => setFormData({...formData, lotSize: e.target.value})}
                  className="bg-white/5 border-white/10"
                  placeholder="0.5"
                />
              </div>
              <div>
                <Label className="text-muted-foreground">Strategy</Label>
                <Input
                  value={formData.strategy}
                  onChange={(e) => setFormData({...formData, strategy: e.target.value})}
                  className="bg-white/5 border-white/10"
                  placeholder="Breakout, SMC, etc."
                />
              </div>
              <div className="col-span-2">
                <Label className="text-muted-foreground">Emotions During Trade</Label>
                <Input
                  value={formData.emotions}
                  onChange={(e) => setFormData({...formData, emotions: e.target.value})}
                  className="bg-white/5 border-white/10"
                  placeholder="Confident, nervous, patient..."
                />
              </div>
              <div className="col-span-2">
                <Label className="text-muted-foreground">Notes</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="bg-white/5 border-white/10 min-h-20"
                  placeholder="Describe your trade setup and execution..."
                />
              </div>
              <div className="col-span-2">
                <Label className="text-muted-foreground">Lessons Learned</Label>
                <Textarea
                  value={formData.lessons}
                  onChange={(e) => setFormData({...formData, lessons: e.target.value})}
                  className="bg-white/5 border-white/10 min-h-20"
                  placeholder="What did you learn from this trade?"
                />
              </div>
              <div className="col-span-2">
                <Label className="text-muted-foreground">Tags (comma separated)</Label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="bg-white/5 border-white/10"
                  placeholder="breakout, smc, retest"
                />
              </div>
              <div className="col-span-2">
                <Button variant="outline" className="w-full border-white/10 bg-white/5 hover:bg-white/10">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Upload Screenshot
                </Button>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="btn-primary" onClick={handleSubmit}>
                <Save className="w-4 h-4 mr-2" />
                Save Entry
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Journal Entries */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="glass-card glass-card-hover">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge
                          className={`${
                            entry.type === 'long'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-red-500/20 text-red-400 border-red-500/30'
                          }`}
                        >
                          {entry.type === 'long' ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {entry.symbol}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {entry.date}
                        </span>
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                          {entry.strategy}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Entry:</span>
                          <span className="ml-2 text-white font-mono">{entry.entryPrice}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Exit:</span>
                          <span className="ml-2 text-white font-mono">{entry.exitPrice}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Size:</span>
                          <span className="ml-2 text-white">{entry.lotSize} lots</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">P&L:</span>
                          <span className={`ml-2 font-medium ${entry.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {entry.pnl >= 0 ? '+' : ''}${entry.pnl}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-300 mb-2">{entry.notes}</p>
                      
                      {entry.lessons && (
                        <div className="flex items-start gap-2 p-2 bg-amber-500/10 rounded-lg">
                          <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-amber-200">{entry.lessons}</p>
                        </div>
                      )}

                      {entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {entry.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 bg-white/5 text-muted-foreground rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
