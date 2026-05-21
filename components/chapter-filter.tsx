'use client'

import { useMemo, useState } from 'react'
import { RotateCcw, Search, X } from 'lucide-react'
import { toast } from 'sonner'
import { ChapterCard } from '@/components/chapter-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useProgress, applyUserProgress } from '@/lib/use-progress'
import { cn } from '@/lib/utils'
import type { Chapter } from '@/lib/types'

type FilterStatus = 'all' | 'completed' | 'in-progress' | 'locked'

interface ChapterFilterProps {
  chapters: Chapter[]
}

const statusFilters: { value: FilterStatus; label: string; dotClass: string }[] = [
  { value: 'all', label: '全部', dotClass: 'bg-muted-foreground' },
  { value: 'completed', label: '已完成', dotClass: 'bg-[var(--color-success)]' },
  { value: 'in-progress', label: '学习中', dotClass: 'bg-primary' },
  { value: 'locked', label: '未开始', dotClass: 'bg-muted-foreground/40' }
]

export function ChapterFilter({ chapters: baseChapters }: ChapterFilterProps) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<FilterStatus>('all')
  const { map, resetAll } = useProgress()

  // 合并用户进度 → 真实状态
  const chapters = useMemo(
    () => baseChapters.map((c) => applyUserProgress(c, map)),
    [baseChapters, map]
  )

  const counts = useMemo(() => {
    return {
      all: chapters.length,
      completed: chapters.filter((c) => c.status === 'completed').length,
      'in-progress': chapters.filter((c) => c.status === 'in-progress').length,
      locked: chapters.filter((c) => c.status === 'locked').length
    } as Record<FilterStatus, number>
  }, [chapters])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return chapters.filter((c) => {
      if (status !== 'all' && c.status !== status) return false
      if (!q) return true
      return (
        c.title.toLowerCase().includes(q) ||
        c.titleEn.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      )
    })
  }, [chapters, status, query])

  const hasProgress = Object.keys(map).length > 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索章节标题、英文或描述（例如 ACT、校准、CUDA）"
            className="pl-9"
          />
          {query && (
            <button
              type="button"
              aria-label="清空"
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-secondary"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {statusFilters.map((s) => (
            <Button
              key={s.value}
              variant={status === s.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatus(s.value)}
              className={cn('h-9 gap-2 px-3 text-xs', status === s.value && 'shadow-sm')}
            >
              <span className={cn('h-1.5 w-1.5 rounded-full', s.dotClass)} />
              {s.label}
              <Badge
                variant="outline"
                className={cn(
                  'ml-0.5 h-5 border-border/50 bg-background/60 px-1.5 font-mono text-[10px]',
                  status === s.value && 'border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground'
                )}
              >
                {counts[s.value]}
              </Badge>
            </Button>
          ))}
          {hasProgress && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                resetAll()
                toast.success('已重置全部学习进度')
              }}
              className="h-9 text-xs text-muted-foreground hover:text-destructive"
            >
              <RotateCcw className="mr-1 h-3 w-3" />
              重置全部进度
            </Button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 py-16 text-center">
          <Search className="h-8 w-8 text-muted-foreground/50" />
          <p className="mt-3 font-medium">没有找到匹配的章节</p>
          <p className="mt-1 text-sm text-muted-foreground">
            试试换个关键词，或清除筛选条件
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-3"
            onClick={() => {
              setQuery('')
              setStatus('all')
            }}
          >
            重置筛选
          </Button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>
      )}
    </div>
  )
}
