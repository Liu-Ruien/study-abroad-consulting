"use client";

/**
 * 底部页脚组件
 * 展示网站简介、分类链接、快速入口与版权信息
 */

import Link from "next/link";
import { categories } from "@/lib/articles";
import { useLanguage } from "@/components/LanguageProvider";
import {
  footerQuickLinkOrder,
  getCategoryLabel,
  uiStrings,
} from "@/lib/i18n/ui-strings";
import { linkMuted } from "@/lib/ui/card-system";

const footerLinkClass = linkMuted;

export default function Footer() {
  const { language } = useLanguage();
  const strings = uiStrings[language];
  const quickLinks = footerQuickLinkOrder.map((key) => strings.navLinks[key]);

  return (
    <footer className="mt-auto border-t border-sky-100/80 bg-gradient-to-b from-slate-50/90 via-white/95 to-sky-50/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-xs font-bold text-white shadow-sm">
                出
              </span>
              <span className="font-semibold text-slate-900">
                {strings.siteName}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              {strings.footerIntro}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              {strings.footerCategoriesTitle}
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className={footerLinkClass}
                  >
                    {getCategoryLabel(language, category.slug)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              {strings.footerQuickLinksTitle}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200/80 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {strings.footerCopyright}
        </div>
      </div>
    </footer>
  );
}
