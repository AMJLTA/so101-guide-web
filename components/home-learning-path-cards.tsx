'use client'

import Link from 'next/link'
import {
  Bot,
  Brain,
  Cpu,
  Database,
  HelpCircle,
  Rocket,
  Settings,
  Sparkles,
  Zap
} from 'lucide-react'
import { Reveal, TiltCard } from '@/components/effects'
import { useChapters } from '@/lib/use-progress'

const stepIcons = [Brain, Cpu, Settings, Database, Sparkles, Rocket, HelpCircle, Bot, Zap]

export function HomeLearningPathCards() {
  const { chapters } = useChapters()
  const learningPath = chapters.slice(0, 6)

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {learningPath.map((chapter, index) => {
        const Icon = stepIcons[index % stepIcons.length]
        return (
          <Reveal key={chapter.id} delay={index * 60}>
            <Link
              href={`/learn/${chapter.id}`}
              className="group relative block"
            >
              <TiltCard
                spotlight
                maxTilt={6}
                className="h-full overflow-hidden rounded-xl border border-border/60 bg-card/60"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 font-mono text-base font-bold text-primary ring-1 ring-border/60 transition-all group-hover:scale-110">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-primary" />
                        <h3 className="truncate font-semibold">{chapter.title}</h3>
                      </div>
                      <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                        {chapter.description}
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{chapter.duration}</span>
                        <span>·</span>
                        <span>
                          {chapter.status === 'completed'
                            ? '已完成 ✓'
                            : chapter.status === 'in-progress'
                              ? '学习中'
                              : '未开始'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Link>
          </Reveal>
        )
      })}
    </div>
  )
}
