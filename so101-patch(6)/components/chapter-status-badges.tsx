'use client'

import { Badge } from '@/components/ui/badge'
import { useChapterStats } from '@/lib/use-progress'

type Locale = 'zh' | 'ja'

const labels = {
  zh: { inProgress: '进行中', completed: '已完成' },
  ja: { inProgress: '進行中', completed: '完了' }
}

export function ChapterStatusBadges({ locale = 'zh' }: { locale?: Locale }) {
  const { completed, inProgress } = useChapterStats()
  const t = labels[locale]
  return (
    <div className="flex items-center gap-3">
      <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
        {inProgress} {t.inProgress}
      </Badge>
      <Badge
        variant="outline"
        className="border-[oklch(from_var(--success)_l_c_h/0.3)] bg-success/10 text-[var(--color-success)]"
      >
        {completed} {t.completed}
      </Badge>
    </div>
  )
}
