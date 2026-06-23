"use client";

import { useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { caseStudyContent } from "@/lib/case-study-i18n";
import CaseStudyPresentation from "@/components/case-study/CaseStudyPresentation";

export default function CaseStudyContent() {
  const { language } = useLanguage();
  const content = caseStudyContent[language];

  useEffect(() => {
    document.documentElement.classList.add("case-study-presentation-page");
    document.body.classList.add("case-study-presentation-page");

    return () => {
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
