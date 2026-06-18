"use client";

// 出国路线规划页面
// 作用：收集用户基本情况，并基于本地规则输出路线建议、用户画像和推荐理由
// 当前阶段不接真实 AI、不接数据库，只做产品原型

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  budgetOptions,
  countryPreferenceOptions,
  createPlanInsightSummary,
  createUserProfileSummary,
  getBudgetLabel,
  getRecommendedRoutes,
  languageOptions,
  preferenceOptions,
  riskLevelLabels,
  type BudgetLevel,
  type CountryPreference,
  type LanguageLevel,
  type PlanFormState,
  type PreferenceAnswer,
  type RiskLevel,
} from "@/lib/plan-routes";

// 表单初始值
const initialForm: PlanFormState = {
  age: "",
  education: "",
  major: "",
  budgetLevel: "unknown",
  languageLevel: "basic",
  countryPreference: "any",
  wantsPartTimeJob: "unknown",
  wantsLongTermStay: "unknown",
  acceptsLowBudgetRoute: "unknown",
};

// 风险等级样式
const riskLevelStyles: Record<RiskLevel, string> = {
  low: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  medium: "bg-amber-50 text-amber-700 ring-amber-200",
  high: "bg-rose-50 text-rose-700 ring-rose-200",
};

export default function PlanPage() {
  // 当前正在填写的表单数据
  const [form, setForm] = useState<PlanFormState>(initialForm);

  // 是否已经点击过“生成路线建议”
  const [submitted, setSubmitted] = useState(false);

  // 已提交用于生成结果的表单快照
  // 注意：右侧结果必须使用 submittedForm，而不是 form
  const [submittedForm, setSubmittedForm] =
    useState<PlanFormState>(initialForm);

  // 推荐路线只根据“已提交的表单快照”生成
  const recommendedRoutes = useMemo(() => {
    return getRecommendedRoutes(submittedForm);
  }, [submittedForm]);

  // 用户画像只根据“已提交的表单快照”生成
  const profileSummary = useMemo(() => {
    return createUserProfileSummary(submittedForm);
  }, [submittedForm]);

  // 推荐理由总结只根据“已提交的表单快照”生成
  const insightSummary = useMemo(() => {
    return createPlanInsightSummary(submittedForm);
  }, [submittedForm]);

  function updateField<K extends keyof PlanFormState>(
    key: K,
    value: PlanFormState[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  // 用户点击“生成路线建议”时，把当前表单保存成一份结果快照
function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  setSubmittedForm(form);
  setSubmitted(true);
}

  // 重置时，同时清空当前表单和已提交结果
function handleReset() {
  setForm(initialForm);
  setSubmittedForm(initialForm);
  setSubmitted(false);
}

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      {/* 页面头部 */}
      <section className="mb-10 rounded-3xl bg-gradient-to-br from-sky-50 to-white px-8 py-12">
        <p className="mb-4 inline-block rounded-full bg-sky-100 px-4 py-1 text-sm font-medium text-sky-700">
          第三阶段优化 · 路线规划结果增强
        </p>

        <h1 className="mb-5 text-4xl font-bold leading-tight text-slate-900">
          找到适合你的出国路线
        </h1>

        <p className="max-w-3xl leading-8 text-slate-600">
          根据你的年龄、学历、专业、预算、语言能力和目标偏好，系统会先用本地规则给出几条初步路线建议。
          当前版本是产品原型，不代表最终申请结论，后续会逐步接入 AI 问答、真实案例和人工咨询。
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
        {/* 左侧表单 */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-2xl font-bold text-slate-900">
            填写你的基本情况
          </h2>

          <p className="mb-6 text-sm leading-6 text-slate-600">
            信息不用特别精确，先填写大概情况即可。后续版本会支持生成更详细的路线报告。
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                年龄
              </label>
              <input
                value={form.age}
                onChange={(event) => updateField("age", event.target.value)}
                placeholder="例如：22"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                当前学历
              </label>
              <input
                value={form.education}
                onChange={(event) => updateField("education", event.target.value)}
                placeholder="例如：本科 / 大专 / 高中 / 已工作"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                专业方向 / 工作方向
              </label>
              <input
                value={form.major}
                onChange={(event) => updateField("major", event.target.value)}
                placeholder="例如：软件工程 / 护理 / 机械 / 无明确方向"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                预算区间
              </label>
              <select
                value={form.budgetLevel}
                onChange={(event) =>
                  updateField("budgetLevel", event.target.value as BudgetLevel)
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              >
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                语言能力
              </label>
              <select
                value={form.languageLevel}
                onChange={(event) =>
                  updateField("languageLevel", event.target.value as LanguageLevel)
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              >
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                国家 / 地区偏好
              </label>
              <select
                value={form.countryPreference}
                onChange={(event) =>
                  updateField(
                    "countryPreference",
                    event.target.value as CountryPreference
                  )
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              >
                {countryPreferenceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                是否希望边学习边打工？
              </label>
              <select
                value={form.wantsPartTimeJob}
                onChange={(event) =>
                  updateField(
                    "wantsPartTimeJob",
                    event.target.value as PreferenceAnswer
                  )
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              >
                {preferenceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                是否希望未来长期留在海外？
              </label>
              <select
                value={form.wantsLongTermStay}
                onChange={(event) =>
                  updateField(
                    "wantsLongTermStay",
                    event.target.value as PreferenceAnswer
                  )
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              >
                {preferenceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                是否接受低预算过渡路线？
              </label>
              <select
                value={form.acceptsLowBudgetRoute}
                onChange={(event) =>
                  updateField(
                    "acceptsLowBudgetRoute",
                    event.target.value as PreferenceAnswer
                  )
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              >
                {preferenceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-sky-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-700"
              >
                生成路线建议
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition hover:border-sky-300 hover:text-sky-700"
              >
                重置
              </button>
            </div>
          </form>
        </section>

        {/* 右侧结果 */}
        <section className="space-y-6">
          {!submitted ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10">
              <h2 className="mb-3 text-2xl font-bold text-slate-900">
                你的路线建议会显示在这里
              </h2>

              <p className="leading-8 text-slate-600">
                填写左侧表单后，系统会根据当前规则推荐 3 条路线。
                这些建议用于帮助你建立初步方向，不代表最终申请结论。
              </p>
            </div>
          ) : (
            <>
              {/* 用户画像 */}
              <div className="rounded-3xl border border-sky-100 bg-sky-50 p-6">
                <p className="mb-2 text-sm font-medium text-sky-700">
                  你的基础画像
                </p>

                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  系统已根据你的信息生成初步判断
                </h2>

                <div className="grid gap-3 sm:grid-cols-2">
                  {profileSummary.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* 推荐总结 */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="mb-2 text-sm font-medium text-sky-700">
                  推荐理由总结
                </p>

                <h2 className="mb-3 text-2xl font-bold text-slate-900">
                  初步推荐路线
                </h2>

                <p className="leading-8 text-slate-600">{insightSummary}</p>
              </div>

              {/* 推荐路线卡片 */}
              {recommendedRoutes.map((route, index) => (
                <article
                  key={route.id}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-sky-200 hover:shadow-md"
                >
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-sky-600 px-3 py-1 text-xs font-medium text-white">
                      推荐 {index + 1}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {route.country}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {getBudgetLabel(route.budgetLevel)}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ${riskLevelStyles[route.riskLevel]}`}
                    >
                      {riskLevelLabels[route.riskLevel]}
                    </span>
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-slate-900">
                    {route.title}
                  </h3>

                  <p className="mb-5 leading-8 text-slate-600">
                    {route.summary}
                  </p>

                  {/* 适合指数 */}
                  <div className="mb-6 rounded-2xl bg-slate-50 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-900">
                        适合指数
                      </span>
                      <span className="text-sm font-bold text-sky-700">
                        {route.matchScore}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-sky-600"
                        style={{ width: `${route.matchScore}%` }}
                      />
                    </div>

                    <div className="mt-4">
                      <p className="mb-2 text-sm font-semibold text-slate-900">
                        匹配原因
                      </p>

                      <ul className="space-y-1 text-sm leading-6 text-slate-600">
                        {route.matchReasons.map((reason) => (
                          <li key={reason}>• {reason}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 font-semibold text-slate-900">
                        适合人群
                      </h4>
                      <ul className="space-y-2 text-sm leading-6 text-slate-600">
                        {route.suitableFor.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-2 font-semibold text-slate-900">
                        路线优势
                      </h4>
                      <ul className="space-y-2 text-sm leading-6 text-slate-600">
                        {route.advantages.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-2 font-semibold text-slate-900">
                        风险提醒
                      </h4>
                      <ul className="space-y-2 text-sm leading-6 text-slate-600">
                        {route.risks.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-2 font-semibold text-slate-900">
                        下一步建议
                      </h4>
                      <ul className="space-y-2 text-sm leading-6 text-slate-600">
                        {route.nextSteps.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {route.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                    <h4 className="mb-3 font-semibold text-slate-900">
                      推荐阅读
                    </h4>

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
                  </div>
                </article>
              ))}

              <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-sm leading-7 text-amber-800">
                <strong>重要提示：</strong>
                当前结果是基于本地规则生成的初步建议，不构成签证、移民、法律或就业承诺。
                涉及政策、签证、学校和费用的信息，请以官方机构和最新资料为准。
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}