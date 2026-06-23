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
import { usePageContent } from "@/lib/i18n/use-page-content";
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
  const copy = usePageContent().plan.form;

  function toggleSummaryField(field: Exclude<EditingSummaryField, null>) {
    onEditingSummaryFieldChange(editingSummaryField === field ? null : field);
  }

  return (
    <section className={planFormShell}>
      {submitted && isFormCollapsed ? (
        <form onSubmit={onSubmit}>
          <p className="mb-2 text-sm font-medium text-sky-700">
            {copy.summaryKicker}
          </p>

          <h2 className="mb-3 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
            {copy.summaryTitle}
          </h2>

          <p className="mb-5 text-sm leading-6 text-slate-500">
            {copy.summaryHint}
          </p>

          {isResultOutdated && (
            <div className="mb-4 rounded-2xl border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-sm leading-6 text-amber-800">
              {copy.outdatedWarning}
            </div>
          )}

          <div className="space-y-2">
            <SummaryItem
              label={copy.labels.age}
              value={form.age ? `${form.age} ${copy.ageSuffix}` : copy.notFilled}
              isEditing={editingSummaryField === "age"}
              onToggle={() => toggleSummaryField("age")}
            >
              <input
                value={form.age}
                onChange={(event) => onUpdateField("age", event.target.value)}
                placeholder={copy.placeholders.age}
                className={inputClassName}
              />
            </SummaryItem>

            <SummaryItem
              label={copy.labels.education}
              value={form.education || copy.notFilled}
              isEditing={editingSummaryField === "education"}
              onToggle={() => toggleSummaryField("education")}
            >
              <input
                value={form.education}
                onChange={(event) =>
                  onUpdateField("education", event.target.value)
                }
                placeholder={copy.placeholders.education}
                className={inputClassName}
              />
            </SummaryItem>

            <SummaryItem
              label={copy.labels.major}
              value={form.major || copy.notFilled}
              isEditing={editingSummaryField === "major"}
              onToggle={() => toggleSummaryField("major")}
            >
              <input
                value={form.major}
                onChange={(event) => onUpdateField("major", event.target.value)}
                placeholder={copy.placeholders.major}
                className={inputClassName}
              />
            </SummaryItem>

            <SummarySelectItem
              label={copy.labels.budget}
              value={getBudgetLabel(form.budgetLevel)}
              isEditing={editingSummaryField === "budgetLevel"}
              onToggle={() => toggleSummaryField("budgetLevel")}
            >
              <SelectField
                label={copy.labels.budget}
                value={form.budgetLevel}
                options={budgetOptions}
                onChange={(value) =>
                  onUpdateField("budgetLevel", value as BudgetLevel)
                }
              />
            </SummarySelectItem>

            <SummarySelectItem
              label={copy.labels.language}
              value={
                languageOptions.find(
                  (option) => option.value === form.languageLevel
                )?.label ?? copy.notFilled
              }
              isEditing={editingSummaryField === "languageLevel"}
              onToggle={() => toggleSummaryField("languageLevel")}
            >
              <SelectField
                label={copy.labels.language}
                value={form.languageLevel}
                options={languageOptions}
                onChange={(value) =>
                  onUpdateField("languageLevel", value as LanguageLevel)
                }
              />
            </SummarySelectItem>

            <SummarySelectItem
              label={copy.labels.countryPreference}
              value={
                countryPreferenceOptions.find(
                  (option) => option.value === form.countryPreference
                )?.label ?? copy.notFilled
              }
              isEditing={editingSummaryField === "countryPreference"}
              onToggle={() => toggleSummaryField("countryPreference")}
            >
              <SelectField
                label={copy.labels.countryPreference}
                value={form.countryPreference}
                options={countryPreferenceOptions}
                onChange={(value) =>
                  onCountryPreferenceChange(value as CountryPreference)
                }
              />
            </SummarySelectItem>

            <SummarySelectItem
              label={copy.labels.targetCountry}
              value={
                targetCountryOptions.find(
                  (option) => option.value === form.targetCountry
                )?.label ?? copy.notFilled
              }
              isEditing={editingSummaryField === "targetCountry"}
              onToggle={() => toggleSummaryField("targetCountry")}
            >
              <SelectField
                label={copy.labels.targetCountry}
                value={form.targetCountry}
                options={availableTargetCountryOptions}
                onChange={(value) =>
                  onUpdateField("targetCountry", value as TargetCountry)
                }
              />
            </SummarySelectItem>

            <SummarySelectItem
              label={copy.labels.partTime}
              value={
                preferenceOptions.find(
                  (option) => option.value === form.wantsPartTimeJob
                )?.label ?? copy.notFilled
              }
              isEditing={editingSummaryField === "wantsPartTimeJob"}
              onToggle={() => toggleSummaryField("wantsPartTimeJob")}
            >
              <SelectField
                label={copy.labels.partTime}
                value={form.wantsPartTimeJob}
                options={preferenceOptions}
                onChange={(value) =>
                  onUpdateField("wantsPartTimeJob", value as PreferenceAnswer)
                }
              />
            </SummarySelectItem>

            <SummarySelectItem
              label={copy.labels.longTerm}
              value={
                preferenceOptions.find(
                  (option) => option.value === form.wantsLongTermStay
                )?.label ?? copy.notFilled
              }
              isEditing={editingSummaryField === "wantsLongTermStay"}
              onToggle={() => toggleSummaryField("wantsLongTermStay")}
            >
              <SelectField
                label={copy.labels.longTerm}
                value={form.wantsLongTermStay}
                options={preferenceOptions}
                onChange={(value) =>
                  onUpdateField("wantsLongTermStay", value as PreferenceAnswer)
                }
              />
            </SummarySelectItem>

            <SummarySelectItem
              label={copy.labels.lowBudget}
              value={
                preferenceOptions.find(
                  (option) => option.value === form.acceptsLowBudgetRoute
                )?.label ?? copy.notFilled
              }
              isEditing={editingSummaryField === "acceptsLowBudgetRoute"}
              onToggle={() => toggleSummaryField("acceptsLowBudgetRoute")}
            >
              <SelectField
                label={copy.labels.lowBudget}
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
              {isGenerating ? copy.regenerating : copy.regenerate}
            </button>

            <button
              type="button"
              onClick={onReset}
              className={resetButtonClass}
            >
              {copy.resetAll}
            </button>
          </div>
        </form>
      ) : (
        <>
          <h2 className="mb-2 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
            {copy.formTitle}
          </h2>

          <p className="mb-6 text-sm leading-6 text-slate-500">
            {copy.formHint}
          </p>

          <form onSubmit={onSubmit} className="relative space-y-3 overflow-visible">
            <FormSection
              title={copy.sections.basic.title}
              description={copy.sections.basic.description}
              isOpen={openFormSections.basic}
              onToggle={() => onToggleFormSection("basic")}
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {copy.labels.age}
                </label>
                <input
                  value={form.age}
                  onChange={(event) => onUpdateField("age", event.target.value)}
                  placeholder={copy.placeholders.age}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {copy.labels.education}
                </label>
                <input
                  value={form.education}
                  onChange={(event) =>
                    onUpdateField("education", event.target.value)
                  }
                  placeholder={copy.placeholders.education}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {copy.labels.major}
                </label>
                <input
                  value={form.major}
                  onChange={(event) => onUpdateField("major", event.target.value)}
                  placeholder={copy.placeholders.major}
                  className={inputClassName}
                />
              </div>
            </FormSection>

            <FormSection
              title={copy.sections.preference.title}
              description={copy.sections.preference.description}
              isOpen={openFormSections.preference}
              onToggle={() => onToggleFormSection("preference")}
            >
              <SelectField
                label={copy.labels.budget}
                value={form.budgetLevel}
                options={budgetOptions}
                onChange={(value) =>
                  onUpdateField("budgetLevel", value as BudgetLevel)
                }
              />

              <SelectField
                label={copy.labels.language}
                value={form.languageLevel}
                options={languageOptions}
                onChange={(value) =>
                  onUpdateField("languageLevel", value as LanguageLevel)
                }
              />

              <SelectField
                label={copy.labels.countryPreference}
                value={form.countryPreference}
                options={countryPreferenceOptions}
                onChange={(value) =>
                  onCountryPreferenceChange(value as CountryPreference)
                }
              />

              <SelectField
                label={copy.labels.targetCountry}
                value={form.targetCountry}
                options={availableTargetCountryOptions}
                onChange={(value) =>
                  onUpdateField("targetCountry", value as TargetCountry)
                }
                helperText={copy.targetCountryHelper}
              />
            </FormSection>

            <FormSection
              title={copy.sections.goal.title}
              description={copy.sections.goal.description}
              isOpen={openFormSections.goal}
              onToggle={() => onToggleFormSection("goal")}
            >
              <SelectField
                label={copy.labels.partTime}
                value={form.wantsPartTimeJob}
                options={preferenceOptions}
                onChange={(value) =>
                  onUpdateField("wantsPartTimeJob", value as PreferenceAnswer)
                }
              />

              <SelectField
                label={copy.labels.longTerm}
                value={form.wantsLongTermStay}
                options={preferenceOptions}
                onChange={(value) =>
                  onUpdateField("wantsLongTermStay", value as PreferenceAnswer)
                }
              />

              <SelectField
                label={copy.labels.lowBudget}
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
                  ? copy.regenerating
                  : submitted
                    ? copy.regenerate
                    : copy.generate}
              </button>

              <button
                type="button"
                onClick={onReset}
                className={`rounded-2xl px-5 py-3 text-sm font-medium ${btnSecondary}`}
              >
                {copy.reset}
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
