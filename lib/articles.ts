/**
 * 文章数据模块
 *
 * 存放所有分类与文章的本地静态数据，并提供查询工具函数。
 * 第一版不接数据库，后期可替换为 CMS 或 API 数据源。
 */

/** 文章分类的唯一标识，对应 URL 路径 /categories/[category] */
export type CategorySlug =
  | "japan-study"
  | "new-zealand-study"
  | "visa-guide"
  | "overseas-life";

/** 分类信息：slug 用于路由，name/description 用于页面展示 */
export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}

/** 文章信息：slug 用于路由 /articles/[slug]，content 为正文段落数组 */
export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
  readingTime: number;
  publishedAt: string;
  content: string[];
}

/** 全站四个内容分类 */
export const categories: Category[] = [
  {
    slug: "japan-study",
    name: "日本留学",
    description: "语言学校、大学申请、费用与打工等日本留学实用信息。",
  },
  {
    slug: "new-zealand-study",
    name: "新西兰留学",
    description: "适合人群、院校选择与新西兰留学生活成本指南。",
  },
  {
    slug: "visa-guide",
    name: "签证指南",
    description: "出国前材料准备、签证类型与办理流程说明。",
  },
  {
    slug: "overseas-life",
    name: "海外生活",
    description: "租房、银行卡、电话卡等落地海外后的实用攻略。",
  },
];

/** 全部示例文章（第一版共 8 篇） */
export const articles: Article[] = [
  {
    slug: "japan-language-school-application",
    title: "日本语言学校申请流程",
    excerpt:
      "从选校、提交材料到获得在留资格认定证明书，梳理日本语言学校申请的完整步骤与时间节点。",
    category: "japan-study",
    readingTime: 8,
    publishedAt: "2026-03-01",
    content: [
      "日本语言学校通常是赴日留学的第一站，尤其适合需要先提升日语水平的同学。申请流程看似复杂，但只要按步骤准备，整体节奏是可控的。",
      "第一步是确定入学时间。日本语言学校一年有 4 月、7 月、10 月、1 月四个入学批次，其中 4 月和 10 月最为常见。建议至少提前 6 到 8 个月开始准备，热门学校名额会更紧张。",
      "第二步是选校与提交申请材料。常见材料包括：护照复印件、最终学历证明、成绩单、日语学习证明（如 JLPT 或学时证明）、经费支付人材料、照片等。不同学校要求略有差异，以学校官方清单为准。",
      "第三步是学校审核并提交入管。语言学校会将你的材料提交给日本入国管理局，申请「在留资格认定证明书」（COE）。审核周期通常为 1 到 3 个月。",
      "第四步是获得 COE 后办理签证。拿到 COE 原件或复印件后，向日本驻华使领馆申请留学签证。签证获批后即可购票赴日，并在规定时间内完成入学手续。",
      "小贴士：材料的真实性和一致性非常重要，经费证明、学习动机、未来规划等内容建议认真准备，避免因为表述不清而影响审核结果。",
    ],
  },
  {
    slug: "japan-study-cost-one-year",
    title: "日本留学一年大概多少钱",
    excerpt:
      "学费、生活费、住宿与保险，帮你估算在日本留学一年的总体花费区间。",
    category: "japan-study",
    readingTime: 6,
    publishedAt: "2026-03-05",
    content: [
      "日本留学的费用因城市、学校类型和个人消费习惯差异较大，但可以用一个大致区间来帮助规划预算。",
      "语言学校学费：一年约 70 万至 90 万日元，具体取决于学校知名度、课程时长和所在城市。东京、大阪等大城市通常费用更高。",
      "大学或专门学校：国公立大学学费相对较低，私立大学和专业课程费用更高。本科或专门学校一年学费可能在 80 万至 150 万日元不等。",
      "生活费：在东京等大城市，每月生活费（含房租）约 10 万至 15 万日元；地方城市可能低 2 至 5 万日元。一年生活费大致在 120 万至 180 万日元。",
      "其他开销：包括国民健康保险、手机通讯、交通、教材、签证与机票等。首次赴日还需预留初期安家费用，如押金、家具购置等。",
      "综合来看，语言学校就读一年，总费用（含学费与生活费）通常在 150 万至 250 万日元左右。若就读私立大学，预算需相应上调。建议准备比估算值多 10% 至 20% 的备用金，以应对汇率波动和意外支出。",
    ],
  },
  {
    slug: "japan-student-work-rules",
    title: "日本留学生打工规则",
    excerpt:
      "了解「资格外活动许可」、工时限制与常见打工类型，合法合规地在日本勤工俭学。",
    category: "japan-study",
    readingTime: 5,
    publishedAt: "2026-03-08",
    content: [
      "在日本留学期间，许多学生会通过打工补贴生活费。但留学生打工必须遵守日本法律规定，否则可能影响签证甚至面临遣返风险。",
      "首先，必须申请「资格外活动许可」。持留学签证入境后，可在机场或当地入国管理局办理。未获得许可前，任何形式的打工都属于违法行为。",
      "工时限制：在学期间，原则上每周打工不超过 28 小时；寒暑假等长期休假期间，每天不超过 8 小时。语言学校期间同样适用此规定。",
      "禁止从事的行业：风俗营业、赌博相关等行业一律禁止。部分学校对打工地点或行业有额外规定，入学前建议向学校确认。",
      "常见打工类型：便利店、餐饮店、超市、工厂、中文家教、酒店清洁等。时薪因地区和岗位而异，东京最低时薪约 1113 日元（2024 年起），实际收入需扣除所得税和社保。",
      "打工是辅助学习和生活的手段，不应影响学业进度。建议将每周打工控制在 20 小时以内，留出足够时间用于日语学习和课程复习。",
    ],
  },
  {
    slug: "japan-rental-tips",
    title: "日本租房需要注意什么",
    excerpt:
      "押金、礼金、保证人与初期费用，帮你避开日本租房的常见坑。",
    category: "overseas-life",
    readingTime: 7,
    publishedAt: "2026-03-10",
    content: [
      "在日本租房与国内差异很大，初期费用高、流程繁琐，是留学生落地后最常遇到的挑战之一。",
      "初期费用构成：常见包括押金（敷金）、礼金（不可退还）、中介费、保证人公司费用、首月与次月房租、火险等。合计可能达到月租的 4 至 6 倍，需提前准备充足资金。",
      "保证人制度：多数房东要求有日本籍或永住者作为连带保证人。留学生通常通过「保证会社」替代，费用约为月租的 50% 至 100%，部分可分期。",
      "房源类型：学生公寓（学生会馆）、share house、普通租赁公寓各有优劣。学生会馆管理规范、家具齐全，但名额有限；share house 社交氛围好，适合初到日本的同学。",
      "签约注意事项：仔细阅读合同条款，确认退租条件、修缮责任、是否允许养宠物等。入住前拍摄房间现状照片，避免退租时产生不必要的纠纷。",
      "建议抵日后先住短期住宿（如 Airbnb、酒店），实地看房后再签约。可通过 SUUMO、HOME'S 等平台搜索，或请语言学校推荐合作不动产公司。",
    ],
  },
  {
    slug: "new-zealand-study-who-suits",
    title: "新西兰留学适合哪些人",
    excerpt:
      "从教育环境、移民政策到生活氛围，分析新西兰留学适合的学生类型与目标。",
    category: "new-zealand-study",
    readingTime: 6,
    publishedAt: "2026-03-12",
    content: [
      "新西兰以安全、自然、教育质量稳定著称，近年来成为中国学生出国的热门选择之一。但并非所有人都适合，了解自身目标很重要。",
      "适合追求英语环境、偏好小班教学的同学：新西兰大学师生比合理，课堂互动多，适合希望提升英语沟通能力、不喜欢超大规模校园的学生。",
      "适合有移民或长期居留意向的同学：新西兰对部分专业和技术工种有移民加分政策，完成符合条件的学历后有机会申请工作签证和居留。需关注最新移民政策变化。",
      "适合喜欢户外与自然的学生：新西兰生活节奏相对舒缓，城市与自然环境融合度高，适合注重生活质量、喜欢户外运动的人群。",
      "不太适合的情况：若目标是进入全球顶尖名校竞争最激烈的领域，或希望在大都市体验快节奏商业环境，新西兰可能不如英美澳部分城市。",
      "建议结合自身学术背景、预算、职业规划和性格特点综合评估。可以先通过短期游学或语言课程体验当地生活，再决定是否长期留学。",
    ],
  },
  {
    slug: "new-zealand-living-cost",
    title: "新西兰生活成本介绍",
    excerpt:
      "奥克兰、惠灵顿等主要城市的生活费参考，含住宿、饮食、交通与保险。",
    category: "new-zealand-study",
    readingTime: 5,
    publishedAt: "2026-03-15",
    content: [
      "新西兰生活成本整体低于澳洲主要城市，但高于国内一线城市。不同城市之间差异明显，留学预算应因城而异。",
      "住宿：奥克兰单人间月租约 800 至 1200 纽币；惠灵顿、基督城等城市可能低 100 至 200 纽币。学生公寓或 homestay 是常见选择，homestay 通常含部分餐食。",
      "饮食：自己做饭每月约 400 至 600 纽币；经常外食则可能超过 800 纽币。超市如 Countdown、Pak'nSave 价格相对实惠，注意关注每周促销。",
      "交通：学生可办理优惠公交卡，奥克兰月票约 150 至 200 纽币。许多学生选择步行或骑行，尤其是校园附近住宿。",
      "其他：手机套餐约 30 至 60 纽币/月；留学生保险约 600 至 800 纽币/年；教材与杂费因专业而异。",
      "新西兰移民局要求留学生具备足够的生活费证明。2024 年起，除学费外，每年生活费证明金额约为 2 万纽币（具体以官方最新要求为准）。建议实际准备略高于最低要求的资金。",
    ],
  },
  {
    slug: "pre-departure-documents",
    title: "出国前需要准备哪些材料",
    excerpt:
      "护照、学历公证、语言成绩、资金证明……出国前材料清单一次梳理清楚。",
    category: "visa-guide",
    readingTime: 7,
    publishedAt: "2026-03-18",
    content: [
      "出国留学前的材料准备往往耗时最长，建议越早开始越好。以下清单适用于多数国家，具体请以目标院校和使领馆要求为准。",
      "身份与学历类：有效期足够的护照、身份证、户口本；最高学历毕业证与学位证；中英文成绩单；在读证明或工作证明（如适用）。",
      "语言与标准化考试：雅思、托福、JLPT、TOPIK 等语言成绩；GRE、GMAT 等（部分研究生项目要求）。注意成绩有效期，预留补考时间。",
      "申请文书：个人陈述（PS）、推荐信、简历（CV）、研究计划（研究生）等。文书需针对每所学校定制，避免一稿多投。",
      "资金证明：银行存款证明、父母收入证明、资助声明等。不同国家对金额、存期要求不同，日本通常要求 20 万左右人民币等值存款，新西兰、澳洲等有各自标准。",
      "签证材料：录取通知书、COE/LOA、体检报告、无犯罪记录证明、照片、签证申请表等。部分国家需提前预约签证中心面签或录指纹。",
      "建议建立材料清单表格，逐项勾选并标注截止日期。重要文件准备多份复印件和扫描件，云端备份以防丢失。",
    ],
  },
  {
    slug: "bank-and-sim-card-guide",
    title: "留学生办理银行卡和电话卡指南",
    excerpt:
      "落地后如何快速开通银行账户与手机通讯，解决海外生活的基础需求。",
    category: "overseas-life",
    readingTime: 6,
    publishedAt: "2026-03-20",
    content: [
      "抵达留学目的地后，办理本地银行卡和电话卡是优先事项，关系到日常消费、学费缴纳和紧急联系。",
      "银行卡办理（以日本为例）：需携带护照、在留卡、住址证明（如租房合同或区役所住民票）。部分银行要求日语能力或需预约。推荐三菱 UFJ、三井住友等大型银行，网点和 ATM 覆盖广。",
      "银行卡办理（以新西兰为例）：需护照、学生签证、地址证明、部分银行需 IRD 税号。ANZ、ASB、BNZ 等对学生账户通常免月费，可在线预约开户。",
      "电话卡选择：日本常见 SoftBank、au、docomo 及 MVNO 虚拟运营商（如 mineo、IIJmio），MVNO 月费更低。新西兰有 Spark、Vodafone、2degrees 等，预付费套餐灵活，适合初期使用。",
      "办理顺序建议：先办电话卡保持通讯，再预约银行开户。部分国家银行开户需等待 1 至 2 周收到实体卡，初期可携带适量现金或使用国际信用卡过渡。",
      "安全提示：勿将银行卡密码、验证码告知他人；警惕钓鱼短信和假客服；开通网上银行后启用双重验证，定期核对账单。",
    ],
  },
];

/** 获取全部文章列表 */
export function getAllArticles(): Article[] {
  return articles;
}

/** 根据 slug 获取单篇文章，找不到时返回 undefined */
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

/** 根据分类 slug 筛选该分类下的文章 */
export function getArticlesByCategory(category: CategorySlug): Article[] {
  return articles.filter((article) => article.category === category);
}

/** 根据 slug 获取分类信息 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

/** 校验 URL 中的分类 slug 是否合法 */
export function isValidCategorySlug(slug: string): slug is CategorySlug {
  return categories.some((category) => category.slug === slug);
}

/** 根据分类 slug 返回中文名称，用于标签展示 */
export function getCategoryName(slug: CategorySlug): string {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}
