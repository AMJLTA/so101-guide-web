'use client'

import { AnimatedCounter } from '@/components/animated-counter'
import { Reveal, ShimmerText, SpotlightCard } from '@/components/effects'
import { useChapterStats } from '@/lib/use-progress'

export function HeroStats({ errorCount = 30 }: { errorCount?: number }) {
  const { total, totalProgress, totalMinutes } = useChapterStats()

  const stats = [
    { label: '总章节', value: total, suffix: ' 章' },
    { label: '预计时长', value: totalMinutes, suffix: ' 分钟' },
    { label: '完成率', value: totalProgress, suffix: '%' },
    { label: '错误条目', value: errorCount, suffix: '+' }
  ]

  return (
    <Reveal delay={1200}>
      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
        {stats.map((stat) => (
          <SpotlightCard
            key={stat.label}
            className="rounded-2xl border border-border/60 bg-card/60 px-4 py-4 text-left backdrop-blur-md transition-colors hover:border-primary/30"
          >
            <div className="text-2xl font-bold tracking-tight sm:text-3xl">
              <ShimmerText>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </ShimmerText>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
          </SpotlightCard>
        ))}
      </div>
    </Reveal>
  )
}
