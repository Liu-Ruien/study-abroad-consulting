"use client";

// 出国路线规划页面
// 作用：收集用户基本情况，并基于本地规则输出路线建议、用户画像和推荐理由
// 当前阶段不接真实 AI、不接数据库，只做产品原型

import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
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
  targetCountryOptions,
  type BudgetLevel,
  type CountryPreference,
  type LanguageLevel,
  type PlanFormState,
  type PreferenceAnswer,
  type RiskLevel,
  type TargetCountry,
} from "@/lib/plan-routes";

// 表单初始值
const initialForm: PlanFormState = {
  age: "",
  education: "",
  major: "",
  budgetLevel: "unknown",
  languageLevel: "basic",
  countryPreference: "any",
  targetCountry: "unknown",
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

const routeRiskDisplayLabels: Record<RiskLevel, string> = {
  low: "路线难度较低",
  medium: "路线难度中等",
  high: "路线难度较高",
};

const routeRiskSoftStyles: Record<RiskLevel, string> = {
  low: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  medium: "bg-amber-50 text-amber-700 ring-amber-200",
  high: "bg-rose-50 text-rose-700 ring-rose-200",
};

const targetCountryOptionsByPreference: Record<CountryPreference, TargetCountry[]> = {
  any: [
    "unknown",
    "japan",
    "new-zealand",
    "australia",
    "germany",
    "malaysia",
    "philippines",
    "other",
  ],
  asia: ["unknown", "japan", "malaysia", "philippines", "other"],
  english: ["unknown", "new-zealand", "australia", "malaysia", "philippines", "other"],
  europe: ["unknown", "germany", "other"],
};

type SelectFieldOption<T extends string> = {
  value: T;
  label: string;
};

type SelectFieldProps<T extends string> = {
  label: string;
  value: T;
  options: SelectFieldOption<T>[];
  onChange: (value: T) => void;
  helperText?: string;
};

// 自定义下拉选择框
// 作用：替代浏览器原生 select，统一圆角、阴影和下滑动画效果
function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
  helperText,
}: SelectFieldProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!selectRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={selectRef} className="relative">
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-xl border bg-white px-4 py-3 text-left text-sm outline-none transition ${isOpen
          ? "border-sky-400 ring-2 ring-sky-100"
          : "border-slate-200 hover:border-sky-200"
          }`}
      >
        <span className="text-slate-900">
          {selectedOption?.label ?? "请选择"}
        </span>

        <span
          className={`ml-3 flex h-4 w-4 shrink-0 items-center justify-center transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
          aria-hidden="true"
        >
          <span className="h-2 w-2 rotate-45 border-b-2 border-r-2 border-slate-400" />
        </span>
      </button>

      <div
        className={`absolute left-0 right-0 top-full z-40 mt-2 origin-top overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl ring-1 ring-slate-200/60 transition duration-200 ${isOpen
          ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
          : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
          }`}
      >
        <div className="max-h-64 overflow-y-auto p-1 [scrollbar-width:thin] [scrollbar-color:rgba(203,213,225,0.45)_transparent]">
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full rounded-xl px-3 py-2.5 text-left text-sm transition ${isSelected
                  ? "bg-sky-50 font-medium text-sky-700"
                  : "text-slate-700 hover:bg-slate-50"
                  }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {helperText && (
        <p className="mt-2 text-xs leading-5 text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  );
}

function SummaryTextItem({
  label,
  value,
  isEditing,
  onToggle,
  children,
}: {
  label: string;
  value: string;
  isEditing: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-50 to-white text-sm leading-6 text-slate-700 ring-1 ring-slate-200/60 transition hover:bg-sky-50/60 hover:ring-sky-100">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
      >
        <span className="shrink-0 text-slate-400">{label}</span>
        <span className="text-right font-semibold text-slate-900 tracking-tight">{value}</span>
      </button>

      {isEditing && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

const SummarySelectItem = SummaryTextItem;

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

  // 当前打开详细弹窗的路线 id
  // 为 null 时表示没有打开任何路线详情
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  // 是否打开整体分析弹窗
  const [showInsightModal, setShowInsightModal] = useState(false);

  // 当前正在查看的推荐路线下标
  // v0.3.14：右侧结果区改为路线工作台后，用它切换路线 1 / 2 / 3
  const [activeRouteIndex, setActiveRouteIndex] = useState(0);

  // 生成结果后，左侧表单默认收起为信息摘要
  const [isFormCollapsed, setIsFormCollapsed] = useState(false);

  // 摘要模式下，当前正在单独编辑的字段
  const [editingSummaryField, setEditingSummaryField] = useState<
    | "age"
    | "education"
    | "major"
    | "budgetLevel"
    | "languageLevel"
    | "countryPreference"
    | "targetCountry"
    | "wantsPartTimeJob"
    | "wantsLongTermStay"
    | "acceptsLowBudgetRoute"
    | null
  >(null);

  const availableTargetCountryOptions = useMemo(() => {
    const allowedValues = targetCountryOptionsByPreference[form.countryPreference];

    return targetCountryOptions.filter((option) =>
      allowedValues.includes(option.value)
    );
  }, [form.countryPreference]);

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

  // 当前工作台中展示的路线
  const activeRoute = recommendedRoutes[activeRouteIndex] ?? recommendedRoutes[0] ?? null;

  // 当前弹窗中展示的路线详情
  const selectedRoute = useMemo(() => {
    return recommendedRoutes.find((route) => route.id === selectedRouteId) ?? null;
  }, [recommendedRoutes, selectedRouteId]);

  // 用户画像只根据“已提交的表单快照”生成
  const profileSummary = useMemo(() => {
    return createUserProfileSummary(submittedForm);
  }, [submittedForm]);

  // 推荐理由总结只根据“已提交的表单快照”生成
  const insightSummary = useMemo(() => {
    return createPlanInsightSummary(submittedForm);
  }, [submittedForm]);

  // 当前排名第一的路线，用于整体分析弹窗中给出更明确的下一步建议
  const primaryRoute = recommendedRoutes[0] ?? null;

  useEffect(() => {
    const hasOpenModal = showInsightModal || selectedRouteId !== null;
  
    if (!hasOpenModal) {
      return;
    }
  
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  
    document.body.style.overflow = "hidden";
  
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [showInsightModal, selectedRouteId]);

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

  function handleCountryPreferenceChange(value: CountryPreference) {
    const allowedValues = targetCountryOptionsByPreference[value];

    setForm((prev) => ({
      ...prev,
      countryPreference: value,
      targetCountry: allowedValues.includes(prev.targetCountry)
        ? prev.targetCountry
        : "unknown",
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
      setSelectedRouteId(null);
      setShowInsightModal(false);
      setActiveRouteIndex(0);
      setIsFormCollapsed(true);
      setEditingSummaryField(null);

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
    setSelectedRouteId(null);
    setShowInsightModal(false);
    setActiveRouteIndex(0);
    setIsFormCollapsed(false);
    setEditingSummaryField(null);
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
    <main className="plan-page-root min-h-screen bg-[#f5f5f7] px-4 py-8 text-slate-950 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-7xl">
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
        <section className="mb-8 overflow-hidden rounded-[32px] bg-white px-6 py-10 shadow-sm ring-1 ring-black/5 sm:mb-10 sm:px-10 sm:py-14">
          <div className="max-w-4xl">
            <p className="mb-5 inline-flex rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-600">
              v0.5 · 出国路线决策工作台
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              找到更适合你的出国路线。
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              输入你的年龄、学历、专业、预算、语言能力和目标偏好，系统会先用本地规则生成路线建议，
              帮你快速比较方向、风险和下一步行动。
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-gradient-to-b from-slate-50 to-white px-5 py-4">
              <p className="text-sm text-slate-500">输入</p>
              <p className="mt-1 font-semibold text-slate-950">基础条件</p>
            </div>

            <div className="rounded-2xl bg-gradient-to-b from-slate-50 to-white px-5 py-4">
              <p className="text-sm text-slate-500">分析</p>
              <p className="mt-1 font-semibold text-slate-950">路线匹配</p>
            </div>

            <div className="rounded-2xl bg-gradient-to-b from-slate-50 to-white px-5 py-4">
              <p className="text-sm text-slate-500">输出</p>
              <p className="mt-1 font-semibold text-slate-950">规划报告</p>
            </div>
          </div>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-8">
          {/* 左侧表单 */}
          <section className="no-print rounded-[28px] bg-white/90 p-5 shadow-sm ring-1 ring-black/5 backdrop-blur sm:p-6 lg:sticky lg:top-6">
            {submitted && isFormCollapsed ? (
              <form onSubmit={handleSubmit}>
                <p className="mb-2 text-sm font-medium text-sky-700">
                  已填写信息摘要
                </p>

                <h2 className="mb-3 text-xl font-bold text-slate-900 sm:text-2xl">
                  当前路线基于这些信息生成
                </h2>

                <p className="mb-5 text-sm leading-6 text-slate-600">
                  点击可编辑的信息项即可单独修改。修改后需要重新生成路线建议。
                </p>

                {isResultOutdated && (
                  <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">
                    你已经修改了左侧信息，右侧路线仍是上一次生成的结果。请点击“重新生成路线建议”更新结果。
                  </div>
                )}

                <div className="space-y-2">
                  <SummaryTextItem
                    label="年龄"
                    value={form.age ? `${form.age} 岁左右` : "未填写"}
                    isEditing={editingSummaryField === "age"}
                    onToggle={() => setEditingSummaryField(editingSummaryField === "age" ? null : "age")}
                  >
                    <input
                      value={form.age}
                      onChange={(event) => updateField("age", event.target.value)}
                      placeholder="例如：22"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                    />
                  </SummaryTextItem>

                  <SummaryTextItem
                    label="学历背景"
                    value={form.education || "未填写"}
                    isEditing={editingSummaryField === "education"}
                    onToggle={() =>
                      setEditingSummaryField(editingSummaryField === "education" ? null : "education")
                    }
                  >
                    <input
                      value={form.education}
                      onChange={(event) => updateField("education", event.target.value)}
                      placeholder="例如：本科 / 大专 / 高中 / 已工作"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                    />
                  </SummaryTextItem>

                  <SummaryTextItem
                    label="专业 / 工作方向"
                    value={form.major || "未填写"}
                    isEditing={editingSummaryField === "major"}
                    onToggle={() => setEditingSummaryField(editingSummaryField === "major" ? null : "major")}
                  >
                    <input
                      value={form.major}
                      onChange={(event) => updateField("major", event.target.value)}
                      placeholder="例如：软件工程 / 护理 / 机械 / 无明确方向"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                    />
                  </SummaryTextItem>

                  <SummarySelectItem
                    label="预算情况"
                    value={getBudgetLabel(form.budgetLevel)}
                    isEditing={editingSummaryField === "budgetLevel"}
                    onToggle={() =>
                      setEditingSummaryField(editingSummaryField === "budgetLevel" ? null : "budgetLevel")
                    }
                  >
                    <SelectField
                      label="预算区间"
                      value={form.budgetLevel}
                      options={budgetOptions}
                      onChange={(value) => updateField("budgetLevel", value as BudgetLevel)}
                    />
                  </SummarySelectItem>

                  <SummarySelectItem
                    label="语言能力"
                    value={languageOptions.find((option) => option.value === form.languageLevel)?.label ?? "未填写"}
                    isEditing={editingSummaryField === "languageLevel"}
                    onToggle={() =>
                      setEditingSummaryField(editingSummaryField === "languageLevel" ? null : "languageLevel")
                    }
                  >
                    <SelectField
                      label="语言能力"
                      value={form.languageLevel}
                      options={languageOptions}
                      onChange={(value) => updateField("languageLevel", value as LanguageLevel)}
                    />
                  </SummarySelectItem>

                  <SummarySelectItem
                    label="国家 / 地区偏好"
                    value={countryPreferenceOptions.find((option) => option.value === form.countryPreference)?.label ?? "未填写"}
                    isEditing={editingSummaryField === "countryPreference"}
                    onToggle={() =>
                      setEditingSummaryField(editingSummaryField === "countryPreference" ? null : "countryPreference")
                    }
                  >
                    <SelectField
                      label="国家 / 地区偏好"
                      value={form.countryPreference}
                      options={countryPreferenceOptions}
                      onChange={(value) => handleCountryPreferenceChange(value as CountryPreference)}
                    />
                  </SummarySelectItem>

                  <SummarySelectItem
                    label="目标国家偏好"
                    value={targetCountryOptions.find((option) => option.value === form.targetCountry)?.label ?? "未填写"}
                    isEditing={editingSummaryField === "targetCountry"}
                    onToggle={() =>
                      setEditingSummaryField(editingSummaryField === "targetCountry" ? null : "targetCountry")
                    }
                  >
                    <SelectField
                      label="目标国家偏好"
                      value={form.targetCountry}
                      options={availableTargetCountryOptions}
                      onChange={(value) => updateField("targetCountry", value as TargetCountry)}
                    />
                  </SummarySelectItem>

                  <SummarySelectItem
                    label="边学习边打工"
                    value={preferenceOptions.find((option) => option.value === form.wantsPartTimeJob)?.label ?? "未填写"}
                    isEditing={editingSummaryField === "wantsPartTimeJob"}
                    onToggle={() =>
                      setEditingSummaryField(editingSummaryField === "wantsPartTimeJob" ? null : "wantsPartTimeJob")
                    }
                  >
                    <SelectField
                      label="是否希望边学习边打工？"
                      value={form.wantsPartTimeJob}
                      options={preferenceOptions}
                      onChange={(value) => updateField("wantsPartTimeJob", value as PreferenceAnswer)}
                    />
                  </SummarySelectItem>

                  <SummarySelectItem
                    label="长期留在海外"
                    value={preferenceOptions.find((option) => option.value === form.wantsLongTermStay)?.label ?? "未填写"}
                    isEditing={editingSummaryField === "wantsLongTermStay"}
                    onToggle={() =>
                      setEditingSummaryField(editingSummaryField === "wantsLongTermStay" ? null : "wantsLongTermStay")
                    }
                  >
                    <SelectField
                      label="是否希望未来长期留在海外？"
                      value={form.wantsLongTermStay}
                      options={preferenceOptions}
                      onChange={(value) => updateField("wantsLongTermStay", value as PreferenceAnswer)}
                    />
                  </SummarySelectItem>

                  <SummarySelectItem
                    label="低预算过渡路线"
                    value={preferenceOptions.find((option) => option.value === form.acceptsLowBudgetRoute)?.label ?? "未填写"}
                    isEditing={editingSummaryField === "acceptsLowBudgetRoute"}
                    onToggle={() =>
                      setEditingSummaryField(
                        editingSummaryField === "acceptsLowBudgetRoute" ? null : "acceptsLowBudgetRoute"
                      )
                    }
                  >
                    <SelectField
                      label="是否接受低预算过渡路线？"
                      value={form.acceptsLowBudgetRoute}
                      options={preferenceOptions}
                      onChange={(value) => updateField("acceptsLowBudgetRoute", value as PreferenceAnswer)}
                    />
                  </SummarySelectItem>
                </div>

                <div className="mt-5 space-y-3">
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="w-full rounded-xl bg-sky-600 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isGenerating ? "正在生成路线..." : "重新生成路线建议"}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition hover:border-sky-300 hover:text-sky-700"
                  >
                    重置全部信息
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="mb-2 text-xl font-bold text-slate-900 sm:text-2xl">
                  填写你的基本情况
                </h2>

                <p className="mb-6 text-sm leading-6 text-slate-600">
                  信息不用特别精确，先填写大概情况即可。修改信息后需要重新生成路线建议，右侧结果才会更新。
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

                  <SelectField
                    label="预算区间"
                    value={form.budgetLevel}
                    options={budgetOptions}
                    onChange={(value) => updateField("budgetLevel", value as BudgetLevel)}
                  />

                  <SelectField
                    label="语言能力"
                    value={form.languageLevel}
                    options={languageOptions}
                    onChange={(value) => updateField("languageLevel", value as LanguageLevel)}
                  />

                  <SelectField
                    label="国家 / 地区偏好"
                    value={form.countryPreference}
                    options={countryPreferenceOptions}
                    onChange={(value) =>
                      handleCountryPreferenceChange(value as CountryPreference)
                    }
                  />

                  <SelectField
                    label="目标国家偏好"
                    value={form.targetCountry}
                    options={availableTargetCountryOptions}
                    onChange={(value) => updateField("targetCountry", value as TargetCountry)}
                    helperText="目标国家选项会根据上方的国家 / 地区偏好自动筛选；如果还没确定，就保持默认。"
                  />

                  <SelectField
                    label="是否希望边学习边打工？"
                    value={form.wantsPartTimeJob}
                    options={preferenceOptions}
                    onChange={(value) =>
                      updateField("wantsPartTimeJob", value as PreferenceAnswer)
                    }
                  />

                  <SelectField
                    label="是否希望未来长期留在海外？"
                    value={form.wantsLongTermStay}
                    options={preferenceOptions}
                    onChange={(value) =>
                      updateField("wantsLongTermStay", value as PreferenceAnswer)
                    }
                  />

                  <SelectField
                    label="是否接受低预算过渡路线？"
                    value={form.acceptsLowBudgetRoute}
                    options={preferenceOptions}
                    onChange={(value) =>
                      updateField("acceptsLowBudgetRoute", value as PreferenceAnswer)
                    }
                  />

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="flex-1 rounded-xl bg-sky-600 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
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
                    <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                      {formError}
                    </div>
                  )}
                </form>
              </>
            )}
          </section>

          {/* 右侧结果 */}
          <section ref={resultRef} className="print-report space-y-6 scroll-mt-6">
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

                {/* 推荐路线为空时的兜底提示 */}
                {recommendedRoutes.length === 0 && (
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
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

                    <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                      <p className="mb-2 text-sm font-semibold text-amber-900">
                        建议先做一对一可行性评估
                      </p>

                      <p className="text-sm leading-7 text-amber-800">
                        如果你仍然希望继续了解出国可能性，建议先由人工根据年龄、学历、预算、语言能力、
                        目标国家和家庭情况进行单独判断，避免盲目申请、盲目缴费或选择不适合自己的路线。
                      </p>

                      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                        <Link
                          href="/about"
                          className="inline-flex items-center justify-center rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-amber-700"
                        >
                          了解一对一评估
                        </Link>

                        <button
                          type="button"
                          onClick={handleCopyResult}
                          className="inline-flex items-center justify-center rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-medium text-amber-800 transition hover:bg-amber-100"
                        >
                          先复制当前信息
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 推荐路线卡片 */}
                {/* v0.3.14：路线结果工作台 */}
                {activeRoute && (
                  <article className="overflow-hidden rounded-[30px] bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-black/5">
                    <div className="flex flex-col gap-4 border-b border-slate-100 bg-gradient-to-br from-white via-sky-50/40 to-slate-50 px-6 py-6 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <p className="text-sm font-medium text-sky-700">
                            路线结果工作台
                          </p>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${isResultOutdated
                              ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                              : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                              }`}
                          >
                            {isResultOutdated ? "信息已修改，需重新生成" : "已根据最新信息生成"}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900">
                          先看最适合你的路线，再切换查看其他备选方案
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowInsightModal(true)}
                        className="inline-flex items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-slate-950 shadow-sm transition hover:bg-sky-700"
                      >
                        查看整体分析
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 px-6 py-5">
                      {recommendedRoutes.map((route, index) => (
                        <button
                          key={route.id}
                          type="button"
                          onClick={() => setActiveRouteIndex(index)}
                          className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeRouteIndex === index
                            ? "bg-sky-600 text-slate-950 shadow-sm"
                            : "bg-slate-100 text-slate-600 hover:bg-sky-50 hover:text-sky-700"
                            }`}
                        >
                          推荐 {index + 1} · {route.country}
                        </button>
                      ))}
                    </div>

                    <div className="mx-6 mb-6 overflow-hidden rounded-[28px] bg-gradient-to-br from-white via-sky-50/50 to-slate-50 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-black/5">
                      <div className="p-6 sm:p-7">
                        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="mb-2 text-sm font-medium text-sky-700">
                              推荐 {activeRouteIndex + 1} · {activeRoute.country}
                            </p>

                            <h3 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                              {activeRoute.title}
                            </h3>
                          </div>

                          <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ring-1 ${routeRiskSoftStyles[activeRoute.riskLevel]}`}>
                            {routeRiskDisplayLabels[activeRoute.riskLevel]}
                          </span>
                        </div>

                        <p className="mb-6 max-w-3xl leading-8 text-slate-600">
                          {activeRoute.summary}
                        </p>

                        <div className="mb-5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-semibold text-slate-950">
                              适合指数
                            </span>
                            <span className="text-sm font-bold text-sky-700">
                              {activeRoute.matchScore}%
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-sky-600"
                              style={{ width: `${activeRoute.matchScore}%` }}
                            />
                          </div>

                          <p className="mt-2 text-xs leading-5 text-slate-300">
                            适合指数表示该路线与你当前目标、预算和基础条件的匹配程度，不代表录取、签证或就业成功率。
                          </p>

                          <div className="mt-4">
                            <p className="mb-2 text-sm font-semibold text-slate-950">
                              匹配原因
                            </p>

                            <ul className="space-y-1 text-sm leading-6 text-slate-600">
                              {activeRoute.matchReasons.map((reason) => (
                                <li key={reason}>• {reason}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex flex-wrap gap-2">
                            {activeRoute.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200/70"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={() => setSelectedRouteId(activeRoute.id)}
                            className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-100"
                          >
                            查看详细内容
                          </button>
                        </div>
                      </div>

                      <div className="border-t border-white/10 bg-white/95 px-6 py-5 text-slate-950 sm:px-7">
                        <h4 className="mb-3 font-semibold">
                          推荐阅读
                        </h4>

                        <div className="flex flex-wrap gap-3">
                          {activeRoute.relatedArticles.map((article) => (
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
                    </div>

                  </article>
                )}

                {showInsightModal && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 px-4 py-6"
                  >
                    <div
                      className="flex max-h-[86vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-indigo-50 shadow-2xl"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <div className="flex items-start justify-between gap-4 border-b border-sky-100 bg-white/75 px-6 py-5 backdrop-blur">
                        <div>
                          <p className="mb-2 text-sm font-medium text-sky-700">
                            推荐理由总结
                          </p>
                          <h3 className="text-2xl font-bold text-slate-950">
                            初步推荐路线分析
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            下面内容会结合你的目标国家、预算、语言能力和长期规划，解释系统为什么这样排序。
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setShowInsightModal(false)}
                          className="shrink-0 rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200/60 transition hover:bg-slate-50"
                        >
                          关闭
                        </button>
                      </div>

                      <div className="overflow-y-auto overscroll-contain px-6 py-5 pr-4 [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:rgba(203,213,225,0.25)_transparent] hover:[scrollbar-color:rgba(148,163,184,0.55)_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200/25 [&::-webkit-scrollbar-thumb]:transition-colors [&::-webkit-scrollbar-thumb]:duration-300 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300/70">
                        <div className="grid gap-4 md:grid-cols-2">
                          <section className="rounded-2xl bg-white/85 p-5 shadow-sm ring-1 ring-slate-200/60">
                            <h4 className="mb-3 font-semibold text-slate-900">
                              你的基础画像
                            </h4>

                            <div className="space-y-3 text-sm">
                              {profileSummary.slice(0, 6).map((item) => (
                                <p
                                  key={item}
                                  className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600"
                                >
                                  {item}
                                </p>
                              ))}
                            </div>
                          </section>

                          <section className="rounded-2xl bg-white/85 p-5 shadow-sm ring-1 ring-slate-200/60">
                            <h4 className="mb-3 font-semibold text-slate-900">
                              系统判断结论
                            </h4>

                            <p className="text-sm leading-7 text-slate-600">
                              {insightSummary}
                            </p>
                          </section>
                        </div>

                        <section className="mt-4 rounded-2xl bg-white/85 p-5 shadow-sm ring-1 ring-slate-200/60">
                          <h4 className="mb-4 font-semibold text-slate-900">
                            推荐路线对比
                          </h4>

                          <div className="grid gap-3 md:grid-cols-3">
                            {recommendedRoutes.map((route, index) => (
                              <div
                                key={route.id}
                                className="flex min-h-[220px] flex-col rounded-2xl border border-slate-100 bg-slate-50 p-4"
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
                                    <strong className="text-sky-700">
                                      {route.matchScore}%
                                    </strong>
                                  </div>

                                  <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-200">
                                    <div
                                      className="h-full rounded-full bg-sky-600"
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
                          <section className="rounded-2xl bg-white/85 p-5 shadow-sm ring-1 ring-slate-200/60">
                            <h4 className="mb-3 font-semibold text-slate-900">
                              需要重点注意
                            </h4>

                            <ul className="space-y-2 text-sm leading-6 text-slate-600">
                              <li>• 匹配度不是录取率、签证通过率或就业成功率。</li>
                              <li>• 如果目标国家路线排第一但分数不高，说明系统尊重你的目标，但仍认为风险需要谨慎评估。</li>
                              <li>• 高预算、高语言门槛或政策变化快的路线，建议优先做人工复核。</li>
                            </ul>
                          </section>

                          <section className="rounded-2xl bg-white/85 p-5 shadow-sm ring-1 ring-slate-200/60">
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
                )}

                {selectedRoute && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 px-4 py-6"
                  >
                    <div
                      className="flex max-h-[86vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-indigo-50 shadow-2xl"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <div className="flex items-start justify-between gap-4 border-b border-sky-100 bg-white/75 px-6 py-5 backdrop-blur">
                        <div>
                          <p className="mb-2 text-sm font-medium text-sky-700">
                            {selectedRoute.country} · 路线详细分析
                          </p>

                          <h3 className="text-2xl font-bold text-slate-950">
                            {selectedRoute.title}
                          </h3>

                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            这份内容会帮助你判断该路线是否真的适合自己，重点关注预算、语言、风险和下一步行动。
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedRouteId(null)}
                          className="shrink-0 rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200/60 transition hover:bg-slate-50"
                        >
                          关闭
                        </button>
                      </div>

                      <div className="overflow-y-auto overscroll-contain px-6 py-5 pr-4 [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:rgba(203,213,225,0.25)_transparent] hover:[scrollbar-color:rgba(148,163,184,0.55)_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200/25 [&::-webkit-scrollbar-thumb]:transition-colors [&::-webkit-scrollbar-thumb]:duration-300 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300/70">
                        <section className="rounded-2xl bg-white/85 p-5 shadow-sm ring-1 ring-slate-200/60">
                          <h4 className="mb-3 font-semibold text-slate-900">
                            路线概述
                          </h4>

                          <p className="text-sm leading-7 text-slate-600">
                            {selectedRoute.summary}
                          </p>
                        </section>

                        <div className="mt-4 grid gap-4 md:grid-cols-3">
                          <section className="rounded-2xl bg-white/85 p-5 shadow-sm ring-1 ring-slate-200/60">
                            <p className="text-xs font-medium text-slate-500">
                              国家 / 地区
                            </p>
                            <p className="mt-2 font-semibold text-slate-900">
                              {selectedRoute.country}
                            </p>
                          </section>

                          <section className="rounded-2xl bg-white/85 p-5 shadow-sm ring-1 ring-slate-200/60">
                            <p className="text-xs font-medium text-slate-500">
                              预算判断
                            </p>
                            <p className="mt-2 font-semibold text-slate-900">
                              {getBudgetLabel(selectedRoute.budgetLevel)}
                            </p>
                          </section>

                          <section className="rounded-2xl bg-white/85 p-5 shadow-sm ring-1 ring-slate-200/60">
                            <p className="text-xs font-medium text-slate-500">
                              路线难度
                            </p>
                            <p className="mt-2 font-semibold text-slate-900">
                              {routeRiskDisplayLabels[selectedRoute.riskLevel]}
                            </p>
                          </section>
                        </div>

                        <section className="mt-4 rounded-2xl bg-white/85 p-5 shadow-sm ring-1 ring-slate-200/60">
                          <div className="mb-2 flex items-center justify-between">
                            <h4 className="font-semibold text-slate-900">
                              路线匹配度
                            </h4>
                            <strong className="text-sky-700">
                              {selectedRoute.matchScore}%
                            </strong>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-sky-600"
                              style={{ width: `${selectedRoute.matchScore}%` }}
                            />
                          </div>

                          <p className="mt-3 text-xs leading-5 text-slate-500">
                            匹配度表示该路线与你当前目标、预算、语言和基础条件的接近程度，不代表录取、签证或就业成功率。
                          </p>
                        </section>

                        <section className="mt-4 rounded-2xl bg-white/85 p-5 shadow-sm ring-1 ring-slate-200/60">
                          <h4 className="mb-3 font-semibold text-slate-900">
                            为什么推荐这条路线
                          </h4>

                          <ul className="space-y-2 text-sm leading-6 text-slate-600">
                            {selectedRoute.matchReasons.map((reason) => (
                              <li key={reason}>• {reason}</li>
                            ))}
                          </ul>
                        </section>

                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                          <section className="rounded-2xl bg-white/85 p-5 shadow-sm ring-1 ring-slate-200/60">
                            <h4 className="mb-3 font-semibold text-slate-900">
                              适合人群
                            </h4>
                            <ul className="space-y-2 text-sm leading-6 text-slate-600">
                              {selectedRoute.suitableFor.map((item) => (
                                <li key={item}>• {item}</li>
                              ))}
                            </ul>
                          </section>

                          <section className="rounded-2xl bg-white/85 p-5 shadow-sm ring-1 ring-slate-200/60">
                            <h4 className="mb-3 font-semibold text-slate-900">
                              路线优势
                            </h4>
                            <ul className="space-y-2 text-sm leading-6 text-slate-600">
                              {selectedRoute.advantages.map((item) => (
                                <li key={item}>• {item}</li>
                              ))}
                            </ul>
                          </section>

                          <section className="rounded-2xl bg-white/85 p-5 shadow-sm ring-1 ring-slate-200/60">
                            <h4 className="mb-3 font-semibold text-slate-900">
                              风险提醒
                            </h4>
                            <ul className="space-y-2 text-sm leading-6 text-slate-600">
                              {selectedRoute.risks.map((item) => (
                                <li key={item}>• {item}</li>
                              ))}
                            </ul>
                          </section>

                          <section className="rounded-2xl bg-white/85 p-5 shadow-sm ring-1 ring-slate-200/60">
                            <h4 className="mb-3 font-semibold text-slate-900">
                              下一步建议
                            </h4>
                            <ul className="space-y-2 text-sm leading-6 text-slate-600">
                              {selectedRoute.nextSteps.map((item) => (
                                <li key={item}>• {item}</li>
                              ))}
                            </ul>
                          </section>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {selectedRoute.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-white/80 px-3 py-1 text-xs text-slate-600 shadow-sm ring-1 ring-slate-200/60"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <section className="mt-4 rounded-2xl bg-white/85 p-5 shadow-sm ring-1 ring-slate-200/60">
                          <h4 className="mb-3 font-semibold text-slate-900">
                            推荐阅读
                          </h4>

                          <div className="flex flex-wrap gap-3">
                            {selectedRoute.relatedArticles.map((article) => (
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
                          className="rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-sky-700"
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
                      <p className="mt-4 rounded-2xl bg-gradient-to-b from-slate-50 to-white px-4 py-3 text-sm text-slate-600">
                        {copyStatus}
                      </p>
                    )}
                  </div>
                )}

                <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-sm leading-7 text-amber-800">
                  <strong>重要提示：</strong>
                  当前结果是基于本地规则生成的初步建议，不构成签证、移民、法律或就业承诺。
                  涉及政策、签证、学校和费用的信息，请以官方机构和最新资料为准。
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}