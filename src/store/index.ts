import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // Calculator state
  selectedCalculator: string;
  setSelectedCalculator: (id: string) => void;
  
  // Theme preferences
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  
  // User preferences
  defaultAccountSize: number;
  defaultRiskPercent: number;
  setDefaultAccountSize: (size: number) => void;
  setDefaultRiskPercent: (percent: number) => void;
  
  // Recent calculations history
  recentCalculations: Array<{
    id: string;
    calculatorId: string;
    inputs: Record<string, string | number>;
    result: string | number;
    timestamp: Date;
  }>;
  addRecentCalculation: (calc: {
    id: string;
    calculatorId: string;
    inputs: Record<string, string | number>;
    result: string | number;
  }) => void;
  clearHistory: () => void;
  
  // AI Analysis state
  aiAnalysisHistory: Array<{
    id: string;
    market: string;
    symbol: string;
    timeframe: string;
    prompt: string;
    result: {
      bias: string;
      keyLevels: Array<{ price: number; type: string; strength: number }>;
      scenarios: string[];
      riskNote: string;
      confidence: number;
    };
    timestamp: Date;
  }>;
  addAIAnalysis: (analysis: {
    id: string;
    market: string;
    symbol: string;
    timeframe: string;
    prompt: string;
    result: {
      bias: string;
      keyLevels: Array<{ price: number; type: string; strength: number }>;
      scenarios: string[];
      riskNote: string;
      confidence: number;
    };
  }) => void;
  clearAIHistory: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Calculator state
      selectedCalculator: 'fibonacci',
      setSelectedCalculator: (id) => set({ selectedCalculator: id }),
      
      // Theme preferences
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      
      // User preferences
      defaultAccountSize: 10000,
      defaultRiskPercent: 2,
      setDefaultAccountSize: (size) => set({ defaultAccountSize: size }),
      setDefaultRiskPercent: (percent) => set({ defaultRiskPercent: percent }),
      
      // Recent calculations history
      recentCalculations: [],
      addRecentCalculation: (calc) => set((state) => ({
        recentCalculations: [
          { ...calc, timestamp: new Date() },
          ...state.recentCalculations.slice(0, 49), // Keep last 50
        ],
      })),
      clearHistory: () => set({ recentCalculations: [] }),
      
      // AI Analysis state
      aiAnalysisHistory: [],
      addAIAnalysis: (analysis) => set((state) => ({
        aiAnalysisHistory: [
          { ...analysis, timestamp: new Date() },
          ...state.aiAnalysisHistory.slice(0, 19), // Keep last 20
        ],
      })),
      clearAIHistory: () => set({ aiAnalysisHistory: [] }),
    }),
    {
      name: 'infinity-algo-storage',
      partialize: (state) => ({
        selectedCalculator: state.selectedCalculator,
        sidebarCollapsed: state.sidebarCollapsed,
        defaultAccountSize: state.defaultAccountSize,
        defaultRiskPercent: state.defaultRiskPercent,
        recentCalculations: state.recentCalculations,
        aiAnalysisHistory: state.aiAnalysisHistory,
      }),
    }
  )
);

// Utility hooks
export const useSelectedCalculator = () => 
  useAppStore((state) => state.selectedCalculator);

export const useUserPreferences = () => 
  useAppStore((state) => ({
    defaultAccountSize: state.defaultAccountSize,
    defaultRiskPercent: state.defaultRiskPercent,
    setDefaultAccountSize: state.setDefaultAccountSize,
    setDefaultRiskPercent: state.setDefaultRiskPercent,
  }));

export const useCalculationHistory = () =>
  useAppStore((state) => ({
    recentCalculations: state.recentCalculations,
    addRecentCalculation: state.addRecentCalculation,
    clearHistory: state.clearHistory,
  }));
