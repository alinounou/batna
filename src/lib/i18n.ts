import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { translations, Language, TranslationKeys } from '@/locales';

interface I18nState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
  isRTL: boolean;
}

export const useI18n = create<I18nState>()(
  persist(
    (set, get) => ({
      language: 'en',
      setLanguage: (lang) => set({ 
        language: lang, 
        t: translations[lang],
        isRTL: lang === 'ar',
      }),
      t: translations.en,
      isRTL: false,
    }),
    {
      name: 'batna-language',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.t = translations[state.language];
          state.isRTL = state.language === 'ar';
        }
      },
    }
  )
);

// Initialize language on first load
if (typeof window !== 'undefined') {
  const state = useI18n.getState();
  state.setLanguage(state.language);
}

// Helper hook for nested translations
export function useTranslation() {
  const { t, language, setLanguage, isRTL } = useI18n();
  
  return {
    t,
    language,
    setLanguage,
    isRTL,
    direction: isRTL ? 'rtl' : 'ltr',
  };
}
