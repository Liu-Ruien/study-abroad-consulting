import type { AiMockAnswer } from "./types";

function formatNumberedList(items: string[]) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

export function formatAiAnswerForCopy(answer: AiMockAnswer) {
  return [
    `【模拟回答】${answer.title}`,
    "",
    "简短结论：",
    answer.summary,
    "",
    "建议：",
    formatNumberedList(answer.suggestions),
    "",
    "风险：",
    formatNumberedList(answer.risks),
    "",
    "下一步：",
    formatNumberedList(answer.nextSteps),
    "",
    "提示：",
    answer.disclaimer,
  ].join("\n");
}
