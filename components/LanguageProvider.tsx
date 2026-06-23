"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  htmlLangByLanguage,
  readStoredLanguage,
  writeStoredLanguage,
  type Language,
} from "@/lib/i18n/language";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const DEFAULT_LANGUAGE: Language = "zh";

const LanguageContext = createContext<LanguageContextValue | null>(null);

const listeners = new Set<() => void>();
let languageSnapshot: Language = DEFAULT_LANGUAGE;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getLanguageSnapshot(): Language {
  if (typeof window !== "undefined") {
    const stored = readStoredLanguage();
    languageSnapshot = stored ?? DEFAULT_LANGUAGE;
  }

  return languageSnapshot;
}

function getServerLanguageSnapshot(): Language {
  return DEFAULT_LANGUAGE;
}

function setLanguageSnapshot(nextLanguage: Language) {
  languageSnapshot = nextLanguage;
  writeStoredLanguage(nextLanguage);
  listeners.forEach((listener) => listener());
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(
    subscribe,
    getLanguageSnapshot,
    getServerLanguageSnapshot
  );

  useEffect(() => {
    document.documentElement.lang = htmlLangByLanguage[language];
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageSnapshot(nextLanguage);
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language, setLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
