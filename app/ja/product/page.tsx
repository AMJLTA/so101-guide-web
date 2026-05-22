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
import { productSpecsJa, siteConfigJa } from '@/lib/site-config-ja'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'LVJIN SERIES · 高性能産業用ロボットアーム',
  description:
    'LVJIN ROBOTICS LVJIN SERIES：可搬質量 10kg、リーチ 1010mm、繰返し位置決め精度 ±0.02mm、IP54 保護等級、任意角度取付。充実したエコシステムと配套学習パスで、製造・教育・研究を一気通貫で支えます。',
  openGraph: {
    title: 'LVJIN SERIES · 高性能産業用ロボットアーム',
    description:
      'LVJIN ROBOTICS LVJIN SERIES：可搬質量 10kg、リーチ 1010mm、繰返し位置決め精度 ±0.02mm。',
    type: 'website',
    locale: 'ja_JP'
  }
}

const industryIcons = { Factory, GraduationCap, Truck, Brain }
type IndustryIconName = keyof typeof industryIcons

const featureIcons = [Zap, Layers, Cpu, PackageOpen]

const whyChoose = [
  {
    icon: Sparkles,
    title: 'LeRobot 互換エコシステム',
    desc: 'LeRobot / HuggingFace に完全対応。コミュニティ主導で継続的に進化します。'
  },
  {
    icon: Brain,
    title: '模倣学習に最適化',
    desc: 'Leader / Follower 双腕構造により、ACT、Diffusion Policy 等のポリシーを実機で簡単にデプロイ可能。'
  },
  {
    icon: GraduationCap,
    title: '配套学習パス',
    desc: '公式 9 章の日本語チュートリアル + エラーベース + AI アシスタント。ハードとソフトをワンストップで提供。'
  },
  {
    icon: Rocket,
    title: '迅速な統合',
    desc: 'シングルケーブル接続 + 任意角度取付 + IP54 保護等級で、生産ライン・実験室の多様なシーンに対応。'
  }
]

const pricingTiers = [
  {
    name: '研究機関向け',
    price: '要相談',
    badge: '大学・研究室向け',
    features: [
      'LVJIN ロボットアーム カスタム版 × 1 セット',
      '完整ファームウェア + 配套ソース',
      'LeRobot 互換構成',
      '平日日本語テクニカルサポート',
      '配套学習パスへのアクセス'
    ],
    highlighted: false
  },
  {
    name: '企業導入',
    price: '要相談',
    badge: '推奨',
    features: [
      'LVJIN ロボットアーム カスタム版 × N セット（要件次第）',
      'マスター / スレーブ双腕遠隔操作キット',
      '産業コントローラ統合（PLC / ROS2）',
      '現地調整 + カスタムエンドエフェクタ',
      '1 年保証 + 優先テクニカルサポート',
      '専属企業研修プラン'
    ],
    highlighted: true
  },
  {
    name: '教育用キット',
    price: '要相談',
    badge: '職業訓練校・研修向け',
    features: [
      'LVJIN ロボットアーム 教育版（教材付）',
      '12 名分の受講者用ワークステーション',
      '4 週間カリキュラム（模倣学習方向）',
      'リモートテクニカル Q&A',
      '配套データセット + 事前学習モデル'
    ],
    highlighted: false
  }
]

export default function ProductPageJa() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <AuroraBackground intensity="normal" withGrid={false} />
          <FloatingOrbs count={4} />

          <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
              <div>
                <Reveal>
                  <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-4 py-1.5 text-xs backdrop-blur-md">
                    <span className="font-mono uppercase tracking-[0.18em] text-primary">
                      {siteConfigJa.brandEn}
                    </span>
                    <span className="h-3 w-px bg-border" />
                    <span className="text-muted-foreground">Industrial Series</span>
                  </div>
                </Reveal>

                <Reveal delay={100}>
                  <h1 className="mt-5 text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                    <ShimmerText>{productSpecsJa.series}</ShimmerText>
                  </h1>
                </Reveal>

                <Reveal delay={200}>
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    {productSpecsJa.tagline}
                  </p>
                  <p className="mt-2 text-2xl font-semibold sm:text-3xl">
                    {productSpecsJa.taglineZh}
                  </p>
                </Reveal>

                <Reveal delay={300}>
                  <p className="mt-5 max-w-xl text-muted-foreground sm:text-lg">
                    スマート製造、教育・研究、身体性 AI 開発に向けた 6 軸産業用ロボットアームです。
                    成熟したエコシステム、高い剛性、任意角度の取付に対応。配套学習パスと組み合わせることで、
                    <span className="text-foreground font-medium">手元に届いた日からポリシーが動くまで</span>を午後一回分に短縮します。
                  </p>
                </Reveal>

                <Reveal delay={400}>
                  <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
                    <Magnetic strength={0.4} range={140}>
                      <Button asChild size="lg" className="h-12 glow-primary px-6">
                        <a href={siteConfigJa.links.inquiry}>
                          <Mail className="mr-1.5 h-4 w-4" />
                          お見積もり
                        </a>
                      </Button>
                    </Magnetic>
                    <Magnetic strength={0.4} range={140}>
                      <Button asChild variant="outline" size="lg" className="h-12">
                        <Link href="/ja/learn">
                          <FileText className="mr-1.5 h-4 w-4" />
                          技術ドキュメント
                        </Link>
                      </Button>
                    </Magnetic>
                    <Magnetic strength={0.4} range={140}>
                      <Button asChild variant="ghost" size="lg" className="h-12">
                        <a href="#specs">
                          仕様を見る
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
                      IP54 保護等級
                    </span>
                    <span>·</span>
                    <span>1 年保証</span>
                    <span>·</span>
                    <span>配套ファームウェア</span>
                    <span>·</span>
                    <span>LeRobot 互換</span>
                  </div>
                </Reveal>
              </div>

              <Reveal direction="scale" delay={400}>
                <div className="relative">
                  <ConicBorder className="rounded-3xl">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-[oklch(0.16_0.018_270)] to-[oklch(0.08_0.012_270)]">
                      <Image
                        src={productSpecsJa.heroImage}
                        alt="LVJIN SERIES 産業用ロボットアーム"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -z-10"
                        style={{
                          background:
                            'radial-gradient(60% 70% at 70% 50%, oklch(from var(--primary) l c h / 0.35) 0%, transparent 70%), radial-gradient(40% 50% at 30% 80%, oklch(from var(--accent) l c h / 0.25) 0%, transparent 70%)'
                        }}
                      />
                      <div className="pointer-events-none absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-success)] opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
                        </span>
                        販売中
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

        {/* KPI SPECS STRIP */}
        <section id="specs" className="relative border-y border-border/40 bg-card/30">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  コアスペック
                </p>
                <a
                  href={siteConfigJa.links.inquiry}
                  className="hidden text-xs text-primary hover:underline sm:inline-flex sm:items-center sm:gap-1"
                >
                  詳細仕様書 PDF
                  <Download className="h-3 w-3" />
                </a>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {productSpecsJa.kpis.map((spec, i) => (
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

        {/* FEATURES */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-14 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                設計のポイント
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                <ShimmerText>高剛性</ShimmerText> · 高精度 · 統合容易
              </h2>
              <p className="mt-4 text-muted-foreground">
                4 つのコアモジュールを協調設計。関節からベースまで、長期間の産業稼働に最適化しています。
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {productSpecsJa.features.map((feature, i) => {
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

        {/* MULTI-VIEW */}
        <section className="relative border-y border-border/40 bg-card/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mb-12 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    マルチビュー
                  </p>
                  <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                    あらゆる角度を<ShimmerText>緻密に設計</ShimmerText>
                  </h2>
                </div>
                <Badge variant="outline" className="border-border/60 font-mono text-[10px] uppercase">
                  Multi-View Display
                </Badge>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
              {productSpecsJa.views.map((view, i) => (
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

        {/* INDUSTRIES */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                適用業界
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                <ShimmerText>4 つの代表シーン</ShimmerText>に対応
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {productSpecsJa.industries.map((industry, i) => {
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

        {/* WHY US */}
        <section className="relative overflow-hidden border-y border-border/40 bg-card/30 py-24">
          <FloatingOrbs count={3} />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mb-12 max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  LVJIN を選ぶ理由
                </p>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  エコシステム + 実践 + <ShimmerText>日本語サポート</ShimmerText>
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

        {/* PRICING */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                ご購入プラン
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                3 つの<ShimmerText>導入プラン</ShimmerText>
              </h2>
              <p className="mt-4 text-muted-foreground">
                いずれのプランにも完整ファームウェア、技術ドキュメント、日本語サポートが含まれます。具体的な価格は営業までお問い合わせください。
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
                    {tier.price === '要相談' ? (
                      <span className="text-muted-foreground">価格は要相談</span>
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
                    <a href={siteConfigJa.links.inquiry}>
                      <Mail className="mr-1.5 h-4 w-4" />
                      お見積もり
                    </a>
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* INQUIRY CTA */}
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
                        生産導入 / 教育用ご購入
                      </Badge>
                      <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                        <ShimmerText>LVJIN SERIES</ShimmerText> を御社の生産ライン / 研究室へ
                      </h2>
                      <p className="mt-4 max-w-xl text-muted-foreground">
                        用途（可搬質量、タクトタイム、エンドエフェクタ種別、台数）をお知らせください。1 営業日以内に
                        お見積もり、納期、技術提案をご返信します。大量導入・教育機関向けの割引もご用意しています。
                      </p>
                      <ul className="mt-6 space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[var(--color-success)]" />
                          現地デモ・訪問評価に対応
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[var(--color-success)]" />
                          システムインテグレータ様向けに BOM・3D モデルを提供
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[var(--color-success)]" />
                          標準 1 年保証 + 延長保証オプション
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col gap-3">
                      <Magnetic strength={0.4} range={120}>
                        <Button asChild size="lg" className="h-12 w-full glow-primary">
                          <a href={siteConfigJa.links.inquiry}>
                            <Mail className="mr-2 h-4 w-4" />
                            メールでお見積もり
                          </a>
                        </Button>
                      </Magnetic>
                      <Magnetic strength={0.4} range={120}>
                        <Button asChild size="lg" variant="outline" className="h-12 w-full">
                          <a href="tel:+8610-0000-0000">
                            <Phone className="mr-2 h-4 w-4" />
                            電話でお問い合わせ
                          </a>
                        </Button>
                      </Magnetic>
                      <Magnetic strength={0.4} range={120}>
                        <Button asChild size="lg" variant="ghost" className="h-12 w-full">
                          <Link href="/ja/learn">
                            <FileText className="mr-2 h-4 w-4" />
                            まず技術ドキュメントを見る
                          </Link>
                        </Button>
                      </Magnetic>
                      <p className="mt-2 text-center text-[11px] text-muted-foreground">
                        営業時間 平日 09:00–18:00 ／ 祝日はメール返信
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
