"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { getPageContent } from "@/lib/i18n/content";

export function usePageContent() {
  const { language } = useLanguage();
  return getPageContent(language);
}
