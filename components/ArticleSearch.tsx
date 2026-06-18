"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Article, categories } from "@/lib/articles";

const categoryLabels: Record<string, string> = {
  "japan-study": "日本留学",
  "new-zealand-study": "新西兰留学",
  "visa-guide": "签证指南",
  "overseas-life": "海外生活",
};

export default function ArticleSearch({
  articles,
}: {
  articles: Article[];
}) {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchCategory =
        category === "all" || article.category === category;

      const matchKeyword =
        article.title.toLowerCase().includes(keyword.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(keyword.toLowerCase());

      return matchCategory && matchKeyword;
    });
  }, [articles, keyword, category]);

  return (
    <div className="space-y-6">

      {/* 搜索 */}
      <div className="flex gap-2">
        <input
          className="border p-2 rounded w-full"
          placeholder="搜索文章（标题/简介）"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button
          className="px-4 py-2 border rounded"
          onClick={() => setKeyword("")}
        >
          清空
        </button>
      </div>

      {/* 分类 */}
      <div className="flex gap-2 flex-wrap">
        <button
          className={`px-3 py-1 border rounded ${
            category === "all" ? "bg-black text-white" : ""
          }`}
          onClick={() => setCategory("all")}
        >
          全部
        </button>

        {categories.map((cat) => (
	  <button
	    key={cat.slug}
	    className={`px-3 py-1 border rounded ${
   	   category === cat.slug ? "bg-black text-white" : ""
  	  }`}
  	  onClick={() => setCategory(cat.slug)}
 	 >
  	  {cat.name}
 	 </button>
	))}
      </div>

      {/* 列表 */}
      <div className="grid gap-4">
        {filteredArticles.length === 0 ? (
          <p className="text-gray-500">没有找到相关文章</p>
        ) : (
          filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="border p-4 rounded hover:shadow transition"
            >
              <h2 className="font-bold">{article.title}</h2>
              <p className="text-gray-600 text-sm">{article.excerpt}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}