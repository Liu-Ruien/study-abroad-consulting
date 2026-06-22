// AI 问答 MVP 的本地类型定义

export type AiAnswerCategory =
  | "japan"
  | "budget"
  | "language"
  | "career"
  | "visa"
  | "general";

export type AiMockAnswer = {
  category: AiAnswerCategory;
  title: string;
  conclusion: string;
  suggestions: string[];
  risks: string[];
  nextSteps: string[];
};
