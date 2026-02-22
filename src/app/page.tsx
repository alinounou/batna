"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { FibonacciCalculator } from "@/components/calculators/FibonacciCalculator";
import { PositionSizeCalculator } from "@/components/calculators/PositionSizeCalculator";
import { CalculatorStub } from "@/components/calculators/CalculatorStub";
import { AIAnalysisSection } from "@/components/AIAnalysisSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  calculators,
  calculatorCategories,
  featuredCalculators,
  CalculatorConfig,
} from "@/config/calculators";
import {
  ArrowRight,
  Calculator,
  Brain,
  Users,
  Zap,
  Shield,
  TrendingUp,
  ExternalLink,
  Star,
  ChevronRight,
  Sparkles,
  Target,
  BarChart3,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedCalculator, setSelectedCalculator] = useState<string>("fibonacci");
  const homeRef = useRef<HTMLDivElement>(null);
  const calculatorsRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const navigateTo = (section: string) => {
    setActiveSection(section);
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      home: homeRef,
      calculators: calculatorsRef,
      ai: aiRef,
      about: aboutRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const renderCalculator = (calc: CalculatorConfig) => {
    if (calc.id === "fibonacci") {
      return <FibonacciCalculator />;
    }
    if (calc.id === "position-size") {
      return <PositionSizeCalculator />;
    }
    return <CalculatorStub config={calc} />;
  };

  return (
    <div className="min-h-screen bg-infinity-dark text-foreground">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-50" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-infinity-teal/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navbar */}
      <Navbar activeSection={activeSection} onNavigate={navigateTo} />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section ref={homeRef} id="home" className="min-h-screen flex items-center justify-center pt-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <Logo size="lg" className="justify-center mb-6" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Badge variant="outline" className="mb-6 bg-primary/20 text-primary border-primary/30">
                <Sparkles className="w-4 h-4 mr-2" />
                AI Decision Intelligence Platform
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="text-gradient-blue">Trading Intelligence</span>
              <br />
              <span className="text-foreground">for Serious Traders</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10"
            >
              22+ professional trading calculators, AI-powered market analysis, and expert education
              from Infinity Algo Academy. Everything you need to make smarter trading decisions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                onClick={() => navigateTo("calculators")}
                className="bg-gradient-to-r from-primary to-infinity-teal hover:opacity-90 text-lg px-8"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-primary/30 hover:bg-primary/10"
              >
                <a
                  href="https://infinityalgoacademy.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Academy
                  <ExternalLink className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            >
              {[
                { value: "22+", label: "Calculators", icon: Calculator },
                { value: "AI", label: "Analysis", icon: Brain },
                { value: "Free", label: "To Start", icon: Zap },
                { value: "100%", label: "Secure", icon: Shield },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-xl glass-card border-white/10 hover:border-primary/30 transition-all"
                  >
                    <Icon className="w-8 h-8 text-primary mb-3 mx-auto" />
                    <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-16"
            >
              <div className="animate-bounce cursor-pointer" onClick={() => navigateTo("calculators")}>
                <ChevronRight className="w-8 h-8 text-muted-foreground rotate-90 mx-auto" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Calculators Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent to-primary/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
                <Star className="w-4 h-4 mr-2" />
                Featured Tools
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Powerful Trading Calculators
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Start with our most popular calculators. Professional-grade tools used by
                thousands of traders worldwide.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredCalculators.map((calc, idx) => (
                <motion.div
                  key={calc.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className="glass-card border-white/10 hover:border-primary/30 cursor-pointer transition-all group h-full"
                    onClick={() => {
                      setSelectedCalculator(calc.id);
                      navigateTo("calculators");
                    }}
                  >
                    <CardHeader>
                      <div className="p-3 rounded-xl bg-primary/20 w-fit mb-3 group-hover:scale-110 transition-transform">
                        <Calculator className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {calc.name}
                      </CardTitle>
                      <CardDescription>{calc.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-primary text-sm font-medium">
                        Try Now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigateTo("calculators")}
                className="border-primary/30 hover:bg-primary/10"
              >
                View All 22+ Calculators
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Why Choose Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Built by Traders, for Traders
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every feature is designed with real trading scenarios in mind.
                No fluff, just the tools you need.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Brain,
                  title: "AI-Powered Analysis",
                  description:
                    "Advanced machine learning algorithms analyze market conditions and provide actionable insights in real-time.",
                  color: "from-purple-500/20 to-pink-500/20",
                  border: "border-purple-500/30",
                },
                {
                  icon: Calculator,
                  title: "22+ Calculators",
                  description:
                    "From Fibonacci to Kelly Criterion - every calculator you need for professional trading analysis and risk management.",
                  color: "from-blue-500/20 to-cyan-500/20",
                  border: "border-blue-500/30",
                },
                {
                  icon: TrendingUp,
                  title: "Real-Time Analysis",
                  description:
                    "Get instant analysis updates as market conditions change. Stay ahead with timely insights and alerts.",
                  color: "from-green-500/20 to-teal-500/20",
                  border: "border-green-500/30",
                },
                {
                  icon: Users,
                  title: "Academy Integration",
                  description:
                    "Direct integration with Infinity Algo Academy for courses, mentorship, and community support.",
                  color: "from-orange-500/20 to-yellow-500/20",
                  border: "border-orange-500/30",
                },
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className={`glass-card ${feature.border} h-full hover:scale-105 transition-transform`}>
                      <CardHeader>
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} w-fit mb-3`}>
                          <Icon className="w-6 h-6 text-foreground" />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* All Calculators Section */}
        <section ref={calculatorsRef} id="calculators" className="py-20 px-4 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                <Calculator className="w-4 h-4 mr-2" />
                Trading Tools
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                All Trading Calculators
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                22+ professional calculators organized by category. Select a calculator to get started.
              </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              {/* Sidebar - Calculator List */}
              <div className="lg:col-span-1">
                <Card className="glass-card border-white/10 sticky top-20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[600px]">
                      {Object.entries(calculatorCategories).map(([key, category]) => {
                        const categoryCalcs = calculators.filter((c) => c.category === key);
                        return (
                          <div key={key} className="mb-4">
                            <div className={`px-4 py-2 text-sm font-semibold bg-gradient-to-r ${category.color} text-foreground`}>
                              {category.name}
                            </div>
                            {categoryCalcs.map((calc) => (
                              <button
                                key={calc.id}
                                onClick={() => setSelectedCalculator(calc.id)}
                                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors ${
                                  selectedCalculator === calc.id
                                    ? "bg-primary/20 text-primary border-l-2 border-primary"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                }`}
                              >
                                {calc.featured && <Star className="w-3 h-3 text-yellow-500" />}
                                {calc.name}
                              </button>
                            ))}
                          </div>
                        );
                      })}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* Main Calculator Area */}
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCalculator}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderCalculator(calculators.find((c) => c.id === selectedCalculator)!)}
                  </motion.div>
                </AnimatePresence>

                {/* Quick Academy Promo */}
                <Card className="mt-6 glass-card border-primary/20 bg-gradient-to-r from-primary/10 to-infinity-teal/10">
                  <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <TrendingUp className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">Want to Master These Tools?</p>
                        <p className="text-sm text-muted-foreground">
                          Join Infinity Algo Academy for expert training
                        </p>
                      </div>
                    </div>
                    <Button asChild className="bg-gradient-to-r from-primary to-infinity-teal shrink-0">
                      <a href="https://infinityalgoacademy.net/" target="_blank" rel="noopener noreferrer">
                        Join Academy <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* AI Analysis Section */}
        <div ref={aiRef}>
          <AIAnalysisSection />
        </div>

        {/* About Section */}
        <section ref={aboutRef} id="about" className="py-20 px-4 bg-gradient-to-b from-transparent to-primary/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Story */}
              <div>
                <Badge variant="outline" className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  <Clock className="w-4 h-4 mr-2" />
                  Our Story
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  The Story of Infinity Algo
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Infinity Algo was born from a simple belief: every trader deserves access to
                    professional-grade tools without the professional-grade price tag. Founded by
                    Jeremy, a veteran trader with over a decade of experience in forex, crypto, and
                    stock markets, Infinity Algo represents the culmination of years of trading
                    wisdom distilled into practical, easy-to-use tools.
                  </p>
                  <p>
                    Our mission is simple yet ambitious: democratize trading intelligence. We've
                    built a platform that combines the power of AI analysis with battle-tested
                    trading calculators, all integrated with the Infinity Algo Academy for
                    comprehensive trader education.
                  </p>
                  <p>
                    Whether you're just starting your trading journey or you're a seasoned
                    professional, Infinity Algo provides the tools, insights, and education you
                    need to make smarter, more informed trading decisions.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button asChild className="bg-gradient-to-r from-primary to-infinity-teal">
                    <a href="https://infinityalgoacademy.net/" target="_blank" rel="noopener noreferrer">
                      Visit Academy <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <Button variant="outline" onClick={() => navigateTo("calculators")} className="border-primary/30">
                    Explore Tools
                  </Button>
                </div>
              </div>

              {/* Right - Features & Roadmap */}
              <div className="space-y-6">
                {/* Feature Highlights */}
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      What We Offer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "22+ Professional Trading Calculators",
                        "AI-Powered Market Analysis",
                        "Real-Time Insights & Alerts",
                        "Integration with Infinity Algo Academy",
                        "Mobile-Friendly Design",
                        "Free to Start, Pro Features Available",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-infinity-teal shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Roadmap Preview */}
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      Coming Soon
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { phase: "Phase 2", feature: "Real-time Market Data Integration", status: "In Progress" },
                        { phase: "Phase 3", feature: "Strategy Marketplace", status: "Planned" },
                        { phase: "Phase 4", feature: "Broker Integration", status: "Planned" },
                        { phase: "Phase 5", feature: "Enterprise Features", status: "Planned" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-xs">
                              {item.phase}
                            </Badge>
                            <span className="text-sm">{item.feature}</span>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              item.status === "In Progress"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-blue-500/20 text-blue-400"
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="glass-card border-primary/30 bg-gradient-to-r from-primary/10 to-infinity-teal/10 overflow-hidden">
              <CardContent className="py-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Elevate Your Trading?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Join thousands of traders who use Infinity Algo tools daily.
                    Start free, upgrade when you're ready.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                      size="lg"
                      onClick={() => navigateTo("calculators")}
                      className="bg-gradient-to-r from-primary to-infinity-teal hover:opacity-90 text-lg px-8"
                    >
                      Start Free Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button size="lg" variant="outline" asChild className="border-primary/30">
                      <a href="https://infinityalgoacademy.net/" target="_blank" rel="noopener noreferrer">
                        Join Academy
                        <ExternalLink className="w-5 h-5 ml-2" />
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
