'use client'

import { BookOpen, Clock, Sparkles, Trophy } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Reveal, SpotlightCard } from '@/components/effects'
import { useChapterStats } from '@/lib/use-progress'

export function LearnStats() {
  const { total, completed, inProgress, locked, totalMinutes, totalProgress } =
    useChapterStats()

  const cards = [
    {
      icon: BookOpen,
      label: '总课程数',
      value: total,
      bg: 'bg-primary/10',
      color: 'text-primary'
    },
    {
      icon: Trophy,
      label: '已完成',
      value: completed,
      bg: 'bg-success/10',
      color: 'text-[var(--color-success)]'
    },
    {
      icon: Clock,
      label: '预计时长',
      value: `${totalMinutes} 分钟`,
      bg: 'bg-accent/10',
      color: 'text-accent'
    }
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((stat, i) => (
        <Reveal key={stat.label} delay={i * 60}>
          <SpotlightCard className="rounded-xl">
            <Card className="border-border/60 bg-card/60">
              <CardContent className="flex items-center gap-4 p-5">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg}`}
                >
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold leading-none">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </SpotlightCard>
        </Reveal>
      ))}

      <Reveal delay={180}>
        <SpotlightCard className="rounded-xl">
          <Card className="border-border/60 bg-card/60">
            <CardContent className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                  总体进度
                </p>
                <p className="text-sm font-medium">{totalProgress}%</p>
              </div>
              <Progress value={totalProgress} className="h-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                {inProgress} 个学习中 · {locked} 个未开始
              </p>
            </CardContent>
          </Card>
        </SpotlightCard>
      </Reveal>
    </div>
  )
}
