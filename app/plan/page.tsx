"use client";

// 出国路线规划页面
// 作用：收集用户基本情况，并基于本地规则输出路线建议、用户画像和推荐理由
// 当前阶段不接真实 AI、不接数据库，只做产品原型

import { FormEvent, useMemo, useRef, useState } from "react";
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

  const resultRef = useRef<HTMLDivElement | null>(null);
  const [formError, setFormError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // 已提交用于生成结果的表单快照
  // 注意：右侧结果必须使用 submittedForm，而不是 form
  const [submittedForm, setSubmittedForm] =
    useState<PlanFormState>(initialForm);

  // 路线结果生成时间
  // 用于告诉用户当前结果是哪一次生成的
  const [submittedAt, setSubmittedAt] = useState<Date | null>(null);

  // 复制结果后的提示文字
  // 例如：已复制到剪贴板
  const [copyStatus, setCopyStatus] = useState("");

  // 判断左侧表单是否在生成结果后又被修改过
  // 如果修改过，就提示用户需要重新点击生成按钮
  const isResultOutdated =
    submitted && JSON.stringify(form) !== JSON.stringify(submittedForm);

  // 推荐路线只根据“已提交的表单快照”生成
  const recommendedRoutes = useMemo(() => {
    const ageNumber = Number(submittedForm.age);
    const educationText = submittedForm.education.trim();

    const isVeryOlderUser =
      !Number.isNaN(ageNumber) && ageNumber >= 50;

    const isLowEducation = ["无学历", "无", "小学", "初中"].some((keyword) =>
      educationText.includes(keyword)
    );

    const isLowBudget = submittedForm.budgetLevel === "low";

    const isWeakLanguage =
      submittedForm.languageLevel === "none" ||
      submittedForm.languageLevel === "basic";

    // 页面层保险拦截：
    // 50岁以上 + 学历弱 + 低预算 + 语言弱，不应该继续硬推路线。
    if (isVeryOlderUser && isLowEducation && isLowBudget && isWeakLanguage) {
      return [];
    }

    return getRecommendedRoutes(submittedForm);
  }, [submittedForm]);

  const hasRecommendedRoutes = recommendedRoutes.length > 0;

  // 用户画像只根据“已提交的表单快照”生成
  const profileSummary = useMemo(() => {
    return createUserProfileSummary(submittedForm);
  }, [submittedForm]);

  // 推荐理由总结只根据“已提交的表单快照”生成
  const insightSummary = useMemo(() => {
    return createPlanInsightSummary(submittedForm);
  }, [submittedForm]);

  // 生成可以复制给用户保存的路线规划摘要文本
  // 注意：这里生成的是纯文本，方便复制到微信、备忘录或文档中
  const planResultText = useMemo(() => {
    if (!submitted) {
      return "";
    }

    // 用户基础画像文本
    // profileSummary 在当前项目中是字符串数组，所以直接拼接即可
    const profileText = profileSummary.join("\n");

    // 推荐路线标题列表
    const routeTitles = recommendedRoutes
      .map((route, index) => `${index + 1}. ${route.title}`)
      .join("\n");

    return [
      "出国咨询信息整理平台 - 路线规划初步建议",
      "",
      `生成时间：${submittedAt ? submittedAt.toLocaleString("zh-CN") : "未记录"}`,
      "",
      "【用户基础信息】",
      profileText || "暂无用户基础信息",
      "",
      "【初步推荐路线】",
      routeTitles || "暂无推荐路线",
      "",
      "重要提示：本结果基于本地规则生成，仅适合作为初步参考，不代表最终申请建议。实际申请前仍需结合政策、预算、语言能力、学历背景和个人情况进一步确认。",
    ].join("\n");
  }, [submitted, submittedAt, profileSummary, recommendedRoutes]);

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
  // 点击生成按钮时，才把当前表单保存为结果快照
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const ageNumber = Number(form.age);

    if (!form.age || Number.isNaN(ageNumber) || ageNumber < 16 || ageNumber > 65) {
      setFormError("请填写有效年龄，建议范围为 16 - 65 岁。");
      setSubmitted(false);
      return;
    }

    if (!form.education || !form.major) {
      setFormError("请先填写当前学历和专业方向 / 工作方向。");
      setSubmitted(false);
      return;
    }

    setFormError("");
    setIsGenerating(true);

    const snapshot = { ...form };

    window.setTimeout(() => {
      setSubmittedForm(snapshot);
      setSubmittedAt(new Date());
      setSubmitted(true);
      setIsGenerating(false);
      setCopyStatus("");

      window.setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 80);
    }, 500);
  }

  // 重置时，同时清空当前表单、已提交结果、生成时间和提示信息
  function handleReset() {
    setForm(initialForm);
    setSubmittedForm(initialForm);
    setSubmitted(false);
    setSubmittedAt(null);
    setFormError("");
    setIsGenerating(false);
    setCopyStatus("");
  }

  // 复制路线规划结果摘要
  async function handleCopyResult() {
    if (!planResultText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(planResultText);
      setCopyStatus("路线规划摘要已复制，可以粘贴到微信、备忘录或文档中。");
    } catch {
      setCopyStatus("复制失败，请手动选择页面内容复制。");
    }

    setTimeout(() => {
      setCopyStatus("");
    }, 3000);
  }

  // 打印 / 保存 PDF
  function handlePrintResult() {
    window.print();
  }

  // PDF 报告专用路线类型
  // 说明：这里使用 Record<string, unknown> 是为了避免路线字段变化导致 TypeScript 报错
  type PrintableRoute = Record<string, unknown>;

  // PDF 报告使用的路线数据
  const pdfRoutes = recommendedRoutes as unknown as PrintableRoute[];

  // 从路线对象中安全读取文本
  // 作用：不同路线字段名可能不同，这里统一做兼容处理
  function readRouteText(
    route: PrintableRoute,
    keys: string[],
    fallback: string
  ) {
    for (const key of keys) {
      const value = route[key];

      if (typeof value === "string" && value.trim()) {
        return value;
      }

      if (typeof value === "number") {
        return String(value);
      }
    }

    return fallback;
  }

  // 从路线对象中安全读取列表
  // 作用：兼容 suitableFor、advantages、risks、nextSteps 等数组字段
  function readRouteList(route: PrintableRoute, keys: string[]) {
    for (const key of keys) {
      const value = route[key];

      if (Array.isArray(value)) {
        return value
          .map((item) => {
            if (typeof item === "string") {
              return item;
            }

            if (item && typeof item === "object") {
              const objectItem = item as Record<string, unknown>;
              return String(
                objectItem.title ||
                objectItem.label ||
                objectItem.name ||
                objectItem.text ||
                ""
              );
            }

            return "";
          })
          .filter(Boolean);
      }
    }

    return [];
  }

  // 把用户基础画像文本拆成“标题 + 内容”
  // 例如：年龄：22 岁左右
  function splitProfileText(text: string) {
    const parts = text.split(/：|:/);

    if (parts.length >= 2) {
      return {
        label: parts[0],
        value: parts.slice(1).join("："),
      };
    }

    return {
      label: "用户信息",
      value: text,
    };
  }

  return (
    <main className="plan-page-root mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* PDF 专用报告区域：网页正常浏览时隐藏，只有打印 / 保存 PDF 时显示 */}
      {submitted && (
        <section className="pdf-report-only">
          {/* PDF 第 1 页：报告首页 */}
          <section className="pdf-page pdf-cover-page">
            <p className="pdf-kicker">出国咨询信息整理平台</p>

            <h1 className="pdf-main-title">出国路线规划初步报告</h1>

            <p className="pdf-subtitle">
              本报告根据用户填写的基础信息和当前本地规则生成，用于帮助用户快速理解可选出国方向。
            </p>

            <div className="pdf-meta-box">
              <div>
                <span>生成时间</span>
                <strong>
                  {submittedAt ? submittedAt.toLocaleString("zh-CN") : "暂无记录"}
                </strong>
              </div>

              <div>
                <span>报告性质</span>
                <strong>初步路线建议</strong>
              </div>

              <div>
                <span>推荐路线数量</span>
                <strong>{pdfRoutes.length} 条</strong>
              </div>
            </div>

            <h2 className="pdf-section-title">用户基础信息摘要</h2>

            <div className="pdf-profile-grid">
              {profileSummary.slice(0, 4).map((item, index) => {
                const profile = splitProfileText(String(item));

                return (
                  <div className="pdf-profile-item" key={`profile-${index}`}>
                    <span>{profile.label}</span>
                    <strong>{profile.value}</strong>
                  </div>
                );
              })}
            </div>

            <h2 className="pdf-section-title">推荐路线总览</h2>

            <table className="pdf-route-table">
              <thead>
                <tr>
                  <th>排名</th>
                  <th>路线名称</th>
                  <th>国家 / 地区</th>
                  <th>预算</th>
                  <th>匹配度</th>
                  <th>风险</th>
                </tr>
              </thead>

              <tbody>
                {pdfRoutes.slice(0, 3).map((route, index) => {
                  const title = readRouteText(route, ["title", "name"], `推荐路线 ${index + 1}`);
                  const country = readRouteText(route, ["country", "countryName"], "综合路线");
                  const budget = readRouteText(route, ["budget", "budgetRange", "budgetLabel"], "待确认");
                  const risk = readRouteText(route, ["riskLevel", "risk", "riskLabel"], "中等");
                  const score = readRouteText(
                    route,
                    ["matchScore", "score", "suitabilityScore", "fitScore"],
                    "待评估"
                  );

                  return (
                    <tr key={`pdf-table-route-${index}`}>
                      <td>{index + 1}</td>
                      <td>{title}</td>
                      <td>{country}</td>
                      <td>{budget}</td>
                      <td>{score.includes("%") ? score : `${score}%`}</td>
                      <td>{risk}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="pdf-cover-notice">
              <strong>重要说明：</strong>
              本报告为系统根据当前信息生成的初步参考，不代表最终申请结论。实际选择路线前，仍需结合官方政策、预算、语言能力、学历背景和个人情况进一步确认。
            </div>
          </section>

          {/* PDF 第 2 页开始：每条路线单独一页 */}
          {pdfRoutes.slice(0, 3).map((route, index) => {
            const title = readRouteText(route, ["title", "name"], `推荐路线 ${index + 1}`);
            const country = readRouteText(route, ["country", "countryName"], "综合路线");
            const budget = readRouteText(route, ["budget", "budgetRange", "budgetLabel"], "预算待确认");
            const risk = readRouteText(route, ["riskLevel", "risk", "riskLabel"], "中等风险");
            const description = readRouteText(
              route,
              ["description", "summary", "intro"],
              "该路线适合作为出国方向的初步参考，需要结合个人条件继续确认。"
            );
            const score = readRouteText(
              route,
              ["matchScore", "score", "suitabilityScore", "fitScore"],
              "待评估"
            );

            const matchReasons = readRouteList(route, [
              "matchReasons",
              "matchingReasons",
              "reasons",
              "reasonList",
            ]).slice(0, 2);

            const suitableFor = readRouteList(route, [
              "suitableFor",
              "targetUsers",
              "audience",
            ]).slice(0, 2);

            const advantages = readRouteList(route, [
              "advantages",
              "benefits",
              "strengths",
            ]).slice(0, 2);

            const risks = readRouteList(route, [
              "risks",
              "riskTips",
              "riskReminders",
            ]).slice(0, 2);

            const nextSteps = readRouteList(route, [
              "nextSteps",
              "steps",
              "actions",
            ]).slice(0, 2);

            return (
              <section className="pdf-page pdf-route-page" key={`pdf-route-${index}`}>
                <div className="pdf-route-header">
                  <p className="pdf-kicker">推荐路线 {index + 1}</p>
                  <h2 className="pdf-route-title">{title}</h2>

                  <div className="pdf-route-tags">
                    <span>{country}</span>
                    <span>{budget}</span>
                    <span>{risk}</span>
                    <span>{score.includes("%") ? score : `${score}%`} 匹配</span>
                  </div>
                </div>

                <div className="pdf-score-box">
                  <div>
                    <span>路线匹配度</span>
                    <strong>{score.includes("%") ? score : `${score}%`}</strong>
                  </div>
                  <div className="pdf-score-bar">
                    <div
                      style={{
                        width: score === "待评估" ? "70%" : `${Number(score.replace("%", "")) || 70}%`,
                      }}
                    />
                  </div>
                </div>

                <section className="pdf-summary-box">
                  <h3>路线概述</h3>
                  <p>{description}</p>
                </section>

                <div className="pdf-two-column">
                  <section className="pdf-info-block">
                    <h3>推荐理由</h3>
                    <ul>
                      {(matchReasons.length ? matchReasons : ["与当前用户基础条件存在一定匹配度。"]).map(
                        (item, itemIndex) => (
                          <li key={`reason-${itemIndex}`}>{item}</li>
                        )
                      )}
                    </ul>
                  </section>

                  <section className="pdf-info-block">
                    <h3>适合人群</h3>
                    <ul>
                      {(suitableFor.length ? suitableFor : ["适合希望获得明确出国方向的人群。"]).map(
                        (item, itemIndex) => (
                          <li key={`suitable-${itemIndex}`}>{item}</li>
                        )
                      )}
                    </ul>
                  </section>

                  <section className="pdf-info-block">
                    <h3>路线优势</h3>
                    <ul>
                      {(advantages.length ? advantages : ["路线较清晰，适合继续深入了解。"]).map(
                        (item, itemIndex) => (
                          <li key={`advantage-${itemIndex}`}>{item}</li>
                        )
                      )}
                    </ul>
                  </section>

                  <section className="pdf-info-block">
                    <h3>风险提醒</h3>
                    <ul>
                      {(risks.length ? risks : ["政策、预算和个人条件仍需进一步确认。"]).map(
                        (item, itemIndex) => (
                          <li key={`risk-${itemIndex}`}>{item}</li>
                        )
                      )}
                    </ul>
                  </section>
                </div>

                <section className="pdf-next-box">
                  <h3>下一步建议</h3>
                  <ol>
                    {(nextSteps.length ? nextSteps : ["继续确认目标国家政策、预算和个人申请条件。"]).map(
                      (item, itemIndex) => (
                        <li key={`step-${itemIndex}`}>{item}</li>
                      )
                    )}
                  </ol>
                </section>

              </section>
            );
          })}

          {/* PDF 最后一页：免责声明 */}
          <section className="pdf-page pdf-notice-page">
            <p className="pdf-kicker">风险提示</p>
            <h2 className="pdf-route-title">重要提醒与免责声明</h2>

            <div className="pdf-disclaimer-list">
              <p>
                本报告由系统根据用户填写的信息和当前本地规则生成，仅用于帮助用户建立初步出国方向认知。
              </p>
              <p>
                报告内容不构成正式申请建议、法律建议、移民建议或投资建议。
              </p>
              <p>
                各国家和地区的留学、签证、就业和移民政策可能随时调整，最终应以官方机构、学校、使领馆及专业顾问的最新信息为准。
              </p>
              <p>
                用户在做出真实申请、缴费、签约或出国决定前，应进一步核实政策、预算、语言要求、学历要求、签证条件和个人风险承受能力。
              </p>
            </div>
          </section>
        </section>
      )}
      {/* 页面头部 */}
      <section className="mb-8 rounded-3xl bg-gradient-to-br from-sky-50 to-white px-6 py-9 sm:mb-10 sm:px-8 sm:py-12">
        <p className="mb-4 inline-block rounded-full bg-sky-100 px-4 py-1 text-sm font-medium text-sky-700">
          第三阶段优化 · 路线规划结果增强
        </p>

        <h1 className="mb-4 text-3xl font-bold leading-tight text-slate-900 sm:mb-5 sm:text-4xl">
          找到适合你的出国路线
        </h1>

        <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
          根据你的年龄、学历、专业、预算、语言能力和目标偏好，系统会先用本地规则给出几条初步路线建议。
          当前版本是产品原型，不代表最终申请结论，后续会逐步接入 AI 问答、真实案例和人工咨询。
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[420px_1fr] lg:gap-8">
        {/* 左侧表单 */}
        <section className="no-print rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-2 text-xl font-bold text-slate-900 sm:text-2xl">
            填写你的基本情况
          </h2>

          <p className="mb-6 text-sm leading-6 text-slate-600">
            信息不用特别精确，先填写大概情况即可。后续版本会支持生成更详细的路线报告。
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
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
                disabled={isGenerating}
                className="flex-1 rounded-xl bg-sky-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isGenerating ? "正在生成路线..." : submitted ? "重新生成路线建议" : "生成路线建议"}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition hover:border-sky-300 hover:text-sky-700"
              >
                重置
              </button>
            </div>
            {formError && (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 	py-3 text-sm leading-6 text-red-700">
                {formError}
              </div>
            )}
          </form>
        </section>

        {/* 右侧结果 */}
        <section ref={resultRef} className="print-report space-y-6 scroll-mt-28">
          {/* PDF 打印专用标题：网页浏览时隐藏，打印时显示 */}
          {submitted && (
            <div className="print-only">
              <p className="text-sm font-semibold text-sky-600">
                出国咨询信息整理平台
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-950">
                出国路线规划初步报告
              </h1>
              <p className="mt-3 text-sm text-slate-600">
                生成时间：
                {submittedAt ? submittedAt.toLocaleString("zh-CN") : "暂无记录"}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                本报告根据用户填写的基础信息和当前本地规则生成，仅作为初步方向参考，不代表最终申请建议。
              </p>
            </div>
          )}
          {/* 打印 PDF 专用报告标题：网页浏览时隐藏，打印时显示 */}
          {submitted && (
            <div className="print-only">
              <p className="print-kicker">出国咨询信息整理平台</p>
              <h1 className="print-title">出国路线规划初步报告</h1>
              <p className="print-meta">
                生成时间：
                {submittedAt ? submittedAt.toLocaleString("zh-CN") : "暂无记录"}
              </p>
              <p className="print-desc">
                本报告根据用户填写的基础信息和当前本地规则生成，仅作为出国路线初步参考，不代表最终申请建议。
              </p>
            </div>
          )}
          {!submitted ? (
            <div className="rounded-3xl border border-dashed border-sky-200 bg-gradient-to-br from-sky-50 to-white p-5 sm:p-8">
              <p className="mb-3 text-sm font-medium text-sky-700">
                开始规划前
              </p>

              <h2 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl">
                你的路线建议会显示在这里
              </h2>

              <p className="mb-6 leading-8 text-slate-600">
                填写左侧信息后，系统会根据当前规则推荐 3 条出国路线。
                当前版本用于帮助你快速建立方向，不代表最终申请结论。
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
                    1
                  </div>
                  <h3 className="mb-2 font-semibold text-slate-900">
                    填写基本情况
                  </h3>
                  <p className="text-sm leading-6 text-slate-600">
                    年龄、学历、专业、预算和语言能力。
                  </p>
                </div>

                <div className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
                    2
                  </div>
                  <h3 className="mb-2 font-semibold text-slate-900">
                    生成路线建议
                  </h3>
                  <p className="text-sm leading-6 text-slate-600">
                    系统会给出路线、优势、风险和下一步建议。
                  </p>
                </div>

                <div className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
                    3
                  </div>
                  <h3 className="mb-2 font-semibold text-slate-900">
                    保存规划结果
                  </h3>
                  <p className="text-sm leading-6 text-slate-600">
                    你可以复制摘要，也可以打印保存为 PDF。
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">
                提醒：当前结果由本地规则生成，适合作为初步筛选工具。真实申请前仍需进一步核对政策和个人条件。
              </div>
            </div>
          ) : (
            <>

              {isResultOutdated && (
                <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 	text-sm leading-7 text-amber-800">
                  你已经修改了左侧表单，但右侧结果仍然是上一次点击“生成路线建议”时生成的。
                  如果想查看最新结果，请再次点击“生成路线建议”。
                </div>
              )}

              {!isResultOutdated && (
                <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 	text-sm leading-7 text-emerald-800">
                  当前路线建议已根据你最近一次提交的信息生成。
                </div>
              )}

              {submitted && (
                <div className="no-print rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-500">结果操作</p>
                      <h3 className="mt-1 text-lg font-semibold text-slate-950">
                        保存你的路线规划结果
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        生成时间：
                        {submittedAt ? submittedAt.toLocaleString("zh-CN") : "暂无记录"}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button
                        type="button"
                        onClick={handleCopyResult}
                        className="rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700"
                      >
                        复制结果摘要
                      </button>

                      <button
                        type="button"
                        onClick={handlePrintResult}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                      >
                        打印 / 保存 PDF
                      </button>
                    </div>
                  </div>

                  {copyStatus && (
                    <p className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                      {copyStatus}
                    </p>
                  )}
                </div>
              )}

              {/* 用户画像 */}
              <div className="hidden no-print rounded-3xl border border-sky-100 bg-sky-50 p-6">
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
                  {hasRecommendedRoutes ? "推荐理由总结" : "风险评估提示"}
                </p>

                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  {hasRecommendedRoutes ? "初步推荐路线" : "当前条件风险较高"}
                </h2>

                <p className="leading-8 text-slate-600">
                  {hasRecommendedRoutes
                    ? insightSummary
                    : "根据你填写的信息，当前条件暂未匹配到可靠路线。建议先重新评估预算、语言能力、学历或技能方向、目标国家和长期计划，再决定是否继续推进出国方案。"}
                </p>
              </div>

              {/* 推荐路线为空时的兜底提示 */}
              {recommendedRoutes.length === 0 && (
                <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
                  <p className="mb-2 text-sm font-medium text-amber-700">
                    暂未匹配到明确路线
                  </p>

                  <h3 className="mb-3 text-2xl font-bold text-slate-900">
                    当前不建议直接选择具体路线
                  </h3>

                  <p className="leading-8 text-slate-600">
                    根据你填写的信息，当前条件存在较高不确定性。建议先提升语言能力、明确职业或学习方向，
                    并重新评估预算和目标国家可行性，再生成具体路线建议。
                  </p>
                </div>
              )}

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