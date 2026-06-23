"use client";

/**
 * 顶部导航栏组件
 * 作用：提供 Logo、主导航入口、分类快捷入口与全站语言切换
 */

import Link from "next/link";
import { categories } from "@/lib/articles";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageDropdown from "@/components/LanguageDropdown";
import { getCategoryLabel, navLinkOrder, uiStrings } from "@/lib/i18n/ui-strings";
import { navbarShell, navbarSubBar } from "@/lib/ui/card-system";

export default function Navbar() {
  const { language } = useLanguage();
  const strings = uiStrings[language];
  const navLinks = navLinkOrder.map((key) => strings.navLinks[key]);

  return (
    <header className={navbarShell}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-2.5 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-600/90 text-xs font-bold text-white shadow-sm ring-1 ring-sky-500/20">
            出
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-950 sm:text-base">
            {strings.siteName}
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-sky-50/80 hover:text-slate-950"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <LanguageDropdown className="ml-1" />
        </div>

        <div className="md:hidden">
          <details className="relative">
            <summary className="cursor-pointer list-none rounded-full border border-slate-200/80 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm">
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

      <div className={navbarSubBar}>
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-5 py-1 sm:px-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-medium text-slate-500 transition hover:bg-sky-50/80 hover:text-slate-800"
            >
              {getCategoryLabel(language, category.slug)}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
