'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Target,
  BarChart3,
  Activity,
  DollarSign,
  PieChart,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ElementType;
  color: string;
  delay?: number;
}

function StatCard({ title, value, change, changeType = 'neutral', icon: Icon, color, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="glass-card glass-card-hover">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{title}</p>
              <p className="text-2xl font-bold text-white">{value}</p>
              {change && (
                <div className={`flex items-center gap-1 mt-1 text-sm ${
                  changeType === 'positive' ? 'text-green-400' :
                  changeType === 'negative' ? 'text-red-400' :
                  'text-muted-foreground'
                }`}>
                  {changeType === 'positive' && <TrendingUp className="w-3 h-3" />}
                  {changeType === 'negative' && <TrendingDown className="w-3 h-3" />}
                  <span>{change}</span>
                </div>
              )}
            </div>
            <div className={`p-2 rounded-lg ${color}`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

function AnimatedCounter({ end, duration = 2000, prefix = '', suffix = '', decimals = 0 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(progress * end);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return (
    <span>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
}

export default function StatsCards() {
  const stats = [
    {
      title: 'Portfolio Value',
      value: '$47,892.45',
      change: '+$2,340.50 (5.13%)',
      changeType: 'positive' as const,
      icon: Wallet,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
    },
    {
      title: 'Win Rate',
      value: '72.5%',
      change: '+3.2% this month',
      changeType: 'positive' as const,
      icon: Target,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
    },
    {
      title: 'Total P&L',
      value: '+$12,456.78',
      change: '+28.4% all time',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
    },
    {
      title: 'Active Trades',
      value: '5',
      change: '3 long, 2 short',
      changeType: 'neutral' as const,
      icon: Activity,
      color: 'bg-gradient-to-r from-amber-500 to-amber-600',
    },
    {
      title: 'Risk Exposure',
      value: '4.2%',
      change: 'Within limit',
      changeType: 'neutral' as const,
      icon: PieChart,
      color: 'bg-gradient-to-r from-pink-500 to-pink-600',
    },
    {
      title: 'Avg R:R Ratio',
      value: '1:2.4',
      change: '+0.3 improvement',
      changeType: 'positive' as const,
      icon: BarChart3,
      color: 'bg-gradient-to-r from-cyan-500 to-cyan-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.title}
          {...stat}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}
