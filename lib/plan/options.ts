// 出国路线规划表单选项

import type {
  BudgetLevel,
  CountryPreference,
  LanguageLevel,
  PreferenceAnswer,
  TargetCountry,
} from "./types";

// 预算选项
export const budgetOptions = [
  { value: "unknown", label: "暂不确定" },
  { value: "low", label: "低预算：10 万元以内" },
  { value: "medium", label: "中等预算：10 万 - 30 万元" },
  { value: "high", label: "较高预算：30 万元以上" },
] satisfies { value: BudgetLevel; label: string }[];

// 语言能力选项
export const languageOptions = [
  { value: "none", label: "几乎没有外语基础" },
  { value: "basic", label: "基础交流水平" },
  { value: "intermediate", label: "可以日常沟通 / 有一定考试基础" },
  { value: "advanced", label: "较强外语能力" },
] satisfies { value: LanguageLevel; label: string }[];

// 国家偏好选项
export const countryPreferenceOptions = [
  { value: "any", label: "暂不确定，想先看推荐" },
  { value: "asia", label: "亚洲国家优先" },
  { value: "english", label: "英语国家优先" },
  { value: "europe", label: "欧洲国家优先" },
] satisfies { value: CountryPreference; label: string }[];

// 目标国家选项
export const targetCountryOptions = [
  { value: "unknown", label: "暂不确定，想让系统推荐" },
  { value: "japan", label: "日本" },
  { value: "new-zealand", label: "新西兰" },
  { value: "australia", label: "澳大利亚" },
  { value: "germany", label: "德国" },
  { value: "malaysia", label: "马来西亚" },
  { value: "philippines", label: "菲律宾" },
  { value: "other", label: "其他国家" },
] satisfies { value: TargetCountry; label: string }[];

// 是否倾向选项
export const preferenceOptions = [
  { value: "unknown", label: "暂不确定" },
  { value: "yes", label: "是" },
  { value: "no", label: "否" },
] satisfies { value: PreferenceAnswer; label: string }[];
