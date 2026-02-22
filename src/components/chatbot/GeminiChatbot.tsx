'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Trash2, Loader2, TrendingUp, BarChart3, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const STORAGE_KEY = 'infinityalgo-chat-history';

const QUICK_ACTIONS = [
  { icon: TrendingUp, label: 'تحليل الذهب', prompt: 'أعطني تحليل شامل للذهب XAUUSD مع إشارة تداول' },
  { icon: Coins, label: 'تحليل BTC', prompt: 'أعطني تحليل البيتكوين BTCUSD مع إشارة تداول' },
  { icon: BarChart3, label: 'إشارة تداول', prompt: 'أعطني إشارة تداول قوية اليوم مع Entry و SL و TP' },
];

export default function GeminiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((m: Message) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        })));
      }
    } catch (e) {
      console.error('Failed to load chat history:', e);
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-50)));
    }
  }, [messages]);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
    setShowDeleteConfirm(false);
  };

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-10).map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
          }))
        })
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{ 
          display: isOpen ? 'none' : 'flex',
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
          boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)'
        }}
      >
        <MessageCircle className="w-7 h-7 text-black" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-black" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[95vw] max-w-[420px] h-[85vh] max-h-[650px] rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(145deg, #000000 0%, #1a1a2e 50%, #000000 100%)',
              border: '2px solid rgba(255, 215, 0, 0.4)',
              boxShadow: '0 0 50px rgba(255, 215, 0, 0.2)'
            }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between px-5 py-4"
              style={{
                background: 'linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border-2 border-yellow-600">
                  <Bot className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-bold text-black text-lg">InfinityAlgo AI</h3>
                  <p className="text-xs text-black/70">مساعد التداول الذكي • Gemini</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="text-black hover:bg-black/10 h-8 w-8"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-black hover:bg-black/10 h-8 w-8"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="h-[calc(100%-180px)] overflow-y-auto p-4 space-y-4"
              style={{ direction: 'rtl' }}
            >
              {messages.length === 0 && (
                <div className="text-center py-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 165, 0, 0.2) 100%)',
                      border: '2px solid rgba(255, 215, 0, 0.3)'
                    }}
                  >
                    <Bot className="w-10 h-10 text-yellow-500" />
                  </div>
                  <p className="text-yellow-500 font-bold text-lg mb-2">مرحباً بك في InfinityAlgo AI</p>
                  <p className="text-gray-400 text-sm mb-4">اسأل عن الذهب، البيتكوين، أو أي سؤال عام!</p>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {QUICK_ACTIONS.map((action) => (
                      <button
                        key={action.label}
                        onClick={() => sendMessage(action.prompt)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all"
                        style={{
                          background: 'rgba(255, 215, 0, 0.1)',
                          border: '1px solid rgba(255, 215, 0, 0.3)',
                          color: '#FFD700'
                        }}
                      >
                        <action.icon className="w-4 h-4" />
                        {action.label}
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-3 rounded-xl" style={{ background: 'rgba(255, 215, 0, 0.05)', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
                    <p className="text-xs text-gray-400">
                      🎓 <span className="text-yellow-500">تعلم التداول الاحترافي:</span>
                      <a href="https://infinityalgoacademy.net" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline block mt-1">
                        infinityalgoacademy.net
                      </a>
                    </p>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      message.role === 'user' 
                        ? '' 
                        : ''
                    }`}
                    style={{
                      background: message.role === 'user' 
                        ? 'linear-gradient(135deg, #FFD700, #FFA500)' 
                        : 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 165, 0, 0.3))'
                    }}
                  >
                    {message.role === 'user' 
                      ? <User className="w-4 h-4 text-black" />
                      : <Bot className="w-4 h-4 text-yellow-500" />
                    }
                  </div>
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? ''
                        : 'bg-white/5 text-white border border-white/10'
                    }`}
                    style={message.role === 'user' ? {
                      background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                      color: '#000'
                    } : {}}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-black/50' : 'text-gray-500'}`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 165, 0, 0.3))' }}
                  >
                    <Bot className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div className="bg-white/5 rounded-2xl px-4 py-3 border border-white/10">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
                      <span className="text-sm text-gray-400">جارٍ التحليل...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)' }}>
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="اكتب رسالتك..."
                  disabled={isLoading}
                  className="flex-1 text-white placeholder:text-gray-500 focus:ring-yellow-500/20"
                  style={{ 
                    direction: 'rtl',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 215, 0, 0.3)'
                  }}
                />
                <Button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                    color: '#000'
                  }}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
              {showDeleteConfirm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/90 flex items-center justify-center z-10"
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                    className="rounded-2xl p-6 max-w-xs mx-4"
                    style={{ background: '#1a1a2e', border: '1px solid rgba(255, 215, 0, 0.3)' }}
                  >
                    <h4 className="text-white font-bold mb-2 text-center">حذف المحادثة؟</h4>
                    <p className="text-gray-400 text-sm text-center mb-4">سيتم حذف جميع الرسائل نهائياً</p>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setShowDeleteConfirm(false)}
                        className="flex-1"
                        style={{ borderColor: 'rgba(255, 255, 255, 0.2)', color: '#fff' }}
                      >
                        إلغاء
                      </Button>
                      <Button
                        onClick={clearHistory}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                      >
                        حذف
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
