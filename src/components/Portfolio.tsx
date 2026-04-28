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

const i18n = {
  ja: {
    nav: { profile: "プロフィール", strengths: "強み", achievements: "実績", contact: "お問い合わせ" },
    hero: {
      badge: "Business Operations & Operations Design",
      title: ["事業を前進させる、", "運用設計", "と", "実行力", "。"],
      desc: "経営・管理部門・コンテンツ運用の実務経験をもとに、業務改善、体制構築、動画/Web運用を一気通貫で担当。現在はQA/テスト領域への展開を見据え、AI活用を含む実務改善に取り組んでいます。",
      viewWork: "実績を見る",
      contact: "お問い合わせ",
    },
    about: {
      title: "プロフィール",
      p1: "大学卒業後、小売・法人支援・管理部門を経て、共同創業した法人で事業運営全般（製造、営業管理、顧客管理、物流、財務）を担当。",
      p2: "採用・育成・業務設計・改善まで一気通貫で実行し、再現可能な運用体制づくりを強みとしています。現在はタイ住まいで、リモート前提の業務支援に加え、Web制作・動画運用・AI活用開発を継続しています。",
      location: "Location",
      email: "Email",
    },
    strengths: { title: "Core Strengths", subtitle: "専門性と強み" },
    achievements: { title: "Achievements", subtitle: "実務実績とプロジェクト" },
    certs: {
      title: "Certifications",
      subtitle: "保有資格・習得",
      desc: "最新のAI技術からファイナンスまで、実務に裏打ちされた知識基盤を継続的にアップデートしています。",
    },
    contact: {
      title: "Contact",
      subtitle: "ご相談・お問い合わせ",
      desc: "業務改善、運用設計、コンテンツ運用、Web制作、動画制作、AI活用のご相談に対応しています。小規模案件から継続支援まで、お気軽にご連絡ください。",
      btn: "メールを送る",
    },
    footer: "All rights reserved.",
    appLinks: ["姓名判断鑑定", "RAG型AI"],
    ytLinks: ["Yappa Japan（継続中）", "プルックサージャパン（2021.7〜2025.10運用）", "タイランドエリート（スポット）"],
    p365Label: "継続運用中",
    studioBtn: "サイトを見る",
    noteBtn: "noteリンク",
  },
  en: {
    nav: { profile: "Profile", strengths: "Strengths", achievements: "Achievements", contact: "Contact" },
    hero: {
      badge: "Business Operations & Operations Design",
      title: ["Driving Business Forward with ", "Operations Design", " and ", "Execution", "."],
      desc: "Based on hands-on experience in management, administration, and content operations, I handle everything from process improvement and system development to video/Web operations. Currently focusing on applying AI to improve practical operations with an eye toward QA/testing.",
      viewWork: "View Work",
      contact: "Contact",
    },
    about: {
      title: "Profile",
      p1: "After graduating from university, I worked in retail, corporate support, and administrative departments before co-founding a company where I was responsible for overall business operations (manufacturing, sales management, customer management, logistics, and finance).",
      p2: "My strength lies in creating reproducible operational systems by executing everything from hiring/training to process design and improvement. Currently based in Thailand, providing high-level remote business support while continuing Web production, video operations, and AI development.",
      location: "Location",
      email: "Email",
    },
    strengths: { title: "Core Strengths", subtitle: "Expertise & Strengths" },
    achievements: { title: "Achievements", subtitle: "Main Achievements & Projects" },
    certs: {
      title: "Certifications",
      subtitle: "Qualifications & Skills",
      desc: "Continuously updating my knowledge base from latest AI technologies to finance, backed by practical experience.",
    },
    contact: {
      title: "Contact",
      subtitle: "Get in Touch",
      desc: "Available for consultations on business improvement, operations design, content operations, Web/Video production, and AI implementation. Feel free to contact me for small projects or long-term support.",
      btn: "Send Email",
    },
    footer: "All rights reserved.",
    appLinks: ["Fortune Telling App", "RAG AI Chat"],
    ytLinks: ["Yappa Japan (Ongoing)", "Prukusa Japan (2021.7-2025.10)", "Thailand Elite (Project-based)"],
    p365Label: "Ongoing",
    studioBtn: "View Site",
    noteBtn: "note Link",
  },
  th: {
    nav: { profile: "ข้อมูลส่วนตัว", strengths: "จุดแข็ง", achievements: "ผลงาน", contact: "ติดต่อ" },
    hero: {
      badge: "Business Operations & Operations Design",
      title: ["ขับเคลื่อนธุรกิจด้วย ", "การออกแบบการดำเนินงาน", " และ ", "การลงมือทำ", "."],
      desc: "จากประสบการณ์ตรงด้านการบริหาร การจัดการ และการดำเนินงานคอนเทนต์ ผมดูแลตั้งแต่การปรับปรุงกระบวนการ การพัฒนาระบบ ไปจนถึงวิดีโอและเว็บ ปัจจุบันเน้นการประยุกต์ใช้ AI เพื่อปรับปรุงงานจริง",
      viewWork: "ดูผลงาน",
      contact: "ติดต่อสอบถาม",
    },
    about: {
      title: "ข้อมูลส่วนตัว",
      p1: "หลังจากจบการศึกษา ผมได้ทำงานในด้านค้าปลีก การสนับสนุนองค์กร และฝ่ายธุรการ ก่อนที่จะร่วมก่อตั้งบริษัท โดยรับผิดชอบการดำเนินงานทางธุรกิจโดยรวม",
      p2: "จุดแข็งของผมคือการสร้างระบบปฏิบัติการที่ทำซ้ำได้ โดยดำเนินงานตั้งแต่การสรรหา/ฝึกอบรม ไปจนถึงการออกแบบกระบวนการและการปรับปรุง",
      location: "ที่ตั้ง",
      email: "อีเมล",
    },
    strengths: { title: "Core Strengths", subtitle: "ความเชี่ยวชาญและจุดแข็ง" },
    achievements: { title: "Achievements", subtitle: "ผลงานหลักและโครงการ" },
    certs: {
      title: "Certifications",
      subtitle: "คุณสมบัติและทักษะ",
      desc: "อัปเดตฐานความรู้ของผมอย่างต่อเนื่อง ตั้งแต่เทคโนโลยี AI ล่าสุดไปจนถึงการเงิน",
    },
    contact: {
      title: "Contact",
      subtitle: "ติดต่อ",
      desc: "ยินดีให้คำปรึกษาเกี่ยวกับการปรับปรุงธุรกิจ การออกแบบการดำเนินงาน การดำเนินงานด้านคอนเทนต์ การผลิตเว็บ/วิดีโอ และการนำ AI มาใช้",
      btn: "ส่งอีเมล",
    },
    footer: "สงวนลิขสิทธิ์ทั้งหมด",
    appLinks: ["แอปทำนายดวง", "RAG AI แชท"],
    ytLinks: ["Yappa Japan (ต่อเนื่อง)", "Prukusa Japan (2021.7-2025.10)", "Thailand Elite (ตามโครงการ)"],
    p365Label: "กำลังดำเนินการ",
    studioBtn: "ดูเว็บไซต์",
    noteBtn: "ลิงก์ note",
  },
  zh: {
    nav: { profile: "个人简介", strengths: "核心优势", achievements: "项目成就", contact: "联系我" },
    hero: {
      badge: "Business Operations & Operations Design",
      title: ["通过", "运营设计", "与", "执行力", "推动业务前进。"],
      desc: "凭借在管理、行政和内容运营方面的实操经验，我负责从流程改进、系统开发到视频与Web运营的全过程。当前专注于将AI用于提升实务效率。",
      viewWork: "查看成品",
      contact: "联系我",
    },
    about: {
      title: "个人简介",
      p1: "大学毕业后，我先后在零售、企业支持和行政部门工作，随后共同创立公司并负责整体业务运营。",
      p2: "我的优势是搭建可复制的运营体系，覆盖招聘培训、流程设计与持续优化。",
      location: "所在地",
      email: "电子邮件",
    },
    strengths: { title: "Core Strengths", subtitle: "专业能力与优势" },
    achievements: { title: "Achievements", subtitle: "主要实务业绩与项目" },
    certs: {
      title: "Certifications",
      subtitle: "持有资格与技能",
      desc: "持续更新知识库，覆盖最新AI技术与财务领域，并以实务经验为基础。",
    },
    contact: {
      title: "Contact",
      subtitle: "咨询与联系",
      desc: "提供业务改进、运营设计、内容运营、网页制作、视频制作及AI应用方面的咨询。",
      btn: "发送邮件",
    },
    footer: "版权所有。",
    appLinks: ["姓名判断鉴定", "RAG AI 聊天"],
    ytLinks: ["Yappa Japan（持续中）", "Prukusa Japan (2021.7-2025.10)", "Thailand Elite（项目制）"],
    p365Label: "持续运营中",
    studioBtn: "查看网站",
    noteBtn: "note 链接",
  },
} as const;

const baseAchievements = [
  {
    key: "k",
    title: "K社 健康食品製造販売",
    desc: "共同創業者として事業運営全般を担当。1年目売上3.4億円、2年目13億円超の成長を実現。少人数体制での全店セミナー運営と業務最適化を推進しました。",
    tags: ["事業運営", "売上成長", "業務最適化"],
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800&h=600",
  },
  {
    key: "n",
    title: "N社 健康食品製造販売",
    desc: "管理部マネージャーとして製造・会員・物流管理を統括。原料調達の見直しにより仕入単価を約半減。月間3,000万円規模の仕入に対し、年間約1,800万円規模のコスト改善を実現。",
    tags: ["管理部門", "コスト削減", "サプライチェーン"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800&h=600",
  },
  {
    key: "h",
    title: "H社 船舶用プリンターサービス",
    desc: "製品管理・総務・経営企画の複数部門を立ち上げ。年商3,000万円から約3年間で4億円弱への拡大に貢献し、中国・青島拠点の在庫/出荷体制整備も担当。",
    tags: ["部門立ち上げ", "海外拠点管理", "経営企画"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&h=600",
  },
  {
    key: "studio",
    title: "ONIKA STUDIO",
    subtitle: "クリエイター向け多機能ポートフォリオ",
    desc: "構成設計、文言設計、公開までを短期間で実装。作品を魅力的に見せる導線設計と、更新しやすい運用性を重視して制作。",
    tags: ["Web制作", "UI/UX設計", "運用性重視"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=600",
    link: { href: "https://ais-pre-rneytcbdu2kguu5oyuxts5-459773233175.asia-east1.run.app" },
  },
  {
    key: "apps",
    title: "個人開発アプリ",
    desc: "業務課題の解決を目的に、AI活用アプリを企画・実装。短期間で試作し、実運用を意識したUIと導線を設計。",
    tags: ["AI活用", "課題解決", "プロダクト企画"],
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800&h=600",
    subLinks: [
      { url: "https://fortune-app-lt2qmmko7xpgf7vjcmawwm.streamlit.app/" },
      { url: "https://udify.app/chat/FQUSZtUZmNUj9kfI" },
    ],
  },
  {
    key: "youtube",
    title: "YouTubeチャンネル運用",
    desc: "立ち上げから撮影、編集、運用まで一気通貫で対応。継続配信と改善を重ね、実務として制作体制を構築。",
    tags: ["動画制作", "チャンネル運営", "体制構築"],
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=800&h=600",
    subLinks: [
      { url: "https://www.youtube.com/@YappaJapan" },
      { url: "https://www.youtube.com/@%E3%83%97%E3%83%AB%E3%83%83%E3%82%AF%E3%82%B5%E3%83%BC%E3%82%B8%E3%83%A3%E3%83%91%E3%83%B3" },
      { url: "https://www.youtube.com/watch?v=-S_4e8_GXP4" },
    ],
  },
  {
    key: "project365",
    title: "Project365（継続配信）",
    desc: "記事執筆に加え、音声解説・デザイン制作まで含む配信を運用。AIを活用した企画〜更新フローを実践。",
    tags: ["note継続配信", "インフォグラフィック", "AIワークフロー"],
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800&h=600",
    link: { href: "https://note.com/tkykkd/n/nc3fcf9fe771a" },
  },
] as const;

const coreStrengths = [
  { name: "事業運営・業務改善", items: ["管理体制構築", "フロー設計と標準化", "コスト最適化"], icon: <Settings className="w-5 h-5" /> },
  { name: "コンテンツ運用", items: ["セミナー動画編集・配信", "YouTubeチャンネル運用", "Webページ制作・更新"], icon: <Tv className="w-5 h-5" /> },
  { name: "組織づくり", items: ["採用・育成・権限移譲", "関係者調整と実行管理", "継続運用できる体制づくり"], icon: <Users className="w-5 h-5" /> },
];

const certifications = [
  { name: "2級ファイナンシャル・プランニング技能士", image: `${import.meta.env.BASE_URL}cert-fp.jpg` },
  { name: "Google AI Essentials (Coursera, 2026年1月)", image: `${import.meta.env.BASE_URL}cert-google-ai.jpg` },
  { name: "Google Prompting Essentials (Coursera, 2026年2月)", image: `${import.meta.env.BASE_URL}cert-google-prompt.jpg` },
  { name: "Generative AI for Leaders (Vanderbilt/Coursera, 2026年2月)", image: `${import.meta.env.BASE_URL}cert-vanderbilt.jpg` },
  { name: "AI For Business (University of Pennsylvania/Coursera, 2026年2月)", image: `${import.meta.env.BASE_URL}cert-upenn.jpg` },
  { name: "Generative AI for Executives and Business Leaders (IBM/Coursera, 2026年2月)", image: `${import.meta.env.BASE_URL}cert-ibm.jpg` },
];

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
            <Badge variant="outline" className="mb-6 px-4 py-1 text-xs uppercase tracking-widest border-primary/50 text-primary">{t.hero.badge}</Badge>
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
                <div><div className="flex items-center gap-2 text-primary mb-2"><Globe className="w-4 h-4" /><h4 className="font-bold text-foreground underline decoration-primary/30 underline-offset-4">{t.about.location}</h4></div><p className="text-muted-foreground">Thailand (Remote Ready)</p></div>
                <div><div className="flex items-center gap-2 text-primary mb-2"><Mail className="w-4 h-4" /><h4 className="font-bold text-foreground underline decoration-primary/30 underline-offset-4">{t.about.email}</h4></div><p className="text-muted-foreground">Google Form Contact</p></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="strengths" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4 text-primary"><Wrench className="w-5 h-5" /><span className="text-sm font-bold uppercase tracking-widest">{t.strengths.title}</span></div>
            <h2 className="text-3xl md:text-5xl font-bold">{t.strengths.subtitle}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {coreStrengths.map((strength, idx) => (
              <motion.div key={strength.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <Card className="h-full border-muted/50 bg-muted/20 hover:bg-muted/40 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">{strength.icon}</div>
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
            <div><div className="flex items-center gap-2 mb-4 text-primary"><Briefcase className="w-5 h-5" /><span className="text-sm font-bold uppercase tracking-widest">{t.achievements.title}</span></div><h2 className="text-3xl md:text-5xl font-bold">{t.achievements.subtitle}</h2></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {baseAchievements.map((achievement, idx) => (
              <motion.div key={achievement.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <Card className="overflow-hidden border-muted/50 bg-background h-full flex flex-col group relative">
                  {achievement.key === "project365" && <div className="absolute top-4 right-4 z-10"><Badge className="bg-primary text-primary-foreground font-bold rounded-sm px-3 py-1 shadow-lg ring-1 ring-white/20">{t.p365Label}</Badge></div>}
                  <div className="relative aspect-[16/10] overflow-hidden"><img src={achievement.image} alt={achievement.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-80" /></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg leading-snug">{achievement.title}</CardTitle>
                    {achievement.subtitle && <CardDescription className="text-xs font-semibold text-primary/80 uppercase tracking-tighter">{achievement.subtitle}</CardDescription>}
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col pt-0">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{achievement.desc}</p>
                    {achievement.key === "apps" && achievement.subLinks && (
                      <div className="space-y-2 mb-6">{achievement.subLinks.map((link, i) => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors py-1.5 px-3 rounded-md bg-muted/30 group/link"><ExternalLink className="w-3 h-3" /><span className="flex-grow">{t.appLinks[i]}</span><ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" /></a>)}</div>
                    )}
                    {achievement.key === "youtube" && achievement.subLinks && (
                      <div className="space-y-2 mb-6">{achievement.subLinks.map((link, i) => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors py-1.5 px-3 rounded-md bg-muted/30 group/link"><Play className="w-3 h-3 text-red-500" /><span className="flex-grow">{t.ytLinks[i]}</span><ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" /></a>)}</div>
                    )}
                    <div className="flex flex-wrap gap-2 mt-auto">{achievement.tags.map((tag) => <Badge key={tag} variant="secondary" className="text-[10px] uppercase font-bold tracking-tighter rounded-sm px-2 py-0 border-primary/20 bg-primary/5">{tag}</Badge>)}</div>
                    {achievement.link && <Button variant="outline" size="sm" className="w-full mt-6 rounded-full text-xs font-bold" asChild><a href={achievement.link.href} target="_blank" rel="noopener noreferrer">{achievement.key === "studio" ? t.studioBtn : t.noteBtn}<ExternalLink className="ml-2 w-3 h-3" /></a></Button>}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4 text-primary"><Award className="w-5 h-5" /><span className="text-sm font-bold uppercase tracking-widest">{t.certs.title}</span></div>
              <h2 className="text-3xl font-bold">{t.certs.subtitle}</h2>
              <p className="mt-4 text-muted-foreground">{t.certs.desc}</p>
            </div>
            <div className="md:col-span-2">
              <div className="grid sm:grid-cols-1 gap-6">
                {certifications.map((cert) => (
                  <div key={cert.name} className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl border border-muted/50 bg-muted/5 hover:bg-muted/10 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 hidden sm:flex"><CircleCheck className="w-5 h-5" /></div>
                    <div className="flex-grow"><span className="text-sm font-semibold">{cert.name}</span></div>
                    <div className="w-full sm:w-48 aspect-[4/3] rounded-lg overflow-hidden border border-muted/50 relative group">
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className={`w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-zoom-in ${cert.name.includes("IBM") ? "scale-110" : ""}`}
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
            <div className="flex items-center justify-center gap-2 mb-6 text-primary"><MessageSquare className="w-5 h-5" /><span className="text-sm font-bold uppercase tracking-widest">{t.contact.title}</span></div>
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
