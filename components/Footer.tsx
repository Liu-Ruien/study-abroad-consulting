"use client";

/**
 * 底部页脚组件
 * 展示网站简介、分类链接、快速入口与版权信息
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/articles";
import { useLanguage } from "@/components/LanguageProvider";
import {
  footerQuickLinkOrder,
  getCategoryLabel,
  uiStrings,
} from "@/lib/i18n/ui-strings";
import { linkMuted } from "@/lib/ui/card-system";

export default function Footer() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const strings = uiStrings[language];
  const quickLinks = footerQuickLinkOrder.map((key) => strings.navLinks[key]);
  const isDark = pathname === "/case-study";
  const footerLinkClass = isDark
    ? "text-sm text-slate-400 transition-colors hover:text-white"
    : linkMuted;

  if (isDark) {
    return null;
  }

  return (
    <footer
      className={
        isDark
          ? "mt-auto border-t border-white/10 bg-[#05070d] text-slate-400 [background-image:radial-gradient(circle_at_18%_0%,rgba(56,189,248,0.08),transparent_32%),radial-gradient(circle_at_82%_100%,rgba(129,140,248,0.06),transparent_38%)]"
          : "mt-auto border-t border-sky-100/80 bg-gradient-to-b from-slate-50/90 via-white/95 to-sky-50/30"
      }
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-xs font-bold text-white shadow-sm">
                出
              </span>
              <span className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                {strings.siteName}
              </span>
            </div>
            <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              {strings.footerIntro}
            </p>
          </div>

          <div>
            <h3 className={`mb-3 text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
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
            <h3 className={`mb-3 text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
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

        <div
          className={`mt-10 border-t pt-6 text-center text-xs ${
            isDark ? "border-white/10 text-slate-500" : "border-slate-200/80 text-slate-500"
          }`}
        >
          © {new Date().getFullYear()} {strings.footerCopyright}
        </div>
      </div>
    </footer>
  );
}
