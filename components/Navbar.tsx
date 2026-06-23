"use client";

/**
 * 顶部导航栏组件
 * 作用：提供 Logo、主导航入口、分类快捷入口与全站语言切换
 */

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/articles";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageDropdown from "@/components/LanguageDropdown";
import {
  footerQuickLinkOrder,
  getCategoryLabel,
  navLinkOrder,
  uiStrings,
} from "@/lib/i18n/ui-strings";
import { navbarSubBar } from "@/lib/ui/card-system";

export default function Navbar() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const { language } = useLanguage();
  const pathname = usePathname();
  const strings = uiStrings[language];
  const navLinks = navLinkOrder.map((key) => strings.navLinks[key]);
  const quickLinks = footerQuickLinkOrder.map((key) => strings.navLinks[key]);
  const isCaseStudy = pathname === "/case-study";

  return (
    <div
      onMouseEnter={() => setIsMegaMenuOpen(true)}
      onMouseLeave={() => setIsMegaMenuOpen(false)}
      className="relative sticky top-0 z-50"
    >
      <header
        className={
          isCaseStudy
            ? "border-b border-white/10 bg-[#050505]/82 text-white shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl"
            : "border-b border-slate-200/70 bg-white/95 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-white/90"
        }
      >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-2.5 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-600/90 text-xs font-bold text-white shadow-sm ring-1 ring-sky-500/20">
            出
          </span>
          <span
            className={`text-sm font-semibold tracking-tight sm:text-base ${
              isCaseStudy ? "text-white" : "text-slate-950"
            }`}
          >
            {strings.siteName}
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  isCaseStudy
                    ? "text-slate-300 hover:bg-white/10 hover:text-white"
                    : "text-slate-500 hover:bg-sky-50/80 hover:text-slate-950"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <LanguageDropdown className="ml-1" />
        </div>

        <div className="md:hidden">
          <details className="relative">
            <summary
              className={`cursor-pointer list-none rounded-full border px-3 py-1.5 text-sm font-medium shadow-sm ${
                isCaseStudy
                  ? "border-white/15 bg-white/10 text-slate-100"
                  : "border-slate-200/80 bg-white text-slate-700"
              }`}
            >
              {strings.menu}
            </summary>

            <div className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-slate-200/70 bg-white/95 p-2 shadow-[0_12px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-2 border-t border-slate-100" />

              <p className="px-3 py-1 text-xs font-medium text-slate-400">
                {strings.categories}
              </p>

              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="block rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  {getCategoryLabel(language, category.slug)}
                </Link>
              ))}

              <div className="my-2 border-t border-slate-100" />

              <LanguageDropdown variant="menu" />
            </div>
          </details>
        </div>
      </div>

      <div
        className={
          isCaseStudy
            ? "border-t border-white/10 bg-[#050505]/72 backdrop-blur-xl"
            : navbarSubBar
        }
      >
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-5 py-1 sm:px-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-medium transition ${
                isCaseStudy
                  ? "text-slate-400 hover:bg-white/10 hover:text-slate-100"
                  : "text-slate-500 hover:bg-sky-50/80 hover:text-slate-800"
              }`}
            >
              {getCategoryLabel(language, category.slug)}
            </Link>
          ))}
        </div>
      </div>
      </header>

      <div
        className={`pointer-events-none fixed inset-x-0 bottom-0 top-[var(--case-study-nav-height)] z-40 hidden opacity-0 transition duration-200 md:block ${
          isMegaMenuOpen ? "opacity-100" : ""
        } ${
          isCaseStudy ? "bg-black/20 backdrop-blur-md" : "bg-white/20 backdrop-blur-md"
        }`}
        aria-hidden
      />

      <div
        className={`pointer-events-none absolute inset-x-0 top-full hidden translate-y-[-6px] opacity-0 transition duration-200 md:block ${
          isMegaMenuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : ""
        } ${
          isCaseStudy
            ? "border-b border-white/10 bg-black/70 text-slate-300 shadow-2xl shadow-black/30 backdrop-blur-2xl"
            : "border-b border-slate-200/70 bg-white/85 text-slate-600 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl"
        }`}
      >
        <div className="mx-auto grid max-w-5xl gap-8 px-6 py-7 lg:grid-cols-[1fr_1fr_1.15fr]">
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                isCaseStudy ? "text-sky-300/80" : "text-sky-700"
              }`}
            >
              {strings.footerCategoriesTitle}
            </p>
            <div className="mt-4 grid gap-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className={`rounded-2xl px-3 py-2 text-sm transition ${
                    isCaseStudy
                      ? "text-slate-300 hover:bg-white/10 hover:text-white"
                      : "text-slate-600 hover:bg-sky-50/80 hover:text-slate-950"
                  }`}
                >
                  {getCategoryLabel(language, category.slug)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                isCaseStudy ? "text-sky-300/80" : "text-sky-700"
              }`}
            >
              {strings.footerQuickLinksTitle}
            </p>
            <div className="mt-4 grid gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-2xl px-3 py-2 text-sm transition ${
                    isCaseStudy
                      ? "text-slate-300 hover:bg-white/10 hover:text-white"
                      : "text-slate-600 hover:bg-sky-50/80 hover:text-slate-950"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div
            className={`rounded-[1.75rem] border p-5 ${
              isCaseStudy
                ? "border-white/10 bg-white/[0.045]"
                : "border-slate-200/70 bg-white/65"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-xs font-bold text-white shadow-sm">
                出
              </span>
              <span
                className={`font-semibold ${
                  isCaseStudy ? "text-white" : "text-slate-950"
                }`}
              >
                {strings.siteName}
              </span>
            </div>
            <p
              className={`mt-4 text-sm leading-relaxed ${
                isCaseStudy ? "text-slate-400" : "text-slate-600"
              }`}
            >
              {strings.footerIntro}
            </p>
            <p
              className={`mt-4 text-xs leading-relaxed ${
                isCaseStudy ? "text-slate-500" : "text-slate-500"
              }`}
            >
              Personal portfolio project. Content is for reference only.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/case-study"
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  isCaseStudy
                    ? "border-white/10 bg-white/[0.06] text-slate-300 hover:text-white"
                    : "border-slate-200/70 bg-white/70 text-slate-600 hover:text-slate-950"
                }`}
              >
                Case Study
              </Link>
              <Link
                href="/about"
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  isCaseStudy
                    ? "border-white/10 bg-white/[0.06] text-slate-300 hover:text-white"
                    : "border-slate-200/70 bg-white/70 text-slate-600 hover:text-slate-950"
                }`}
              >
                README
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
