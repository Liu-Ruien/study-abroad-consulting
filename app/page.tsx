// 首页（极简入口页）
// 作用：只做导航，不放业务逻辑

import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto p-10">

      {/* 标题 */}
      <h1 className="text-3xl font-bold mb-4">
        出国咨询网站
      </h1>

      {/* 简介 */}
      <p className="text-gray-600 mb-8">
        免费出国信息整理平台（日本 / 新西兰 / 签证 / 生活）
      </p>

      {/* 入口按钮 */}
      <Link
        href="/articles"
        className="px-4 py-2 bg-black text-white rounded"
      >
        进入文章列表
      </Link>

    </div>
  );
}