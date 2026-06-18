/**
 * 文章卡片组件
 * 作用：在首页、文章列表页、分类页中展示单篇文章的摘要信息
 */

import Link from "next/link";
import type { Article } from "@/lib/articles";
import { getCategoryName } from "@/lib/articles";

/** 组件入参：一篇完整的文章对象 */
interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-sky-300 hover:shadow-sm"
    >
      {/* 文章基础信息 */}
      <div className="mb-3 flex items-center gap-2 text-xs">
        <span className="rounded-full bg-sky-50 px-2 py-1 text-sky-700">
          {getCategoryName(article.category)}
        </span>

        {/* 当前 MVP 阶段先使用固定阅读时间，后期可以改成真实字段 */}
        <span className="text-slate-400">约 3 分钟阅读</span>
      </div>

      {/* 文章标题 */}
      <h2 className="mb-2 text-lg font-semibold leading-snug text-slate-900 group-hover:text-sky-700">
        {article.title}
      </h2>

      {/* 文章简介 */}
      <p className="text-sm leading-6 text-slate-600">{article.excerpt}</p>
    </Link>
  );
}