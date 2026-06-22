"use client";

import type { FormEvent } from "react";
import {
  budgetOptions,
  countryPreferenceOptions,
  getBudgetLabel,
  languageOptions,
  preferenceOptions,
  targetCountryOptions,
  type BudgetLevel,
  type CountryPreference,
  type LanguageLevel,
  type PlanFormState,
  type PreferenceAnswer,
  type TargetCountry,
} from "@/lib/plan-routes";
import {
  btnPrimary,
  btnSecondary,
  inputField,
  planFormShell,
} from "@/lib/ui/card-system";
import FormSection from "./FormSection";
import SelectField, { type SelectFieldOption } from "./SelectField";
import SummaryItem, { SummarySelectItem } from "./SummaryItem";

export type FormSectionKey = "basic" | "preference" | "goal";

export type EditingSummaryField =
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
  | null;

type PlanFormProps = {
  form: PlanFormState;
  submitted: boolean;
  isFormCollapsed: boolean;
  isResultOutdated: boolean;
  isGenerating: boolean;
  formError: string;
  openFormSections: Record<FormSectionKey, boolean>;
  editingSummaryField: EditingSummaryField;
  availableTargetCountryOptions: SelectFieldOption<TargetCountry>[];
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
  onToggleFormSection: (section: FormSectionKey) => void;
  onUpdateField: <K extends keyof PlanFormState>(
    key: K,
    value: PlanFormState[K]
  ) => void;
  onCountryPreferenceChange: (value: CountryPreference) => void;
  onEditingSummaryFieldChange: (field: EditingSummaryField) => void;
};

const inputClassName = `w-full rounded-2xl px-4 py-3 text-sm ${inputField}`;

const submitButtonClass = `w-full rounded-2xl px-5 py-3 text-sm font-medium ${btnPrimary}`;

const resetButtonClass = `w-full rounded-2xl px-5 py-3 text-sm font-medium ${btnSecondary}`;

export default function PlanForm({
  form,
  submitted,
  isFormCollapsed,
  isResultOutdated,
  isGenerating,
  formError,
  openFormSections,
  editingSummaryField,
  availableTargetCountryOptions,
  onSubmit,
  onReset,
  onToggleFormSection,
  onUpdateField,
  onCountryPreferenceChange,
  onEditingSummaryFieldChange,
}: PlanFormProps) {
  function toggleSummaryField(field: Exclude<EditingSummaryField, null>) {
    onEditingSummaryFieldChange(editingSummaryField === field ? null : field);
  }

  return (
    <section className={planFormShell}>
      {submitted && isFormCollapsed ? (
        <form onSubmit={onSubmit}>
          <p className="mb-2 text-sm font-medium text-sky-700">
            已填写信息摘要
          </p>

          <h2 className="mb-3 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
            当前路线基于这些信息生成
          </h2>

          <p className="mb-5 text-sm leading-6 text-slate-500">
            点击可编辑的信息项即可单独修改。修改后需要重新生成路线建议。
          </p>

          {isResultOutdated && (
            <div className="mb-4 rounded-2xl border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-sm leading-6 text-amber-800">
              你已经修改了左侧信息，右侧路线仍是上一次生成的结果。请点击“重新生成路线建议”更新结果。
            </div>
          )}

          <div className="space-y-2">
            <SummaryItem
              label="年龄"
              value={form.age ? `${form.age} 岁左右` : "未填写"}
              isEditing={editingSummaryField === "age"}
              onToggle={() => toggleSummaryField("age")}
            >
              <input
                value={form.age}
                onChange={(event) => onUpdateField("age", event.target.value)}
                placeholder="例如：22"
                className={inputClassName}
              />
            </SummaryItem>

            <SummaryItem
              label="学历背景"
              value={form.education || "未填写"}
              isEditing={editingSummaryField === "education"}
              onToggle={() => toggleSummaryField("education")}
            >
              <input
                value={form.education}
                onChange={(event) =>
                  onUpdateField("education", event.target.value)
                }
                placeholder="例如：本科 / 大专 / 高中 / 已工作"
                className={inputClassName}
              />
            </SummaryItem>

            <SummaryItem
              label="专业方向"
              value={form.major || "未填写"}
              isEditing={editingSummaryField === "major"}
              onToggle={() => toggleSummaryField("major")}
            >
              <input
                value={form.major}
                onChange={(event) => onUpdateField("major", event.target.value)}
                placeholder="例如：软件工程 / 护理 / 机械 / 无明确方向"
                className={inputClassName}
              />
            </SummaryItem>

            <SummarySelectItem
              label="预算区间"
              value={getBudgetLabel(form.budgetLevel)}
              isEditing={editingSummaryField === "budgetLevel"}
              onToggle={() => toggleSummaryField("budgetLevel")}
            >
              <SelectField
                label="预算区间"
                value={form.budgetLevel}
                options={budgetOptions}
                onChange={(value) =>
                  onUpdateField("budgetLevel", value as BudgetLevel)
                }
              />
            </SummarySelectItem>

            <SummarySelectItem
              label="语言能力"
              value={
                languageOptions.find(
                  (option) => option.value === form.languageLevel
                )?.label ?? "未填写"
              }
              isEditing={editingSummaryField === "languageLevel"}
              onToggle={() => toggleSummaryField("languageLevel")}
            >
              <SelectField
                label="语言能力"
                value={form.languageLevel}
                options={languageOptions}
                onChange={(value) =>
                  onUpdateField("languageLevel", value as LanguageLevel)
                }
              />
            </SummarySelectItem>

            <SummarySelectItem
              label="国家 / 地区偏好"
              value={
                countryPreferenceOptions.find(
                  (option) => option.value === form.countryPreference
                )?.label ?? "未填写"
              }
              isEditing={editingSummaryField === "countryPreference"}
              onToggle={() => toggleSummaryField("countryPreference")}
            >
              <SelectField
                label="国家 / 地区偏好"
                value={form.countryPreference}
                options={countryPreferenceOptions}
                onChange={(value) =>
                  onCountryPreferenceChange(value as CountryPreference)
                }
              />
            </SummarySelectItem>

            <SummarySelectItem
              label="目标国家偏好"
              value={
                targetCountryOptions.find(
                  (option) => option.value === form.targetCountry
                )?.label ?? "未填写"
              }
              isEditing={editingSummaryField === "targetCountry"}
              onToggle={() => toggleSummaryField("targetCountry")}
            >
              <SelectField
                label="目标国家偏好"
                value={form.targetCountry}
                options={availableTargetCountryOptions}
                onChange={(value) =>
                  onUpdateField("targetCountry", value as TargetCountry)
                }
              />
            </SummarySelectItem>

            <SummarySelectItem
              label="边学边打工"
              value={
                preferenceOptions.find(
                  (option) => option.value === form.wantsPartTimeJob
                )?.label ?? "未填写"
              }
              isEditing={editingSummaryField === "wantsPartTimeJob"}
              onToggle={() => toggleSummaryField("wantsPartTimeJob")}
            >
              <SelectField
                label="是否希望边学习边打工？"
                value={form.wantsPartTimeJob}
                options={preferenceOptions}
                onChange={(value) =>
                  onUpdateField("wantsPartTimeJob", value as PreferenceAnswer)
                }
              />
            </SummarySelectItem>

            <SummarySelectItem
              label="长期留海外"
              value={
                preferenceOptions.find(
                  (option) => option.value === form.wantsLongTermStay
                )?.label ?? "未填写"
              }
              isEditing={editingSummaryField === "wantsLongTermStay"}
              onToggle={() => toggleSummaryField("wantsLongTermStay")}
            >
              <SelectField
                label="是否希望未来长期留在海外？"
                value={form.wantsLongTermStay}
                options={preferenceOptions}
                onChange={(value) =>
                  onUpdateField("wantsLongTermStay", value as PreferenceAnswer)
                }
              />
            </SummarySelectItem>

            <SummarySelectItem
              label="低预算过渡路线"
              value={
                preferenceOptions.find(
                  (option) => option.value === form.acceptsLowBudgetRoute
                )?.label ?? "未填写"
              }
              isEditing={editingSummaryField === "acceptsLowBudgetRoute"}
              onToggle={() => toggleSummaryField("acceptsLowBudgetRoute")}
            >
              <SelectField
                label="是否接受低预算过渡路线？"
                value={form.acceptsLowBudgetRoute}
                options={preferenceOptions}
                onChange={(value) =>
                  onUpdateField(
                    "acceptsLowBudgetRoute",
                    value as PreferenceAnswer
                  )
                }
              />
            </SummarySelectItem>
          </div>

          <div className="mt-5 space-y-3">
            <button
              type="submit"
              disabled={isGenerating}
              className={submitButtonClass}
            >
              {isGenerating ? "正在生成路线..." : "重新生成路线建议"}
            </button>

            <button
              type="button"
              onClick={onReset}
              className={resetButtonClass}
            >
              重置全部信息
            </button>
          </div>
        </form>
      ) : (
        <>
          <h2 className="mb-2 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
            填写你的基本情况
          </h2>

          <p className="mb-6 text-sm leading-6 text-slate-500">
            先填写必填信息，再按需要展开偏好设置。右侧结果只会在你点击生成后更新。
          </p>

          <form onSubmit={onSubmit} className="relative space-y-3 overflow-visible">
            <FormSection
              title="基础信息"
              description="先填写年龄、学历和专业方向。"
              isOpen={openFormSections.basic}
              onToggle={() => onToggleFormSection("basic")}
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  年龄
                </label>
                <input
                  value={form.age}
                  onChange={(event) => onUpdateField("age", event.target.value)}
                  placeholder="例如：22"
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  当前学历
                </label>
                <input
                  value={form.education}
                  onChange={(event) =>
                    onUpdateField("education", event.target.value)
                  }
                  placeholder="例如：本科 / 大专 / 高中 / 已工作"
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  专业方向 / 工作方向
                </label>
                <input
                  value={form.major}
                  onChange={(event) => onUpdateField("major", event.target.value)}
                  placeholder="例如：软件工程 / 护理 / 机械 / 无明确方向"
                  className={inputClassName}
                />
              </div>
            </FormSection>

            <FormSection
              title="路线偏好"
              description="预算、语言和目标国家会直接影响推荐结果。"
              isOpen={openFormSections.preference}
              onToggle={() => onToggleFormSection("preference")}
            >
              <SelectField
                label="预算区间"
                value={form.budgetLevel}
                options={budgetOptions}
                onChange={(value) =>
                  onUpdateField("budgetLevel", value as BudgetLevel)
                }
              />

              <SelectField
                label="语言能力"
                value={form.languageLevel}
                options={languageOptions}
                onChange={(value) =>
                  onUpdateField("languageLevel", value as LanguageLevel)
                }
              />

              <SelectField
                label="国家 / 地区偏好"
                value={form.countryPreference}
                options={countryPreferenceOptions}
                onChange={(value) =>
                  onCountryPreferenceChange(value as CountryPreference)
                }
              />

              <SelectField
                label="目标国家偏好"
                value={form.targetCountry}
                options={availableTargetCountryOptions}
                onChange={(value) =>
                  onUpdateField("targetCountry", value as TargetCountry)
                }
                helperText="目标国家选项会根据上方的国家 / 地区偏好自动筛选；如果还没确定，就保持默认。"
              />
            </FormSection>

            <FormSection
              title="长期规划"
              description="如果暂时不确定，可以保持默认。"
              isOpen={openFormSections.goal}
              onToggle={() => onToggleFormSection("goal")}
            >
              <SelectField
                label="是否希望边学习边打工？"
                value={form.wantsPartTimeJob}
                options={preferenceOptions}
                onChange={(value) =>
                  onUpdateField("wantsPartTimeJob", value as PreferenceAnswer)
                }
              />

              <SelectField
                label="是否希望未来长期留在海外？"
                value={form.wantsLongTermStay}
                options={preferenceOptions}
                onChange={(value) =>
                  onUpdateField("wantsLongTermStay", value as PreferenceAnswer)
                }
              />

              <SelectField
                label="是否接受低预算过渡路线？"
                value={form.acceptsLowBudgetRoute}
                options={preferenceOptions}
                onChange={(value) =>
                  onUpdateField(
                    "acceptsLowBudgetRoute",
                    value as PreferenceAnswer
                  )
                }
              />
            </FormSection>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="submit"
                disabled={isGenerating}
                className={`flex-1 rounded-2xl px-5 py-3 text-sm font-medium ${btnPrimary}`}
              >
                {isGenerating
                  ? "正在生成路线..."
                  : submitted
                    ? "重新生成路线建议"
                    : "生成路线建议"}
              </button>

              <button
                type="button"
                onClick={onReset}
                className={`rounded-2xl px-5 py-3 text-sm font-medium ${btnSecondary}`}
              >
                重置
              </button>
            </div>

            {formError && (
              <div className="mt-4 rounded-2xl border border-rose-200/80 bg-rose-50/50 px-4 py-3 text-sm leading-6 text-rose-700">
                {formError}
              </div>
            )}
          </form>
        </>
      )}
    </section>
  );
}
