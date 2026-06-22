import { articles } from "@/lib/articles";
import ArticleSearch from "@/components/ArticleSearch";
import { cardHero } from "@/lib/ui/card-system";

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <section className={`mb-8 px-6 py-8 sm:px-8 ${cardHero}`}>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-950 sm:text-3xl">
          全部文章
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
          搜索与分类筛选出国相关指南，内容仅供信息整理参考。
        </p>
      </section>

      <ArticleSearch articles={articles} />
    </div>
  );
}
