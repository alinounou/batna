export interface CalculatorConfig {
  id: string;
  name: string;
  description: string;
  category: 'risk' | 'position' | 'technical' | 'performance';
  icon: string;
  featured?: boolean;
}

export const calculatorCategories = {
  risk: {
    name: 'Risk Management',
    description: 'Tools to manage and calculate trading risk',
    color: 'from-red-500/20 to-orange-500/20',
  },
  position: {
    name: 'Position Sizing',
    description: 'Calculate optimal position sizes',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  technical: {
    name: 'Technical Analysis',
    description: 'Technical indicators and levels',
    color: 'from-purple-500/20 to-pink-500/20',
  },
  performance: {
    name: 'Performance Metrics',
    description: 'Measure and analyze trading performance',
    color: 'from-green-500/20 to-teal-500/20',
  },
};

export const calculators: CalculatorConfig[] = [
  // Risk Management
  {
    id: 'risk-reward',
    name: 'Risk-Reward Ratio',
    description: 'Calculate the risk-reward ratio for your trades',
    category: 'risk',
    icon: 'Scale',
  },
  {
    id: 'r-multiple',
    name: 'R-Multiple Calculator',
    description: 'Calculate R-multiples to measure trade performance',
    category: 'risk',
    icon: 'Target',
  },
  {
    id: 'atr-stop-loss',
    name: 'ATR Stop-Loss',
    description: 'Calculate stop-loss levels based on ATR',
    category: 'risk',
    icon: 'Shield',
  },
  {
    id: 'position-risk',
    name: 'Position Risk %',
    description: 'Calculate position size based on risk percentage',
    category: 'risk',
    icon: 'Percent',
  },
  {
    id: 'margin-leverage',
    name: 'Margin & Leverage',
    description: 'Calculate margin requirements and leverage effects',
    category: 'risk',
    icon: 'Leverage',
  },

  // Position Sizing
  {
    id: 'position-size',
    name: 'Position Size Calculator',
    description: 'Calculate optimal position size based on risk',
    category: 'position',
    icon: 'Calculator',
    featured: true,
  },
  {
    id: 'forex-lot-size',
    name: 'Forex Lot Size',
    description: 'Calculate lot sizes for forex trading',
    category: 'position',
    icon: 'Coins',
  },
  {
    id: 'dca',
    name: 'DCA Average Price',
    description: 'Calculate dollar-cost averaging entry price',
    category: 'position',
    icon: 'TrendingDown',
  },
  {
    id: 'break-even',
    name: 'Break-Even Price',
    description: 'Calculate break-even price including fees',
    category: 'position',
    icon: 'Equal',
  },
  {
    id: 'compounding',
    name: 'Compounding Calculator',
    description: 'Calculate compound growth over time',
    category: 'position',
    icon: 'ChartLine',
  },

  // Technical Analysis
  {
    id: 'fibonacci',
    name: 'Fibonacci Retracement',
    description: 'Calculate Fibonacci retracement and extension levels',
    category: 'technical',
    icon: 'Fibonacci',
    featured: true,
  },
  {
    id: 'pivot-points',
    name: 'Pivot Points',
    description: 'Calculate classic and Fibonacci pivot points',
    category: 'technical',
    icon: 'Anchor',
  },
  {
    id: 'support-resistance',
    name: 'S/R Zone Sizing',
    description: 'Calculate support and resistance zones',
    category: 'technical',
    icon: 'Layers',
  },
  {
    id: 'session-range',
    name: 'Session Range Analyzer',
    description: 'Analyze trading session ranges',
    category: 'technical',
    icon: 'Clock',
  },
  {
    id: 'volume-profile',
    name: 'Volume Profile Zones',
    description: 'Identify high volume zones',
    category: 'technical',
    icon: 'BarChart',
  },
  {
    id: 'volatility',
    name: 'Volatility Calculator',
    description: 'Calculate market volatility metrics',
    category: 'technical',
    icon: 'Activity',
  },

  // Performance Metrics
  {
    id: 'pnl',
    name: 'P&L Calculator',
    description: 'Calculate profit and loss for trades',
    category: 'performance',
    icon: 'DollarSign',
  },
  {
    id: 'sharpe-ratio',
    name: 'Sharpe Ratio',
    description: 'Calculate risk-adjusted returns',
    category: 'performance',
    icon: 'Gauge',
  },
  {
    id: 'expectancy',
    name: 'Expectancy Calculator',
    description: 'Calculate trading system expectancy',
    category: 'performance',
    icon: 'Probability',
  },
  {
    id: 'kelly-criterion',
    name: 'Kelly Criterion',
    description: 'Calculate optimal bet size using Kelly formula',
    category: 'performance',
    icon: 'Weight',
  },
  {
    id: 'time-to-target',
    name: 'Time-to-Target (CAGR)',
    description: 'Calculate time to reach financial goals',
    category: 'performance',
    icon: 'Timer',
  },
  {
    id: 'correlation',
    name: 'Correlation Calculator',
    description: 'Calculate correlation between instruments',
    category: 'performance',
    icon: 'GitBranch',
  },
];

export const featuredCalculators = calculators.filter((c) => c.featured);
