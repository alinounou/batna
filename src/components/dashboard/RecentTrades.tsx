'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  ExternalLink,
  MoreHorizontal,
  Clock,
  DollarSign,
  Target,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Trade {
  id: string;
  symbol: string;
  type: 'long' | 'short';
  entryPrice: number;
  exitPrice: number | null;
  lotSize: number;
  pnl: number;
  pnlPercent: number;
  status: 'open' | 'closed';
  openTime: string;
  closeTime: string | null;
  stopLoss: number;
  takeProfit: number;
}

const mockTrades: Trade[] = [
  {
    id: '1',
    symbol: 'EUR/USD',
    type: 'long',
    entryPrice: 1.0845,
    exitPrice: 1.0878,
    lotSize: 0.5,
    pnl: 165.0,
    pnlPercent: 1.65,
    status: 'closed',
    openTime: '2024-01-15 09:30',
    closeTime: '2024-01-15 14:45',
    stopLoss: 1.0820,
    takeProfit: 1.0890,
  },
  {
    id: '2',
    symbol: 'GBP/USD',
    type: 'short',
    entryPrice: 1.2680,
    exitPrice: 1.2655,
    lotSize: 0.3,
    pnl: 75.0,
    pnlPercent: 0.75,
    status: 'closed',
    openTime: '2024-01-15 10:15',
    closeTime: '2024-01-15 16:30',
    stopLoss: 1.2710,
    takeProfit: 1.2640,
  },
  {
    id: '3',
    symbol: 'XAU/USD',
    type: 'long',
    entryPrice: 2025.50,
    exitPrice: null,
    lotSize: 0.1,
    pnl: 125.0,
    pnlPercent: 1.25,
    status: 'open',
    openTime: '2024-01-16 08:00',
    closeTime: null,
    stopLoss: 2015.00,
    takeProfit: 2050.00,
  },
  {
    id: '4',
    symbol: 'USD/JPY',
    type: 'short',
    entryPrice: 148.50,
    exitPrice: null,
    lotSize: 0.2,
    pnl: -45.0,
    pnlPercent: -0.45,
    status: 'open',
    openTime: '2024-01-16 11:30',
    closeTime: null,
    stopLoss: 149.00,
    takeProfit: 147.50,
  },
  {
    id: '5',
    symbol: 'BTC/USD',
    type: 'long',
    entryPrice: 42500,
    exitPrice: 43150,
    lotSize: 0.01,
    pnl: 65.0,
    pnlPercent: 0.65,
    status: 'closed',
    openTime: '2024-01-14 20:00',
    closeTime: '2024-01-15 08:30',
    stopLoss: 42000,
    takeProfit: 44000,
  },
];

export default function RecentTrades() {
  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-400" />
          Recent Trades
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
          View All
          <ExternalLink className="w-4 h-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-white/5">
                <TableHead className="text-muted-foreground text-xs">Symbol</TableHead>
                <TableHead className="text-muted-foreground text-xs">Type</TableHead>
                <TableHead className="text-muted-foreground text-xs">Entry</TableHead>
                <TableHead className="text-muted-foreground text-xs">Exit/Current</TableHead>
                <TableHead className="text-muted-foreground text-xs">Size</TableHead>
                <TableHead className="text-muted-foreground text-xs">P&L</TableHead>
                <TableHead className="text-muted-foreground text-xs">Status</TableHead>
                <TableHead className="text-muted-foreground text-xs"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTrades.map((trade, index) => (
                <motion.tr
                  key={trade.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <TableCell className="font-medium text-white">{trade.symbol}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        trade.type === 'long'
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-red-500/20 text-red-400 border-red-500/30'
                      }`}
                    >
                      {trade.type === 'long' ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {trade.type.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-white text-sm">
                    {trade.entryPrice.toFixed(trade.symbol.includes('JPY') ? 2 : trade.symbol.includes('USD') && !trade.symbol.includes('XAU') && !trade.symbol.includes('BTC') ? 4 : 2)}
                  </TableCell>
                  <TableCell className="font-mono text-white text-sm">
                    {trade.exitPrice
                      ? trade.exitPrice.toFixed(trade.symbol.includes('JPY') ? 2 : trade.symbol.includes('USD') && !trade.symbol.includes('XAU') && !trade.symbol.includes('BTC') ? 4 : 2)
                      : '—'}
                  </TableCell>
                  <TableCell className="text-white text-sm">{trade.lotSize}</TableCell>
                  <TableCell>
                    <span
                      className={`font-medium ${
                        trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">
                      ({trade.pnlPercent >= 0 ? '+' : ''}{trade.pnlPercent}%)
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        trade.status === 'open'
                          ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                      }`}
                    >
                      {trade.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass-card border-white/10">
                        <DropdownMenuItem className="hover:bg-white/5 cursor-pointer">
                          <Target className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-white/5 cursor-pointer">
                          <DollarSign className="w-4 h-4 mr-2" />
                          Modify Order
                        </DropdownMenuItem>
                        {trade.status === 'open' && (
                          <DropdownMenuItem className="hover:bg-white/5 cursor-pointer text-red-400">
                            Close Trade
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
