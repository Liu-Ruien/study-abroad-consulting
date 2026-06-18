/**
 * 底部页脚组件
 * 展示网站简介、分类链接、快速入口与版权信息
 */
import Link from "next/link";
import { categories } from "@/lib/articles";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-xs font-bold text-white">
                出
              </span>
              <span className="font-semibold text-slate-900">出国咨询</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              个人开发的出国信息整理平台，专注日本留学、新西兰留学与海外生活实用内容。
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">内容分类</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
	  <li key={category.slug}>
	    <Link href={`/categories/${category.slug}`}>
	      {category.name}
 	   </Link>
 	 </li>
	))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/articles"
                  className="text-sm text-slate-600 transition-colors hover:text-sky-700"
                >
                  全部文章
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-600 transition-colors hover:text-sky-700"
                >
                  关于本站
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} 出国咨询 · MVP 第一版 · 内容仅供参考
        </div>
      </div>
    </footer>
  );
}
