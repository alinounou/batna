'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BarChart3,
  Bot,
  Calculator,
  GraduationCap,
  BookOpen,
  ChevronUp,
} from 'lucide-react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/dashboard/HeroSection';
import StatsCards from '@/components/dashboard/StatsCards';
import PortfolioChart from '@/components/dashboard/PortfolioChart';
import RecentTrades from '@/components/dashboard/RecentTrades';
import TradingChart from '@/components/charts/TradingChart';
import AIAssistant from '@/components/ai/AIAssistant';
import CalculatorGrid from '@/components/calculators/CalculatorGrid';
import TradeJournal from '@/components/journal/TradeJournal';
import AcademyPromo from '@/components/academy/AcademyPromo';
import { Button } from '@/components/ui/button';

const sections = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'charts', label: 'Charts', icon: BarChart3 },
  { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
  { id: 'calculators', label: 'Calculators', icon: Calculator },
  { id: 'journal', label: 'Journal', icon: BookOpen },
  { id: 'academy', label: 'Academy', icon: GraduationCap },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle section navigation
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] animated-bg">
      {/* Header */}
      <Header activeSection={activeSection} setActiveSection={handleSectionChange} />

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section id="dashboard">
          <HeroSection />
        </section>

        {/* Dashboard Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <StatsCards />
          </motion.div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <PortfolioChart />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <RecentTrades />
            </motion.div>
          </div>
        </section>

        {/* Charts Section */}
        <section id="charts" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-blue-400" />
              Advanced Charts
            </h2>
            <TradingChart />
          </motion.div>
        </section>

        {/* AI Assistant Section */}
        <section id="ai-assistant" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Bot className="w-6 h-6 text-purple-400" />
              AI Trading Assistant
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AIAssistant />
              </div>
              <div className="space-y-4">
                {/* Quick Actions Panel */}
                <div className="glass-card rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Analyze Trade', icon: '🎯' },
                      { label: 'Risk Check', icon: '🛡️' },
                      { label: 'Market Bias', icon: '📊' },
                      { label: 'Trade Score', icon: '⭐' },
                    ].map((action) => (
                      <Button
                        key={action.label}
                        variant="outline"
                        className="h-auto py-3 flex-col gap-1 border-white/10 hover:bg-white/5"
                      >
                        <span className="text-lg">{action.icon}</span>
                        <span className="text-xs">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* AI Features */}
                <div className="glass-card rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-3">AI Features</h3>
                  <ul className="space-y-2 text-sm">
                    {[
                      'Real-time market analysis',
                      'Pattern recognition',
                      'Risk assessment',
                      'Trade recommendations',
                      'Mistake detection',
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pro Badge */}
                <div className="glass-card rounded-xl p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Unlock Advanced AI</p>
                    <Button className="w-full btn-primary">
                      Upgrade to Pro
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Calculators Section */}
        <section id="calculators" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-green-400" />
              Trading Calculators
            </h2>
            <CalculatorGrid />
          </motion.div>
        </section>

        {/* Trade Journal Section */}
        <section id="journal" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-400" />
              Trade Journal
            </h2>
            <TradeJournal />
          </motion.div>
        </section>

        {/* Academy Section */}
        <section id="academy" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-pink-400" />
              Infinity Algo Academy
            </h2>
            <AcademyPromo />
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Button
              onClick={scrollToTop}
              size="icon"
              className="w-12 h-12 rounded-full btn-primary shadow-lg glow-blue"
            >
              <ChevronUp className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
