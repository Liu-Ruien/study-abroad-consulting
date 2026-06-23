import type { Metadata } from "next";
import CaseStudyContent from "@/components/case-study/CaseStudyContent";

export const metadata: Metadata = {
  title: "Case Study · 出国咨询信息整理平台",
  description:
    "个人求职作品集项目案例页：路线规划、本地 AI 问答 MVP、内容组织与工程能力展示。支持中文 / 日本語 / English。",
};

export default function CaseStudyPage() {
  return <CaseStudyContent />;
}
