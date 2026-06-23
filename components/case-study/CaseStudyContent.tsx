"use client";

import { useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { caseStudyContent } from "@/lib/case-study-i18n";
import CaseStudyPresentation from "@/components/case-study/CaseStudyPresentation";

export default function CaseStudyContent() {
  const { language } = useLanguage();
  const content = caseStudyContent[language];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const syncPresentationClass = () => {
      const targets = [document.documentElement, document.body];

      for (const target of targets) {
        if (mediaQuery.matches) {
          target.classList.add("case-study-presentation-page");
        } else {
          target.classList.remove("case-study-presentation-page");
        }
      }
    };

    syncPresentationClass();
    mediaQuery.addEventListener("change", syncPresentationClass);

    return () => {
      mediaQuery.removeEventListener("change", syncPresentationClass);
      document.documentElement.classList.remove("case-study-presentation-page");
      document.body.classList.remove("case-study-presentation-page");
    };
  }, []);

  return (
    <main className="overflow-x-hidden bg-[#05070d] text-white md:h-[calc(100svh-var(--case-study-nav-height))] md:overflow-hidden">
      <CaseStudyPresentation content={content} />
    </main>
  );
}
