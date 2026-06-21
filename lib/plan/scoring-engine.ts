// 出国路线评分辅助数据

import type { TargetCountry } from "./types";

// 目标国家和路线国家名称的对应关系
export const targetCountryToRouteCountry: Partial<Record<TargetCountry, string>> = {
  japan: "日本",
  "new-zealand": "新西兰",
  australia: "澳大利亚",
  germany: "德国",
  malaysia: "马来西亚",
  philippines: "菲律宾",
};
