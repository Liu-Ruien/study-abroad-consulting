export type Language = "zh" | "ja" | "en";

export const LANGUAGE_STORAGE_KEY = "overseas-consulting-language";

export const languageOptions: {
  id: Language;
  label: string;
  navbarLabel: string;
}[] = [
  { id: "zh", label: "中文", navbarLabel: "中文" },
  { id: "ja", label: "日本語", navbarLabel: "日本語" },
  { id: "en", label: "English", navbarLabel: "EN" },
];

export function isLanguage(value: string | null | undefined): value is Language {
  return value === "zh" || value === "ja" || value === "en";
}

export function readStoredLanguage(): Language | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isLanguage(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function writeStoredLanguage(language: Language) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // ignore storage errors
  }
}

export const htmlLangByLanguage: Record<Language, string> = {
  zh: "zh-CN",
  ja: "ja",
  en: "en",
};
