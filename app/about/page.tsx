import type { Metadata } from "next";
import AboutPageContent from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  title: "关于本站",
  description: "了解出国咨询网站的定位、内容方向与未来发展规划。",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
