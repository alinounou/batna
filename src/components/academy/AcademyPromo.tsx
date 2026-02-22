'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Play,
  Clock,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Video,
  BookOpen,
  Award,
  Zap,
  TrendingUp,
  Brain,
  Target,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const courses = [
  {
    title: 'Forex Fundamentals',
    duration: '8 hours',
    students: '2.5k',
    rating: 4.9,
    level: 'Beginner',
  },
  {
    title: 'Technical Analysis Mastery',
    duration: '12 hours',
    students: '1.8k',
    rating: 4.8,
    level: 'Intermediate',
  },
  {
    title: 'Risk Management Pro',
    duration: '6 hours',
    students: '3.2k',
    rating: 4.9,
    level: 'Advanced',
  },
  {
    title: 'AI Trading Strategies',
    duration: '10 hours',
    students: '1.2k',
    rating: 5.0,
    level: 'Expert',
  },
];

const benefits = [
  { icon: Video, text: '50+ Hours of HD Video Content' },
  { icon: BookOpen, text: 'Downloadable Resources & PDFs' },
  { icon: Award, text: 'Certificate of Completion' },
  { icon: Zap, text: 'Lifetime Access & Updates' },
  { icon: TrendingUp, text: 'Live Trading Sessions' },
  { icon: Brain, text: 'AI-Powered Learning Paths' },
];

export default function AcademyPromo() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30" />
        <div className="absolute inset-0 particles-bg" />
        <div className="relative p-8 lg:p-12">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-amber-500/20 text-amber-400 border-amber-500/30">
              <Star className="w-3 h-3 mr-1" />
              #1 Rated Trading Academy
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Master the Art of Trading
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Join thousands of successful traders who transformed their skills with our comprehensive courses.
              Learn from industry experts and AI-powered insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="btn-primary text-white"
                onClick={() => window.open('https://infinityalgoacademy.net', '_blank')}
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                Visit Academy
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => window.open('https://infinityalgoacademy.net', '_blank')}
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Preview
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-400" />
          Popular Courses
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card glass-card-hover h-full">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {course.level}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm text-white">{course.rating}</span>
                    </div>
                  </div>
                  <h4 className="font-semibold text-white mb-2">{course.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-400" />
            What You&apos;ll Get
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 glass-card rounded-lg"
              >
                <benefit.icon className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-sm text-white">{benefit.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-400" />
            Stay Updated
          </h3>
          <Card className="glass-card">
            <CardContent className="p-6">
              <h4 className="font-semibold text-white mb-2">Get Exclusive Trading Tips</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Subscribe to receive weekly trading insights, course updates, and exclusive offers.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span>Thanks for subscribing!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border-white/10"
                  />
                  <Button type="submit" className="btn-primary">
                    Subscribe
                  </Button>
                </form>
              )}
              <p className="text-xs text-muted-foreground mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: '10,000+', label: 'Students Enrolled' },
          { value: '50+', label: 'Hours of Content' },
          { value: '4.9', label: 'Average Rating' },
          { value: '24/7', label: 'Support Access' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-4 glass-card rounded-xl"
          >
            <div className="text-2xl lg:text-3xl font-bold gradient-text mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <Card className="glass-card inline-block">
          <CardContent className="p-8">
            <Target className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Ready to Level Up?</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Join Infinity Algo Academy today and start your journey to becoming a professional trader.
            </p>
            <Button
              size="lg"
              className="btn-primary text-white"
              onClick={() => window.open('https://infinityalgoacademy.net', '_blank')}
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Enroll Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
