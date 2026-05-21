'use client'

import { useInView } from '@/lib/hooks'
import { cn } from '@/lib/utils'

interface TextRevealProps {
  text: string
  /** 词间延迟 ms */
  staggerMs?: number
  /** 起始延迟 ms */
  baseDelay?: number
  className?: string
  /** 包装标签 */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
}

/** 整句按"词/字符簇"逐个上滑显示 */
export function TextReveal({
  text,
  staggerMs = 60,
  baseDelay = 0,
  className,
  as = 'span'
}: TextRevealProps) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.4, once: true })

  // 把中英混排切成"词"：英文按空格，中文按字
  const tokens: string[] = []
  let i = 0
  while (i < text.length) {
    const ch = text[i]
    if (/\s/.test(ch)) {
      tokens.push(ch)
      i++
    } else if (/[a-zA-Z0-9_-]/.test(ch)) {
      let j = i
      while (j < text.length && /[a-zA-Z0-9_.-]/.test(text[j])) j++
      tokens.push(text.slice(i, j))
      i = j
    } else {
      tokens.push(ch)
      i++
    }
  }

  const Tag = as as 'span'

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      className={cn(className)}
    >
      {tokens.map((t, idx) => {
        if (/^\s+$/.test(t)) {
          return <span key={idx}>{t}</span>
        }
        return (
          <span key={idx} className={cn('word-reveal', inView && 'in')}>
            <span
              className="word-reveal-inner"
              style={{ transitionDelay: `${baseDelay + idx * staggerMs}ms` }}
            >
              {t}
            </span>
          </span>
        )
      })}
    </Tag>
  )
}
