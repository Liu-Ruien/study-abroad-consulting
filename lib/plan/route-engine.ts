// 出国路线主推荐入口和本地评分规则

import type { PlanFormState, RecommendedPlanRoute } from "./types";
import { planRoutes } from "./route-data";
import { targetCountryToRouteCountry } from "./scoring-engine";

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
