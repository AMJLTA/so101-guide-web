# SO101 Imitation Learning Guide

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)

> 从环境配置到 ACT 模型部署的具身智能实战学习平台。

一个为初学者打造的中文学习手册：把 LeRobot + SO101 + ACT 的完整工作流拆成可执行的章节、可复制的命令和可搜索的错误库。

## ✨ 核心特性

- 🎓 **9 章渐进式课程**：从模仿学习概念到 ACT 推理部署，每章配学习目标、原理、操作步骤、命令与检查点
- 🔎 **全站命令面板 `⌘K / /`**：跨章节、错误、页面快速跳转
- 🧯 **错误诊断知识库**：按环境 / 硬件 / 数据 / 训练 / 推理 5 类分组的常见报错与修复命令
- 🤖 **AI 助手**：内置规则匹配引擎，对话历史保存在 `localStorage`
- 📚 **术语表与资源中心**：模仿学习术语、论文、视频、代码仓库
- 🌗 **明亮 / 暗色双主题**：基于 `next-themes` 与 OKLCH 调色板
- 📈 **章节阅读进度条 + 浮动目录 (TOC)**：长文章节阅读体验
- 🚀 **完备 SEO**：Metadata、动态 OG 图（`next/og`）、`sitemap.xml`、`robots.txt`
- 🎨 **Tailwind v4 设计系统**：`@theme` 自定义 tokens、网格背景、流光、辉光等多种装饰

## 🗂 项目结构

```
app/
├── layout.tsx              # 根布局 · 主题、Toaster、命令面板、回到顶部
├── page.tsx                # 首页 · Hero、特性、学习路径、工作流、FAQ
├── learn/
│   ├── page.tsx            # 学习路径 · 状态/搜索筛选
│   └── [id]/page.tsx       # 章节详情 · 面包屑、TOC、阅读进度
├── diagnose/page.tsx       # 报错诊断 · 分类、相关错误
├── assistant/page.tsx      # AI 助手 · localStorage 历史、Markdown 渲染
├── glossary/page.tsx       # 术语表
├── resources/page.tsx      # 资源中心
├── about/page.tsx          # 关于
├── opengraph-image.tsx     # 动态 OG 预览图
├── sitemap.ts / robots.ts  # SEO
├── not-found.tsx / error.tsx / loading.tsx
└── globals.css

components/
├── header.tsx              # 顶栏 · logo、导航、搜索、主题切换
├── footer.tsx              # 站点页脚
├── chapter-card.tsx        # 章节卡片
├── chapter-filter.tsx      # 章节筛选 (client)
├── chapter-toc.tsx         # 章节 TOC (client)
├── code-block.tsx          # 代码块 · 终端样式 + 复制
├── chat-message-renderer.tsx # Markdown / 表格 / 代码块渲染
├── command-palette.tsx     # ⌘K 全站搜索
├── reading-progress.tsx    # 顶部阅读进度
├── scroll-to-top.tsx       # 浮动回到顶部
├── theme-provider.tsx / theme-toggle.tsx
├── animated-counter.tsx    # 视口内数字滚动
├── hero-background.tsx     # 网格 + 雾化背景
└── ui/                     # shadcn/ui 基础组件

lib/
├── course-data.ts          # 章节、错误、AI 回复源数据
├── glossary.ts             # 术语表
├── resources.ts            # 学习资源
├── site-config.ts          # 站点常量与导航
├── types.ts                # 全局 TypeScript 类型
└── utils.ts                # cn() 工具
```

## 🚀 开发

```bash
# 安装依赖（任选其一）
pnpm install   # 推荐：仓库自带 pnpm-lock
npm install

# 启动开发服务器
pnpm dev       # http://localhost:3000

# 生产构建
pnpm build && pnpm start
```

## 🛠 升级日志（本次大版本）

### 🔴 关键 Bug 修复

- 修复 `components/header.tsx` 中非法 Tailwind 类 `h-17 w-27`，logo 正确显示
- 清理仓库根目录冗余的 `header.tsx / layout.tsx / page.tsx` 补丁副本
- 移除已被实际目录覆盖的 `so101-patches/` 与 `styles/`
- 修复 `layout.tsx` 中暴露 AI 痕迹的 `generator: 'v0.app'`
- 修复 Footer 硬编码 `© 2024` → 自动获取当前年份

### 🏗 架构与工程

- 抽离 `lib/site-config.ts` 作为全站常量来源
- 完整 `Metadata` + `Viewport`：OpenGraph、Twitter、robots、canonical、主题色
- 新增 `app/sitemap.ts`、`app/robots.ts`
- 新增 `app/opengraph-image.tsx` —— 用 `next/og` 动态生成 1200×630 社交卡片
- 新增全局 `not-found.tsx / error.tsx / loading.tsx`

### 🎨 设计系统

- `app/globals.css` 全面重写：
  - 双主题（明亮 / 深色）OKLCH 色板
  - 新增 `success / warning` token
  - 网格背景、雾化背景、流光、辉光、淡入上升等动画
  - 优化字体特性、滚动条、选区配色
  - `prefers-reduced-motion` 兼容
- 全站接入 `next-themes`，新增 `<ThemeToggle />`

### 📦 新增组件

| 组件 | 作用 |
|------|------|
| `Header` | 滚动渐变、品牌副标题、桌面命令面板按钮 |
| `Footer` | 多列站点地图、品牌、年份动态 |
| `CommandPalette` | `⌘K / Ctrl+K / /` 全站搜索（章节、错误、导航） |
| `ScrollToTop` | 浮动按钮，>480px 显示 |
| `ReadingProgress` | 顶部 3px 阅读进度条（章节页） |
| `ChapterToc` | 章节内浮动目录，配合 IntersectionObserver 高亮 |
| `ChapterFilter` | 客户端状态/关键字筛选 + 计数徽章 |
| `ChatMessageRenderer` | Markdown / 表格 / 代码块（含复制按钮）渲染 |
| `CodeBlock` | macOS 风格终端样式 + 提示符高亮 + Toast 复制反馈 |
| `AnimatedCounter` | 视口可见后启动的数字滚动 |
| `HeroBackground` | 多层径向 + 网格 mask |

### 📝 页面重写

- **首页**：新 Hero（动画背景 + 渐变文字 + 实时章节统计 + 多 CTA），特性区，路径卡片接 `lib/course-data`，工作流图 + 终端命令演示，FAQ Accordion，CTA
- **学习路径页**：状态徽章统计 + 客户端筛选（状态 × 关键词）
- **章节详情页**：面包屑导航 + Reading Progress + 浮动 TOC + 步骤时间轴 + 上下章预览卡
- **诊断页**：分类筛选 + 详情/列表布局 + 相关错误跳转 + URL 参数携带 (`?q=...`) + 一键跳到 AI 助手
- **AI 助手**：`localStorage` 对话历史持久化 + 新对话 / 清空 + Markdown 渲染 + 代码块复制 + URL 携带初始问题
- **关于页**：3 阶段时间轴 + 技术栈卡片 + 目标用户清单 + 联系入口
- **新增术语表 (`/glossary`)**：分类筛选、搜索、相关跳转
- **新增资源中心 (`/resources`)**：分类筛选、搜索、外链卡片

### 📚 内容扩展

- 错误库新增 NaN loss、训练过慢、推理延迟、wandb 登录、视频解码等条目，并加入 `category` / `related` 字段
- 16 条模仿学习术语（概念 / 算法 / 硬件 / 框架 / 数据 五类）
- 12 条精选学习资源（论文 / 文档 / 视频 / 社区 / 硬件 / 代码 六类）

## 📜 版权

© 绿晋科技 · 保留所有权利
