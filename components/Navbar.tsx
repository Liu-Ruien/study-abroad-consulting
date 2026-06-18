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
  { href: "/about", label: "关于" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo 区域 */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-sm font-bold text-white">
            出
          </span>
          <span className="text-lg font-bold text-slate-900">出国咨询</span>
        </Link>

        {/* 桌面端主导航 */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-sky-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 移动端菜单 */}
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
            菜单
          </summary>

          <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
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
                className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </details>
      </div>

      {/* 分类快捷入口 */}
      <div className="border-t border-slate-100">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-sky-50 hover:text-sky-700"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}