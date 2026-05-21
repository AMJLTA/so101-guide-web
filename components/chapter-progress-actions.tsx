'use client'

import { useEffect } from 'react'
import { CheckCircle2, Play, RotateCcw, Trophy } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useProgress } from '@/lib/use-progress'
import { cn } from '@/lib/utils'

interface ChapterProgressActionsProps {
  chapterId: number
  /** course-data 里的基础状态，仅用于第一次未访问时回显 */
  baseStatus: 'locked' | 'in-progress' | 'completed'
  baseProgress: number
}

export function ChapterProgressActions({
  chapterId,
  baseStatus,
  baseProgress
}: ChapterProgressActionsProps) {
  const { map, markVisited, markCompleted, resetChapter, hydrated } = useProgress()
  const entry = map[chapterId]
  const status = entry?.status ?? baseStatus
  const progress = entry?.progress ?? baseProgress

  // 首次访问自动标 in-progress（base 已经完成的不动）
  useEffect(() => {
    if (!hydrated) return
    if (!entry && baseStatus !== 'completed') {
      markVisited(chapterId)
    }
  }, [chapterId, entry, baseStatus, hydrated, markVisited])

  const isCompleted = status === 'completed'

  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-border/60',
              isCompleted
                ? 'bg-success/10 text-[var(--color-success)]'
                : status === 'in-progress'
                  ? 'bg-primary/10 text-primary'
                  : 'bg-muted text-muted-foreground'
            )}
          >
            {isCompleted ? (
              <Trophy className="h-5 w-5" />
            ) : status === 'in-progress' ? (
              <Play className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold">
              {isCompleted ? '已完成本章 🎉' : status === 'in-progress' ? '学习中' : '未开始'}
            </p>
            <p className="text-xs text-muted-foreground">
              {isCompleted && entry?.completedAt
                ? `完成于 ${new Date(entry.completedAt).toLocaleDateString('zh-CN')}`
                : '完成后会同步到学习路径和首页统计'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className={cn(
              'border-border/60 font-mono text-[10px] uppercase tracking-wider',
              isCompleted &&
                'border-[oklch(from_var(--success)_l_c_h/0.3)] bg-success/10 text-[var(--color-success)]'
            )}
          >
            {progress}%
          </Badge>
          {isCompleted ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                resetChapter(chapterId)
                toast.success('已重置本章进度')
              }}
            >
              <RotateCcw className="mr-1 h-3.5 w-3.5" />
              重置
            </Button>
          ) : (
            <Button
              size="sm"
              className="glow-primary"
              onClick={() => {
                markCompleted(chapterId)
                toast.success('🎉 本章已标记完成')
              }}
            >
              <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
              标记为完成
            </Button>
          )}
        </div>
      </div>

      <Progress
        value={progress}
        className={cn(
          'mt-4 h-1.5',
          isCompleted && '[&>[data-slot=progress-indicator]]:bg-[var(--color-success)]'
        )}
      />
    </div>
  )
}
