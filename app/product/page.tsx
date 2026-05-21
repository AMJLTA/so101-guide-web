import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  Brain,
  CheckCircle2,
  Cpu,
  Download,
  Factory,
  FileText,
  GraduationCap,
  Layers,
  Mail,
  PackageOpen,
  Phone,
  Rocket,
  Shield,
  Sparkles,
  Truck,
  Zap
} from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  AuroraBackground,
  ConicBorder,
  FloatingOrbs,
  GlowBeam,
  Magnetic,
  Reveal,
  ShimmerText,
  SpotlightCard,
  TiltCard
} from '@/components/effects'
import { productSpecs, siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'LVJIN SERIES · 高性能工业机械臂',
  description:
    'LVJIN ROBOTICS LVJIN SERIES：负载 10kg、臂展 1010mm、重复定位精度 ±0.02mm、IP54 防护、任意角度安装。开源生态 + 完整学习路径，工业、教育、科研一站式落地。',
  openGraph: {
    title: 'LVJIN SERIES · 高性能工业机械臂',
    description:
      'LVJIN ROBOTICS LVJIN SERIES：负载 10kg、臂展 1010mm、重复定位精度 ±0.02mm。',
    type: 'website'
  }
}

const industryIcons = { Factory, GraduationCap, Truck, Brain }
type IndustryIconName = keyof typeof industryIcons

const featureIcons = [Zap, Layers, Cpu, PackageOpen]

const whyChoose = [
  {
    icon: Sparkles,
    title: '开源生态',
    desc: 'LeRobot / HuggingFace 完整兼容，社区驱动持续演进'
  },
  {
    icon: Brain,
    title: '为模仿学习而生',
    desc: 'Leader/Follower 双臂结构，原生支持 ACT、Diffusion Policy 等算法部署'
  },
  {
    icon: GraduationCap,
    title: '配套学习路径',
    desc: '官方 9 章中文教程 + 错误库 + AI 助手，硬件 + 软件一站式'
  },
  {
    icon: Rocket,
    title: '快速集成',
    desc: '单线接入 + 任意角度安装 + IP54 防护，适配产线 / 实验室多种场景'
  }
]

const pricingTiers = [
  {
    name: '科研定制',
    price: '咨询',
    badge: '面向高校 / 实验室',
    features: [
      'LVJIN 机械臂定制版 ×1 套',
      '完整开源固件 + 源码',
      'LeRobot 兼容配置',
      '中文技术支持（工作日）',
      '配套学习路径访问'
    ],
    highlighted: false
  },
  {
    name: '企业集成',
    price: '咨询',
    badge: '推荐',
    features: [
      'LVJIN 机械臂定制版 ×N 套（按需）',
      '主从双臂遥操作套件',
      '工业控制器集成（PLC / ROS2）',
      '现场调试 + 定制末端执行器',
      '一年保修 + 优先技术支持',
      '专属企业培训方案'
    ],
    highlighted: true
  },
  {
    name: '教育套件',
    price: '咨询',
    badge: '面向职校 / 培训',
    features: [
      'LVJIN 机械臂教学版（含教材）',
      '12 套学员工位配置',
      '4 周课程包（模仿学习方向）',
      '远程技术答疑',
      '配套数据集 + 预训练模型'
    ],
    highlighted: false
  }
]

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* ═══════════════ HERO ═══════════════ */}
        <section className="relative overflow-hidden">
          <AuroraBackground intensity="normal" withGrid={false} />
          <FloatingOrbs count={4} />

          <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
              <div>
                <Reveal>
                  <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-4 py-1.5 text-xs backdrop-blur-md">
                    <span className="font-mono uppercase tracking-[0.18em] text-primary">
                      {siteConfig.brandEn}
                    </span>
                    <span className="h-3 w-px bg-border" />
                    <span className="text-muted-foreground">Industrial Series</span>
                  </div>
                </Reveal>

                <Reveal delay={100}>
                  <h1 className="mt-5 text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                    <ShimmerText>{productSpecs.series}</ShimmerText>
                  </h1>
                </Reveal>

                <Reveal delay={200}>
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    {productSpecs.tagline}
                  </p>
                  <p className="mt-2 text-2xl font-semibold sm:text-3xl">
                    {productSpecs.taglineZh}
                  </p>
                </Reveal>

                <Reveal delay={300}>
                  <p className="mt-5 max-w-xl text-muted-foreground sm:text-lg">
                    面向智能制造、教育科研与具身智能研发的 6 轴工业机械臂。
                    开源生态、稳定刚体、可在任意角度安装，搭配本站完整学习路径，
                    让你<span className="text-foreground font-medium">从拿到机器到跑通策略</span>只需一个下午。
                  </p>
                </Reveal>

                <Reveal delay={400}>
                  <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
                    <Magnetic strength={0.4} range={140}>
                      <Button asChild size="lg" className="h-12 glow-primary px-6">
                        <a href={siteConfig.links.inquiry}>
                          <Mail className="mr-1.5 h-4 w-4" />
                          获取报价
                        </a>
                      </Button>
                    </Magnetic>
                    <Magnetic strength={0.4} range={140}>
                      <Button asChild variant="outline" size="lg" className="h-12">
                        <Link href="/learn">
                          <FileText className="mr-1.5 h-4 w-4" />
                          技术文档
                        </Link>
                      </Button>
                    </Magnetic>
                    <Magnetic strength={0.4} range={140}>
                      <Button asChild variant="ghost" size="lg" className="h-12">
                        <a href="#specs">
                          查看规格
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </a>
                      </Button>
                    </Magnetic>
                  </div>
                </Reveal>

                <Reveal delay={500}>
                  <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Shield className="h-3 w-3 text-[var(--color-success)]" />
                      IP54 防护
                    </span>
                    <span>·</span>
                    <span>一年质保</span>
                    <span>·</span>
                    <span>开源固件</span>
                    <span>·</span>
                    <span>LeRobot 兼容</span>
                  </div>
                </Reveal>
              </div>

              <Reveal direction="scale" delay={400}>
                <div className="relative">
                  <ConicBorder className="rounded-3xl">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-[oklch(0.16_0.018_270)] to-[oklch(0.08_0.012_270)]">
                      {/* 产品图 — 用户右键保存附图到 public/lvjin-so101-hero.png 后自动出现 */}
                      <Image
                        src={productSpecs.heroImage}
                        alt="LVJIN SERIES 工业机械臂"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover"
                      />
                      {/* 背景渐变（图未加载时的备用视觉） */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -z-10"
                        style={{
                          background:
                            'radial-gradient(60% 70% at 70% 50%, oklch(from var(--primary) l c h / 0.35) 0%, transparent 70%), radial-gradient(40% 50% at 30% 80%, oklch(from var(--accent) l c h / 0.25) 0%, transparent 70%)'
                        }}
                      />
                      {/* 浮动信息标签 */}
                      <div className="pointer-events-none absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-success)] opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
                        </span>
                        在售
                      </div>
                      <div className="pointer-events-none absolute bottom-4 right-4 z-10 rounded-md bg-black/45 px-2.5 py-1 font-mono text-[10px] text-white/70 backdrop-blur">
                        LVJIN / SO-101
                      </div>
                    </div>
                  </ConicBorder>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════ KPI SPECS STRIP ═══════════════ */}
        <section id="specs" className="relative border-y border-border/40 bg-card/30">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  核心规格
                </p>
                <a
                  href={siteConfig.links.inquiry}
                  className="hidden text-xs text-primary hover:underline sm:inline-flex sm:items-center sm:gap-1"
                >
                  完整规格书 PDF
                  <Download className="h-3 w-3" />
                </a>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {productSpecs.kpis.map((spec, i) => (
                <Reveal key={spec.en} delay={i * 70}>
                  <SpotlightCard className="rounded-xl">
                    <div className="rounded-xl border border-border/60 bg-card/60 px-4 py-5">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {spec.en}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{spec.label}</p>
                      <p className="mt-3 text-3xl font-bold tracking-tight">
                        <ShimmerText>{spec.value}</ShimmerText>
                        {spec.unit && (
                          <span className="ml-1 text-base font-medium text-muted-foreground">
                            {spec.unit}
                          </span>
                        )}
                      </p>
                    </div>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ FEATURES ═══════════════ */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-14 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                设计亮点
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                <ShimmerText>稳定刚体</ShimmerText> · 高精度 · 可集成
              </h2>
              <p className="mt-4 text-muted-foreground">
                四大核心模组协同设计，从关节到底座每一处都为长期工业运行而优化。
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {productSpecs.features.map((feature, i) => {
              const Icon = featureIcons[i % featureIcons.length]
              return (
                <Reveal key={feature.title} delay={i * 80}>
                  <TiltCard
                    spotlight
                    maxTilt={5}
                    className="h-full rounded-2xl border border-border/60 bg-card/60"
                  >
                    <div className="flex h-full flex-col gap-3 p-6">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 ring-1 ring-border/60">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary/80">
                        {feature.titleEn}
                      </p>
                      <p className="text-sm font-medium text-foreground/80">
                        {feature.description}
                      </p>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {feature.detail}
                      </p>
                    </div>
                  </TiltCard>
                </Reveal>
              )
            })}
          </div>
        </section>

        <GlowBeam />

        {/* ═══════════════ MULTI-VIEW ═══════════════ */}
        <section className="relative border-y border-border/40 bg-card/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mb-12 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    多视图展示
                  </p>
                  <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                    每一个角度都<ShimmerText>经过推敲</ShimmerText>
                  </h2>
                </div>
                <Badge variant="outline" className="border-border/60 font-mono text-[10px] uppercase">
                  Multi-View Display
                </Badge>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
              {productSpecs.views.map((view, i) => (
                <Reveal key={view.en} delay={i * 80}>
                  <SpotlightCard className="rounded-2xl">
                    <Card className="border-border/60 bg-card/60 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-[oklch(0.18_0.02_270)] to-[oklch(0.08_0.01_270)]">
                          <Image
                            src={view.src}
                            alt={view.label}
                            fill
                            sizes="(max-width: 640px) 50vw, 25vw"
                            className="object-contain p-4"
                          />
                          <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0"
                            style={{
                              background:
                                'radial-gradient(50% 60% at 50% 50%, oklch(from var(--primary) l c h / 0.15) 0%, transparent 70%)'
                            }}
                          />
                        </div>
                        <div className="p-3 text-center">
                          <p className="text-sm font-semibold">{view.label}</p>
                          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                            {view.en}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ INDUSTRIES ═══════════════ */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                行业应用
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                覆盖<ShimmerText>四大典型场景</ShimmerText>
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {productSpecs.industries.map((industry, i) => {
              const Icon = industryIcons[industry.icon as IndustryIconName] ?? Factory
              return (
                <Reveal key={industry.title} delay={i * 70}>
                  <TiltCard
                    spotlight
                    maxTilt={5}
                    className="h-full rounded-2xl border border-border/60 bg-card/60"
                  >
                    <div className="flex h-full flex-col gap-3 p-6">
                      <Icon className="h-7 w-7 text-primary" />
                      <h3 className="text-lg font-semibold">{industry.title}</h3>
                      <p className="text-sm text-muted-foreground">{industry.desc}</p>
                    </div>
                  </TiltCard>
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* ═══════════════ WHY US ═══════════════ */}
        <section className="relative overflow-hidden border-y border-border/40 bg-card/30 py-24">
          <FloatingOrbs count={3} />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mb-12 max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  为什么选 LVJIN
                </p>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  开源 + 实战 + <ShimmerText>本地化支持</ShimmerText>
                </h2>
              </div>
            </Reveal>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {whyChoose.map((item, i) => (
                <Reveal key={item.title} delay={i * 80}>
                  <ConicBorder className="h-full rounded-2xl">
                    <div className="relative flex h-full flex-col gap-3 rounded-2xl border border-border/40 bg-card/80 backdrop-blur p-6">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 ring-1 ring-border/60">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-base font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </ConicBorder>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ PRICING ═══════════════ */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                购买方案
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                三种<ShimmerText>采购套餐</ShimmerText>
              </h2>
              <p className="mt-4 text-muted-foreground">
                所有方案均提供开源固件、技术文档与中文支持。具体价格请联系销售获取最新报价单。
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            {pricingTiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 100}>
                <div
                  className={cn(
                    'relative h-full rounded-2xl border bg-card/60 p-7 transition-all',
                    tier.highlighted
                      ? 'border-primary/50 shadow-xl shadow-primary/10'
                      : 'border-border/60'
                  )}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        <Sparkles className="mr-1 h-3 w-3" />
                        {tier.badge}
                      </Badge>
                    </div>
                  )}
                  {!tier.highlighted && (
                    <Badge variant="outline" className="border-border/60 text-[10px]">
                      {tier.badge}
                    </Badge>
                  )}
                  <h3 className="mt-4 text-2xl font-bold">{tier.name}</h3>
                  <p className="mt-2 text-3xl font-bold tracking-tight">
                    {tier.price === '咨询' ? (
                      <span className="text-muted-foreground">价格面议</span>
                    ) : (
                      tier.price
                    )}
                  </p>
                  <Separator className="my-5" />
                  <ul className="space-y-2.5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    size="lg"
                    variant={tier.highlighted ? 'default' : 'outline'}
                    className={cn('mt-7 w-full', tier.highlighted && 'glow-primary')}
                  >
                    <a href={siteConfig.links.inquiry}>
                      <Mail className="mr-1.5 h-4 w-4" />
                      获取报价
                    </a>
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══════════════ INQUIRY CTA ═══════════════ */}
        <section className="relative overflow-hidden border-t border-border/40">
          <FloatingOrbs count={4} />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <Reveal direction="scale">
              <ConicBorder className="rounded-3xl">
                <Card className="relative overflow-hidden rounded-3xl border-0 bg-gradient-to-br from-primary/5 via-background to-accent/5">
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-12 top-0 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
                    <div className="absolute -right-12 bottom-0 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
                  </div>
                  <CardContent className="relative grid gap-8 p-10 sm:p-14 lg:grid-cols-[1.4fr_1fr] lg:items-center">
                    <div>
                      <Badge
                        variant="outline"
                        className="border-primary/40 bg-primary/10 text-primary"
                      >
                        <Bot className="mr-1 h-3 w-3" />
                        准备投产 / 教学采购
                      </Badge>
                      <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                        把 <ShimmerText>LVJIN SERIES</ShimmerText> 带回你的产线 / 实验室
                      </h2>
                      <p className="mt-4 max-w-xl text-muted-foreground">
                        告诉我们你的应用场景（负载、节拍、末端类型、数量），我们 1 个工作日内
                        返回报价、交付周期与技术方案。批量与教育采购另有折扣。
                      </p>
                      <ul className="mt-6 space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[var(--color-success)]" />
                          支持现场演示与上门评估
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[var(--color-success)]" />
                          提供完整 BOM 与 3D 模型给集成商
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[var(--color-success)]" />
                          一年标准质保 + 可选延保服务
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col gap-3">
                      <Magnetic strength={0.4} range={120}>
                        <Button asChild size="lg" className="h-12 w-full glow-primary">
                          <a href={siteConfig.links.inquiry}>
                            <Mail className="mr-2 h-4 w-4" />
                            邮件询价
                          </a>
                        </Button>
                      </Magnetic>
                      <Magnetic strength={0.4} range={120}>
                        <Button asChild size="lg" variant="outline" className="h-12 w-full">
                          <a href="tel:+8610-0000-0000">
                            <Phone className="mr-2 h-4 w-4" />
                            电话咨询
                          </a>
                        </Button>
                      </Magnetic>
                      <Magnetic strength={0.4} range={120}>
                        <Button asChild size="lg" variant="ghost" className="h-12 w-full">
                          <Link href="/learn">
                            <FileText className="mr-2 h-4 w-4" />
                            先看技术文档
                          </Link>
                        </Button>
                      </Magnetic>
                      <p className="mt-2 text-center text-[11px] text-muted-foreground">
                        服务时间 工作日 09:00–18:00 · 节假日 邮件回复
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </ConicBorder>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
