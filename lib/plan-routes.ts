// 出国路线规划数据模块
// 作用：保存路线数据、表单选项、本地推荐规则、用户画像和推荐理由
// 当前阶段不接 AI、不接数据库，只使用本地规则进行路线推荐原型验证

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

// 目标国家和路线国家名称的对应关系
const targetCountryToRouteCountry: Partial<Record<TargetCountry, string>> = {
  japan: "日本",
  "new-zealand": "新西兰",
  australia: "澳大利亚",
  germany: "德国",
  malaysia: "马来西亚",
  philippines: "菲律宾",
};

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
      "适合希望先通过语言学校适应日本生活、提升日语能力，再衔接专门学校、大学院或 IT 就职的人群。整体路径成熟，但能否长期留下，关键取决于日语、专业能力、出勤率和后续求职准备。",
    suitableFor: [
      "目标国家明确为日本，愿意先把日语和出勤率作为核心任务的人",
      "预算能覆盖语言学校学费、首年生活费和至少 3-6 个月应急资金的人",
      "希望通过语言学校衔接专门学校、大学院或后续求职的人",
      "可以接受合法兼职补贴生活，但不会把打工作为主要资金来源的人",
    ],
    advantages: [
      "日本语言学校到升学、专门学校或求职的路径相对成熟，资料和案例更容易核实",
      "距离中国较近，往返、文化适应和家庭沟通成本通常低于欧美路线",
      "在符合规定的情况下可以兼职，但更适合作为生活补贴而非主要资金来源",
      "IT、护理、餐饮、设计、动漫等方向可继续细分评估专业和就业衔接",
    ],
    risks: [
      "语言学校不是最终身份方案，后续必须衔接升学、就职或其他合法在留路径",
      "出勤率、学费缴纳、打工合规和在留更新都会影响后续签证稳定性",
      "日语长期停留在 N4-N5 或基础会话水平时，升学和就职选择会明显受限",
      "预算不足时不能依赖兼职覆盖全部成本，东京、大阪等城市房租和初期费用压力更大",
    ],
    nextSteps: [
      "先按城市列出首年预算：学费、住宿、生活费、保险、机票和应急金",
      "开始系统学习日语，短期目标至少设为 N3，长期目标根据升学或求职提高到 N2 方向",
      "整理学历证明、成绩材料、经费支付能力和家庭收入/存款证明",
      "对比语言学校的升学支持、出勤管理、就职支持、退费规则和中国学生比例",
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
    tags: ["日本", "日语", "语言学校", "升学就业", "中等预算"],
  },
  {
    id: "new-zealand-study",
    title: "新西兰留学长期规划路线",
    country: "新西兰",
    routeType: "留学 + 长期发展",
    budgetLevel: "high",
    riskLevel: "medium",
    summary:
      "适合预算较充足、希望进入英语国家学习，并把未来就业、移民或长期生活一起纳入规划的人群。新西兰生活环境稳定、教育体系偏实践，但学校选择、专业方向、英语能力和毕业后的就业路径都需要提前评估。",
    suitableFor: [
      "预算较高，能承担学费、生活费和前期适应成本的人",
      "希望在英语国家学习，并愿意持续提升英语能力的人",
      "更看重生活环境、安全感和长期稳定规划的人",
      "愿意提前研究专业选择、就业方向和毕业后签证路径的人",
    ],
    advantages: [
      "英语环境完整，有利于长期提升听说读写能力",
      "整体生活节奏相对稳定，适合重视安全和生活质量的人",
      "部分课程实践属性较强，适合结合职业方向进行规划",
      "适合把留学、就业、长期生活作为一个连续路线来设计",
    ],
    risks: [
      "整体费用较高，需要按完整学制和生活周期评估，而不是只看第一年学费",
      "新西兰就业市场规模有限，专业、城市和实习机会会明显影响毕业后选择",
      "英语能力不足时，课堂理解、论文、实习面试和日常社交都会形成持续压力",
      "如果没有明确专业和职业方向，容易变成高成本试错，不适合只想快速出国的人",
    ],
    nextSteps: [
      "先按完整课程周期核算学费、住宿、生活费、保险和至少 6 个月应急资金",
      "根据就业方向筛选专业和课程实践机会，不要只看学校排名或中介推荐",
      "提前制定雅思或同类考试计划，确认目标课程的语言门槛和开学时间",
      "对比城市就业市场、毕业后签证规则、实习机会和课程认可度",
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
      {
        title: "出国前需要准备哪些材料",
        href: "/articles/preparation-documents",
      },
    ],
    tags: ["新西兰", "英语国家", "高预算", "长期规划", "生活环境"],
  },
  {
    id: "malaysia-study",
    title: "马来西亚低预算留学过渡路线",
    country: "马来西亚",
    routeType: "低预算留学",
    budgetLevel: "low",
    riskLevel: "medium",
    summary:
      "适合预算有限，但希望先获得海外学习经历、英语授课环境和学历提升机会的人群。马来西亚更适合作为低成本留学过渡路线，但学校质量、专业认可度和后续转学或就业路径需要提前核实。",
    suitableFor: [
      "预算有限，但希望先获得海外学习经历和英语授课环境的人",
      "希望以相对较低成本提升学历背景，再评估后续国家的人",
      "暂时不确定长期目标，愿意把马来西亚作为过渡阶段的人",
      "未来可能继续升学、转学或转向其他国家，需要先积累材料的人",
    ],
    advantages: [
      "整体学费和生活成本通常低于欧美英语国家",
      "部分院校和课程采用英语授课，适合积累英语学习经验",
      "距离中国较近，文化适应和往返成本相对更低",
      "适合作为后续申请其他国家或提升学历的过渡选择",
    ],
    risks: [
      "学校和项目质量差异较大，低价项目尤其需要核实资质、授课语言和毕业证书类型",
      "学历认可度必须结合具体学校、专业、未来升学国家和用人单位要求判断",
      "如果没有后续国家或升学计划，毕业后的长期发展路径可能不清晰",
      "低预算不等于低风险，不应把该路线理解为稳定留下、稳定就业或移民承诺",
    ],
    nextSteps: [
      "先列出完整预算，包括学费、住宿、生活费、签证材料费和往返交通",
      "逐项核实学校资质、课程语言、学制、毕业证书类型和是否可认证",
      "确认该学历是否服务于后续升学、转学、回国就业或转向其他国家",
      "不要只按低价宣传决策，至少比较 3 个项目的课程内容、毕业去向和退费规则",
    ],
    relatedArticles: [
      {
        title: "出国前需要准备哪些材料",
        href: "/articles/preparation-documents",
      },
    ],
    tags: ["马来西亚", "低预算", "亚洲", "英语授课", "过渡路线"],
  },
  {
    id: "philippines-language",
    title: "菲律宾语言学习短期提升路线",
    country: "菲律宾",
    routeType: "语言学习",
    budgetLevel: "low",
    riskLevel: "low",
    summary:
      "适合英语基础较弱、预算有限，希望先用较低成本集中提升口语和听力的人群。菲律宾更适合作为短期语言强化阶段，不建议把它当成完整的长期留学或移民路线。",
    suitableFor: [
      "英语基础较弱，想先提升口语和听力的人",
      "预算有限，但希望体验海外语言学习环境的人",
      "还没有明确目标国家，想先做短期过渡的人",
      "计划未来申请英语国家，但目前语言能力不足的人",
    ],
    advantages: [
      "语言学习成本相对较低，适合短期集中训练",
      "部分课程以一对一或小班形式为主，口语练习机会较多",
      "距离中国较近，出国门槛和适应成本相对较低",
      "适合作为新西兰、澳洲、马来西亚等路线前的语言准备阶段",
    ],
    risks: [
      "菲律宾更适合作为语言提升阶段，不适合作为完整留学、就业或移民路线",
      "学校质量、住宿管理和课程强度差异较大，需要核实真实课时和师资配置",
      "如果没有后续考试、申请或目标国家计划，容易变成短期体验而不是有效准备",
      "需要提前确认签证停留、住宿安全、退费规则和当地生活风险",
    ],
    nextSteps: [
      "先确定学习周期和目标，例如 1-3 个月口语提升或 3-6 个月雅思基础",
      "对比学校课程模式、一对一课时、师资、住宿管理和安全区域",
      "明确学习结束后的下一步国家、考试或申请方向，避免只做短期体验",
      "设置可检查的英语目标，例如日常口语、雅思单项、面试表达或课堂听力",
    ],
    relatedArticles: [
      {
        title: "出国前需要准备哪些材料",
        href: "/articles/preparation-documents",
      },
    ],
    tags: ["菲律宾", "低预算", "英语提升", "短期过渡", "亚洲"],
  },
  {
    id: "germany-dual-system",
    title: "德国双元制职业教育路线",
    country: "德国",
    routeType: "职业教育",
    budgetLevel: "medium",
    riskLevel: "high",
    summary:
      "适合愿意长期学习德语、接受技能型职业发展，并希望通过职业教育进入欧洲工作生活的人群。德国双元制路线需要认真核实项目真实性、语言要求、年龄限制和后续就业路径，不适合只想快速出国的人。",
    suitableFor: [
      "愿意投入较长时间学习德语的人",
      "能接受职业教育、技能培训和实践工作的用户",
      "希望走欧洲方向，并愿意长期规划的人",
      "对护理、酒店、机电、汽修、餐饮等技能方向有兴趣的人",
    ],
    advantages: [
      "职业教育和企业实践结合较强，路径相对务实",
      "德国职业教育体系成熟，适合技能型发展",
      "部分方向和行业存在长期用人需求",
      "适合不单纯追求学历，而是希望获得职业技能的人",
    ],
    risks: [
      "德语要求较高，语言准备周期可能较长",
      "市场上项目质量差异明显，需要严格核实机构资质",
      "不适合只想低成本、快速出国但不愿学习语言的人",
      "年龄、学历、专业和身体条件可能影响可选方向",
    ],
    nextSteps: [
      "先了解德国双元制的基本模式和真实学习内容",
      "开始系统学习德语，优先把目标放在 A2-B1 以上",
      "核实项目合作机构、企业资质和收费明细",
      "确认自己的年龄、学历、专业背景是否符合申请要求",
    ],
    relatedArticles: [
      {
        title: "出国前需要准备哪些材料",
        href: "/articles/preparation-documents",
      },
    ],
    tags: ["德国", "欧洲", "德语", "职业教育", "中等预算"],
  },
  {
    id: "australia-study-work",
    title: "澳洲留学 / 打工度假方向初步路线",
    country: "澳大利亚",
    routeType: "留学 / 短期体验",
    budgetLevel: "high",
    riskLevel: "high",
    summary:
      "适合预算较高、希望进入英语国家，并愿意认真研究留学、短期体验或工作机会的人群。澳洲机会较多，但费用、签证政策、英语能力和专业选择都会明显影响后续发展。",
    suitableFor: [
      "预算较高，能承担较高学费和生活成本的人",
      "希望去英语国家学习、生活或短期体验的人",
      "愿意提前核实签证类型和申请条件的人",
      "能接受政策变化，并愿意做多套方案准备的人",
    ],
    advantages: [
      "英语环境完整，有利于提升语言和跨文化适应能力",
      "城市和学校选择较多，留学体系成熟",
      "部分专业和地区可能存在就业或后续发展机会",
      "适合预算充足、目标明确的人做深入规划",
    ],
    risks: [
      "整体费用高，学费、住宿、保险和生活费都需要按高预算路线准备",
      "签证、工签、WHV 名额和移民政策不确定性较高，必须以最新官方要求为准",
      "打工不能作为主要资金来源，学习签证和短期体验路线都需要先准备充足资金",
      "WHV 或短期体验不等于稳定长期留下，不应轻信保证就业、保证移民或低价快速办理",
    ],
    nextSteps: [
      "先区分留学、WHV、短期体验三类路径，分别核实签证条件和风险",
      "按官方要求核实资金证明、语言要求、健康保险和申请时间窗口",
      "评估完整预算，包括学费、生活费、保险、住宿押金和至少 6 个月应急资金",
      "提前准备英语能力，并根据专业就业风险筛选学校、城市和备选国家",
    ],
    relatedArticles: [
      {
        title: "出国前需要准备哪些材料",
        href: "/articles/preparation-documents",
      },
    ],
    tags: ["澳大利亚", "英语国家", "高预算", "留学", "需核实政策"],
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

export function getTargetCountryLabel(value: TargetCountry): string {
  return getOptionLabel(targetCountryOptions, value);
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

// 根据用户输入计算推荐路线
export function getRecommendedRoutes(form: PlanFormState): RecommendedPlanRoute[] {
  const ageNumber = Number(form.age);
  const educationText = form.education.trim();
  const majorText = form.major.trim();

  const isOlderUser = !Number.isNaN(ageNumber) && ageNumber >= 45;
  const isVeryOlderUser = !Number.isNaN(ageNumber) && ageNumber >= 50;

  const isLowEducation = ["无学历", "无", "小学", "初中"].some((keyword) =>
    educationText.includes(keyword)
  );

  const isHighSchoolOrBelow = [
    "无学历",
    "无",
    "小学",
    "初中",
    "高中",
    "中专",
    "职高",
  ].some((keyword) => educationText.includes(keyword));

  const hasBachelorOrAbove = [
    "本科",
    "学士",
    "硕士",
    "研究生",
    "博士",
  ].some((keyword) => educationText.includes(keyword));

  const hasUnclearMajor =
    majorText === "" ||
    ["无", "没有", "无专业", "无明确方向", "不知道"].some((keyword) =>
      majorText.includes(keyword)
    );

  const hasTechOrPracticalMajor = [
    "软件",
    "计算机",
    "it",
    "IT",
    "信息",
    "工程",
    "机械",
    "护理",
    "设计",
    "电气",
    "电子",
  ].some((keyword) => majorText.includes(keyword));

  const isLowBudget = form.budgetLevel === "low";
  const isMediumBudget = form.budgetLevel === "medium";
  const isHighBudget = form.budgetLevel === "high";
  const isWeakLanguage =
    form.languageLevel === "none" || form.languageLevel === "basic";
  const hasIntermediateOrAdvancedLanguage =
    form.languageLevel === "intermediate" || form.languageLevel === "advanced";
  const prefersEurope = form.countryPreference === "europe";
  const doesNotWantPartTimeJob = form.wantsPartTimeJob === "no";
  const doesNotWantLongTermStay = form.wantsLongTermStay === "no";
  const doesNotAcceptLowBudgetRoute = form.acceptsLowBudgetRoute === "no";
  const targetRouteCountry = targetCountryToRouteCountry[form.targetCountry];
  const hasSpecificTargetCountry = Boolean(targetRouteCountry);
  const isTargetCountryPreferenceConflict =
    Boolean(targetRouteCountry) &&
    (
      (form.countryPreference === "asia" &&
        !["日本", "马来西亚", "菲律宾"].includes(targetRouteCountry ?? "")) ||
      (form.countryPreference === "english" &&
        !["新西兰", "澳大利亚", "马来西亚", "菲律宾"].includes(
          targetRouteCountry ?? ""
        )) ||
      (form.countryPreference === "europe" && targetRouteCountry !== "德国")
    );

  // 极高风险画像：不要硬推路线
  // 只要同时满足：50岁以上 + 学历弱 + 低预算 + 语言弱，
  // 就不应该继续硬推留学、职业教育或长期发展路线。
  const isSevereRiskProfile =
    isVeryOlderUser && isHighSchoolOrBelow && isLowBudget && isWeakLanguage;

  if (isSevereRiskProfile && !hasSpecificTargetCountry) {
    return [];
  }

  const scoredRoutes = planRoutes.map((route) => {
    let score = 0;
    let penalty = 0;

    const reasons: string[] = [];
    const warnings: string[] = [];

    function addReason(reason: string, points: number) {
      score += points;
      reasons.push(reason);
    }

    function addPenalty(reason: string, points: number) {
      penalty += points;
      warnings.push(reason);
    }

    // 基线差异化：当预算和国家偏好都不明确时，也要根据背景给出轻微排序差异。
    if (
      route.id === "japan-language-school" &&
      hasBachelorOrAbove &&
      hasTechOrPracticalMajor &&
      form.budgetLevel === "unknown" &&
      form.countryPreference === "any" &&
      form.targetCountry === "unknown"
    ) {
      addReason("你的学历和专业背景适合优先研究日本升学或就业衔接路线", 2);
    }

    if (
      route.id === "malaysia-study" &&
      hasBachelorOrAbove &&
      form.budgetLevel === "unknown" &&
      form.countryPreference === "any"
    ) {
      addReason("预算暂不确定时，马来西亚可作为低成本学历或英语授课过渡方案", 1);
    }

    if (
      route.id === "philippines-language" &&
      isWeakLanguage &&
      form.budgetLevel === "unknown" &&
      form.countryPreference === "any"
    ) {
      addReason("当前语言基础偏弱，菲律宾可作为短期语言提升阶段", 1);
    }

    // 加分：预算匹配
    if (form.budgetLevel !== "unknown" && route.budgetLevel === form.budgetLevel) {
      addReason("预算区间与该路线较匹配", 3);
    }

    // 加分：接受低预算过渡路线
    if (form.acceptsLowBudgetRoute === "yes" && route.budgetLevel === "low") {
      addReason("你接受低预算过渡路线", 2);
    }

    // 加分：地区偏好匹配
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

    // 扣分：国家大方向和目标国家冲突
    if (
      isTargetCountryPreferenceConflict &&
      targetRouteCountry &&
      route.country === targetRouteCountry
    ) {
      addPenalty("你的国家大方向偏好和目标国家存在冲突，需要先确认真实目标", 5);
    }

    // 加分 / 扣分：明确目标国家
    // 目标国家是重要偏好，但不能完全压倒预算、语言、年龄和风险判断
    if (targetRouteCountry && route.country === targetRouteCountry) {
      addReason(
        `你明确选择了${targetRouteCountry}，系统优先展示该路线，但这不代表当前条件适合直接申请`,
        2
      );
    }

    if (targetRouteCountry && route.country !== targetRouteCountry) {
      addPenalty(`你明确选择了${targetRouteCountry}，该路线国家不完全匹配`, 2);
    }

    // 加分：打工意愿
    if (form.wantsPartTimeJob === "yes" && route.id === "japan-language-school") {
      addReason("你希望边学习边打工，日本路线更适合作为重点参考", 2);
    }

    if (
      route.id === "japan-language-school" &&
      form.countryPreference === "asia" &&
      !isLowBudget &&
      !isWeakLanguage
    ) {
      addReason("你的地区偏好、预算和语言基础更接近日本路线的准备条件", 2);
    }

    // 加分：长期发展意愿
    if (
      form.wantsLongTermStay === "yes" &&
      ["new-zealand-study", "germany-dual-system", "japan-language-school"].includes(
        route.id
      )
    ) {
      addReason("你有长期发展想法，该路线更适合作为长期规划方向", 2);
    }

    // 加分：语言较弱时，低门槛过渡路线略加分
    if (
      form.languageLevel === "none" &&
      ["philippines-language", "malaysia-study"].includes(route.id)
    ) {
      addReason("你的语言基础较弱，该路线可作为低门槛过渡参考", 1);
    }

    // 加分：语言较好时，高要求路线略加分
    if (
      ["intermediate", "advanced"].includes(form.languageLevel) &&
      ["new-zealand-study", "australia-study-work", "germany-dual-system"].includes(
        route.id
      )
    ) {
      addReason("你的语言能力较好，可以考虑要求更高的路线", 2);
    }

    // 扣分：低预算不适合中高预算路线
    if (isLowBudget && route.budgetLevel === "medium") {
      addPenalty("当前预算偏低，该路线仍可能存在资金压力", 3);
    }

    if (isLowBudget && route.budgetLevel === "high") {
      addPenalty("当前预算偏低，不适合直接选择高成本国家路线", 8);
    }

    if (isMediumBudget && route.budgetLevel === "high") {
      addPenalty("当前预算属于中等区间，选择高成本英语国家前需要重新核算资金", 3);
    }

    // 扣分：欧洲偏好与非欧洲路线不匹配
    if (prefersEurope && route.country !== "德国") {
      addPenalty("你的地区偏好为欧洲，该路线地区匹配度较低", 3);
    }

    // 扣分：欧洲路线语言要求更高
    if (prefersEurope && route.country === "德国" && isWeakLanguage) {
      addPenalty("欧洲职业教育通常对语言准备要求更高", 5);
    }

    // 扣分：年龄偏高
    if (
      isVeryOlderUser &&
      ["japan-language-school", "new-zealand-study", "australia-study-work", "germany-dual-system"].includes(
        route.id
      )
    ) {
      addPenalty("年龄偏高，该路线申请和后续规划不确定性较高", 6);
    } else if (
      isOlderUser &&
      ["japan-language-school", "new-zealand-study", "australia-study-work", "germany-dual-system"].includes(
        route.id
      )
    ) {
      addPenalty("年龄因素会提高该路线的申请和后续规划难度", 3);
    }

    // 扣分：学历较弱
    if (
      isLowEducation &&
      ["new-zealand-study", "australia-study-work", "germany-dual-system"].includes(
        route.id
      )
    ) {
      addPenalty("学历背景较弱，该路线申请门槛可能偏高", 6);
    }

    if (isLowEducation && route.id === "japan-language-school") {
      addPenalty("学历背景较弱，需要先核实学校和签证要求", 4);
    }

    // 扣分：专业方向不明确
    if (
      hasUnclearMajor &&
      ["new-zealand-study", "australia-study-work", "germany-dual-system"].includes(
        route.id
      )
    ) {
      addPenalty("专业或工作方向不明确，该路线后续衔接风险较高", 4);
    }

    // 扣分：语言弱
    if (
      isWeakLanguage &&
      ["new-zealand-study", "australia-study-work", "germany-dual-system"].includes(
        route.id
      )
    ) {
      addPenalty("语言基础较弱，该路线语言门槛较高", 5);
    }

    if (
      isWeakLanguage &&
      ["new-zealand-study", "australia-study-work"].includes(route.id)
    ) {
      addPenalty("英语国家高成本路线会放大学习、签证材料和求职压力", 4);
    }

    if (
      route.id === "japan-language-school" &&
      isWeakLanguage &&
      (form.targetCountry === "japan" || form.countryPreference === "asia")
    ) {
      addPenalty("日本路线需要尽快补日语基础，不能只依赖到校后再学习", 2);
    }

    if (route.id === "japan-language-school" && isLowBudget) {
      addPenalty("日本语言学校仍需要首年资金证明和初期生活费，低预算用户压力较大", 3);
    }

    if (route.id === "japan-language-school" && hasUnclearMajor) {
      addPenalty("如果专业或职业方向不清晰，日本路线后续升学或就职衔接会变弱", 2);
    }

    // 扣分：中高龄用户整体风险
    if (isOlderUser && isWeakLanguage) {
      addPenalty("年龄偏高且语言基础较弱，海外学习和生活适应压力较大", 4);
    }

    if (isOlderUser && isHighSchoolOrBelow) {
      addPenalty("年龄偏高且学历背景不高，需要先做申请可行性评估", 4);
    }

    if (isOlderUser && hasUnclearMajor) {
      addPenalty("年龄偏高且专业或工作方向不清晰，后续衔接风险较高", 3);
    }

    if (isOlderUser && form.budgetLevel !== "high") {
      addPenalty("年龄偏高且预算不算充足，试错空间较小", 3);
    }

    // 扣分：不希望打工
    if (
      doesNotWantPartTimeJob &&
      ["japan-language-school", "australia-study-work"].includes(route.id)
    ) {
      addPenalty("你不希望打工，该路线的资金压力需要重新评估", 3);
    }

    // 扣分：不希望长期留在海外
    if (
      doesNotWantLongTermStay &&
      ["new-zealand-study", "australia-study-work", "germany-dual-system"].includes(
        route.id
      )
    ) {
      addPenalty("你暂不考虑长期留在海外，该路线长期投入成本较高", 2);
    }

    // 扣分：不接受低预算过渡路线
    if (doesNotAcceptLowBudgetRoute && route.budgetLevel === "low") {
      addPenalty("你不接受低预算过渡路线，该路线匹配度下降", 4);
    }

    if (
      route.budgetLevel === "low" &&
      form.wantsLongTermStay === "yes"
    ) {
      addPenalty("低预算路线更适合作为过渡阶段，不能直接等同于长期留下方案", 2);
    }

    if (route.id === "australia-study-work") {
      if (!isHighBudget) {
        addPenalty("澳洲路线整体成本较高，当前预算不足以支撑稳定规划", 5);
      }

      if (!hasIntermediateOrAdvancedLanguage) {
        addPenalty("澳洲路线对英语和材料准备要求较高，当前语言基础偏弱", 4);
      }

      if (form.wantsPartTimeJob === "yes") {
        addPenalty("澳洲打工不能作为主要资金来源，必须先准备完整预算", 3);
      }

      if (form.wantsLongTermStay === "yes") {
        addPenalty("澳洲长期路径受专业、政策和签证变化影响较大，需要多套备选方案", 3);
      }
    }

    if (
      targetRouteCountry &&
      route.country === targetRouteCountry &&
      isLowBudget &&
      route.budgetLevel === "high"
    ) {
      addPenalty("虽然你选择了该目标国家，但当前预算与该高成本路线明显不匹配", 1);
    }

    if (
      targetRouteCountry &&
      route.country === targetRouteCountry &&
      isWeakLanguage &&
      ["新西兰", "澳大利亚", "德国"].includes(route.country)
    ) {
      addPenalty("虽然系统保留该目标国家路线，但当前语言条件会显著增加申请和适应风险", 1);
    }

    let rawScore = 50 + score * 5 - penalty * 6;

    // 如果用户已经明确目标国家，非目标国家路线只做适度降分
    // 避免因为目标国家一项选择，就把原本合理的参考路线全部打残
    if (hasSpecificTargetCountry && route.country !== targetRouteCountry) {
      rawScore -= 6;
    }

    // 全局风险扣分：用户整体条件较弱
    if (isOlderUser && isLowEducation) {
      rawScore -= 15;
    }

    if (isLowBudget && prefersEurope) {
      rawScore -= 15;
    }

    if (isWeakLanguage && prefersEurope) {
      rawScore -= 10;
    }

    if (isVeryOlderUser && isLowEducation && isLowBudget) {
      rawScore -= 20;
    }

    let matchScore = Math.min(96, Math.max(0, rawScore));

    // 明确目标国家后，其他国家路线仍可作为参考，但不应超过目标国家路线太多
    if (hasSpecificTargetCountry && route.country !== targetRouteCountry) {
      matchScore = Math.min(matchScore, 72);
    }

    // 高风险路线即使匹配目标国家，也不应轻易给到接近满分
    if (route.riskLevel === "high") {
      matchScore = Math.min(matchScore, 78);
    }

    // 澳洲路线同时存在高费用、政策变化和 WHV 名额不确定性，匹配度需要更保守
    if (route.id === "australia-study-work") {
      matchScore = Math.min(matchScore, 72);

      if (form.budgetLevel !== "high") {
        matchScore = Math.min(matchScore, 62);
      }

      if (form.languageLevel !== "advanced") {
        matchScore = Math.min(matchScore, 68);
      }
    }

    if (
      ["new-zealand-study", "australia-study-work"].includes(route.id) &&
      isLowBudget
    ) {
      matchScore = Math.min(matchScore, 52);
    }

    if (
      ["new-zealand-study", "australia-study-work"].includes(route.id) &&
      isWeakLanguage
    ) {
      matchScore = Math.min(matchScore, 58);
    }

    if (
      ["new-zealand-study", "australia-study-work"].includes(route.id) &&
      isMediumBudget &&
      isWeakLanguage
    ) {
      matchScore = Math.min(matchScore, 55);
    }

    if (route.id === "japan-language-school") {
      if (isLowBudget) {
        matchScore = Math.min(matchScore, 68);
      }

      if (isLowBudget && isWeakLanguage) {
        matchScore = Math.min(matchScore, 62);
      }

      if (isLowBudget && isWeakLanguage && hasUnclearMajor) {
        matchScore = Math.min(matchScore, 58);
      }
    }

    if (route.budgetLevel === "low" && form.wantsLongTermStay === "yes") {
      matchScore = Math.min(matchScore, 72);
    }

    // 如果国家大方向和目标国家冲突，目标国家路线不能给过高分
    // 例如：英语国家优先 + 目标德国，不能把德国双元制打到 90%+
    if (
      isTargetCountryPreferenceConflict &&
      targetRouteCountry &&
      route.country === targetRouteCountry
    ) {
      matchScore = Math.min(matchScore, 68);
    }

    // 高风险画像不允许出现高匹配度
    if (isOlderUser && isLowEducation) {
      matchScore = Math.min(matchScore, 58);
    }

    if (isOlderUser && form.budgetLevel !== "high") {
      matchScore = Math.min(matchScore, 60);
    }

    if (isOlderUser && isWeakLanguage && isHighSchoolOrBelow) {
      matchScore = Math.min(matchScore, 55);
    }

    if (isOlderUser && isWeakLanguage && isHighSchoolOrBelow && hasUnclearMajor) {
      matchScore = Math.min(matchScore, 50);
    }

    if (isLowBudget && prefersEurope) {
      matchScore = Math.min(matchScore, 55);
    }

    if (isVeryOlderUser && isHighSchoolOrBelow && isLowBudget) {
      matchScore = Math.min(matchScore, 42);
    }

    // 澳洲路线属于高预算、高不确定性路线，只有预算高、语言较好且风险条件较匹配时才允许接近 75。
    if (route.id === "australia-study-work") {
      if (isHighBudget && hasIntermediateOrAdvancedLanguage) {
        matchScore = Math.min(matchScore, 75);
      } else {
        matchScore = Math.min(matchScore, 65);
      }

      if (isLowBudget || isWeakLanguage) {
        matchScore = Math.min(matchScore, 55);
      }
    }

    // 明确目标国家时，该国家路线必须展示；但展示优先权不等于高匹配度。
    if (targetRouteCountry && route.country === targetRouteCountry) {
      let targetDisplayFloor = 38;

      if (
        (isLowBudget && route.budgetLevel === "high") ||
        (isWeakLanguage && ["新西兰", "澳大利亚", "德国"].includes(route.country))
      ) {
        targetDisplayFloor = 28;
      }

      if (isSevereRiskProfile) {
        targetDisplayFloor = 22;
      }

      matchScore = Math.max(matchScore, targetDisplayFloor);
      matchScore = Math.min(matchScore, route.riskLevel === "high" ? 68 : 78);
    }

    const matchReasons =
      warnings.length > 0
        ? [...warnings.slice(0, 2), ...reasons.slice(0, 1)]
        : reasons.slice(0, 3);

    return {
      ...route,
      matchScore,
      matchReasons:
        matchReasons.length > 0
          ? matchReasons
          : ["该路线仅作为备选方向，需要进一步核实个人条件和政策要求"],
    };
  });

  const targetRoute = targetRouteCountry
    ? scoredRoutes.find((route) => route.country === targetRouteCountry)
    : undefined;

  const visibleRoutes = scoredRoutes
    .filter((route) => route.matchScore >= 45)
    .sort((a, b) => b.matchScore - a.matchScore);

  // 如果用户明确选择了目标国家，该国家路线优先展示在第一位。
  // 即使匹配度较低，也要让用户第一眼看到自己关心的路线和对应风险。
  if (targetRoute) {
    const otherRoutes = visibleRoutes
      .filter((route) => route.id !== targetRoute.id)
      .slice(0, 2);

    return [targetRoute, ...otherRoutes];
  }

  return visibleRoutes.slice(0, 3);
}