// 出国路线规划用户画像和整体分析文案

import type { PlanFormState } from "./types";
import {
  getBudgetLabel,
  getCountryPreferenceLabel,
  getLanguageLabel,
  getPreferenceLabel,
  getTargetCountryLabel,
} from "./labels";

// 根据用户填写的信息生成基础画像
export function createUserProfileSummary(form: PlanFormState): string[] {
  const profile: string[] = [];

  if (form.age) {
    profile.push(`年龄：${form.age} 岁左右`);
  }

  if (form.education) {
    profile.push(`学历背景：${form.education}`);
  }

  if (form.major) {
    profile.push(`专业 / 工作方向：${form.major}`);
  }

  profile.push(`预算情况：${getBudgetLabel(form.budgetLevel)}`);
  profile.push(`语言能力：${getLanguageLabel(form.languageLevel)}`);
  profile.push(`国家偏好：${getCountryPreferenceLabel(form.countryPreference)}`);
  profile.push(`目标国家：${getTargetCountryLabel(form.targetCountry)}`);
  profile.push(`打工意愿：${getPreferenceLabel(form.wantsPartTimeJob)}`);
  profile.push(`长期发展意愿：${getPreferenceLabel(form.wantsLongTermStay)}`);

  return profile;
}

// 生成推荐结果顶部总结
export function createPlanInsightSummary(form: PlanFormState): string {
  const summaries: string[] = [];

  if (form.targetCountry !== "unknown") {
    summaries.push(
      `你已经选择了明确目标国家：${getTargetCountryLabel(form.targetCountry)}，系统会优先展示相关路线，但匹配度仍会受预算、语言、年龄和学历影响。`
    );
  }

  if (form.countryPreference === "asia") {
    summaries.push("你当前更偏向亚洲方向，适合优先了解日本、马来西亚、菲律宾等路线。");
  } else if (form.countryPreference === "english") {
    summaries.push("你当前更偏向英语国家方向，可以重点比较新西兰、澳洲以及英语学习过渡路线。");
  } else if (form.countryPreference === "europe") {
    summaries.push("你当前更偏向欧洲方向，可以把德国双元制等职业教育路线作为研究对象。");
  } else {
    summaries.push("你当前还没有明确国家偏好，适合先通过预算、语言能力和长期目标筛选路线。");
  }

  if (form.budgetLevel === "low") {
    summaries.push("由于预算偏低，建议优先考虑低成本过渡或语言准备路线；高成本英语国家路线需要先做资金可行性评估。");
  } else if (form.budgetLevel === "medium") {
    summaries.push("你的预算属于中等区间，可以重点比较日本、德国职业教育和部分亚洲留学路线。");
  } else if (form.budgetLevel === "high") {
    summaries.push("你的预算空间较大，可以进一步研究新西兰、澳洲等英语国家路线，但仍需要核实语言门槛和政策风险。");
  }

  if (form.wantsLongTermStay === "yes") {
    summaries.push("你有长期留在海外的想法，因此需要重点关注语言能力、专业匹配、后续就业路径和签证稳定性。");
  }

  return summaries.join("");
}
