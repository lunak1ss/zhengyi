# AGENTS.md

## 项目概览

郑一鸣「AI时代复合型内容运营与项目执行人才」求职作品集，单页应用，深色科技主题，模块化设计。

定位：面向HR、招聘负责人、企业管理者，30秒内建立"能力强、执行力强、有AI时代竞争力"的印象。

## 技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI**: shadcn/ui + Tailwind CSS 4
- **Icons**: lucide-react
- **Images**: next/image
- **Fonts**: Noto Serif SC (中文标题) + Inter (正文/英文)

## 设计风格

- **深色科技主题**：背景 #050816，玻璃拟态卡片，微弱渐变光效
- **粒子网络动画**：浮动光点 + 连线（蓝白色）
- **网格背景**：48px 网格线 + 点阵
- **动画**：Hero入场动画、滚动触发、时间轴节点逐个亮起、卡片悬停发光

## 目录结构

```
src/
├── app/
│   ├── globals.css          # 深色主题变量、玻璃拟态、动画定义
│   ├── layout.tsx           # 根布局
│   └── page.tsx             # 主页面（所有 Section 组件）
├── components/
│   ├── font-preload.tsx     # 字体预连接组件
│   ├── scroll-animation.tsx # 滚动触发动画组件 (IntersectionObserver)
│   ├── particle-network.tsx # Canvas 粒子网络动画组件（深色适配）
│   └── ui/                  # shadcn/ui 组件库
└── hooks/
    └── use-scroll-animation.ts
public/
└── images/                  # 9张项目真实图片
```

## 页面结构

1. **Navigation** — 固定顶部导航，深色毛玻璃效果，滚动时加深
2. **HeroSection** — 左右分栏：左侧个人信息+能力标签，右侧动态视觉区域（同心圆+视差），底部3个能力星级卡
3. **TimelineSection** — "我的成长路径"时间轴，5个节点（2022-2026），滚动时逐个亮起
4. **CapabilitiesSection** — 6个核心能力卡片矩阵（项目策划/AI工具/内容创作/数据分析/PPT表达/沟通协作）
5. **ProjectsSection** — 4分类作品大厅（全部/商业策划/活动策划/AI应用），卡片网格，点击打开详情弹窗
6. **AIWorkflowSection** — "AI时代个人工作流"流程图 + 数据统计 + 6步工作方法
7. **ResumeSection** — 简历卡片（个人信息+教育背景+技能标签+项目经历+下载按钮）
8. **ContactSection** — 联系图标 + 求职方向标签
9. **Footer** — 页脚

## 项目详情弹窗

点击项目卡片打开 ProjectDetail 组件，统一结构：
- 封面大图 → 项目背景 → 我的角色 → 关键行动 → 执行流程 → 项目成果 → 项目展示图 → 能力标签

## 图片绑定

| 图片 | 用途 |
|------|------|
| 00_个人工作方法_v1 | 首页工作方法模块 + AI工作流项目封面 |
| 01_挑战杯_项目主视觉_v1 | 挑战杯项目封面 |
| 01_挑战杯_获奖证明_v1 | 挑战杯项目详情展示 |
| 01_挑战杯_学校报道_v1 | 挑战杯项目详情展示 |
| 02_为你撑伞_项目主视觉_v1 | 为你撑伞项目封面 |
| 02_为你撑伞_项目数据卡_v1 | 为你撑伞项目详情展示 |
| 02_为你撑伞_运营流程图_v1 | 为你撑伞项目详情展示 |
| 03_AI家教_产品主视觉_v1 | AI家教项目封面 |
| 03_AI家教_Codex开发截图_v1 | AI家教项目详情展示 |

## 配色方案

| 角色 | 色值 |
|------|------|
| 主背景 | `#050816` |
| 卡片背景 | `rgba(15, 23, 60, 0.5)` |
| 主文字 | `#E2E8F0` |
| 次级文字 | `#94A3B8` |
| 辅助文字 | `#64748B` |
| 主蓝 | `#3B82F6` |
| 浅蓝 | `#60A5FA` |
| 紫色点缀 | `#8B5CF6` |
| 边框 | `rgba(59, 130, 246, 0.12)` |

## 开发命令

```bash
pnpm dev          # 开发环境
pnpm build        # 生产构建
pnpm ts-check     # TypeScript 检查
pnpm lint         # ESLint 检查
```
