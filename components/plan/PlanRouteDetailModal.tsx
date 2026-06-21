"use client";

import Link from "next/link";
import {
  getBudgetLabel,
  type RecommendedPlanRoute,
  type RiskLevel,
} from "@/lib/plan-routes";

type PlanRouteDetailModalProps = {
  route: RecommendedPlanRoute;
  riskDisplayLabels: Record<RiskLevel, string>;
  onClose: () => void;
};

export default function PlanRouteDetailModal({
  route,
  riskDisplayLabels,
  onClose,
}: PlanRouteDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4 py-6 backdrop-blur-sm">
      <div
        className="flex max-h-[86vh] w-full max-w-4xl flex-col overflow-hidden rounded-[32px] border border-white/80 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.22)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-white px-6 py-5">
          <div>
            <p className="mb-2 text-sm font-medium text-sky-700">
              {route.country} · 路线详细分析
            </p>

            <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
              {route.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              这份内容会帮助你判断该路线是否真的适合自己，重点关注预算、语言、风险和下一步行动。
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 ring-1 ring-slate-200/70 transition hover:bg-slate-200/70"
          >
            关闭
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain px-6 py-5 pr-4 [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:rgba(203,213,225,0.25)_transparent] hover:[scrollbar-color:rgba(148,163,184,0.55)_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200/25 [&::-webkit-scrollbar-thumb]:transition-colors [&::-webkit-scrollbar-thumb]:duration-300 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300/70">
          <section className="rounded-3xl bg-slate-50/80 p-5 ring-1 ring-slate-200/70">
            <h4 className="mb-3 font-semibold text-slate-900">
              路线概述
            </h4>

            <p className="text-sm leading-7 text-slate-600">
              {route.summary}
            </p>
          </section>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <section className="rounded-3xl bg-slate-50/80 p-5 ring-1 ring-slate-200/70">
              <p className="text-xs font-medium text-slate-500">国家 / 地区</p>
              <p className="mt-2 font-semibold text-slate-900">{route.country}</p>
            </section>

            <section className="rounded-3xl bg-slate-50/80 p-5 ring-1 ring-slate-200/70">
              <p className="text-xs font-medium text-slate-500">预算判断</p>
              <p className="mt-2 font-semibold text-slate-900">
                {getBudgetLabel(route.budgetLevel)}
              </p>
            </section>

            <section className="rounded-3xl bg-slate-50/80 p-5 ring-1 ring-slate-200/70">
              <p className="text-xs font-medium text-slate-500">路线难度</p>
              <p className="mt-2 font-semibold text-slate-900">
                {riskDisplayLabels[route.riskLevel]}
              </p>
            </section>
          </div>

          <section className="mt-4 rounded-3xl bg-slate-50/80 p-5 ring-1 ring-slate-200/70">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-semibold text-slate-900">路线匹配度</h4>
              <strong className="text-sky-700">{route.matchScore}%</strong>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-sky-600"
                style={{ width: `${route.matchScore}%` }}
              />
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              匹配度表示该路线与你当前目标、预算、语言和基础条件的接近程度，不代表录取、签证或就业成功率。
            </p>
          </section>

          <section className="mt-4 rounded-3xl bg-slate-50/80 p-5 ring-1 ring-slate-200/70">
            <h4 className="mb-3 font-semibold text-slate-900">
              为什么推荐这条路线
            </h4>

            <ul className="space-y-2 text-sm leading-6 text-slate-600">
              {route.matchReasons.map((reason) => (
                <li key={reason}>• {reason}</li>
              ))}
            </ul>
          </section>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <section className="rounded-3xl bg-slate-50/80 p-5 ring-1 ring-slate-200/70">
              <h4 className="mb-3 font-semibold text-slate-900">适合人群</h4>
              <ul className="space-y-2 text-sm leading-6 text-slate-600">
                {route.suitableFor.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl bg-slate-50/80 p-5 ring-1 ring-slate-200/70">
              <h4 className="mb-3 font-semibold text-slate-900">路线优势</h4>
              <ul className="space-y-2 text-sm leading-6 text-slate-600">
                {route.advantages.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl bg-slate-50/80 p-5 ring-1 ring-slate-200/70">
              <h4 className="mb-3 font-semibold text-slate-900">风险提醒</h4>
              <ul className="space-y-2 text-sm leading-6 text-slate-600">
                {route.risks.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl bg-slate-50/80 p-5 ring-1 ring-slate-200/70">
              <h4 className="mb-3 font-semibold text-slate-900">下一步建议</h4>
              <ul className="space-y-2 text-sm leading-6 text-slate-600">
                {route.nextSteps.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {route.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/80 px-3 py-1 text-xs text-slate-600 shadow-sm ring-1 ring-slate-200/60"
              >
                #{tag}
              </span>
            ))}
          </div>

          <section className="mt-4 rounded-3xl bg-slate-50/80 p-5 ring-1 ring-slate-200/70">
            <h4 className="mb-3 font-semibold text-slate-900">推荐阅读</h4>

            <div className="flex flex-wrap gap-3">
              {route.relatedArticles.map((article) => (
                <Link
                  key={article.href}
                  href={article.href}
                  className="text-sm font-medium text-sky-600 hover:text-sky-700"
                >
                  {article.title} →
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
