/**
 * 顶部导航栏组件
 * 作用：提供 Logo、主导航入口、分类快捷入口
 */

import Link from "next/link";
import { categories } from "@/lib/articles";

// 主导航链接配置
const navLinks = [
  { href: "/", label: "首页" },
  { href: "/articles", label: "全部文章" },
  { href: "/plan", label: "路线规划" },
  { href: "/ai", label: "AI 问答" },
  { href: "/about", label: "关于" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/45 bg-white/70 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2.5 sm:px-6">
        {/* Logo 区域 */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-600/90 text-xs font-bold text-white shadow-sm ring-1 ring-sky-500/20">
            出
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-950 sm:text-base">
            出国咨询
          </span>
        </Link>

        {/* 桌面端主导航 */}
        <nav className="hidden items-center gap-1.5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-white/70 hover:text-slate-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 移动端菜单 */}
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-slate-200/80 bg-white/65 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm">
            菜单
          </summary>

          <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/70 bg-white/90 p-2 shadow-[0_18px_48px_rgba(15,23,42,0.14)] backdrop-blur-xl">
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
              分类
            </p>

            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="block rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </details>
      </div>

      {/* 分类快捷入口 */}
      <div className="border-t border-slate-200/35 bg-white/35">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-5 py-1 sm:px-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-medium text-slate-400 transition hover:bg-white/65 hover:text-slate-800"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}