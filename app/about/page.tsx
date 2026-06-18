/**
 * 关于页面
 * 介绍网站定位、内容分类、发展路线与免责声明
 */
import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/articles";

export const metadata: Metadata = {
  title: "关于本站",
  description: "了解出国咨询网站的定位、内容方向与未来发展规划。",
};

/** 网站各阶段发展路线（与 README 保持一致） */
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
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">关于本站</h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">
        「出国咨询」是一个个人开发的出国信息整理平台，旨在把分散的留学、签证与海外生活信息结构化呈现，帮助有出国计划的同学快速入门。
      </p>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">网站定位</h2>
        <div className="mt-4 space-y-4 text-base leading-8 text-slate-700">
          <p>
            本站目前聚焦日本留学与新西兰留学两大方向，同时覆盖签证材料准备、落地后的银行卡与租房等海外生活话题。
            所有内容以实用为导向，力求语言清晰、结构分明，适合初次了解出国流程的读者。
          </p>
          <p>
            第一版 MVP 采用 Next.js 构建，文章数据暂存于本地 TypeScript 文件，不依赖数据库与第三方服务，
            便于快速迭代与后期扩展。
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">内容分类</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/categories/${category.slug}`}
                className="block rounded-xl border border-slate-200 p-4 transition-colors hover:border-sky-200 hover:bg-sky-50"
              >
                <span className="font-semibold text-slate-900">{category.name}</span>
                <p className="mt-1 text-sm text-slate-600">{category.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">发展路线</h2>
        <div className="mt-6 space-y-6">
          {roadmap.map((item) => (
            <div
              key={item.phase}
              className="rounded-2xl border border-slate-200 p-6"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-slate-900">{item.phase}</h3>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                  {item.status}
                </span>
              </div>
              <ul className="space-y-1.5">
                {item.items.map((feature) => (
                  <li key={feature} className="text-sm text-slate-600">
                    · {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl bg-sky-50 p-8">
        <h2 className="text-xl font-bold text-slate-900">免责声明</h2>
        <p className="mt-4 text-sm leading-7 text-slate-700">
          本站内容仅供参考，不构成任何法律、移民或留学申请建议。各国政策、院校要求与费用标准可能随时变化，
          请以官方机构、使领馆及院校发布的最新信息为准。如需个性化咨询，请等待后续付费咨询功能上线，或自行联系专业机构。
        </p>
      </section>
    </div>
  );
}
