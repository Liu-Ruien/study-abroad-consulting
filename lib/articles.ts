// 文章数据模块
// 作用：集中管理网站中的分类和文章数据
// 当前阶段暂时使用本地静态数据，后期可以替换成数据库

// 单篇文章的数据类型
export type Article = {
  title: string; // 文章标题
  slug: string; // 文章详情页地址标识
  category: string; // 文章所属分类 slug
  excerpt: string; // 文章简介
  content: string; // 文章正文
};

// 分类数据
// 注意：slug 必须和文章里的 category 字段保持一致
export const categories = [
  {
    name: "日本留学",
    slug: "japan-study",
    description: "整理日本语言学校、留学费用、打工规则、租房生活等实用信息。",
  },
  {
    name: "新西兰留学",
    slug: "new-zealand-study",
    description: "介绍新西兰留学适合人群、生活成本、学习环境和基础准备。",
  },
  {
    name: "签证指南",
    slug: "visa-guide",
    description: "整理出国前材料准备、签证申请流程和常见注意事项。",
  },
  {
    name: "海外生活",
    slug: "overseas-life",
    description: "介绍银行卡、电话卡、租房、生活适应等海外生活基础内容。",
  },
];

// 根据分类 slug 获取分类中文名称
// 输入：分类 slug，例如 "japan-study"
// 输出：分类中文名称，例如 "日本留学"
// 如果找不到分类，则返回 "未知分类"
export function getCategoryName(categorySlug: string): string {
  const category = categories.find((item) => item.slug === categorySlug);

  return category ? category.name : "未知分类";
}

// 文章数据
// 注意：每篇文章的 category 必须填写上方 categories 中存在的 slug
export const articles: Article[] = [
  {
    title: "日本语言学校申请流程",
    slug: "japan-language-school-application",
    category: "japan-study",
    excerpt: "详细介绍日本语言学校申请步骤",
    content:
      "日本语言学校申请流程通常包括确定入学时间、选择学校、准备申请材料、提交材料、等待学校审查、取得在留资格认定证明书、申请签证、购买机票并赴日入学。对于第一次准备日本留学的人来说，语言学校是比较常见的起点。",
  },
  {
    title: "日本留学一年大概多少钱",
    slug: "japan-study-cost",
    category: "japan-study",
    excerpt: "分析日本留学一年费用结构",
    content:
      "日本留学一年的费用主要由学费、房租、生活费、交通费、保险费和日常开销组成。语言学校一年的学费通常是一笔较大的支出，生活成本则会受到城市影响。东京、大阪等大城市成本相对更高，地方城市会更低一些。",
  },
  {
    title: "日本留学生打工规则",
    slug: "japan-part-time-job",
    category: "japan-study",
    excerpt: "讲解日本留学生打工限制",
    content:
      "日本留学生打工需要先取得资格外活动许可。一般情况下，留学生每周最多可以打工 28 小时，长假期间可以适当延长。打工时需要注意不要影响出勤率和学习状态，否则可能影响签证续签。",
  },
  {
    title: "日本租房需要注意什么",
    slug: "japan-rent-guide",
    category: "overseas-life",
    excerpt: "介绍日本租房时常见费用与注意事项",
    content:
      "日本租房需要注意礼金、押金、中介费、保证会社费用、火灾保险和钥匙更换费等。刚到日本的留学生可能会因为没有稳定收入或担保人而租房较难，因此可以优先考虑学校宿舍、留学生公寓或支持外国人的房源。",
  },
  {
    title: "新西兰留学适合哪些人",
    slug: "nz-study-suitable",
    category: "new-zealand-study",
    excerpt: "分析新西兰留学适合人群",
    content:
      "新西兰留学比较适合喜欢安静生活环境、重视实践型教育、希望体验英语国家学习氛围的人。相比一些人口密集的大国家，新西兰生活节奏较慢，自然环境较好，但就业市场规模也相对有限。",
  },
  {
    title: "新西兰生活成本介绍",
    slug: "nz-living-cost",
    category: "new-zealand-study",
    excerpt: "介绍新西兰生活费用",
    content:
      "新西兰生活成本主要包括房租、饮食、交通、保险和日常开销。奥克兰、惠灵顿等城市房租相对较高，合租可以降低成本。留学生在做预算时，需要提前规划住宿和交通方式。",
  },
  {
    title: "出国前需要准备哪些材料",
    slug: "preparation-documents",
    category: "visa-guide",
    excerpt: "整理出国材料清单",
    content:
      "出国前通常需要准备护照、签证申请材料、资金证明、学历证明、成绩单、语言成绩、照片、体检材料以及学校录取相关文件。不同国家和不同学校要求不同，建议提前建立材料清单并逐项确认。",
  },
  {
    title: "留学生办理银行卡和电话卡指南",
    slug: "bank-sim-guide",
    category: "overseas-life",
    excerpt: "讲解出国后金融与通讯准备",
    content:
      "留学生到达海外后通常需要尽快办理当地电话卡和银行卡。电话卡用于联系学校、租房、注册账号和接收验证码；银行卡用于接收工资、缴纳费用和日常支付。建议提前了解当地银行和运营商的申请条件。",
  },
];