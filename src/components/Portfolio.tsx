import { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  ExternalLink,
  User,
  Briefcase,
  Wrench,
  MessageSquare,
  Award,
  Settings,
  Tv,
  Users,
  CircleCheck,
  Globe,
  Play,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

/** Intentionally English across all locales (branding / global UI baseline). */
const SHARED_UI = {
  heroBadge: "Business Operations & Operations Design",
  sectionEyebrow: {
    strengths: "Core Strengths",
    achievements: "Achievements",
    certs: "Certifications",
    contact: "Contact",
  },
  fieldLabel: {
    location: "Location",
    email: "Email",
  },
} as const;

const strengthIcons = [
  <Settings key="ic-s" className="w-5 h-5" />,
  <Tv key="ic-t" className="w-5 h-5" />,
  <Users key="ic-u" className="w-5 h-5" />,
];

type AchievementKey = "k" | "n" | "h" | "studio" | "apps" | "youtube" | "aiContent" | "project365";

type AchievementBlock = {
  title: string;
  desc: string;
  tags: readonly [string, string, string];
  studioNames?: readonly [string, string, string, string, string, string];
  subtitle?: string;
};

type CertItem = {
  id: string;
  name: string;
  summary: string;
};

type StrengthCard = { name: string; items: readonly [string, string, string] };

type LocaleBlock = {
  nav: { profile: string; strengths: string; achievements: string; contact: string };
  hero: {
    title: readonly [string, string, string, string, string];
    desc: string;
    viewWork: string;
    contact: string;
  };
  about: {
    title: string;
    p1: string;
    p2: string;
  };
  strengths: { subtitle: string; cards: readonly [StrengthCard, StrengthCard, StrengthCard] };
  achievements: { subtitle: string; blocks: Record<AchievementKey, AchievementBlock> };
  certs: {
    subtitle: string;
    desc: string;
    items: readonly CertItem[];
  };
  contact: {
    subtitle: string;
    desc: string;
    btn: string;
  };
  footer: string;
  appLinks: readonly [string, string, string];
  ytLinks: readonly [string, string, string];
  p365Label: string;
  studioBtn: string;
  noteBtn: string;
};

const i18n: Record<"ja" | "en" | "th" | "zh", LocaleBlock> = {
  ja: {
    nav: { profile: "プロフィール", strengths: "強み", achievements: "実績", contact: "お問い合わせ" },
    hero: {
      title: ["事業を前進させる、", "運用設計", "と", "実行力", "。"],
      desc: "経営・管理部門・コンテンツ運用の実務経験をもとに、業務改善、体制構築、動画/Web運用を一気通貫で担当。現在はバイブコーディングでのアプリ開発やAIを活用したアドバイス、実務改善に取り組んでいます。",
      viewWork: "実績を見る",
      contact: "お問い合わせ",
    },
    about: {
      title: "プロフィール",
      p1: "大学卒業後、小売・法人支援・管理部門を経て、共同創業した法人で事業運営全般（製造、営業管理、顧客管理、物流、財務）を担当。",
      p2: "採用・育成・業務設計・改善まで一気通貫で実行し、再現可能な運用体制づくりを強みとしています。現在はタイ住まいで、リモート前提の業務支援に加え、Web制作・動画運用・AI活用開発を継続しています。",
    },
    strengths: {
      subtitle: "専門性と強み",
      cards: [
        {
          name: "事業運営・業務改善",
          items: ["管理体制構築", "フロー設計と標準化", "コスト最適化"],
        },
        {
          name: "コンテンツ運用",
          items: ["セミナー動画編集・配信", "YouTubeチャンネル運用", "Webページ制作・更新"],
        },
        {
          name: "組織づくり",
          items: ["採用・育成・権限移譲", "関係者調整と実行管理", "継続運用できる体制づくり"],
        },
      ],
    },
    achievements: {
      subtitle: "実務実績とプロジェクト",
      blocks: {
        k: {
          title: "K社 健康食品製造販売",
          desc: "共同創業者として事業運営全般を担当。1年目売上3.4億円、2年目13億円超の成長を実現。少人数体制での全店セミナー運営と業務最適化を推進。",
          tags: ["事業運営", "売上成長", "業務最適化"],
        },
        n: {
          title: "N社 健康食品製造販売",
          desc: "管理部マネージャーとして製造・会員・物流管理を統括。原料調達の見直しにより仕入単価を約半減。月間3,000万円規模の仕入に対し、年間約1,800万円規模のコスト改善を実現。",
          tags: ["管理部門", "コスト削減", "サプライチェーン"],
        },
        h: {
          title: "H社 船舶用プリンターサービス",
          desc: "製品管理・総務・経営企画の複数部門を立ち上げ。年商3,000万円から約3年間で4億円弱への拡大に貢献し、中国・青島拠点の在庫/出荷体制整備も担当。",
          tags: ["部門立ち上げ", "海外拠点管理", "経営企画"],
        },
        studio: {
          title: "サイト制作",
          desc: "構成設計、文言設計、公開までを短期間で実装。作品を魅力的に見せる導線設計と、更新しやすい運用性を重視して制作。",
          tags: ["Web制作", "UI/UX設計", "運用性重視"],
          studioNames: [
            "ONIKA STUDIO",
            "ONIKA Creative Archive",
            "RE-VERSE Technologies 株式会社",
            "メッセージお届けサイト①",
            "メッセージお届けサイト②",
            "メディカルクラブ（多言語化サンプル）",
          ],
        },
        apps: {
          title: "個人開発アプリ",
          desc: "業務課題の解決を目的に、AI活用アプリを企画・実装。短期間で試作し、実運用を意識したUIと導線を設計。",
          tags: ["AI活用", "課題解決", "プロダクト企画"],
        },
        youtube: {
          title: "YouTubeチャンネル運用",
          desc: "立ち上げから撮影、編集、運用まで一気通貫で対応。継続配信と改善を重ね、実務として制作体制を構築。",
          tags: ["動画制作", "チャンネル運営", "体制構築"],
        },
        aiContent: {
          title: "AI活用",
          desc: "動画の量産フロー設計や、記事ストック運用など、短時間で大量生成しつつ体裁と品質ラインをそろえる運用を構築。SNS文面から制作・公開までを、エージェント役割の切り分けとワークフロー設計でつなぎ、再現可能な「AI組織」として回します。個人のAI活用の設計・コンサルティングも行っています。",
          tags: ["ワークフロー設計", "エージェント設計", "AIコンサル"],
        },
        project365: {
          title: "Project365（継続配信）",
          desc: "記事執筆に加え、音声解説・デザイン制作まで含む配信を運用。AIを活用した企画〜更新フローを実践。",
          tags: ["note継続配信", "インフォグラフィック", "AIワークフロー"],
        },
      },
    },
    certs: {
      subtitle: "保有資格・習得",
      desc: "最新のAI技術からファイナンスまで、実務に裏打ちされた知識基盤を継続的にアップデートしています。",
      items: [
        {
          id: "fp",
          name: "2級ファイナンシャル・プランニング技能士",
          summary:
            "国家資格の技能検定で、家計・保険・税務・不動産・相続など6分野の知識を実務で活用する力を認定する資格です。学科と実技の両方に合格することで、資産設計の提案力を証明できます。",
        },
        {
          id: "googleAi",
          name: "Google AI Essentials (Coursera, Jan 2026)",
          summary:
            "Google提供の初心者向けAI講座で、業務での生成AI活用を短時間で体系的に学ぶコースです。実務で使えるプロンプト設計、情報整理、責任あるAI利用の基礎を習得しています。",
        },
        {
          id: "googlePrompt",
          name: "Google Prompting Essentials (Coursera, Feb 2026)",
          summary:
            "生成AIへの指示品質を高めるためのプロンプト特化講座です。5ステップの設計手法を通じて、要約・資料作成・分析支援など日常業務で再利用できるプロンプト設計力を身につけています。",
        },
        {
          id: "vanderbilt",
          name: "Generative AI for Leaders (Vanderbilt/Coursera, Feb 2026)",
          summary:
            "リーダー視点で生成AIを意思決定・コミュニケーション・戦略立案に活用する方法を学ぶ講座です。会議設計や提案評価など、経営実務に直結する活用フレームを実践的に習得しています。",
        },
        {
          id: "upenn",
          name: "AI For Business (University of Pennsylvania/Coursera, Feb 2026)",
          summary:
            "Whartonのビジネス向けAIプログラムで、AI戦略・ガバナンス・マーケティング・人材領域への実装を学ぶ内容です。技術導入だけでなく、運用設計と意思決定への組み込み方を理解しています。",
        },
        {
          id: "ibm",
          name: "Generative AI for Executives and Business Leaders (IBM/Coursera, Feb 2026)",
          summary:
            "IBMの経営層向け講座で、生成AIの事業価値、データ活用、ガバナンス、信頼性の観点を短時間で整理する内容です。組織導入時のリスク管理と実行方針を判断する基盤を強化しています。",
        },
      ],
    },
    contact: {
      subtitle: "ご相談・お問い合わせ",
      desc: "業務改善、運用設計、コンテンツ運用、Web制作、動画制作、AI活用のご相談に対応しています。小規模案件から継続支援まで、お気軽にご連絡ください。",
      btn: "メールを送る",
    },
    footer: "All rights reserved.",
    appLinks: ["姓名判断鑑定", "RAG型AI", "LINE公式 AI Bot"],
    ytLinks: ["Yappa Japan（継続中）", "プルックサージャパン（2021.7〜2025.10運用）", "タイランドエリート（スポット）"],
    p365Label: "継続運用中",
    studioBtn: "サイトを見る",
    noteBtn: "noteリンク",
  },
  en: {
    nav: { profile: "Profile", strengths: "Strengths", achievements: "Achievements", contact: "Contact" },
    hero: {
      title: ["Driving Business Forward with ", "Operations Design", " and ", "Execution", "."],
      desc: "Based on hands-on experience in management, administration, and content operations, I handle process improvement, organizational design, and video/Web operations end-to-end. Currently focused on app development through vibe coding, AI-assisted guidance, and hands-on operational improvement.",
      viewWork: "View Work",
      contact: "Contact",
    },
    about: {
      title: "Profile",
      p1: "After graduating from university, I worked in retail, corporate support, and administrative departments before co-founding a company where I was responsible for overall business operations (manufacturing, sales management, customer management, logistics, and finance).",
      p2: "My strength lies in creating reproducible operational systems by executing everything from hiring/training to process design and improvement. Currently based in Thailand, providing high-level remote business support while continuing Web production, video operations, and AI development.",
    },
    strengths: {
      subtitle: "Expertise & Strengths",
      cards: [
        {
          name: "Business Operations & Improvement",
          items: ["Governance and management structures", "Process design and standardization", "Cost optimization"],
        },
        {
          name: "Content Operations",
          items: ["Seminar video editing and distribution", "YouTube channel operations", "Web page production and updates"],
        },
        {
          name: "Organization Building",
          items: ["Hiring, training, and delegation", "Stakeholder coordination and execution", "Sustainable operating models"],
        },
      ],
    },
    achievements: {
      subtitle: "Main Achievements & Projects",
      blocks: {
        k: {
          title: "Company K — Health Food Manufacturing & Sales",
          desc: "As co-founder, led overall business operations. Achieved approx. ¥340M revenue in year one and over ¥1.3B in year two. Drove company-wide seminar operations with a lean team and continuous process optimization.",
          tags: ["Operations", "Revenue Growth", "Optimization"],
        },
        n: {
          title: "Company N — Health Food Manufacturing & Sales",
          desc: "As management department manager, oversaw manufacturing, membership, and logistics. Restructured sourcing to roughly halve unit costs—delivering approx. ¥18M annual savings against ~¥30M monthly procurement.",
          tags: ["Management", "Cost Reduction", "Supply Chain"],
        },
        h: {
          title: "Company H — Marine Printer Services",
          desc: "Launched product management, general affairs, and corporate planning. Helped scale revenue from ~¥30M to nearly ¥400M over ~3 years; built inventory/shipping operations at the Qingdao, China site.",
          tags: ["New Departments", "Overseas Ops", "Planning"],
        },
        studio: {
          title: "Web Production",
          desc: "Structured IA and copy, shipped production sites quickly. Focused on compelling presentation, clear user flows, and maintainable operations.",
          tags: ["Web Production", "UI/UX", "Maintainability"],
          studioNames: [
            "ONIKA STUDIO",
            "ONIKA Creative Archive",
            "RE-VERSE Technologies Co., Ltd.",
            "Message delivery site (1)",
            "Message delivery site (2)",
            "Medical Club (multilingual sample)",
          ],
        },
        apps: {
          title: "Personal Apps",
          desc: "Planned and built AI-powered apps to solve operational problems—rapid prototyping with production-minded UI and navigation.",
          tags: ["AI", "Problem Solving", "Product"],
        },
        youtube: {
          title: "YouTube Channel Operations",
          desc: "End-to-end work from launch through filming, editing, and operations—building a sustainable production setup with continuous improvement.",
          tags: ["Video", "Channel Ops", "Systems"],
        },
        aiContent: {
          title: "AI Utilization",
          desc: "Built operations to mass-produce video and article stock quickly while aligning format and quality—including workflows from SNS copy through publishing using agent-style roles and reproducible “AI organization” patterns. Also supports individuals with AI workflow design and consulting.",
          tags: ["Workflow Design", "Agent Design", "AI Consulting"],
        },
        project365: {
          title: "Project365 (ongoing series)",
          desc: "Runs publishing beyond articles—audio commentary and design—with AI-assisted planning and update workflows.",
          tags: ["note Series", "Infographics", "AI Workflow"],
        },
      },
    },
    certs: {
      subtitle: "Qualifications & Skills",
      desc: "Continuously updating my knowledge base from latest AI technologies to finance, backed by practical experience.",
      items: [
        {
          id: "fp",
          name: "Class 2 Financial Planning Skills Certification (Japan)",
          summary:
            "A national certification validating practical skills across six domains including household finance, insurance, tax, real estate, and inheritance. Passing both written and practical exams demonstrates proposal-ready asset planning capability.",
        },
        {
          id: "googleAi",
          name: "Google AI Essentials (Coursera, Jan 2026)",
          summary:
            "Google’s beginner-friendly AI course covering practical generative AI use at work—including prompting, information organization, and responsible AI basics—in a compact curriculum.",
        },
        {
          id: "googlePrompt",
          name: "Google Prompting Essentials (Coursera, Feb 2026)",
          summary:
            "A prompting-focused course to raise instruction quality for generative AI, teaching a five-step framework reusable for summaries, documents, and analysis support.",
        },
        {
          id: "vanderbilt",
          name: "Generative AI for Leaders (Vanderbilt/Coursera, Feb 2026)",
          summary:
            "Covers applying generative AI from a leadership lens—decisions, communication, and strategy—with practical frames tied to meetings and proposal evaluation.",
        },
        {
          id: "upenn",
          name: "AI For Business (University of Pennsylvania/Coursera, Feb 2026)",
          summary:
            "Wharton’s business-oriented AI program spanning strategy, governance, marketing, and people—beyond tooling toward operational design and decision-making.",
        },
        {
          id: "ibm",
          name: "Generative AI for Executives and Business Leaders (IBM/Coursera, Feb 2026)",
          summary:
            "IBM’s executive-focused overview of generative AI value, data use, governance, and trust—supporting risk-aware rollout decisions.",
        },
      ],
    },
    contact: {
      subtitle: "Get in Touch",
      desc: "Available for consultations on business improvement, operations design, content operations, Web/Video production, and AI implementation. Feel free to contact me for small projects or long-term support.",
      btn: "Send Email",
    },
    footer: "All rights reserved.",
    appLinks: ["Fortune Telling App", "RAG AI Chat", "LINE Official AI Bot"],
    ytLinks: ["Yappa Japan (Ongoing)", "Prukusa Japan (2021.7–2025.10)", "Thailand Elite (Project-based)"],
    p365Label: "Ongoing",
    studioBtn: "View Site",
    noteBtn: "note Link",
  },
  th: {
    nav: { profile: "ข้อมูลส่วนตัว", strengths: "จุดแข็ง", achievements: "ผลงาน", contact: "ติดต่อ" },
    hero: {
      title: ["ขับเคลื่อนธุรกิจด้วย ", "การออกแบบการดำเนินงาน", " และ ", "การลงมือทำ", "."],
      desc: "จากประสบการณ์ตรงด้านการบริหาร การจัดการ และการดำเนินงานคอนเทนต์ ผมดูแลการปรับปรุงกระบวนการ การออกแบบองค์กร และการดำเนินงานวิดีโอ/เว็บแบบครบสาย ปัจจุบันมุ่งพัฒนาแอปด้วยแนว vibe coding ให้คำแนะนำด้วย AI และขับเคลื่อนการปรับปรุงงานจริง",
      viewWork: "ดูผลงาน",
      contact: "ติดต่อสอบถาม",
    },
    about: {
      title: "ข้อมูลส่วนตัว",
      p1: "หลังจากจบการศึกษา ผมได้ทำงานในด้านค้าปลีก การสนับสนุนองค์กร และฝ่ายธุรการ ก่อนที่จะร่วมก่อตั้งบริษัท โดยรับผิดชอบการดำเนินงานทางธุรกิจโดยรวม",
      p2: "จุดแข็งของผมคือการสร้างระบบปฏิบัติการที่ทำซ้ำได้ โดยดำเนินงานตั้งแต่การสรรหา/ฝึกอบรม ไปจนถึงการออกแบบกระบวนการและการปรับปรุง",
    },
    strengths: {
      subtitle: "ความเชี่ยวชาญและจุดแข็ง",
      cards: [
        {
          name: "การดำเนินธุรกิจและการปรับปรุง",
          items: ["การสร้างระบบบริหาร", "การออกแบบกระบวนการและมาตรฐาน", "การลดต้นทุน"],
        },
        {
          name: "การดำเนินงานคอนเทนต์",
          items: ["ตัดต่อและเผยแพร่วิดีโอสัมมนา", "การดูแลช่อง YouTube", "การผลิตและอัปเดตเว็บเพจ"],
        },
        {
          name: "การสร้างองค์กร",
          items: ["การสรรหา การฝึกอบรม และการมอบหมาย", "การประสานงานและการบริหารการดำเนินการ", "การสร้างระบบที่ดำเนินต่อได้"],
        },
      ],
    },
    achievements: {
      subtitle: "ผลงานหลักและโครงการ",
      blocks: {
        k: {
          title: "บริษัท K — ผลิตและจำหน่ายอาหารเพื่อสุขภาพ",
          desc: "ในฐานะผู้ร่วมก่อตั้ง ดูแลการดำเนินงานโดยรวม บรรลุรายได้ประมาณ 340 ล้านเยนปีแรก และเกิน 1.3 พันล้านเยนปีที่สอง พร้อมขับเคลื่อนการปรับปรุงกระบวนการด้วยทีมขนาดเล็ก",
          tags: ["การดำเนินงาน", "การเติบโต", "การปรับปรุง"],
        },
        n: {
          title: "บริษัท N — ผลิตและจำหน่ายอาหารเพื่อสุขภาพ",
          desc: "ในฐานะผู้จัดการฝ่ายบริหาร ดูแลการผลิต สมาชิก และโลจิสติกส์ ปรับการจัดซื้อให้ต้นทุนต่อหน่วยลดลงประมาณครึ่งหนึ่ง และประหยัดต้นทุนราว 18 ล้านเยนต่อปีจากวงเงินจัดซื้อราว 30 ล้านเยนต่อเดือน",
          tags: ["การบริหาร", "การลดต้นทุน", "ซัพพลายเชน"],
        },
        h: {
          title: "บริษัท H — บริการเครื่องพิมพ์เรือ",
          desc: "เริ่มแผนกการจัดการผลิตภัณฑ์ ธุรการ และวางแผนองค์กร ช่วยขยายธุรกิจจากราว 30 ล้านเยนใกล้ 400 ล้านเยนใน ~3 ปี และดูแลคลัง/การจัดส่งที่ฐานชิงเต่า ประเทศจีน",
          tags: ["หน่วยงานใหม่", "ต่างประเทศ", "การวางแผน"],
        },
        studio: {
          title: "การผลิตเว็บไซต์",
          desc: "ออกแบบโครงสร้างและข้อความ เปิดตัวได้ในระยะเวลาสั้น เน้นการนำทางที่น่าสนใจและการดูแลที่อัปเดตง่าย",
          tags: ["เว็บ", "UI/UX", "การดูแลระยะยาว"],
          studioNames: [
            "ONIKA STUDIO",
            "ONIKA Creative Archive",
            "RE-VERSE Technologies Co., Ltd.",
            "เว็บไซต์ส่งข้อความ (1)",
            "เว็บไซต์ส่งข้อความ (2)",
            "Medical Club (ตัวอย่างหลายภาษา)",
          ],
        },
        apps: {
          title: "แอปพลิเคชันที่พัฒนาเอง",
          desc: "วางแผนและพัฒนาแอปที่ใช้ AI เพื่อแก้ปัญหางานจริง ทดลองเร็วและออกแบบ UI/การนำทางให้พร้อมใช้งานจริง",
          tags: ["AI", "แก้ปัญหา", "ผลิตภัณฑ์"],
        },
        youtube: {
          title: "การดูแลช่อง YouTube",
          desc: "ทำครบตั้งแต่เริ่มถ่าย ตัดต่อ และดำเนินการ — สร้างระบบผลิตและปรับปรุงอย่างต่อเนื่อง",
          tags: ["วิดีโอ", "การดูแลช่อง", "ระบบ"],
        },
        aiContent: {
          title: "การใช้ AI",
          desc: "ออกแบบการผลิตวิดีโอและคลังบทความอย่างรวดเร็วพร้อมคุณภาพสม่ำเสมอ เชื่อมตั้งแต่ข้อความ SNS ไปจนถึงการเผยแพร่ด้วยบทบาทแบบเอเจนต์และเวิร์กโฟลว์ที่ทำซ้ำได้ พร้อมให้คำปรึกษาการใช้ AI ส่วนบุคคล",
          tags: ["เวิร์กโฟลว์", "เอเจนต์", "ที่ปรึกษา AI"],
        },
        project365: {
          title: "Project365 (ต่อเนื่อง)",
          desc: "ดำเนินการเผยแพร่ที่รวมบทความ เสียงบรรยาย และดีไซน์ พร้อมเวิร์กโฟลว์การวางแผนและอัปเดตด้วย AI",
          tags: ["ซีรีส์ note", "อินโฟกราฟิก", "เวิร์กโฟลว์ AI"],
        },
      },
    },
    certs: {
      subtitle: "คุณสมบัติและทักษะ",
      desc: "อัปเดตฐานความรู้ของผมอย่างต่อเนื่อง ตั้งแต่เทคโนโลยี AI ล่าสุดไปจนถึงการเงิน",
      items: [
        {
          id: "fp",
          name: "การประเมินทักษะการวางแผนการเงินระดับ 2 (ญี่ปุ่น)",
          summary:
            "ใบรับรองระดับชาติที่ครอบคลุมหกด้าน รวมถึงการเงินภายในบ้าน ประกัน ภาษี อสังหาริมทรัพย์ และมรดก การผ่านทั้งทฤษฎีและปฏิบัติแสดงถึงความพร้อมในการให้คำปรึกษา",
        },
        {
          id: "googleAi",
          name: "Google AI Essentials (Coursera, Jan 2026)",
          summary:
            "หลักสูตรเริ่มต้นของ Google สำหรับการใช้ AI เชิงสร้างสรรค์ในงานจริง ครอบคลุมการตั้งคำสั่ง การจัดระเบียบข้อมูล และพื้นฐานการใช้ AI อย่างรับผิดชอบ",
        },
        {
          id: "googlePrompt",
          name: "Google Prompting Essentials (Coursera, Feb 2026)",
          summary:
            "หลักสูตรเชิงลึกเรื่องการตั้งคำสั่งสำหรับ AI เชิงสร้างสรรค์ พร้อมกรอบห้าขั้นตอนที่นำกลับใช้ซ้ำในสรุป เอกสาร และการวิเคราะห์",
        },
        {
          id: "vanderbilt",
          name: "Generative AI for Leaders (Vanderbilt/Coursera, Feb 2026)",
          summary:
            "มุมมองผู้นำในการนำ AI เชิงสร้างสรรค์ไปใช้กับการตัดสินใจ การสื่อสาร และกลยุทธ์ พร้อมกรอบที่เชื่อมโยงการประชุมและการประเมินข้อเสนอ",
        },
        {
          id: "upenn",
          name: "AI For Business (University of Pennsylvania/Coursera, Feb 2026)",
          summary:
            "โปรแกรม AI เชิงธุรกิจจาก Wharton ครอบคลุมกลยุทธ์ การกำกับ การตลาด และการจัดการคน — มากกว่าการติดตั้งเทคโนโลยี",
        },
        {
          id: "ibm",
          name: "Generative AI for Executives and Business Leaders (IBM/Coursera, Feb 2026)",
          summary:
            "ภาพรวมสำหรับผู้บริหารจาก IBM เกี่ยวกับคุณค่าของ AI เชิงสร้างสรรค์ การใช้ข้อมูล การกำกับ และความน่าเชื่อถือเพื่อการตัดสินใจอย่างมีความเสี่ยงต่ำ",
        },
      ],
    },
    contact: {
      subtitle: "ติดต่อ",
      desc: "ยินดีให้คำปรึกษาเกี่ยวกับการปรับปรุงธุรกิจ การออกแบบการดำเนินงาน การดำเนินงานด้านคอนเทนต์ การผลิตเว็บ/วิดีโอ และการนำ AI มาใช้",
      btn: "ส่งอีเมล",
    },
    footer: "สงวนลิขสิทธิ์ทั้งหมด",
    appLinks: ["แอปทำนายดวง", "RAG AI แชท", "บอท LINE AI อย่างเป็นทางการ"],
    ytLinks: ["Yappa Japan (ต่อเนื่อง)", "Prukusa Japan (2021.7–2025.10)", "Thailand Elite (ตามโครงการ)"],
    p365Label: "กำลังดำเนินการ",
    studioBtn: "ดูเว็บไซต์",
    noteBtn: "ลิงก์ note",
  },
  zh: {
    nav: { profile: "个人简介", strengths: "核心优势", achievements: "项目成就", contact: "联系我" },
    hero: {
      title: ["通过", "运营设计", "与", "执行力", "推动业务前进。"],
      desc: "凭借在管理、行政和内容运营方面的实操经验，我负责业务改进、体制搭建与视频/Web运营的全流程。目前正致力于借助氛围编程（vibe coding）进行应用开发，以及基于AI的建议与实务层面的改进。",
      viewWork: "查看成品",
      contact: "联系我",
    },
    about: {
      title: "个人简介",
      p1: "大学毕业后，我先后在零售、企业支持和行政部门工作，随后共同创立公司并负责整体业务运营。",
      p2: "我的优势是搭建可复制的运营体系，覆盖招聘培训、流程设计与持续优化。",
    },
    strengths: {
      subtitle: "专业能力与优势",
      cards: [
        {
          name: "业务运营与改进",
          items: ["管理体制搭建", "流程设计与标准化", "成本优化"],
        },
        {
          name: "内容运营",
          items: ["研讨会视频剪辑与发布", "YouTube频道运营", "网页制作与更新"],
        },
        {
          name: "组织建设",
          items: ["招聘、培训与授权", "相关方协调与执行管理", "可持续的运营机制"],
        },
      ],
    },
    achievements: {
      subtitle: "主要实务业绩与项目",
      blocks: {
        k: {
          title: "K公司 — 健康食品制造与销售",
          desc: "作为联合创始人负责整体事业运营。第一年销售额约3.4亿日元，第二年超过13亿日元；以小团队推动全店研讨会运营与流程优化。",
          tags: ["事业运营", "增长", "优化"],
        },
        n: {
          title: "N公司 — 健康食品制造与销售",
          desc: "作为管理部门经理统筹制造、会员与物流。重新梳理采购使进货单价约减半；在月规模约3000万日元进货额下实现年约1800万日元规模的成本改善。",
          tags: ["管理", "降本", "供应链"],
        },
        h: {
          title: "H公司 — 船用打印机服务",
          desc: "筹建产品管理、总务与企划等多个部门；助力年销售额从约3000万日元在约三年内扩大到近4亿日元，并负责中国青岛基地的库存与出货体制。",
          tags: ["部门筹建", "海外据点", "企划"],
        },
        studio: {
          title: "网站制作",
          desc: "从结构、文案到上线在短期内落地；重视展示路径与可持续更新的维护性。",
          tags: ["网站制作", "UI/UX", "可维护性"],
          studioNames: [
            "ONIKA STUDIO",
            "ONIKA Creative Archive",
            "RE-VERSE Technologies Co., Ltd.",
            "消息投递网站①",
            "消息投递网站②",
            "医疗俱乐部（多语言示例）",
          ],
        },
        apps: {
          title: "个人开发应用",
          desc: "面向业务课题策划并实现AI应用；快速试制并设计贴近实战的UI与导航。",
          tags: ["AI", "问题解决", "产品策划"],
        },
        youtube: {
          title: "YouTube频道运营",
          desc: "从启动到拍摄、剪辑、运营全流程对应；持续迭代并搭建可执行的制作体制。",
          tags: ["视频", "频道运营", "体制"],
        },
        aiContent: {
          title: "AI活用",
          desc: "搭建视频量产流程与文章储备运营，在短时间大量产出的同时统一体裁与质量线；从社媒文案到发布以角色分工与工作流串联，形成可复现的“AI组织”。亦提供个人层面的AI活用设计与咨询。",
          tags: ["工作流设计", "智能体设计", "AI咨询"],
        },
        project365: {
          title: "Project365（持续连载）",
          desc: "运营包含文章、语音解说与设计的连载内容；实践AI辅助的策划与更新流程。",
          tags: ["note连载", "信息图", "AI工作流"],
        },
      },
    },
    certs: {
      subtitle: "持有资格与技能",
      desc: "持续更新知识库，覆盖最新AI技术与财务领域，并以实务经验为基础。",
      items: [
        {
          id: "fp",
          name: "二级理财规划专业人员（日本国家资格）",
          summary:
            "国家技能鉴定，覆盖家庭财务、保险、税务、不动产与继承等六大领域的实务应用能力。通过学科与实技考试，体现资产规划提案能力。",
        },
        {
          id: "googleAi",
          name: "Google AI Essentials (Coursera, Jan 2026)",
          summary:
            "Google面向初学者的AI课程，在短时间内系统学习工作中的生成式AI应用，包括提示设计、信息整理与负责任的AI使用基础。",
        },
        {
          id: "googlePrompt",
          name: "Google Prompting Essentials (Coursera, Feb 2026)",
          summary:
            "聚焦提示工程的课程，通过五步框架提升对生成式AI的指令质量，可在摘要、资料与分析支持等日常工作中复用。",
        },
        {
          id: "vanderbilt",
          name: "Generative AI for Leaders (Vanderbilt/Coursera, Feb 2026)",
          summary:
            "从领导者视角学习将生成式AI用于决策、沟通与战略；包含会议设计与提案评估等贴近经营的框架。",
        },
        {
          id: "upenn",
          name: "AI For Business (University of Pennsylvania/Coursera, Feb 2026)",
          summary:
            "沃顿商学院导向的AI课程，涵盖战略、治理、营销与人才落地；不止于技术导入，更关注运营设计与决策嵌入。",
        },
        {
          id: "ibm",
          name: "Generative AI for Executives and Business Leaders (IBM/Coursera, Feb 2026)",
          summary:
            "IBM面向高管的概述课程，梳理生成式AI的业务价值、数据利用、治理与可信度，支撑组织导入时的风险判断与方针。",
        },
      ],
    },
    contact: {
      subtitle: "咨询与联系",
      desc: "提供业务改进、运营设计、内容运营、网页制作、视频制作及AI应用方面的咨询。",
      btn: "发送邮件",
    },
    footer: "版权所有。",
    appLinks: ["姓名判断鉴定", "RAG AI 聊天", "LINE官方 AI 机器人"],
    ytLinks: ["Yappa Japan（持续中）", "Prukusa Japan (2021.7–2025.10)", "Thailand Elite（项目制）"],
    p365Label: "持续运营中",
    studioBtn: "查看网站",
    noteBtn: "note 链接",
  },
};

const ACHIEVEMENT_KEYS: AchievementKey[] = ["k", "n", "h", "studio", "apps", "youtube", "aiContent", "project365"];

const achievementStatic: Record<
  AchievementKey,
  { image: string; link?: { href: string }; subLinks?: readonly { url: string }[] }
> = {
  k: { image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800&h=600" },
  n: { image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800&h=600" },
  h: { image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&h=600" },
  studio: {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=600",
    link: { href: "https://tkykkd.github.io/onika1/" },
    subLinks: [
      { url: "https://tkykkd.github.io/onika1/" },
      { url: "https://tkykkd.github.io/onika2/" },
      { url: "https://tkykkd.github.io/re-verse/" },
      { url: "https://tkykkd.github.io/share/" },
      { url: "https://tkykkd.github.io/mother" },
      { url: "https://tkykkd.github.io/5star-medical-club/" },
    ],
  },
  apps: {
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800&h=600",
    subLinks: [
      { url: "https://fortune-app-lt2qmmko7xpgf7vjcmawwm.streamlit.app/" },
      { url: "https://udify.app/chat/FQUSZtUZmNUj9kfI" },
      { url: "https://line.me/R/ti/p/%40655ckozu" },
    ],
  },
  youtube: {
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=800&h=600",
    subLinks: [
      { url: "https://www.youtube.com/@YappaJapan" },
      { url: "https://www.youtube.com/@%E3%83%97%E3%83%AB%E3%83%83%E3%82%AF%E3%82%B5%E3%83%BC%E3%82%B8%E3%83%A3%E3%83%91%E3%83%B3" },
      { url: "https://www.youtube.com/watch?v=-S_4e8_GXP4" },
    ],
  },
  aiContent: {
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=600",
  },
  project365: {
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800&h=600",
    link: { href: "https://note.com/tkykkd/n/nc3fcf9fe771a" },
  },
};

const certImages: Record<string, string> = {
  fp: `${import.meta.env.BASE_URL}cert-fp.jpg`,
  googleAi: `${import.meta.env.BASE_URL}cert-google-ai.jpg`,
  googlePrompt: `${import.meta.env.BASE_URL}cert-google-prompt.jpg`,
  vanderbilt: `${import.meta.env.BASE_URL}cert-vanderbilt.jpg`,
  upenn: `${import.meta.env.BASE_URL}cert-upenn.jpg`,
  ibm: `${import.meta.env.BASE_URL}cert-ibm.jpg`,
};

type Lang = keyof typeof i18n;

export default function Portfolio() {
  const [lang, setLang] = useState<Lang>("ja");
  const t = i18n[lang];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans">
      <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center gap-2">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="font-display text-xl font-bold tracking-tighter">
              TAKAYUKI KIDO<span className="text-primary">.</span>
            </motion.div>
            <div className="hidden lg:flex space-x-6 text-sm font-medium">
              <a href="#about" className="hover:text-primary transition-colors">{t.nav.profile}</a>
              <a href="#strengths" className="hover:text-primary transition-colors">{t.nav.strengths}</a>
              <a href="#achievements" className="hover:text-primary transition-colors">{t.nav.achievements}</a>
              <a href="#contact" className="hover:text-primary transition-colors">{t.nav.contact}</a>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-full border border-primary/10">
                <div className="px-2 hidden sm:block"><Languages className="w-3.5 h-3.5 text-muted-foreground" /></div>
                {[
                  { code: "ja", label: "日本語" },
                  { code: "en", label: "English" },
                  { code: "th", label: "ไทย" },
                  { code: "zh", label: "中文" },
                ].map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => setLang(item.code as Lang)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${lang === item.code ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted/80"}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <Button variant="outline" size="sm" className="hidden md:flex rounded-full text-xs" asChild>
                <a href="#contact">{t.nav.contact}</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="outline" className="mb-6 px-4 py-1 text-xs uppercase tracking-widest border-primary/50 text-primary">{SHARED_UI.heroBadge}</Badge>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
              {t.hero.title[0]}<br />
              <span className="text-muted-foreground">{t.hero.title[1]}</span>{t.hero.title[2]}<span className="text-primary">{t.hero.title[3]}</span>{t.hero.title[4]}
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">{t.hero.desc}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full px-10 h-14 text-lg" asChild><a href="#achievements">{t.hero.viewWork}</a></Button>
              <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-lg" asChild><a href="#contact">{t.hero.contact}</a></Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative aspect-square">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl opacity-50"></div>
              <img src={`${import.meta.env.BASE_URL}profile.jpg`} alt="Takayuki Kido" className="relative rounded-2xl w-full h-full object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-2 mb-4 text-primary"><User className="w-5 h-5" /><span className="text-sm font-bold uppercase tracking-widest">{t.about.title}</span></div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter uppercase">Takayuki Kido</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg mb-8"><p>{t.about.p1}</p><p>{t.about.p2}</p></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t pt-8">
                <div><div className="flex items-center gap-2 text-primary mb-2"><Globe className="w-4 h-4" /><h4 className="font-bold text-foreground underline decoration-primary/30 underline-offset-4">{SHARED_UI.fieldLabel.location}</h4></div><p className="text-muted-foreground">Thailand (Remote Ready)</p></div>
                <div><div className="flex items-center gap-2 text-primary mb-2"><Mail className="w-4 h-4" /><h4 className="font-bold text-foreground underline decoration-primary/30 underline-offset-4">{SHARED_UI.fieldLabel.email}</h4></div><p className="text-muted-foreground">Google Form Contact</p></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="strengths" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4 text-primary"><Wrench className="w-5 h-5" /><span className="text-sm font-bold uppercase tracking-widest">{SHARED_UI.sectionEyebrow.strengths}</span></div>
            <h2 className="text-3xl md:text-5xl font-bold">{t.strengths.subtitle}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.strengths.cards.map((strength, idx) => (
              <motion.div key={strength.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <Card className="h-full border-muted/50 bg-muted/20 hover:bg-muted/40 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">{strengthIcons[idx]}</div>
                    <CardTitle className="text-xl mb-4">{strength.name}</CardTitle>
                    <Separator className="bg-primary/20" />
                  </CardHeader>
                  <CardContent><ul className="space-y-3">{strength.items.map((item) => <li key={item} className="flex items-start gap-2 text-muted-foreground"><CircleCheck className="w-4 h-4 mt-1 text-primary shrink-0" /><span>{item}</span></li>)}</ul></CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="achievements" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div><div className="flex items-center gap-2 mb-4 text-primary"><Briefcase className="w-5 h-5" /><span className="text-sm font-bold uppercase tracking-widest">{SHARED_UI.sectionEyebrow.achievements}</span></div><h2 className="text-3xl md:text-5xl font-bold">{t.achievements.subtitle}</h2></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {ACHIEVEMENT_KEYS.map((key, idx) => {
              const achievement = t.achievements.blocks[key];
              const meta = achievementStatic[key];
              return (
                <motion.div key={key} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                  <Card className="overflow-hidden border-muted/50 bg-background h-full flex flex-col group relative">
                    {key === "project365" && <div className="absolute top-4 right-4 z-10"><Badge className="bg-primary text-primary-foreground font-bold rounded-sm px-3 py-1 shadow-lg ring-1 ring-white/20">{t.p365Label}</Badge></div>}
                    <div className="relative aspect-[16/10] overflow-hidden"><img src={meta.image} alt={achievement.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-80" /></div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg leading-snug">{achievement.title}</CardTitle>
                      {achievement.subtitle && <CardDescription className="text-xs font-semibold text-primary/80 uppercase tracking-tighter">{achievement.subtitle}</CardDescription>}
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col pt-0">
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{achievement.desc}</p>
                      {key === "apps" && meta.subLinks && (
                        <div className="space-y-2 mb-6">{meta.subLinks.map((link, i) => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer nofollow" className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors py-1.5 px-3 rounded-md bg-muted/30 group/link"><ExternalLink className="w-3 h-3" /><span className="flex-grow">{t.appLinks[i]}</span><ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" /></a>)}</div>
                      )}
                      {key === "studio" && meta.subLinks && achievement.studioNames && (
                        <div className="space-y-2 mb-6">
                          {meta.subLinks.map((link, i) => (
                            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer nofollow" className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors py-1.5 px-3 rounded-md bg-muted/30 group/link">
                              <ExternalLink className="w-3 h-3" />
                              <span className="flex-grow">{achievement.studioNames[i]}</span>
                              <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                            </a>
                          ))}
                        </div>
                      )}
                      {key === "youtube" && meta.subLinks && (
                        <div className="space-y-2 mb-6">{meta.subLinks.map((link, i) => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer nofollow" className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors py-1.5 px-3 rounded-md bg-muted/30 group/link"><Play className="w-3 h-3 text-red-500" /><span className="flex-grow">{t.ytLinks[i]}</span><ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" /></a>)}</div>
                      )}
                      <div className="flex flex-wrap gap-2 mt-auto">{achievement.tags.map((tag) => <Badge key={tag} variant="secondary" className="text-[10px] uppercase font-bold tracking-tighter rounded-sm px-2 py-0 border-primary/20 bg-primary/5">{tag}</Badge>)}</div>
                      {meta.link && key !== "studio" && <Button variant="outline" size="sm" className="w-full mt-6 rounded-full text-xs font-bold" asChild><a href={meta.link.href} target="_blank" rel="noopener noreferrer nofollow">{t.noteBtn}<ExternalLink className="ml-2 w-3 h-3" /></a></Button>}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4 text-primary"><Award className="w-5 h-5" /><span className="text-sm font-bold uppercase tracking-widest">{SHARED_UI.sectionEyebrow.certs}</span></div>
              <h2 className="text-3xl font-bold">{t.certs.subtitle}</h2>
              <p className="mt-4 text-muted-foreground">{t.certs.desc}</p>
            </div>
            <div className="md:col-span-2">
              <div className="grid sm:grid-cols-1 gap-6">
                {t.certs.items.map((cert) => (
                  <div key={cert.id} className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl border border-muted/50 bg-muted/5 hover:bg-muted/10 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 hidden sm:flex"><CircleCheck className="w-5 h-5" /></div>
                    <div className="flex-grow">
                      <span className="text-sm font-semibold">{cert.name}</span>
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{cert.summary}</p>
                    </div>
                    <div className="w-full sm:w-48 aspect-[4/3] rounded-lg overflow-hidden border border-muted/50 relative group">
                      <img
                        src={certImages[cert.id]}
                        alt={cert.name}
                        className={`w-full h-full object-cover transition-all duration-500 cursor-zoom-in ${cert.id === "ibm" ? "scale-[1.24] object-center" : ""}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center justify-center gap-2 mb-6 text-primary"><MessageSquare className="w-5 h-5" /><span className="text-sm font-bold uppercase tracking-widest">{SHARED_UI.sectionEyebrow.contact}</span></div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 italic tracking-tight">{t.contact.subtitle}</h2>
            <p className="text-muted-foreground mb-12 text-lg md:text-xl leading-relaxed">{t.contact.desc}</p>
            <div className="flex justify-center"><Button size="lg" className="rounded-full px-12 h-16 text-xl" asChild><a href="https://forms.gle/EiY9QgY3VG8BMufT9" target="_blank" rel="noopener noreferrer">{t.contact.btn}</a></Button></div>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 border-t text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-display font-bold text-xl tracking-tighter">TAKAYUKI KIDO<span className="text-primary">.</span></div>
          <p className="text-muted-foreground text-center">© {new Date().getFullYear()} Takayuki Kido. {t.footer}</p>
        </div>
      </footer>
    </div>
  );
}
