"use client";

import type { RecommendedPlanRoute } from "@/lib/plan-routes";

type PrintableRoute = Record<string, unknown>;

type PlanPdfReportProps = {
  submittedAt: Date | null;
  profileSummary: string[];
  recommendedRoutes: RecommendedPlanRoute[];
};

function readRouteText(
  route: PrintableRoute,
  keys: string[],
  fallback: string
) {
  for (const key of keys) {
    const value = route[key];

    if (typeof value === "string" && value.trim()) {
      return value;
    }

    if (typeof value === "number") {
      return String(value);
    }
  }

  return fallback;
}

function readRouteList(route: PrintableRoute, keys: string[]) {
  for (const key of keys) {
    const value = route[key];

    if (Array.isArray(value)) {
      return value
        .map((item) => {
          if (typeof item === "string") {
            return item;
          }

          if (item && typeof item === "object") {
            const objectItem = item as Record<string, unknown>;
            return String(
              objectItem.title ||
              objectItem.label ||
              objectItem.name ||
              objectItem.text ||
              ""
            );
          }

          return "";
        })
        .filter(Boolean);
    }
  }

  return [];
}

function splitProfileText(text: string) {
  const parts = text.split(/：|:/);

  if (parts.length >= 2) {
    return {
      label: parts[0],
      value: parts.slice(1).join("："),
    };
  }

  return {
    label: "用户信息",
    value: text,
  };
}

export default function PlanPdfReport({
  submittedAt,
  profileSummary,
  recommendedRoutes,
}: PlanPdfReportProps) {
  const pdfRoutes = recommendedRoutes as unknown as PrintableRoute[];

  return (
    <section className="pdf-report-only">
      <section className="pdf-page pdf-cover-page">
        <p className="pdf-kicker">出国咨询信息整理平台</p>

        <h1 className="pdf-main-title">出国路线规划初步报告</h1>

        <p className="pdf-subtitle">
          本报告根据用户填写的基础信息和当前本地规则生成，用于帮助用户快速理解可选出国方向。
        </p>

        <div className="pdf-meta-box">
          <div>
            <span>生成时间</span>
            <strong>
              {submittedAt ? submittedAt.toLocaleString("zh-CN") : "暂无记录"}
            </strong>
          </div>

          <div>
            <span>报告性质</span>
            <strong>初步路线建议</strong>
          </div>

          <div>
            <span>推荐路线数量</span>
            <strong>{pdfRoutes.length} 条</strong>
          </div>
        </div>

        <h2 className="pdf-section-title">用户基础信息摘要</h2>

        <div className="pdf-profile-grid">
          {profileSummary.slice(0, 4).map((item, index) => {
            const profile = splitProfileText(String(item));

            return (
              <div className="pdf-profile-item" key={`profile-${index}`}>
                <span>{profile.label}</span>
                <strong>{profile.value}</strong>
              </div>
            );
          })}
        </div>

        <h2 className="pdf-section-title">推荐路线总览</h2>

        <table className="pdf-route-table">
          <thead>
            <tr>
              <th>排名</th>
              <th>路线名称</th>
              <th>国家 / 地区</th>
              <th>预算</th>
              <th>匹配度</th>
              <th>风险</th>
            </tr>
          </thead>

          <tbody>
            {pdfRoutes.slice(0, 3).map((route, index) => {
              const title = readRouteText(route, ["title", "name"], `推荐路线 ${index + 1}`);
              const country = readRouteText(route, ["country", "countryName"], "综合路线");
              const budget = readRouteText(route, ["budget", "budgetRange", "budgetLabel"], "待确认");
              const risk = readRouteText(route, ["riskLevel", "risk", "riskLabel"], "中等");
              const score = readRouteText(
                route,
                ["matchScore", "score", "suitabilityScore", "fitScore"],
                "待评估"
              );

              return (
                <tr key={`pdf-table-route-${index}`}>
                  <td>{index + 1}</td>
                  <td>{title}</td>
                  <td>{country}</td>
                  <td>{budget}</td>
                  <td>{score.includes("%") ? score : `${score}%`}</td>
                  <td>{risk}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="pdf-cover-notice">
          <strong>重要说明：</strong>
          本报告为系统根据当前信息生成的初步参考，不代表最终申请结论。实际选择路线前，仍需结合官方政策、预算、语言能力、学历背景和个人情况进一步确认。
        </div>
      </section>

      {pdfRoutes.slice(0, 3).map((route, index) => {
        const title = readRouteText(route, ["title", "name"], `推荐路线 ${index + 1}`);
        const country = readRouteText(route, ["country", "countryName"], "综合路线");
        const budget = readRouteText(route, ["budget", "budgetRange", "budgetLabel"], "预算待确认");
        const risk = readRouteText(route, ["riskLevel", "risk", "riskLabel"], "中等风险");
        const description = readRouteText(
          route,
          ["description", "summary", "intro"],
          "该路线适合作为出国方向的初步参考，需要结合个人条件继续确认。"
        );
        const score = readRouteText(
          route,
          ["matchScore", "score", "suitabilityScore", "fitScore"],
          "待评估"
        );
        const matchReasons = readRouteList(route, [
          "matchReasons",
          "matchingReasons",
          "reasons",
          "reasonList",
        ]).slice(0, 2);
        const suitableFor = readRouteList(route, [
          "suitableFor",
          "targetUsers",
          "audience",
        ]).slice(0, 2);
        const advantages = readRouteList(route, [
          "advantages",
          "benefits",
          "strengths",
        ]).slice(0, 2);
        const risks = readRouteList(route, [
          "risks",
          "riskTips",
          "riskReminders",
        ]).slice(0, 2);
        const nextSteps = readRouteList(route, [
          "nextSteps",
          "steps",
          "actions",
        ]).slice(0, 2);

        return (
          <section className="pdf-page pdf-route-page" key={`pdf-route-${index}`}>
            <div className="pdf-route-header">
              <p className="pdf-kicker">推荐路线 {index + 1}</p>
              <h2 className="pdf-route-title">{title}</h2>

              <div className="pdf-route-tags">
                <span>{country}</span>
                <span>{budget}</span>
                <span>{risk}</span>
                <span>{score.includes("%") ? score : `${score}%`} 匹配</span>
              </div>
            </div>

            <div className="pdf-score-box">
              <div>
                <span>路线匹配度</span>
                <strong>{score.includes("%") ? score : `${score}%`}</strong>
              </div>
              <div className="pdf-score-bar">
                <div
                  style={{
                    width: score === "待评估" ? "70%" : `${Number(score.replace("%", "")) || 70}%`,
                  }}
                />
              </div>
            </div>

            <section className="pdf-summary-box">
              <h3>路线概述</h3>
              <p>{description}</p>
            </section>

            <div className="pdf-two-column">
              <section className="pdf-info-block">
                <h3>推荐理由</h3>
                <ul>
                  {(matchReasons.length ? matchReasons : ["与当前用户基础条件存在一定匹配度。"]).map(
                    (item, itemIndex) => (
                      <li key={`reason-${itemIndex}`}>{item}</li>
                    )
                  )}
                </ul>
              </section>

              <section className="pdf-info-block">
                <h3>适合人群</h3>
                <ul>
                  {(suitableFor.length ? suitableFor : ["适合希望获得明确出国方向的人群。"]).map(
                    (item, itemIndex) => (
                      <li key={`suitable-${itemIndex}`}>{item}</li>
                    )
                  )}
                </ul>
              </section>

              <section className="pdf-info-block">
                <h3>路线优势</h3>
                <ul>
                  {(advantages.length ? advantages : ["路线较清晰，适合继续深入了解。"]).map(
                    (item, itemIndex) => (
                      <li key={`advantage-${itemIndex}`}>{item}</li>
                    )
                  )}
                </ul>
              </section>

              <section className="pdf-info-block">
                <h3>风险提醒</h3>
                <ul>
                  {(risks.length ? risks : ["政策、预算和个人条件仍需进一步确认。"]).map(
                    (item, itemIndex) => (
                      <li key={`risk-${itemIndex}`}>{item}</li>
                    )
                  )}
                </ul>
              </section>
            </div>

            <section className="pdf-next-box">
              <h3>下一步建议</h3>
              <ol>
                {(nextSteps.length ? nextSteps : ["继续确认目标国家政策、预算和个人申请条件。"]).map(
                  (item, itemIndex) => (
                    <li key={`step-${itemIndex}`}>{item}</li>
                  )
                )}
              </ol>
            </section>
          </section>
        );
      })}

      <section className="pdf-page pdf-notice-page">
        <p className="pdf-kicker">风险提示</p>
        <h2 className="pdf-route-title">重要提醒与免责声明</h2>

        <div className="pdf-disclaimer-list">
          <p>
            本报告由系统根据用户填写的信息和当前本地规则生成，仅用于帮助用户建立初步出国方向认知。
          </p>
          <p>
            报告内容不构成正式申请建议、法律建议、移民建议或投资建议。
          </p>
          <p>
            各国家和地区的留学、签证、就业和移民政策可能随时调整，最终应以官方机构、学校、使领馆及专业顾问的最新信息为准。
          </p>
          <p>
            用户在做出真实申请、缴费、签约或出国决定前，应进一步核实政策、预算、语言要求、学历要求、签证条件和个人风险承受能力。
          </p>
        </div>
      </section>
    </section>
  );
}
