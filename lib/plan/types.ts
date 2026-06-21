// 出国路线规划类型定义

export type BudgetLevel = "low" | "medium" | "high" | "unknown";

export type LanguageLevel = "none" | "basic" | "intermediate" | "advanced";

export type CountryPreference = "asia" | "english" | "europe" | "any";

export type TargetCountry =
  | "unknown"
  | "japan"
  | "new-zealand"
  | "australia"
  | "germany"
  | "malaysia"
  | "philippines"
  | "other";

export type PreferenceAnswer = "yes" | "no" | "unknown";

export type RiskLevel = "low" | "medium" | "high";

// 用户填写的路线规划表单数据
export type PlanFormState = {
  age: string;
  education: string;
  major: string;
  budgetLevel: BudgetLevel;
  languageLevel: LanguageLevel;
  countryPreference: CountryPreference;
  targetCountry: TargetCountry;
  wantsPartTimeJob: PreferenceAnswer;
  wantsLongTermStay: PreferenceAnswer;
  acceptsLowBudgetRoute: PreferenceAnswer;
};

// 推荐文章类型
export type RelatedArticle = {
  title: string;
  href: string;
};

// 出国路线基础数据类型
export type PlanRoute = {
  id: string;
  title: string;
  country: string;
  routeType: string;
  budgetLevel: BudgetLevel;
  riskLevel: RiskLevel;
  summary: string;
  suitableFor: string[];
  advantages: string[];
  risks: string[];
  nextSteps: string[];
  relatedArticles: RelatedArticle[];
  tags: string[];
};

// 推荐结果类型：在基础路线数据上增加匹配分数和匹配原因
export type RecommendedPlanRoute = PlanRoute & {
  matchScore: number;
  matchReasons: string[];
};
