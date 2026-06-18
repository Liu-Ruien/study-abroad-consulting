// 出国路线规划数据模块
// 作用：保存路线数据、表单选项、本地推荐规则、用户画像和推荐理由
// 当前阶段不接 AI、不接数据库，只使用本地规则进行路线推荐原型验证

export type BudgetLevel = "low" | "medium" | "high" | "unknown";

export type LanguageLevel = "none" | "basic" | "intermediate" | "advanced";

export type CountryPreference = "asia" | "english" | "europe" | "any";

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

// 是否倾向选项
export const preferenceOptions = [
  { value: "unknown", label: "暂不确定" },
  { value: "yes", label: "是" },
  { value: "no", label: "否" },
] satisfies { value: PreferenceAnswer; label: string }[];

// 风险等级显示
export const riskLevelLabels: Record<RiskLevel, string> = {
  low: "低风险",
  medium: "中等风险",
  high: "较高风险",
};

// 出国路线静态数据
export const planRoutes: PlanRoute[] = [
  {
    id: "japan-language-school",
    title: "日本语言学校 → 专门学校 / 就职路线",
    country: "日本",
    routeType: "留学 + 就职",
    budgetLevel: "medium",
    riskLevel: "medium",
    summary:
      "适合希望先通过语言学校过渡，再在日本继续升学或找工作的用户。路线相对清晰，生活距离中国较近。",
    suitableFor: [
      "预算中等，希望先去亚洲国家的人",
      "愿意学习日语的人",
      "希望未来在日本找工作的人",
      "能接受边学习边打工的人",
    ],
    advantages: [
      "离中国近，文化适应成本相对较低",
      "语言学校路线成熟，资料较多",
      "留学生可以在规定范围内打工",
      "适合作为进入日本社会的第一步",
    ],
    risks: [
      "需要保持出勤率，否则可能影响签证续签",
      "打工不能替代主要学习目的",
      "后续就职需要日语能力和专业能力",
      "城市不同，生活成本差异较大",
    ],
    nextSteps: [
      "了解日本语言学校申请流程",
      "预估一年学费和生活费",
      "开始学习日语",
      "准备护照、学历证明和资金证明",
    ],
    relatedArticles: [
      {
        title: "日本语言学校申请流程",
        href: "/articles/japan-language-school-application",
      },
      {
        title: "日本留学一年大概多少钱",
        href: "/articles/japan-study-cost",
      },
      {
        title: "日本留学生打工规则",
        href: "/articles/japan-part-time-job",
      },
    ],
    tags: ["亚洲", "日语", "中等预算", "可打工"],
  },
  {
    id: "new-zealand-study",
    title: "新西兰留学长期规划路线",
    country: "新西兰",
    routeType: "留学 + 长期发展",
    budgetLevel: "high",
    riskLevel: "medium",
    summary:
      "适合预算较高、希望体验英语国家学习环境，并考虑长期规划的用户。整体生活环境较好，但成本和就业市场需要认真评估。",
    suitableFor: [
      "预算较充足的人",
      "希望去英语国家的人",
      "喜欢安静生活环境的人",
      "希望长期规划海外生活的人",
    ],
    advantages: [
      "英语环境明显",
      "自然环境和生活质量较好",
      "教育体系偏实践",
      "适合长期规划型用户",
    ],
    risks: [
      "生活成本较高",
      "就业市场规模相对有限",
      "需要较强英语能力",
      "不同专业后续发展差异较大",
    ],
    nextSteps: [
      "了解新西兰适合人群",
      "评估预算是否充足",
      "确认目标课程和学校",
      "提前准备英语学习计划",
    ],
    relatedArticles: [
      {
        title: "新西兰留学适合哪些人",
        href: "/articles/nz-study-suitable",
      },
      {
        title: "新西兰生活成本介绍",
        href: "/articles/nz-living-cost",
      },
    ],
    tags: ["英语国家", "高预算", "长期规划", "生活环境"],
  },
  {
    id: "malaysia-study",
    title: "马来西亚低预算留学过渡路线",
    country: "马来西亚",
    routeType: "低预算留学",
    budgetLevel: "low",
    riskLevel: "medium",
    summary:
      "适合预算有限，但希望先获得海外学习经历、英语环境和学历提升机会的用户。适合作为低成本出国过渡方案。",
    suitableFor: [
      "预算相对有限的人",
      "希望先获得海外学习经历的人",
      "想体验英语授课环境的人",
      "暂时不确定长期目标的人",
    ],
    advantages: [
      "整体预算相对低于欧美国家",
      "部分课程使用英语授课",
      "地理位置靠近中国",
      "适合作为出国过渡选择",
    ],
    risks: [
      "学校质量差异较大，需要认真筛选",
      "后续就业和长期留下需要额外规划",
      "学历认可度需要结合具体学校判断",
      "不能只看低价宣传",
    ],
    nextSteps: [
      "整理可选学校和专业",
      "核实学校资质",
      "对比总预算",
      "确认后续是否继续转学或就业",
    ],
    relatedArticles: [
      {
        title: "出国前需要准备哪些材料",
        href: "/articles/preparation-documents",
      },
    ],
    tags: ["低预算", "亚洲", "英语授课", "过渡路线"],
  },
  {
    id: "philippines-language",
    title: "菲律宾语言学习短期提升路线",
    country: "菲律宾",
    routeType: "语言学习",
    budgetLevel: "low",
    riskLevel: "low",
    summary:
      "适合想先低成本提升英语能力，再考虑其他国家留学或工作的用户。更适合作为短期语言提升阶段。",
    suitableFor: [
      "英语基础较弱的人",
      "想低成本提升口语的人",
      "还没确定最终目标国家的人",
      "希望先适应海外环境的人",
    ],
    advantages: [
      "语言学习成本相对较低",
      "适合短期集中提升英语",
      "可以作为去英语国家前的过渡",
      "出国门槛相对较低",
    ],
    risks: [
      "不适合作为完整长期路线的唯一选择",
      "学校质量差异明显",
      "需要确认签证和停留政策",
      "后续路线仍需重新规划",
    ],
    nextSteps: [
      "确定学习周期",
      "筛选语言学校",
      "确认住宿和课程模式",
      "规划下一步目标国家",
    ],
    relatedArticles: [
      {
        title: "出国前需要准备哪些材料",
        href: "/articles/preparation-documents",
      },
    ],
    tags: ["低预算", "英语提升", "短期过渡", "亚洲"],
  },
  {
    id: "germany-dual-system",
    title: "德国双元制职业教育路线",
    country: "德国",
    routeType: "职业教育",
    budgetLevel: "medium",
    riskLevel: "high",
    summary:
      "适合愿意学习德语、接受职业教育路径，并希望通过技能型路线长期发展的用户。该路线需要认真核实政策和项目真实性。",
    suitableFor: [
      "愿意学习德语的人",
      "接受技能型职业发展的人",
      "希望走欧洲方向的人",
      "愿意长期投入准备的人",
    ],
    advantages: [
      "职业教育和实践结合较强",
      "适合技能型发展",
      "德国工业和职业教育体系成熟",
      "长期发展空间需要结合专业判断",
    ],
    risks: [
      "德语要求较高",
      "项目真实性需要严格核实",
      "不适合只想快速出国的人",
      "申请条件和政策可能变化",
    ],
    nextSteps: [
      "了解德国双元制基本概念",
      "开始德语学习",
      "核实项目资质和合作机构",
      "确认年龄、学历和语言要求",
    ],
    relatedArticles: [
      {
        title: "出国前需要准备哪些材料",
        href: "/articles/preparation-documents",
      },
    ],
    tags: ["欧洲", "德语", "职业教育", "中等预算"],
  },
  {
    id: "australia-study-work",
    title: "澳洲留学 / 打工度假方向初步路线",
    country: "澳大利亚",
    routeType: "留学 / 短期体验",
    budgetLevel: "high",
    riskLevel: "high",
    summary:
      "适合预算较高、希望去英语国家，并愿意认真了解签证条件的人。澳洲方向机会较多，但费用和政策门槛也需要重点评估。",
    suitableFor: [
      "预算较高的人",
      "希望去英语国家的人",
      "希望了解留学或短期海外体验的人",
      "能接受较高生活成本的人",
    ],
    advantages: [
      "英语环境明显",
      "城市选择较多",
      "留学体系成熟",
      "适合预算充足用户深入规划",
    ],
    risks: [
      "费用较高",
      "签证和政策需要实时核实",
      "不同路线差异较大",
      "不能轻信所谓保证就业或保证留下的宣传",
    ],
    nextSteps: [
      "确认自己适合留学还是短期体验",
      "核实签证类型和申请条件",
      "评估总预算",
      "提前准备英语能力",
    ],
    relatedArticles: [
      {
        title: "出国前需要准备哪些材料",
        href: "/articles/preparation-documents",
      },
    ],
    tags: ["英语国家", "高预算", "澳洲", "需核实政策"],
  },
];

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

export function getPreferenceLabel(value: PreferenceAnswer): string {
  return getOptionLabel(preferenceOptions, value);
}

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
  profile.push(`打工意愿：${getPreferenceLabel(form.wantsPartTimeJob)}`);
  profile.push(`长期发展意愿：${getPreferenceLabel(form.wantsLongTermStay)}`);

  return profile;
}

// 生成推荐结果顶部总结
export function createPlanInsightSummary(form: PlanFormState): string {
  const summaries: string[] = [];

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
    summaries.push("由于预算偏低，建议优先考虑低成本过渡路线，并谨慎核实学校和项目真实性。");
  } else if (form.budgetLevel === "medium") {
    summaries.push("你的预算属于中等区间，可以重点比较日本、德国职业教育和部分亚洲留学路线。");
  } else if (form.budgetLevel === "high") {
    summaries.push("你的预算空间较大，可以进一步研究新西兰、澳洲等英语国家路线。");
  }

  if (form.wantsLongTermStay === "yes") {
    summaries.push("你有长期留在海外的想法，因此需要重点关注语言能力、专业匹配和后续就业路径。");
  }

  return summaries.join("");
}

// 根据用户输入计算推荐路线
export function getRecommendedRoutes(form: PlanFormState): RecommendedPlanRoute[] {
  const scoredRoutes = planRoutes.map((route) => {
    let score = 0;
    const reasons: string[] = [];

    function addReason(reason: string, points: number) {
      score += points;
      reasons.push(reason);
    }

    if (form.budgetLevel !== "unknown" && route.budgetLevel === form.budgetLevel) {
      addReason("预算区间与该路线较匹配", 4);
    }

    if (form.acceptsLowBudgetRoute === "yes" && route.budgetLevel === "low") {
      addReason("你接受低预算过渡路线", 3);
    }

    if (
      form.countryPreference === "asia" &&
      ["日本", "马来西亚", "菲律宾"].includes(route.country)
    ) {
      addReason("你的国家偏好更接近亚洲方向", 3);
    }

    if (
      form.countryPreference === "english" &&
      ["新西兰", "澳大利亚", "马来西亚", "菲律宾"].includes(route.country)
    ) {
      addReason("你的国家偏好更接近英语环境", 3);
    }

    if (form.countryPreference === "europe" && route.country === "德国") {
      addReason("你的国家偏好更接近欧洲方向", 3);
    }

    if (form.wantsPartTimeJob === "yes" && route.id === "japan-language-school") {
      addReason("你希望边学习边打工，日本路线更适合作为当前内容库的重点参考", 2);
    }

    if (
      form.wantsLongTermStay === "yes" &&
      ["new-zealand-study", "germany-dual-system", "japan-language-school"].includes(route.id)
    ) {
      addReason("你有长期发展想法，该路线更适合作为长期规划方向", 2);
    }

    if (
      form.languageLevel === "none" &&
      ["japan-language-school", "philippines-language", "malaysia-study"].includes(route.id)
    ) {
      addReason("你的语言基础较弱，该路线更适合作为过渡选择", 2);
    }

    if (
      ["intermediate", "advanced"].includes(form.languageLevel) &&
      ["new-zealand-study", "australia-study-work", "germany-dual-system"].includes(route.id)
    ) {
      addReason("你的语言能力较好，可以考虑要求更高的路线", 2);
    }

    if (reasons.length === 0) {
      reasons.push("该路线可作为备选方向，用于进一步比较预算、语言和长期发展可能性");
    }

    const matchScore = Math.min(96, Math.max(62, 56 + score * 6));

    return {
      ...route,
      matchScore,
      matchReasons: reasons.slice(0, 3),
    };
  });

  return scoredRoutes.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
}