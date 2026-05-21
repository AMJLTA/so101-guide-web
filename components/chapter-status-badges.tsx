'use client'

import { Badge } from '@/components/ui/badge'
import { useChapterStats } from '@/lib/use-progress'

export function ChapterStatusBadges() {
  const { completed, inProgress } = useChapterStats()
  return (
    <div className="flex items-center gap-3">
      <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
        {inProgress} 进行中
      </Badge>
      <Badge
        variant="outline"
        className="border-[oklch(from_var(--success)_l_c_h/0.3)] bg-success/10 text-[var(--color-success)]"
      >
        {completed} 已完成
      </Badge>
    </div>
  )
}
