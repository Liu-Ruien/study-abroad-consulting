import type { Language } from "@/lib/i18n/language";

export type LocalizedField = Record<Language, string>;
export type LocalizedParagraphs = Record<Language, string[]>;

export type Article = {
  slug: string;
  category: string;
  readMinutes: number;
  title: LocalizedField;
  excerpt: LocalizedField;
  content: LocalizedParagraphs;
};

export type Category = {
  slug: string;
};

export const categories: Category[] = [
  { slug: "japan-study" },
  { slug: "new-zealand-study" },
  { slug: "visa-guide" },
  { slug: "overseas-life" },
];

/** @deprecated Use getCategoryLabel from lib/i18n/ui-strings */
export function getCategoryName(categorySlug: string): string {
  const labels: Record<string, string> = {
    "japan-study": "日本留学",
    "new-zealand-study": "新西兰留学",
    "visa-guide": "签证指南",
    "overseas-life": "海外生活",
  };
  return labels[categorySlug] ?? "未知分类";
}

export const articles: Article[] = [
  {
    slug: "japan-language-school-application",
    category: "japan-study",
    readMinutes: 3,
    title: {
      zh: "日本语言学校申请流程",
      ja: "日本語学校の申請フロー",
      en: "How to Apply to a Japanese Language School",
    },
    excerpt: {
      zh: "详细介绍日本语言学校申请步骤",
      ja: "日本語学校への申請ステップを整理",
      en: "A step-by-step overview of language school applications in Japan",
    },
    content: {
      zh: [
        "日本语言学校申请流程通常包括确定入学时间、选择学校、准备申请材料、提交材料、等待学校审查、取得在留资格认定证明书、申请签证、购买机票并赴日入学。",
        "对于第一次准备日本留学的人来说，语言学校是比较常见的起点。",
      ],
      ja: [
        "日本語学校の申請は、入学時期の決定、学校選び、書類準備、提出、審査、在留資格認定証明書の取得、ビザ申請、渡航までが基本フローです。",
        "初めて日本留学を検討する場合、語学学校はよく選ばれる入口になります。",
      ],
      en: [
        "Applying to a Japanese language school usually means choosing an intake, selecting a school, preparing documents, submitting them, waiting for review, receiving a Certificate of Eligibility, applying for a visa, and traveling to Japan.",
        "For first-time applicants, a language school is often the most common starting point.",
      ],
    },
  },
  {
    slug: "japan-study-cost",
    category: "japan-study",
    readMinutes: 3,
    title: {
      zh: "日本留学一年大概多少钱",
      ja: "日本留学の年間費用",
      en: "How Much Does One Year in Japan Cost?",
    },
    excerpt: {
      zh: "分析日本留学一年费用结构",
      ja: "日本留学1年分の費用構成を整理",
      en: "Breaking down the cost structure for one year of study in Japan",
    },
    content: {
      zh: [
        "日本留学一年的费用主要由学费、房租、生活费、交通费、保险费和日常开销组成。语言学校一年的学费通常是一笔较大的支出，生活成本则会受到城市影响。",
        "东京、大阪等大城市成本相对更高，地方城市会更低一些。",
      ],
      ja: [
        "日本留学1年の費用は、学費、家賃、生活費、交通費、保険、日常支出などで構成されます。語学学校の学費は大きな支出になりやすく、生活費は都市によって差が出ます。",
        "東京や大阪は相対的に高く、地方都市はやや低めになることが多いです。",
      ],
      en: [
        "A year in Japan typically includes tuition, rent, living expenses, transport, insurance, and daily costs. Language school tuition is often the largest item, while living costs depend heavily on the city.",
        "Tokyo and Osaka tend to be more expensive; regional cities are usually lower.",
      ],
    },
  },
  {
    slug: "japan-part-time-job",
    category: "japan-study",
    readMinutes: 3,
    title: {
      zh: "日本留学生打工规则",
      ja: "日本の留学生アルバイト規則",
      en: "Part-Time Work Rules for Students in Japan",
    },
    excerpt: {
      zh: "讲解日本留学生打工限制",
      ja: "留学生のアルバイト制限を説明",
      en: "Key limits and reminders for student part-time work in Japan",
    },
    content: {
      zh: [
        "日本留学生打工需要先取得资格外活动许可。一般情况下，留学生每周最多可以打工 28 小时，长假期间可以适当延长。",
        "打工时需要注意不要影响出勤率和学习状态，否则可能影响签证续签。",
      ],
      ja: [
        "日本でアルバイトをするには、資格外活動許可が必要です。原則として週28時間までが上限で、長期休暇中は延長できる場合があります。",
        "出席率や学習に支障が出ないよう注意が必要で、影響が大きいとビザ更新に不利になることがあります。",
      ],
      en: [
        "Students in Japan need permission for activities outside their visa status before working part-time. In most cases, the limit is 28 hours per week, with some flexibility during long breaks.",
        "Work should not harm attendance or study progress, as that can affect visa renewal.",
      ],
    },
  },
  {
    slug: "japan-rent-guide",
    category: "overseas-life",
    readMinutes: 3,
    title: {
      zh: "日本租房需要注意什么",
      ja: "日本で賃貸する際の注意点",
      en: "What to Know Before Renting in Japan",
    },
    excerpt: {
      zh: "介绍日本租房时常见费用与注意事项",
      ja: "日本の賃貸でよくある費用と注意点",
      en: "Common fees and practical tips for renting in Japan",
    },
    content: {
      zh: [
        "日本租房需要注意礼金、押金、中介费、保证会社费用、火灾保险和钥匙更换费等。刚到日本的留学生可能会因为没有稳定收入或担保人而租房较难。",
        "因此可以优先考虑学校宿舍、留学生公寓或支持外国人的房源。",
      ],
      ja: [
        "日本の賃貸では、礼金、敷金、仲介手数料、保証会社費用、火災保険、鍵交換費などに注意が必要です。安定収入や連帯保証人がない留学生は審査が通りにくい場合があります。",
        "最初は学校寮、留学生向けアパート、外国人対応物件を優先して検討するのが現実的です。",
      ],
      en: [
        "Renting in Japan may involve key money, deposit, agency fees, guarantor company fees, fire insurance, and key replacement costs. New arrivals without stable income or a guarantor can find approvals difficult.",
        "School dormitories, student apartments, or foreigner-friendly listings are often better first options.",
      ],
    },
  },
  {
    slug: "nz-study-suitable",
    category: "new-zealand-study",
    readMinutes: 3,
    title: {
      zh: "新西兰留学适合哪些人",
      ja: "ニュージーランド留学は誰向けか",
      en: "Who Is New Zealand Study a Good Fit For?",
    },
    excerpt: {
      zh: "分析新西兰留学适合人群",
      ja: "NZ留学に向いている人の特徴",
      en: "Who may benefit most from studying in New Zealand",
    },
    content: {
      zh: [
        "新西兰留学比较适合喜欢安静生活环境、重视实践型教育、希望体验英语国家学习氛围的人。",
        "相比一些人口密集的大国家，新西兰生活节奏较慢，自然环境较好，但就业市场规模也相对有限。",
      ],
      ja: [
        "ニュージーランド留学は、落ち着いた生活環境、実践的な学び、英語圏での経験を重視する人に向いています。",
        "人口密度の高い大国と比べ、生活ペースはゆったりで自然環境は良い一方、就業市場は相対的に小さい点も理解しておく必要があります。",
      ],
      en: [
        "New Zealand can suit people who prefer a quieter environment, practical learning, and an English-speaking study experience.",
        "Compared with larger countries, the pace is slower and nature is a major plus, but the job market is relatively smaller.",
      ],
    },
  },
  {
    slug: "nz-living-cost",
    category: "new-zealand-study",
    readMinutes: 3,
    title: {
      zh: "新西兰生活成本介绍",
      ja: "ニュージーランドの生活費",
      en: "Living Costs in New Zealand",
    },
    excerpt: {
      zh: "介绍新西兰生活费用",
      ja: "NZでの生活費の基本",
      en: "A practical overview of living expenses in New Zealand",
    },
    content: {
      zh: [
        "新西兰生活成本主要包括房租、饮食、交通、保险和日常开销。奥克兰、惠灵顿等城市房租相对较高，合租可以降低成本。",
        "留学生在做预算时，需要提前规划住宿和交通方式。",
      ],
      ja: [
        "ニュージーランドの生活費は、家賃、食費、交通、保険、日常支出が中心です。オークランドやウェリントンは家賃が高めで、シェアハウスはコストを抑える方法になります。",
        "留学前に住居と交通手段を含めた予算を先に組み立てておくと安心です。",
      ],
      en: [
        "Living costs in New Zealand mainly include rent, food, transport, insurance, and daily spending. Auckland and Wellington tend to have higher rent; sharing helps reduce costs.",
        "Plan housing and transport early when building a student budget.",
      ],
    },
  },
  {
    slug: "preparation-documents",
    category: "visa-guide",
    readMinutes: 3,
    title: {
      zh: "出国前需要准备哪些材料",
      ja: "出国前に準備する書類",
      en: "Documents to Prepare Before Going Abroad",
    },
    excerpt: {
      zh: "整理出国材料清单",
      ja: "留学・渡航前の書類チェックリスト",
      en: "A checklist of common documents before departure",
    },
    content: {
      zh: [
        "出国前通常需要准备护照、签证申请材料、资金证明、学历证明、成绩单、语言成绩、照片、体检材料以及学校录取相关文件。",
        "不同国家和不同学校要求不同，建议提前建立材料清单并逐项确认。",
      ],
      ja: [
        "出国前には、パスポート、ビザ書類、資金証明、学歴証明、成績証明、語学スコア、写真、検査書類、学校関連書類などが必要になることが多いです。",
        "国や学校ごとに要件が異なるため、早めにチェックリストを作って確認するのがおすすめです。",
      ],
      en: [
        "Before going abroad, you often need a passport, visa documents, proof of funds, education certificates, transcripts, language scores, photos, medical records, and school admission files.",
        "Requirements vary by country and institution, so a checklist reviewed early helps avoid last-minute gaps.",
      ],
    },
  },
  {
    slug: "bank-sim-guide",
    category: "overseas-life",
    readMinutes: 3,
    title: {
      zh: "留学生办理银行卡和电话卡指南",
      ja: "留学生の銀行口座・SIMカードガイド",
      en: "Bank Accounts and SIM Cards for Students Abroad",
    },
    excerpt: {
      zh: "讲解出国后金融与通讯准备",
      ja: "渡航後の金融・通信の基本準備",
      en: "Getting set up with banking and mobile service after arrival",
    },
    content: {
      zh: [
        "留学生到达海外后通常需要尽快办理当地电话卡和银行卡。电话卡用于联系学校、租房、注册账号和接收验证码；银行卡用于接收工资、缴纳费用和日常支付。",
        "建议提前了解当地银行和运营商的申请条件。",
      ],
      ja: [
        "海外到着後は、早めに現地のSIMカードと銀行口座を準備する必要があります。SIMは学校連絡、賃貸、各種登録、認証コード受信に使い、銀行口座は給与受取や支払いに必要です。",
        "事前に銀行とキャリアの申込条件を確認しておくとスムーズです。",
      ],
      en: [
        "After arrival, students usually need a local SIM card and bank account quickly. A SIM supports school contact, housing, account registration, and verification codes; a bank account supports wages, bills, and daily payments.",
        "Check each bank and carrier's requirements before you land.",
      ],
    },
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((item) => item.slug === slug);
}
