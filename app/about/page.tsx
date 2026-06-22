/**
 * 关于页面
 * 介绍网站定位、内容分类、发展路线与免责声明
 */
import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/articles";
import {
  cardHero,
  cardHover,
  cardInfo,
  cardTintIndigo,
  cardTintSky,
} from "@/lib/ui/card-system";

export const metadata: Metadata = {
  title: "关于本站",
  description: "了解出国咨询网站的定位、内容方向与未来发展规划。",
};

const roadmap = [
  {
    phase: "第一版（当前）",
    status: "进行中",
    items: ["免费文章与分类浏览", "本地静态数据，无需登录", "现代简洁的阅读体验"],
  },
  {
    phase: "第二版",
    status: "规划中",
    items: ["文章搜索功能"],
  },
  {
    phase: "第三版",
    status: "规划中",
    items: ["AI 问答页面"],
  },
  {
    phase: "第四版",
    status: "规划中",
    items: ["用户登录"],
  },
  {
    phase: "第五版",
    status: "规划中",
    items: ["新用户免费提问次数"],
  },
  {
    phase: "第六版",
    status: "规划中",
    items: ["付费解锁更多提问次数"],
  },
  {
    phase: "第七版",
    status: "规划中",
    items: ["预约一对一咨询"],
  },
  {
    phase: "第八版",
    status: "规划中",
    items: ["后台管理文章"],
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <section className={`mb-10 px-6 py-8 sm:px-8 ${cardHero}`}>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
          关于本站
        </h1>
        <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
          「出国咨询」是个人开发的出国信息整理平台，也是面向日本 IT
          求职的作品集项目之一。本站把分散的留学、签证与海外生活信息结构化呈现，并配合路线规划、本地
          AI 问答 MVP 与项目案例页，展示工程实现与产品思路。
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-gray-950">网站定位</h2>
        <div
          className={`mt-4 space-y-4 p-6 text-base leading-relaxed text-gray-700 sm:p-7 ${cardInfo}`}
        >
          <p>
            本站目前聚焦日本留学与新西兰留学两大方向，同时覆盖签证材料准备、落地后的银行卡与租房等海外生活话题。
            所有内容以实用为导向，力求语言清晰、结构分明。
          </p>
          <p>
            项目采用 Next.js 构建，文章数据暂存于本地 TypeScript
            文件，不依赖数据库与第三方服务，便于快速迭代与作品集演示。
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-gray-950">内容分类</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {categories.map((category, index) => (
            <li key={category.slug}>
              <Link
                href={`/categories/${category.slug}`}
                className={`block p-4 ${index % 2 === 0 ? cardTintSky : cardTintIndigo} ${cardHover}`}
              >
                <span className="font-semibold text-gray-950">
                  {category.name}
                </span>
                <p className="mt-1 text-sm text-gray-600">
                  {category.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-gray-950">发展路线</h2>
        <div className="mt-6 space-y-4">
          {roadmap.map((item) => (
            <div key={item.phase} className={`p-6 ${cardInfo}`}>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-gray-950">{item.phase}</h3>
                <span className="rounded-full border border-sky-100/80 bg-sky-50/80 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                  {item.status}
                </span>
              </div>
              <ul className="space-y-1.5">
                {item.items.map((feature) => (
                  <li key={feature} className="text-sm text-gray-600">
                    · {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={`mt-12 p-8 ${cardTintSky}`}>
        <h2 className="text-xl font-semibold text-gray-950">免责声明</h2>
        <p className="mt-4 text-sm leading-7 text-gray-700">
          本站内容仅供参考，不构成任何法律、移民或留学申请建议。各国政策、院校要求与费用标准可能随时变化，
          请以官方机构、使领馆及院校发布的最新信息为准。本站为作品集演示项目，不提供签证、移民、录取或就业承诺。
        </p>
      </section>
    </div>
  );
}
