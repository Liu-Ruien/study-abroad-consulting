// 出国路线规划展示标签和选项查询

import type {
  BudgetLevel,
  CountryPreference,
  LanguageLevel,
  PreferenceAnswer,
  RiskLevel,
  TargetCountry,
} from "./types";
import {
  budgetOptions,
  countryPreferenceOptions,
  languageOptions,
  preferenceOptions,
  targetCountryOptions,
} from "./options";

// 通用选项查询方法
function getOptionLabel<T extends string>(
  options: { value: T; label: string }[],
  value: T
): string {
  const option = options.find((item) => item.value === value);
  return option ? option.label : "暂不确定";
}

export function getBudgetLabel(level: BudgetLevel): string {
  return getOptionLabel(budgetOptions, level);
}

export function getLanguageLabel(level: LanguageLevel): string {
  return getOptionLabel(languageOptions, level);
}

export function getCountryPreferenceLabel(value: CountryPreference): string {
  return getOptionLabel(countryPreferenceOptions, value);
}

export function getTargetCountryLabel(value: TargetCountry): string {
  return getOptionLabel(targetCountryOptions, value);
}

export function getPreferenceLabel(value: PreferenceAnswer): string {
  return getOptionLabel(preferenceOptions, value);
}

// 风险等级显示
export const riskLevelLabels: Record<RiskLevel, string> = {
  low: "低风险",
  medium: "中等风险",
  high: "较高风险",
};
