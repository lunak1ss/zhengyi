"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { ScrollAnimation } from "@/components/scroll-animation";
import { ParticleNetwork } from "@/components/particle-network";
import { FontPreload } from "@/components/font-preload";
import {
  Menu, X, ChevronDown, ArrowRight, Mail, Phone, Linkedin,
  Calendar, Briefcase, Lightbulb, Users, BarChart3, Presentation,
  Bot, Video, FileText, Palette, Download, ExternalLink,
  Star, Zap, Target, Compass, Code, Layers
} from "lucide-react";

// ═══════════════════════════════════════════
//  Data Fetching Hook
// ═══════════════════════════════════════════

function useApiData<T>(endpoint: string, fallback: T, key?: string) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/data/${endpoint}`)
      .then((res) => res.json())
      .then((json) => {
        // 支持 { success: true, data: [...] } 和 { key: [...] } 两种格式
        if (json.success && json.data) {
          setData(json.data);
        } else if (key && json[key]) {
          setData(json[key]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { data, loading };
}

/* ═══════════════════════════════════════════
   Image Paths
   ═══════════════════════════════════════════ */
const IMG = {
  workMethod: "/images/00_个人工作方法_v1.jpeg",
  cbVisual: "/images/01_挑战杯_项目主视觉_v1.jpg",
  cbAward: "/images/01_挑战杯_获奖证明_v1.jpg",
  cbNews: "/images/01_挑战杯_学校报道_v1.png",
  umbrellaVisual: "/images/02_为你撑伞_项目主视觉_v1.jpg",
  umbrellaData: "/images/02_为你撑伞_项目数据卡_v1.jpg",
  umbrellaFlow: "/images/02_为你撑伞_运营流程图_v1.jpeg",
  umbrellaReport: "/images/04_为你撑伞_复盘报告封面.png",
  umbrellaOps: "/images/04_为你撑伞_运营思路.png",
  umbrellaFlowChart: "/images/04_为你撑伞_运营流程.png",
  umbrellaResults: "/images/04_为你撑伞_项目成果.png",
  umbrellaCase: "/images/04_为你撑伞_案例封面.png",
  umbrellaCase1: "/images/04_为你撑伞_案例内容1.png",
  umbrellaCase2: "/images/04_为你撑伞_案例内容2.png",
  umbrellaPoster: "/images/04_为你撑伞_招募海报.png",
  aiVisual: "/images/03_AI家教_产品主视觉_v1.png",
  aiCodex: "/images/03_AI家教_Codex开发截图_v1.png",
};

/* ═══════════════════════════════════════════
   Navigation
   ═══════════════════════════════════════════ */
const navLinks = [
  { href: "#home", label: "首页" },
  { href: "#about", label: "关于我" },
  { href: "#capabilities", label: "核心能力" },
  { href: "#projects", label: "项目作品" },
  { href: "#media", label: "创作作品" },
  { href: "#ai-workflow", label: "AI实践" },
  { href: "#contact", label: "联系我" },
];

/* ═══════════════════════════════════════════
   Timeline Data
   ═══════════════════════════════════════════ */
const timelineData = [
  { year: "2022", title: "进入大学", desc: "杭州师范大学本科入学，开始探索项目管理与团队协作领域" },
  { year: "2023", title: "能力积累", desc: "系统学习项目管理方法论，参与活动策划与志愿服务运营" },
  { year: "2024", title: "项目实践", desc: "负责浙江省挑战杯金奖项目推进，跨专业团队协调与成果展示" },
  { year: "2025", title: "AI探索", desc: "深入探索AI工具在方案设计、产品原型和效率提升中的应用" },
  { year: "2026", title: "职业启航", desc: "寻找能够发挥项目推进能力与AI工具应用价值的岗位" },
];

/* ═══════════════════════════════════════════
   Capabilities Data
   ═══════════════════════════════════════════ */
const capabilities = [
  { icon: <Target className="w-6 h-6" />, cn: "项目策划", en: "Project Planning", items: ["活动方案设计", "执行流程管理", "资源协调"] },
  { icon: <Bot className="w-6 h-6" />, cn: "AI工具应用", en: "AI Tools", items: ["AI视频生成", "AI办公自动化", "AI Agent探索"] },
  { icon: <Video className="w-6 h-6" />, cn: "内容创作", en: "Content Creation", items: ["短视频策划", "脚本设计", "视觉表达"] },
  { icon: <BarChart3 className="w-6 h-6" />, cn: "数据分析", en: "Data Analysis", items: ["Excel", "SPSS", "数据整理"] },
  { icon: <Presentation className="w-6 h-6" />, cn: "PPT与商业表达", en: "Business Presentation", items: ["商业方案", "项目汇报", "视觉设计"] },
  { icon: <Users className="w-6 h-6" />, cn: "沟通协作", en: "Communication", items: ["团队合作", "跨部门协调"] },
];

/* ═══════════════════════════════════════════
   Projects Data (4 Categories)
   ═══════════════════════════════════════════ */
type Project = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  cover: string;
  role: string;
  background: string;
  tasks: string[];
  flow: string[];
  results: string[];
  skills: string[];
  extraImages?: string[];
  pdfs?: { name: string; url: string }[];
  link?: { label: string; url: string };
};

const projects: Project[] = [
  {
    id: "challenge-cup",
    title: "智能多栖：可变胞多模态飞行器",
    subtitle: "浙江省挑战杯金奖 | 科技创新项目推进案例",
    category: "商业策划",
    cover: IMG.cbVisual,
    role: "项目推进与成果展示负责人",
    background: "围绕可变胞多模态飞行器研究，团队由机械、计算机、教育、美术、播音等多专业10人组成，项目周期12个月。",
    tasks: [
      "团队搭建与资源协调：主动协调机械、计算机、美工、路演等方向成员，组建10人跨专业团队",
      "项目推进管理：协助制定项目计划，协调技术、设计、材料多模块按节点完成",
      "成果表达优化：参与PPT优化、答辩稿打磨、专家意见整理，将技术成果转化为竞赛展示语言",
    ],
    flow: ["需求分析", "团队组建", "方案推进", "材料优化", "答辩展示"],
    results: ["浙江省第十九届挑战杯金奖", "进入省赛决赛", "完成10人跨专业团队协作", "完成12个月项目推进"],
    skills: ["项目管理", "团队协作", "成果表达", "高压交付"],
    extraImages: [IMG.cbAward, IMG.cbNews],
  },
  {
    id: "umbrella",
    title: "为你撑伞成长支持项目",
    subtitle: "公益教育项目运营 | 从0到1策划运营全过程复盘",
    category: "活动策划",
    cover: IMG.umbrellaVisual,
    role: "核心运营成员",
    background: "'为你撑伞'是一个面向浙江省遂昌县高中学生的公益教育支持项目，由一群经历过升学过程的高校学生发起，用青年志愿者的经验与陪伴，帮助高中阶段学生解决学习、升学与成长中的困惑。项目以'暑期成长营'为核心产品，集中承载学科课程、自习辅导、升学分享、一对一交流与心理支持五类服务。项目持续运营5年，累计服务600+学生。",
    tasks: [
      "团队搭建与扩展：发现初期人员不足后，主动联系浙江工业大学、杭州电子科技大学、温州医科大学等高校伙伴加入，组建跨高校志愿服务团队，协调十余名核心成员分工协作",
      "活动产品设计与运营：参与设计'破冰+课程+自习+分享+一对一'标准化成长营结构，负责活动流程规划、场地沟通、物资协调和现场执行，7-8天周期承载完整服务",
      "志愿者运营管理：参与志愿者招募筛选、培训带教、执行管理、复盘总结全流程，建立'双向匹配+过程管理+可持续'的志愿者运营体系",
      "传播与对外合作：负责项目宣传推广，对接遂昌中学、遂昌县团委等合作单位，获得遂昌融媒体报道，形成'需求发现-资源链接-活动实施-反馈优化'闭环运营模式",
    ],
    flow: ["需求洞察", "产品设计", "团队搭建", "活动执行", "反馈复盘", "持续迭代"],
    results: [
      "项目持续运营5年（2021至今）",
      "累计服务600+学生",
      "单次活动100+学生参与",
      "学生成绩平均提升约18分",
      "浙江工商大学志愿服务大赛金奖",
      "遂昌县优秀志愿服务项目大赛一等奖",
      "获得遂昌中学及当地团委认可",
      "获得遂昌融媒体报道",
    ],
    skills: ["活动策划", "产品运营", "志愿者管理", "资源协调", "传播推广", "复盘优化"],
    extraImages: [
      IMG.umbrellaReport,
      IMG.umbrellaOps,
      IMG.umbrellaFlowChart,
      IMG.umbrellaResults,
      IMG.umbrellaCase,
      IMG.umbrellaCase1,
      IMG.umbrellaCase2,
      IMG.umbrellaPoster,
    ],
    pdfs: [
      { name: "从0到1策划运营全过程复盘报告", url: "/pdfs/《为你撑伞》公益志愿服务项目——从0到1策划运营全过程复盘报告.pdf" },
      { name: "项目运营案例展示", url: "/pdfs/为你撑伞案例.pdf" },
      { name: "志愿者招募海报", url: "/pdfs/为你撑伞海报.pdf" },
    ],
  },
  {
    id: "pipi-ai-pm",
    title: "皮皮 — 智能项目管理助手",
    subtitle: "AI Agent × 项目管理自动化实践",
    category: "AI应用",
    cover: "/images/05_皮皮_产品截图.png",
    role: "产品设计与AI Agent实践者",
    background: "皮皮（Pipi AI Project Manager Agent）是一款面向个人开发者、创业团队及企业项目管理场景的智能项目管理助手。传统项目管理工具依赖人工录入和维护，沟通成本高、文档整理繁琐。皮皮通过大语言模型与多智能体工作流技术，实现从需求理解、目标拆解、任务规划、进度管理、风险分析到汇报材料生成的一站式自动化项目管理能力。",
    tasks: [
      "需求理解与目标拆解：设计AI Agent自动理解用户输入的项目背景与目标，分析项目需求并拆解关键任务节点",
      "智能规划与执行路径：自动生成结构化项目计划、时间安排以及执行路径，像经验丰富的项目经理一样工作",
      "进度管理与风险预警：根据阶段性数据自动生成项目周报、工作总结、风险预警和优化建议",
      "内容生产与文档生成：自动生成符合企业规范的PPT汇报文档、项目复盘报告以及可视化管理材料",
    ],
    flow: ["项目需求输入", "AI需求分析", "目标拆解与规划", "任务分配与执行", "进度追踪与预警", "汇报材料生成"],
    results: [
      "完成AI项目管理Agent原型搭建",
      "实现从需求到汇报的全流程自动化",
      "大幅降低项目管理中的文档制作成本",
      "验证AI Agent在企业协作场景的应用价值",
    ],
    skills: ["AI Agent设计", "产品思维", "工作流自动化", "项目管理"],
    link: { label: "在线体验皮皮", url: "https://lunakiss-cpszakdzyf9u7ntd6ex2rh.streamlit.app/" },
  },
];

const categories = ["全部", "商业策划", "活动策划", "AI应用"];

/* ═══════════════════════════════════════════
   Work Steps
   ═══════════════════════════════════════════ */
const workSteps = [
  { num: "01", cn: "发现需求", en: "Discover" },
  { num: "02", cn: "分析问题", en: "Analyze" },
  { num: "03", cn: "设计方案", en: "Design" },
  { num: "04", cn: "协调资源", en: "Coordinate" },
  { num: "05", cn: "推动执行", en: "Execute" },
  { num: "06", cn: "复盘优化", en: "Review" },
];

/* ═══════════════════════════════════════════
   Tool Categories
   ═══════════════════════════════════════════ */
const toolCategories = [
  { icon: <Bot className="w-5 h-5" />, cn: "AI工具", en: "AI Tools", desc: "方案设计 / 资料整理 / 内容优化 / 产品探索", tools: ["ChatGPT", "DeepSeek", "Coze", "Codex"] },
  { icon: <FileText className="w-5 h-5" />, cn: "办公工具", en: "Office Tools", desc: "数据处理 / 方案制作 / 项目汇报", tools: ["Excel", "Word", "PowerPoint"] },
  { icon: <Palette className="w-5 h-5" />, cn: "内容工具", en: "Content Tools", desc: "视觉设计 / 视频剪辑 / 内容制作", tools: ["Canva", "剪映"] },
];

/* ═══════════════════════════════════════════
   Job Targets
   ═══════════════════════════════════════════ */
const jobTargets = ["项目运营", "产品运营", "活动策划", "业务支持", "AI产品助理"];

/* ═══════════════════════════════════════════
   Hero Capability Cards
   ═══════════════════════════════════════════ */
const heroCapabilities = [
  { label: "AI应用能力", stars: 5 },
  { label: "项目策划能力", stars: 5 },
  { label: "内容创造能力", stars: 4 },
];

/* ═══════════════════════════════════════════
   Navigation Component
   ═══════════════════════════════════════════ */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks?.map((l) => l.href.slice(1));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "nav-glass scrolled" : "nav-glass"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className="text-lg font-serif font-bold text-[#E2E8F0] tracking-tight">
          郑一鸣
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks?.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors duration-300 ${
                activeSection === link.href.slice(1)
                  ? "text-[#3B82F6]"
                  : "text-[#94A3B8] hover:text-[#E2E8F0]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-[#E2E8F0]">
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden nav-glass px-6 py-4 space-y-3 border-t border-[rgba(59,130,246,0.08)]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-sm ${activeSection === link.href.slice(1) ? "text-[#3B82F6]" : "text-[#94A3B8]"}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════
   Hero Section
   ═══════════════════════════════════════════ */
function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) / rect.width,
      y: (e.clientY - rect.top - rect.height / 2) / rect.height,
    });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16" onMouseMove={handleMouseMove}>
      {/* Background */}
      <div className="absolute inset-0">
        <ParticleNetwork />
        <div className="absolute inset-0 tech-grid" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-transparent to-[#050816]" />
        {/* Nebula glow */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#3B82F6]/5 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#8B5CF6]/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Personal Info */}
          <div>
            <div className="hero-animate-d1">
              <p className="text-xs tracking-[0.3em] text-[#64748B] uppercase mb-4 font-mono">Portfolio 2026</p>
            </div>
            <div className="hero-animate-d2">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#E2E8F0] mb-4 tracking-tight">
                郑一鸣
              </h1>
            </div>
            <div className="hero-animate-d3">
              <p className="text-lg md:text-xl text-[#94A3B8] mb-6 leading-relaxed">
                AI时代的复合型<span className="text-[#3B82F6]">内容运营</span>与<span className="text-[#8B5CF6]">项目执行</span>人才
              </p>
            </div>
            <div className="hero-animate-d4">
              <div className="space-y-3 mb-8">
                {[
                  { icon: <Calendar className="w-4 h-4" />, text: "应届本科生" },
                  { icon: <Bot className="w-4 h-4" />, text: "AI工具应用能力" },
                  { icon: <Briefcase className="w-4 h-4" />, text: "项目策划能力" },
                  { icon: <Video className="w-4 h-4" />, text: "内容创作能力" },
                  { icon: <BarChart3 className="w-4 h-4" />, text: "数据分析能力" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-[#94A3B8]">
                    <span className="text-[#3B82F6]">{item.icon}</span>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-animate-d5">
              <a href="#projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3B82F6] text-white text-sm font-medium hover:bg-[#2563EB] transition-all btn-glow">
                <span>查看作品</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Dynamic Visual */}
          <div className="hidden lg:flex justify-center">
            <div className="hero-animate-d3 relative">
              <div
                className="relative w-80 h-80 rounded-full border border-[rgba(59,130,246,0.15)]"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePos.x * 5}deg) rotateX(${-mousePos.y * 5}deg)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                {/* Concentric rings */}
                <div className="absolute inset-4 rounded-full border border-[rgba(59,130,246,0.1)] animate-pulse" />
                <div className="absolute inset-8 rounded-full border border-[rgba(139,92,246,0.1)] animate-pulse" style={{ animationDelay: "0.5s" }} />
                <div className="absolute inset-12 rounded-full border border-[rgba(59,130,246,0.08)] animate-pulse" style={{ animationDelay: "1s" }} />
                {/* Center glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 blur-xl" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3B82F6]/30 to-[#8B5CF6]/30 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-[#60A5FA]" />
                  </div>
                </div>
                {/* Orbiting dots */}
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <div
                    key={deg}
                    className="absolute w-2 h-2 rounded-full bg-[#3B82F6]/40"
                    style={{
                      top: `${50 + 45 * Math.sin((deg * Math.PI) / 180)}%`,
                      left: `${50 + 45 * Math.cos((deg * Math.PI) / 180)}%`,
                      animation: `twinkle ${2 + i * 0.3}s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Capability Cards */}
        <div className="hero-animate-d5 mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {heroCapabilities?.map((cap) => (
            <div key={cap.label} className="glass-card p-5 text-center">
              <p className="text-sm text-[#94A3B8] mb-2">{cap.label}</p>
              <div className="flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < cap.stars ? "text-[#3B82F6] fill-[#3B82F6]" : "text-[#1E293B]"}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Timeline Section
   ═══════════════════════════════════════════ */
function TimelineSection() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = nodeRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveIndex((prev) => Math.max(prev, idx));
          }
        });
      },
      { threshold: 0.5 }
    );
    nodeRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 px-6 relative">
      <div className="absolute inset-0 tech-grid-fine opacity-30" />
      <div className="max-w-4xl mx-auto relative">
        <ScrollAnimation>
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.2em] text-[#64748B] uppercase mb-3 font-mono">My Journey</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#E2E8F0]">我的成长路径</h2>
          </div>
        </ScrollAnimation>

        <div className="relative">
          <div className="timeline-line" />
          <div className="space-y-16">
            {timelineData?.map((item, i) => (
              <ScrollAnimation key={item.year} delay={i * 100}>
                <div className={`relative flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}>
                  {/* Content */}
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} text-left`}>
                    <div className="glass-card p-6 inline-block">
                      <p className="text-2xl font-bold gradient-text mb-1">{item.year}</p>
                      <h3 className="text-lg font-serif font-bold text-[#E2E8F0] mb-2">{item.title}</h3>
                      <p className="text-sm text-[#94A3B8] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  {/* Node */}
                  <div
                    ref={(el) => { nodeRefs.current[i] = el; }}
                    className={`timeline-node flex-shrink-0 ${i <= activeIndex ? "active" : ""}`}
                  />
                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Capabilities Section
   ═══════════════════════════════════════════ */
function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.2em] text-[#64748B] uppercase mb-3 font-mono">Core Skills</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#E2E8F0]">核心能力</h2>
          </div>
        </ScrollAnimation>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities?.map((cap, i) => (
            <ScrollAnimation key={cap.cn} delay={i * 80}>
              <div className="glass-card p-6 h-full group cursor-default">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(59,130,246,0.1)] flex items-center justify-center text-[#3B82F6] group-hover:bg-[rgba(59,130,246,0.2)] transition-colors">
                    {cap.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#E2E8F0]">{cap.cn}</h3>
                    <p className="text-xs text-[#64748B] tracking-wider uppercase">{cap.en}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {cap.items?.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-[#94A3B8]">
                      <div className="w-1 h-1 rounded-full bg-[#3B82F6]/50" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Project Detail Modal
   ═══════════════════════════════════════════ */
function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto" onClick={onClose}>
      <div className="fixed inset-0 bg-[#050816]/90 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-4xl mx-6 my-12" onClick={(e) => e.stopPropagation()}>
        <div className="glass-card overflow-hidden">
          {/* Header */}
          <div className="relative h-64 md:h-80">
            <Image src={project.cover} alt={project.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent" />
            <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[rgba(5,8,22,0.8)] flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs bg-[rgba(59,130,246,0.2)] text-[#60A5FA] border border-[rgba(59,130,246,0.2)] mb-3">
                {project.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#E2E8F0] mb-2">{project.title}</h2>
              <p className="text-sm text-[#94A3B8]">{project.subtitle}</p>
            </div>
          </div>

          <div className="p-6 md:p-10 space-y-10">
            {/* External Link */}
            {project.link && (
              <a
                href={project.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[rgba(59,130,246,0.1)] to-[rgba(139,92,246,0.1)] border border-[rgba(59,130,246,0.2)] hover:border-[rgba(59,130,246,0.4)] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(59,130,246,0.15)] flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#E2E8F0] group-hover:text-[#60A5FA] transition-colors">{project.link.label}</p>
                    <p className="text-xs text-[#64748B] mt-0.5 truncate max-w-xs">{project.link.url}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-[#3B82F6] group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </a>
            )}

            {/* Background */}
            <div>
              <h3 className="text-lg font-serif font-bold text-[#E2E8F0] mb-3 flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#3B82F6]" /> 项目背景
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{project.background}</p>
            </div>

            {/* Role */}
            <div>
              <h3 className="text-lg font-serif font-bold text-[#E2E8F0] mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#3B82F6]" /> 我的角色
              </h3>
              <p className="text-sm text-[#60A5FA]">{project.role}</p>
            </div>

            {/* Tasks */}
            <div>
              <h3 className="text-lg font-serif font-bold text-[#E2E8F0] mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#3B82F6]" /> 关键行动
              </h3>
              <div className="space-y-3">
               {(project.tasks || []).map((task, i) => (
                  <div key={i} className="flex gap-3 p-4 rounded-xl bg-[rgba(15,23,60,0.4)] border border-[rgba(59,130,246,0.08)]">
                    <span className="text-xs font-mono text-[#3B82F6] mt-0.5 flex-shrink-0">0{i + 1}</span>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">{task}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Flow */}
            <div>
              <h3 className="text-lg font-serif font-bold text-[#E2E8F0] mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-[#3B82F6]" /> 执行流程
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                {(project.flow || []).map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="px-4 py-2 rounded-lg bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.15)] text-sm text-[#E2E8F0]">
                      {step}
                    </span>
                    {i < project.flow.length - 1 && <ArrowRight className="w-4 h-4 text-[#3B82F6]/40" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            <div>
              <h3 className="text-lg font-serif font-bold text-[#E2E8F0] mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-[#3B82F6]" /> 项目成果
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {project.results?.map((r) => (
                  <div key={r} className="flex items-center gap-2 p-3 rounded-xl bg-[rgba(59,130,246,0.05)] border border-[rgba(59,130,246,0.1)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] flex-shrink-0" />
                    <span className="text-sm text-[#E2E8F0]">{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Extra Images */}
            {project.extraImages && project.extraImages.length > 0 && (
              <div>
                <h3 className="text-lg font-serif font-bold text-[#E2E8F0] mb-4">项目展示</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.extraImages?.map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-[rgba(59,130,246,0.1)]">
                      <Image src={img} alt={`${project.title} ${i + 1}`} width={600} height={400} className="w-full h-auto" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PDF Downloads */}
            {project.pdfs && project.pdfs.length > 0 && (
              <div>
                <h3 className="text-lg font-serif font-bold text-[#E2E8F0] mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5 text-[#3B82F6]" /> 项目资料
                </h3>
                <div className="space-y-3">
                  {project.pdfs?.map((pdf, i) => (
                    <a
                      key={i}
                      href={pdf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl bg-[rgba(15,23,60,0.4)] border border-[rgba(59,130,246,0.08)] hover:border-[rgba(59,130,246,0.25)] transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[rgba(59,130,246,0.1)] flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-[#3B82F6]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#E2E8F0] group-hover:text-[#60A5FA] transition-colors truncate">{pdf.name}</p>
                        <p className="text-xs text-[#64748B] mt-0.5">PDF 文档</p>
                      </div>
                      <Download className="w-4 h-4 text-[#64748B] group-hover:text-[#3B82F6] transition-colors flex-shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            <div>
              <h3 className="text-lg font-serif font-bold text-[#E2E8F0] mb-4">能力体现</h3>
              <div className="flex flex-wrap gap-2">
                {project.skills?.map((s) => (
                  <span key={s} className="px-4 py-1.5 rounded-full text-sm bg-[rgba(59,130,246,0.1)] text-[#60A5FA] border border-[rgba(59,130,246,0.15)]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Projects Section
   ═══════════════════════════════════════════ */
function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { data: apiProjects, loading } = useApiData<Project[]>("projects", projects, "projects");

  const displayProjects = loading ? projects : (apiProjects || projects);
  const filtered = activeCategory === "全部" ? displayProjects : displayProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] text-[#64748B] uppercase mb-3 font-mono">Selected Projects</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#E2E8F0]">我的精选项目</h2>
          </div>
        </ScrollAnimation>

        {/* Category Tabs */}
        <ScrollAnimation delay={100}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories?.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`category-tab ${activeCategory === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollAnimation>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered?.map((project, i) => (
            <ScrollAnimation key={project.id} delay={i * 100}>
              <div
                className="glass-card overflow-hidden group cursor-pointer h-full"
                onClick={() => setSelectedProject(project)}
              >
                {/* Cover */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs bg-[rgba(59,130,246,0.2)] text-[#60A5FA] border border-[rgba(59,130,246,0.2)] backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-serif font-bold text-[#E2E8F0] mb-2 group-hover:text-[#3B82F6] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8] mb-4">{project.subtitle}</p>
                  <div className="flex items-center gap-2 text-[#3B82F6] text-sm">
                    <span>查看详情</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}

/* ═══════════════════════════════════════════
   Media Gallery Data
   ══════════════════════════════════════════
   管理说明：
   - 添加作品：在下方 mediaItems 数组中新增一项
   - 下架作品：将对应项的 visible 设为 false（不要删除，方便以后恢复）
   - 支持类型：video（视频）/ image（海报/图片）
   - 文件存放：public/media/ 目录
   ═══════════════════════════════════════════ */

type MediaItem = {
  id: string;
  title: string;
  type: "video" | "image";
  src: string;
  poster?: string; // 视频封面图
  category: string;
  description: string;
  visible: boolean; // true=展示, false=下架
};

const mediaItems: MediaItem[] = [
  // ═══ 视频作品 ═══
  {
    id: "v1",
    title: "示例视频作品",
    type: "video",
    src: "/media/demo-video.mp4",
    poster: "/media/demo-video-poster.jpg",
    category: "视频剪辑",
    description: "将视频文件放入 public/media/ 目录，修改 src 路径即可展示",
    visible: false, // 设为 true 后展示
  },
  // ═══ 海报/图片作品 ═══
  {
    id: "p1",
    title: "示例宣传海报",
    type: "image",
    src: "/media/demo-poster.jpg",
    category: "宣传海报",
    description: "将图片文件放入 public/media/ 目录，修改 src 路径即可展示",
    visible: false, // 设为 true 后展示
  },
];

/* ═══════════════════════════════════════════
   Media Gallery Section
   ═══════════════════════════════════════════ */

function MediaGallerySection() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [lightbox, setLightbox] = useState<MediaItem | null>(null);
  const { data: apiMedia, loading } = useApiData<MediaItem[]>("media-works", mediaItems, "mediaWorks");

  const displayItems = loading ? mediaItems : apiMedia;
  const visibleItems = displayItems.filter((item) => item.visible);
  const allCategories = ["全部", ...Array.from(new Set(visibleItems?.map((item) => item.category)))];
  const filtered = activeCategory === "全部" ? visibleItems : visibleItems.filter((item) => item.category === activeCategory);

  return (
    <section id="media" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] text-[#64748B] uppercase mb-3 font-mono">Creative Works</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#E2E8F0]">创作作品</h2>
            <p className="text-sm text-[#94A3B8] mt-3 max-w-xl mx-auto">
              视频剪辑 · 宣传海报 · 视觉设计
            </p>
          </div>
        </ScrollAnimation>

        {/* Category Tabs */}
        {allCategories.length > 1 && (
          <ScrollAnimation delay={100}>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {allCategories?.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`category-tab ${activeCategory === cat ? "active" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollAnimation>
        )}

        {/* Gallery Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered?.map((item, i) => (
              <ScrollAnimation key={item.id} delay={i * 80}>
                <div
                  className="glass-card overflow-hidden group cursor-pointer h-full"
                  onClick={() => setLightbox(item)}
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden bg-[#0A0F2E]">
                    {item.type === "video" ? (
                      <>
                        {item.poster && (
                          <Image
                            src={item.poster}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-[rgba(59,130,246,0.3)] backdrop-blur-sm border border-[rgba(59,130,246,0.4)] flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Video className="w-6 h-6 text-[#60A5FA] ml-1" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs bg-[rgba(139,92,246,0.2)] text-[#A78BFA] border border-[rgba(139,92,246,0.2)] backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-base font-serif font-bold text-[#E2E8F0] mb-1.5 group-hover:text-[#3B82F6] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#64748B] line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        ) : (
          <ScrollAnimation delay={100}>
            <div className="text-center py-16">
              <Palette className="w-12 h-12 text-[#334155] mx-auto mb-4" />
              <p className="text-[#64748B] text-sm">更多作品即将上线</p>
              <p className="text-[#475569] text-xs mt-2">视频剪辑、宣传海报、视觉设计持续更新中</p>
            </div>
          </ScrollAnimation>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[rgba(5,8,22,0.92)] backdrop-blur-md"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[85vh] overflow-hidden rounded-2xl border border-[rgba(59,130,246,0.15)] bg-[#0A0F2E]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            {lightbox.type === "video" ? (
              <video
                src={lightbox.src}
                poster={lightbox.poster}
                controls
                autoPlay
                className="w-full max-h-[75vh] object-contain bg-black"
              />
            ) : (
              <div className="relative w-full" style={{ aspectRatio: "auto" }}>
                <Image
                  src={lightbox.src}
                  alt={lightbox.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain max-h-[75vh]"
                />
              </div>
            )}

            {/* Info Bar */}
            <div className="p-5 border-t border-[rgba(59,130,246,0.1)]">
              <h3 className="text-lg font-serif font-bold text-[#E2E8F0]">{lightbox.title}</h3>
              <p className="text-sm text-[#94A3B8] mt-1">{lightbox.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ═══════════════════════════════════════════
   AI Workflow Section
   ═══════════════════════════════════════════ */
function AIWorkflowSection() {
  const steps = [
    { icon: <FileText className="w-5 h-5" />, label: "需求输入" },
    { icon: <Bot className="w-5 h-5" />, label: "AI分析" },
    { icon: <Lightbulb className="w-5 h-5" />, label: "AI生成方案" },
    { icon: <Users className="w-5 h-5" />, label: "人工优化" },
    { icon: <Star className="w-5 h-5" />, label: "成果输出" },
  ];

  return (
    <section id="ai-workflow" className="py-20 px-6 relative">
      <div className="absolute inset-0 tech-grid-fine opacity-20" />
      <div className="max-w-5xl mx-auto relative">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.2em] text-[#64748B] uppercase mb-3 font-mono">AI Era Workflow</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#E2E8F0] mb-4">AI时代个人工作流</h2>
            <p className="text-base text-[#94A3B8] max-w-2xl mx-auto">
              我如何将AI融入日常工作，提升效率与输出质量
            </p>
          </div>
        </ScrollAnimation>

        {/* Flow Diagram */}
        <ScrollAnimation delay={200}>
          <div className="glass-card p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {steps?.map((step, i) => (
                <div key={step.label} className="flex items-center gap-4 md:gap-0 flex-1 w-full md:w-auto">
                  <div className="flex flex-col items-center text-center flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] flex items-center justify-center text-[#3B82F6] mb-3">
                      {step.icon}
                    </div>
                    <span className="text-sm text-[#E2E8F0] font-medium">{step.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block flex-1 h-px mx-4 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/30 to-[#8B5CF6]/30" />
                      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full bg-[#3B82F6]/40" />
                    </div>
                  )}
                  {i < steps.length - 1 && (
                    <ArrowRight className="md:hidden w-5 h-5 text-[#3B82F6]/40 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mt-10 pt-8 border-t border-[rgba(59,130,246,0.1)]">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold gradient-text mb-1">87.5%</p>
                  <p className="text-sm text-[#94A3B8]">效率提升</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold gradient-text mb-1">4+</p>
                  <p className="text-sm text-[#94A3B8]">AI工具熟练运用</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold gradient-text mb-1">3</p>
                  <p className="text-sm text-[#94A3B8]">完整项目实践</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Work Method Steps */}
        <ScrollAnimation delay={300}>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {workSteps?.map((step, i) => (
              <div key={step.num} className="glass-card p-4 text-center group">
                <span className="text-xl font-bold text-[#64748B] group-hover:text-[#3B82F6] transition-colors font-mono">{step.num}</span>
                <h3 className="text-sm font-serif font-bold text-[#E2E8F0] mt-2 mb-0.5">{step.cn}</h3>
                <p className="text-xs text-[#64748B] tracking-wider uppercase">{step.en}</p>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Resume Section
   ═══════════════════════════════════════════ */
function ResumeSection() {
  return (
    <section id="resume" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] text-[#64748B] uppercase mb-3 font-mono">Resume</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#E2E8F0]">个人简历</h2>
          </div>
        </ScrollAnimation>
        <ScrollAnimation delay={100}>
          <div className="glass-card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Left: Info */}
              <div>
                <h3 className="text-xl font-serif font-bold text-[#E2E8F0] mb-6">郑一鸣</h3>
                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-xs text-[#64748B] uppercase tracking-wider mb-1">教育背景</p>
                    <p className="text-sm text-[#94A3B8]">杭州师范大学 · 本科 · 2026届</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B] uppercase tracking-wider mb-1">求职方向</p>
                    <div className="flex flex-wrap gap-2">
                      {jobTargets?.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-full text-xs bg-[rgba(59,130,246,0.08)] text-[#60A5FA] border border-[rgba(59,130,246,0.12)]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[#64748B] uppercase tracking-wider mb-2">核心技能</p>
                  <div className="flex flex-wrap gap-2">
                    {["项目管理", "活动策划", "AI工具", "数据分析", "PPT制作", "团队协调"].map((s) => (
                      <span key={s} className="px-3 py-1 rounded-full text-xs bg-[rgba(15,23,60,0.6)] text-[#94A3B8] border border-[rgba(59,130,246,0.08)]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Right: Experience */}
              <div>
                <p className="text-xs text-[#64748B] uppercase tracking-wider mb-4">项目经历</p>
                <div className="space-y-4">
                  {projects.slice(0, 3).map((p) => (
                    <div key={p.id} className="p-4 rounded-xl bg-[rgba(15,23,60,0.4)] border border-[rgba(59,130,246,0.08)]">
                      <p className="text-sm font-medium text-[#E2E8F0] mb-1">{p.title}</p>
                      <p className="text-xs text-[#94A3B8]">{p.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Download Button */}
            <div className="mt-10 pt-8 border-t border-[rgba(59,130,246,0.1)] text-center">
              <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#3B82F6] text-white text-sm font-medium hover:bg-[#2563EB] transition-all btn-glow">
                <Download className="w-4 h-4" />
                <span>下载PDF简历</span>
              </button>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Contact Section
   ═══════════════════════════════════════════ */
function ContactSection() {
  return (
    <section id="contact" className="py-20 px-6 relative">
      <div className="absolute inset-0 tech-grid opacity-20" />
      <div className="max-w-3xl mx-auto text-center relative">
        <ScrollAnimation>
          <p className="text-xs tracking-[0.2em] text-[#64748B] uppercase mb-3 font-mono">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#E2E8F0] mb-4">未来合作入口</h2>
          <p className="text-base text-[#94A3B8] mb-12">期待加入重视执行力、学习能力和团队协作的企业，在真实业务中创造价值。</p>
        </ScrollAnimation>

        <ScrollAnimation delay={100}>
          <div className="flex justify-center gap-6 mb-12">
            {[
              { icon: <Mail className="w-5 h-5" />, label: "邮箱" },
              { icon: <Phone className="w-5 h-5" />, label: "电话" },
              { icon: <Linkedin className="w-5 h-5" />, label: "社交" },
            ].map((item) => (
              <button key={item.label} className="group w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-[#94A3B8] hover:text-[#3B82F6] hover:border-[rgba(59,130,246,0.3)] transition-all">
                {item.icon}
              </button>
            ))}
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={200}>
          <div className="mb-8">
            <p className="text-xs text-[#64748B] tracking-widest uppercase mb-4">求职方向</p>
            <div className="flex flex-wrap justify-center gap-3">
              {jobTargets?.map((target) => (
                <span key={target} className="px-5 py-2 rounded-full text-sm border border-[rgba(59,130,246,0.2)] text-[#60A5FA] bg-[rgba(59,130,246,0.05)]">
                  {target}
                </span>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Footer
   ═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-[rgba(59,130,246,0.08)]">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm text-[#94A3B8]">2026 郑一鸣 · AI时代项目人才</p>
        <p className="text-xs text-[#64748B] mt-1 tracking-wider">Project Operations × Business Planning × Product Practice</p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   Main Page
   ═══════════════════════════════════════════ */
export default function Page() {
  return (
    <div className="min-h-screen bg-[#050816] text-[#E2E8F0]">
      <FontPreload />
      <Navigation />
      <HeroSection />
      <div className="section-line" />
      <TimelineSection />
      <div className="section-line" />
      <CapabilitiesSection />
      <div className="section-line" />
      <ProjectsSection />
      <div className="section-line" />
      <MediaGallerySection />
      <div className="section-line" />
      <AIWorkflowSection />
      <div className="section-line" />
      <ResumeSection />
      <div className="section-line" />
      <ContactSection />
      <Footer />
    </div>
  );
}
