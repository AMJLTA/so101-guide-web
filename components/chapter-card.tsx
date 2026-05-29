'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowRight, BookOpen, CheckCircle2, Clock, Gamepad2, Lock, Play } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { TiltCard } from '@/components/effects/tilt-card'
import { useProgress, applyUserProgress } from '@/lib/use-progress'
import { hasLesson } from '@/lib/lessons'
import { cn } from '@/lib/utils'
import type { Chapter } from '@/lib/types'

interface ChapterCardProps {
  chapter: Chapter
}

const i18n = {
  zh: {
    completed: '已完成',
    inProgress: '学习中',
    locked: '未开始',
    progress: '学习进度',
    startLearning: '开始学习',
    review: '复习本章',
    continue: '继续学习',
    playLesson: '🎮 开始互动课',
    viewArticle: '📚 文档',
    lessonBadge: '互动课'
  },
  ja: {
    completed: '完了',
    inProgress: '進行中',
    locked: '未開始',
    progress: '学習進捗',
    startLearning: '学習を始める',
    review: 'この章を復習',
    continue: '学習を続ける',
    playLesson: '🎮 インタラクティブ',
    viewArticle: '📚 文書',
    lessonBadge: 'Interactive'
  }
}

export function ChapterCard({ chapter: baseChapter }: ChapterCardProps) {
  const pathname = usePathname()
  const router = useRouter()
  const isJa = pathname?.startsWith('/ja') ?? false
  const t = isJa ? i18n.ja : i18n.zh
  const learnBase = isJa ? '/ja/learn' : '/learn'
  // Interactive lessons are CN-only for now. JP keeps article-only.
  const supportsLesson = !isJa && hasLesson(baseChapter.id)
  const primaryHref = supportsLesson
    ? `${learnBase}/${baseChapter.id}/play`
    : `${learnBase}/${baseChapter.id}`
  const articleHref = `${learnBase}/${baseChapter.id}`

  const statusConfig = {
    completed: {
      icon: CheckCircle2,
      label: t.completed,
      badge:
        'bg-success/10 text-[var(--color-success)] border-[oklch(from_var(--success)_l_c_h/0.3)]',
      ring: 'hover:border-[oklch(from_var(--success)_l_c_h/0.4)] hover:shadow-[var(--color-success)]/10'
    },
    'in-progress': {
      icon: Play,
      label: t.inProgress,
      badge: 'bg-primary/10 text-primary border-primary/30',
      ring: 'hover:border-primary/50 hover:shadow-primary/10'
    },
    locked: {
      icon: Lock,
      label: t.locked,
      badge: 'bg-muted text-muted-foreground border-border',
      ring: 'hover:border-primary/40 hover:shadow-primary/5'
    }
  } as const

  const { map } = useProgress()
  const chapter = applyUserProgress(baseChapter, map)
  const status = statusConfig[chapter.status]
  const StatusIcon = status.icon
  const isFresh = chapter.status === 'locked'

  return (
    <Link
      href={primaryHref}
      className="group block"
    >
      <TiltCard
        spotlight
        maxTilt={5}
        scale={1.01}
        className={cn(
          'h-full overflow-hidden rounded-xl border border-border/60 bg-card/60 transition-colors duration-300',
          isFresh && 'border-border/40',
          status.ring
        )}
      >
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

        <CardContent className="relative flex h-full flex-col p-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <Badge variant="outline" className={cn('text-xs font-medium', status.badge)}>
                <StatusIcon className="mr-1 h-3 w-3" />
                {status.label}
              </Badge>
              {supportsLesson && (
                <Badge
                  variant="outline"
                  className="border-accent/40 bg-accent/10 text-[10px] text-accent"
                >
                  <Gamepad2 className="mr-0.5 h-2.5 w-2.5" />
                  {t.lessonBadge}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {chapter.duration}
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-accent/15 font-mono text-sm font-semibold text-primary ring-1 ring-border/60 transition-transform group-hover:scale-110">
              {String(chapter.id).padStart(2, '0')}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold leading-snug">{chapter.title}</h3>
              <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground/80">
                {chapter.titleEn}
              </p>
            </div>
          </div>

          <p className="mt-3 line-clamp-2 flex-1 text-sm text-muted-foreground">
            {chapter.description}
          </p>

          <div className="mt-5 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{t.progress}</span>
              <span
                className={cn(
                  'font-medium',
                  chapter.progress === 100 && 'text-[var(--color-success)]',
                  chapter.progress > 0 && chapter.progress < 100 && 'text-primary'
                )}
              >
                {chapter.progress}%
              </span>
            </div>
            <Progress
              value={chapter.progress}
              className={cn(
                'h-1.5',
                chapter.status === 'completed' &&
                  '[&>[data-slot=progress-indicator]]:bg-[var(--color-success)]'
              )}
            />
          </div>

          <div className="mt-4 flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1 text-xs font-medium text-primary">
              {supportsLesson ? (
                t.playLesson
              ) : isFresh ? (
                t.startLearning
              ) : chapter.status === 'completed' ? (
                t.review
              ) : (
                t.continue
              )}
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </div>
            {supportsLesson && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  router.push(articleHref)
                }}
                className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/60 px-2 py-0.5 text-[10px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <BookOpen className="h-2.5 w-2.5" />
                {t.viewArticle}
              </button>
            )}
          </div>
        </CardContent>
      </TiltCard>
    </Link>
  )
}
