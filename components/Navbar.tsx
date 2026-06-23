"use client";

/**
 * 顶部导航栏组件
 * 作用：提供 Logo、主导航入口、分类快捷入口与全站语言切换
 */

import { useEffect, useRef, useState } from "react";
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

const portfolioItemOrder = ["caseStudy", "interviewGuide", "readme"] as const;
const MEGA_MENU_CLOSE_DELAY_MS = 120;

export default function Navbar() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mainRowRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { language } = useLanguage();
  const pathname = usePathname();
  const strings = uiStrings[language];
  const navLinks = navLinkOrder.map((key) => strings.navLinks[key]);
  const quickLinks = footerQuickLinkOrder.map((key) => strings.navLinks[key]);
  const portfolioItems = portfolioItemOrder.map(
    (key) => strings.megaMenuPortfolioItems[key],
  );
  const isCaseStudy = pathname === "/case-study";

  const openMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsMegaMenuOpen(true);
  };

  const scheduleCloseMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
      closeTimerRef.current = null;
    }, MEGA_MENU_CLOSE_DELAY_MS);
  };

  useEffect(() => {
    const syncNavbarHeight = () => {
      if (headerRef.current) {
        document.documentElement.style.setProperty(
          "--navbar-height",
          `${headerRef.current.offsetHeight}px`,
        );
      }
      if (mainRowRef.current) {
        document.documentElement.style.setProperty(
          "--navbar-main-height",
          `${mainRowRef.current.offsetHeight}px`,
        );
      }
    };

    syncNavbarHeight();
    window.addEventListener("resize", syncNavbarHeight);
    return () => window.removeEventListener("resize", syncNavbarHeight);
  }, [isMegaMenuOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const megaPrimaryLinkClass = isCaseStudy
    ? "text-lg font-normal text-white transition-colors duration-150 ease-out hover:text-cyan-300"
    : "text-lg font-normal text-slate-950 transition-colors duration-150 ease-out hover:text-sky-600";

  const megaColumnTitleClass =
    "text-xs font-medium uppercase tracking-widest text-slate-500";

  const megaMutedTextClass = isCaseStudy ? "text-slate-400" : "text-slate-500";

  const megaHoverHandlers = {
    onMouseEnter: openMenu,
    onMouseLeave: scheduleCloseMenu,
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 ${
          isCaseStudy
            ? "bg-[#050505]/88 text-white backdrop-blur-xl"
            : "border-b border-slate-200/70 bg-white/95 text-slate-950 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-white/90"
        } ${isMegaMenuOpen && isCaseStudy ? "border-b border-transparent" : isCaseStudy ? "border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.28)]" : ""}`}
      >
        <div
          ref={mainRowRef}
          className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-2.5 sm:px-6"
        >
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

          <nav
            className="relative hidden items-center gap-1 md:flex"
            {...megaHoverHandlers}
            aria-label="Main navigation"
          >
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

          <div className="hidden shrink-0 md:block">
            <LanguageDropdown
              className="relative z-[70]"
              isDark={isCaseStudy}
              menuClassName="z-[80]"
            />
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

              <div className="absolute right-0 z-[80] mt-2 w-56 rounded-2xl border border-slate-200/70 bg-white/95 p-2 shadow-[0_12px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl">
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

      {isMegaMenuOpen && (
        <div
          className={`navbar-page-blur pointer-events-none fixed inset-x-0 bottom-0 z-40 hidden md:block ${
            isCaseStudy ? "bg-black/15 backdrop-blur-sm" : "bg-white/20 backdrop-blur-sm"
          }`}
          style={{ top: "var(--navbar-height, 5.25rem)" }}
          aria-hidden
        />
      )}

      {isMegaMenuOpen && (
        <div
          className={`navbar-mega-panel fixed inset-x-0 z-[60] hidden md:block ${
            isCaseStudy
              ? "border-t border-white/5 border-b border-white/10 bg-[#161617]/90 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
              : "border-t border-slate-200/70 border-b border-slate-200/80 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl"
          }`}
          style={{ top: "var(--navbar-main-height, 3.25rem)" }}
          {...megaHoverHandlers}
        >
          <div className="mx-auto grid max-w-5xl grid-cols-3 gap-12 px-8 py-8">
            <div>
              <p className={megaColumnTitleClass}>
                {strings.megaMenuColumns.explore}
              </p>
              <ul className="mt-5 space-y-3">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/categories/${category.slug}`}
                      className={megaPrimaryLinkClass}
                    >
                      {getCategoryLabel(language, category.slug)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={megaColumnTitleClass}>
                {strings.megaMenuColumns.pages}
              </p>
              <ul className="mt-5 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={megaPrimaryLinkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={megaColumnTitleClass}>
                {strings.megaMenuColumns.portfolio}
              </p>
              <ul className="mt-5 space-y-5">
                {portfolioItems.map((item) => (
                  <li key={item.label}>
                    {"href" in item && item.href ? (
                      <Link href={item.href} className="group block">
                        <p className={megaPrimaryLinkClass}>{item.label}</p>
                        <p
                          className={`mt-1 text-sm leading-relaxed ${megaMutedTextClass}`}
                        >
                          {item.description}
                        </p>
                      </Link>
                    ) : (
                      <div>
                        <p className={megaPrimaryLinkClass}>{item.label}</p>
                        <p
                          className={`mt-1 text-sm leading-relaxed ${megaMutedTextClass}`}
                        >
                          {item.description}
                        </p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
