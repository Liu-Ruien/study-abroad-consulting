"use client";

// 出国路线规划页面
// 作用：收集用户基本情况，并基于本地规则输出路线建议、用户画像和推荐理由
// 当前阶段不接真实 AI、不接数据库，只做产品原型

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import PlanForm, {
  type EditingSummaryField,
  type FormSectionKey,
} from "@/components/plan/PlanForm";
import PlanInsightModal from "@/components/plan/PlanInsightModal";
import PlanPdfReport from "@/components/plan/PlanPdfReport";
import PlanRouteDetailModal from "@/components/plan/PlanRouteDetailModal";
import {
  createPlanInsightSummary,
  createUserProfileSummary,
  getRecommendedRoutes,
  targetCountryOptions,
  type CountryPreference,
  type PlanFormState,
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

export default function PlanPage() {
  // 当前正在填写的表单数据
  const [form, setForm] = useState<PlanFormState>(initialForm);

  // 是否已经点击过“生成路线建议”
  const [submitted, setSubmitted] = useState(false);

  const resultGridRef = useRef<HTMLDivElement | null>(null);
  const resultWorkbenchRef = useRef<HTMLElement | null>(null);
  const mobileRouteCardStartRef = useRef<HTMLDivElement | null>(null);
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
  const [isCopyToastVisible, setIsCopyToastVisible] = useState(false);
  const copyToastTimerRef = useRef<number | null>(null);

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

  const [openFormSections, setOpenFormSections] = useState<Record<FormSectionKey, boolean>>({
    basic: true,
    preference: false,
    goal: false,
  });

  // 摘要模式下，当前正在单独编辑的字段
  const [editingSummaryField, setEditingSummaryField] =
    useState<EditingSummaryField>(null);

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
    if (
      isVeryOlderUser &&
      isLowEducation &&
      isLowBudget &&
      isWeakLanguage &&
      submittedForm.targetCountry === "unknown"
    ) {
      return [];
    }

    return getRecommendedRoutes(submittedForm);
  }, [submittedForm]);

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

  function toggleFormSection(section: FormSectionKey) {
    setOpenFormSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  function updateField<K extends keyof PlanFormState>(
    key: K,
    value: PlanFormState[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function scrollToPlanResultStart() {
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches;
    const target = isMobile
      ? mobileRouteCardStartRef.current ?? resultWorkbenchRef.current ?? resultGridRef.current
      : resultGridRef.current;

    target?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function handleRouteSwitch(index: number) {
    setActiveRouteIndex(index);

    requestAnimationFrame(() => {
      scrollToPlanResultStart();
    });
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
        scrollToPlanResultStart();
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
    setOpenFormSections({
      basic: true,
      preference: false,
      goal: false,
    });
  }

  function showCopyToast(message: string) {
    if (copyToastTimerRef.current) {
      window.clearTimeout(copyToastTimerRef.current);
    }

    setCopyStatus(message);
    setIsCopyToastVisible(true);

    copyToastTimerRef.current = window.setTimeout(() => {
      setIsCopyToastVisible(false);

      window.setTimeout(() => {
        setCopyStatus("");
      }, 260);
    }, 1600);
  }

  // 复制路线规划结果摘要
  async function handleCopyResult() {
    if (!planResultText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(planResultText);
      showCopyToast("路线规划摘要已复制");
    } catch {
      showCopyToast("复制失败，请手动复制页面内容");
    }

    setIsCopyToastVisible(true);

    setTimeout(() => {
      setIsCopyToastVisible(false);
    }, 1600);

    setTimeout(() => {
      setCopyStatus("");
    }, 2000);
  }

  // 打印 / 保存 PDF
  function handlePrintResult() {
    window.print();
  }

  return (
    <main className="plan-page-root min-h-screen bg-[#f5f5f7] px-4 py-8 text-slate-950 sm:px-6 sm:py-12">
      {/* PDF 专用报告区域必须是 .plan-page-root 的直接子元素，避免打印时被普通页面容器隐藏 */}
      {submitted && (
        <PlanPdfReport
          submittedAt={submittedAt}
          profileSummary={profileSummary}
          recommendedRoutes={recommendedRoutes}
        />
      )}

      <div className="mx-auto max-w-7xl">
        {copyStatus && (
          <div
            className={`no-print pointer-events-none fixed left-1/2 top-8 z-[70] -translate-x-1/2 rounded-full bg-white/90 px-5 py-3 text-sm font-medium text-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.16)] ring-1 ring-black/10 backdrop-blur-xl transition-all duration-300 ${isCopyToastVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
              }`}
          >
            {copyStatus}
          </div>
        )}
        {/* 页面头部 */}
        <section className="mb-8 overflow-hidden rounded-[36px] bg-[radial-gradient(circle_at_18%_12%,rgba(14,165,233,0.10)_0%,rgba(224,242,254,0.42)_34%,transparent_60%),linear-gradient(145deg,rgba(248,250,252,0.96)_0%,rgba(255,255,255,0.94)_52%,rgba(241,245,249,0.86)_100%)] px-6 py-11 shadow-[0_24px_80px_rgba(15,23,42,0.075)] ring-1 ring-white/80 backdrop-blur-xl sm:mb-10 sm:px-12 sm:py-16">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 inline-flex rounded-full bg-slate-950 px-4 py-1.5 text-sm font-medium text-white shadow-sm">
              v0.5.2 · 出国路线决策工作台
            </p>

            <h1 className="text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-6xl">
              先看清方向，再决定路线。
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-500 sm:text-lg">
              输入基础情况，获得本地规则生成的路线建议、风险提示和下一步行动清单。
            </p>
          </div>

          <div className="mx-auto mt-9 grid max-w-3xl gap-3 sm:grid-cols-3">
            {[
              ["输入", "基础条件"],
              ["分析", "路线匹配"],
              ["输出", "规划报告"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-3xl bg-slate-50/80 px-5 py-4 ring-1 ring-slate-200/70"
              >
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-1 font-semibold text-slate-950">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <div
          ref={resultGridRef}
          className="grid scroll-mt-28 items-start gap-6 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-8"
        >
          {/* 左侧表单 */}
          <PlanForm
            form={form}
            submitted={submitted}
            isFormCollapsed={isFormCollapsed}
            isResultOutdated={isResultOutdated}
            isGenerating={isGenerating}
            formError={formError}
            openFormSections={openFormSections}
            editingSummaryField={editingSummaryField}
            availableTargetCountryOptions={availableTargetCountryOptions}
            onSubmit={handleSubmit}
            onReset={handleReset}
            onToggleFormSection={toggleFormSection}
            onUpdateField={updateField}
            onCountryPreferenceChange={handleCountryPreferenceChange}
            onEditingSummaryFieldChange={setEditingSummaryField}
          />

          {/* 右侧结果 */}
          <section
            className="print-report space-y-6 scroll-mt-6 [overflow-anchor:none]"
          >
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
                  <article
                    ref={resultWorkbenchRef}
                    className="scroll-mt-28 overflow-hidden rounded-[32px] bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.07)] ring-1 ring-black/5 backdrop-blur-xl [overflow-anchor:none]"
                  >
                    <div className="flex flex-col gap-4 border-b border-slate-100 bg-white px-6 py-6 sm:flex-row sm:items-start sm:justify-between">
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

                        <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                          先看最适合你的路线，再切换查看其他备选方案
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowInsightModal(true)}
                        className="inline-flex items-center justify-center rounded-full border border-sky-100 bg-sky-50/80 px-4 py-2 text-sm font-medium text-sky-700 ring-1 ring-sky-100/70 transition hover:bg-sky-100/80 hover:text-sky-800"
                      >
                        查看整体分析
                      </button>
                    </div>

                    <div className="grid gap-2 px-6 py-5 sm:grid-cols-3">
                      {recommendedRoutes.map((route, index) => (
                        <button
                          key={route.id}
                          type="button"
                          onClick={() => handleRouteSwitch(index)}
                          className={`rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${activeRouteIndex === index
                            ? "bg-slate-950 text-white shadow-sm"
                            : "bg-slate-100/80 text-slate-600 hover:bg-white hover:text-slate-950 hover:ring-1 hover:ring-slate-200"
                            }`}
                        >
                          推荐 {index + 1} · {route.country}
                        </button>
                      ))}
                    </div>

                    <div
                      ref={mobileRouteCardStartRef}
                      className="h-0 scroll-mt-24 md:hidden"
                    />

                    <div className="mx-4 mb-5 overflow-hidden rounded-[28px] bg-slate-50/80 ring-1 ring-slate-200/70 sm:mx-6 sm:mb-6">
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

                        <div className="mb-5 rounded-3xl bg-white p-4 ring-1 ring-slate-200/70">
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

                          <p className="mt-2 text-xs leading-5 text-slate-400">
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
                            className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950 ring-1 ring-slate-200 transition hover:bg-slate-50"
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
                  <PlanInsightModal
                    profileSummary={profileSummary}
                    insightSummary={insightSummary}
                    recommendedRoutes={recommendedRoutes}
                    primaryRoute={primaryRoute}
                    onClose={() => setShowInsightModal(false)}
                  />
                )}

                {selectedRoute && (
                  <PlanRouteDetailModal
                    route={selectedRoute}
                    riskDisplayLabels={routeRiskDisplayLabels}
                    onClose={() => setSelectedRouteId(null)}
                  />
                )}

                {submitted && (
                  <div className="no-print rounded-[28px] bg-white/90 p-5 shadow-sm ring-1 ring-black/5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-medium text-slate-500">结果操作</p>
                        <h3 className="mt-1 text-lg font-semibold text-slate-950">
                          保存你的路线规划结果
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          生成时间：{submittedAt ? submittedAt.toLocaleString("zh-CN") : "暂无记录"}
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
                          className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200/70 transition-colors hover:bg-slate-200/70"
                        >
                          打印 / 保存 PDF
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="rounded-[28px] bg-amber-50/70 p-5 text-sm leading-7 text-amber-800 ring-1 ring-amber-200/70">
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