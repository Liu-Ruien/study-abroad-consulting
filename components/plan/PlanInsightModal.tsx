"use client";

import type { RecommendedPlanRoute } from "@/lib/plan-routes";
import {
  btnSecondary,
  cardInfo,
  modalHeader,
  modalShell,
  progressFill,
  progressTrack,
} from "@/lib/ui/card-system";

type PlanInsightModalProps = {
  profileSummary: string[];
  insightSummary: string;
  recommendedRoutes: RecommendedPlanRoute[];
  primaryRoute: RecommendedPlanRoute | null;
  onClose: () => void;
};

export default function PlanInsightModal({
  profileSummary,
  insightSummary,
  recommendedRoutes,
  primaryRoute,
  onClose,
}: PlanInsightModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4 py-6 backdrop-blur-sm">
      <div
        className={`flex max-h-[86vh] w-full max-w-4xl flex-col overflow-hidden ${modalShell}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={`flex items-start justify-between gap-4 ${modalHeader}`}>
          <div>
            <p className="mb-2 text-sm font-medium text-sky-700">
              推荐理由总结
            </p>
            <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
              初步推荐路线分析
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              下面内容会结合你的目标国家、预算、语言能力和长期规划，解释系统为什么这样排序。
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`shrink-0 rounded-full px-3 py-1 text-sm font-medium ${btnSecondary}`}
          >
            关闭
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain px-6 py-5 pr-4 [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:rgba(203,213,225,0.25)_transparent] hover:[scrollbar-color:rgba(148,163,184,0.55)_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200/25 [&::-webkit-scrollbar-thumb]:transition-colors [&::-webkit-scrollbar-thumb]:duration-300 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300/70">
          <div className="grid gap-4 md:grid-cols-2">
            <section className={`p-5 ${cardInfo}`}>
              <h4 className="mb-3 font-semibold text-slate-900">
                你的基础画像
              </h4>

              <div className="space-y-3 text-sm">
                {profileSummary.slice(0, 6).map((item) => (
                  <p
                    key={item}
                    className={`px-3 py-2 text-sm text-slate-600 ${cardInfo}`}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </section>

            <section className={`p-5 ${cardInfo}`}>
              <h4 className="mb-3 font-semibold text-slate-900">
                系统判断结论
              </h4>

              <p className="text-sm leading-7 text-slate-600">
                {insightSummary}
              </p>
            </section>
          </div>

          <section className={`mt-4 p-5 ${cardInfo}`}>
            <h4 className="mb-4 font-semibold text-slate-900">
              推荐路线对比
            </h4>

            <div className="grid gap-3 md:grid-cols-3">
              {recommendedRoutes.map((route, index) => (
                <div
                  key={route.id}
                  className={`flex min-h-[220px] flex-col p-4 ${cardInfo}`}
                >
                  <p className="mb-2 text-xs font-medium text-sky-700">
                    推荐 {index + 1} · {route.country}
                  </p>

                  <h5 className="mb-3 min-h-[52px] font-semibold leading-6 text-slate-900">
                    {route.title}
                  </h5>

                  <div className="mt-auto">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-slate-500">匹配度</span>
                      <strong className="text-sky-700">{route.matchScore}%</strong>
                    </div>

                    <div className={progressTrack}>
                      <div
                        className={progressFill}
                        style={{ width: `${route.matchScore}%` }}
                      />
                    </div>

                    <p className="text-xs leading-5 text-slate-500">
                      {route.matchReasons.slice(0, 2).join("；")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <section className={`p-5 ${cardInfo}`}>
              <h4 className="mb-3 font-semibold text-slate-900">
                需要重点注意
              </h4>

              <ul className="space-y-2 text-sm leading-6 text-slate-600">
                <li>• 匹配度不是录取率、签证通过率或就业成功率。</li>
                <li>• 如果目标国家路线排第一但分数不高，说明系统尊重你的目标，但仍认为风险需要谨慎评估。</li>
                <li>• 高预算、高语言门槛或政策变化快的路线，建议优先做人工复核。</li>
              </ul>
            </section>

            <section className={`p-5 ${cardInfo}`}>
              <h4 className="mb-3 font-semibold text-slate-900">
                下一步建议
              </h4>

              <ul className="space-y-2 text-sm leading-6 text-slate-600">
                {(primaryRoute?.nextSteps.slice(0, 3) ?? [
                  "先确认目标国家、预算和语言能力是否匹配。",
                  "再核实签证、学校、项目和费用信息。",
                  "最后决定是否需要一对一人工评估。",
                ]).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
