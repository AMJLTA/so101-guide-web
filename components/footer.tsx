import Link from 'next/link'
import { Bot, Github, Heart, Sparkles } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

const footerSections = [
  {
    title: '产品',
    links: [
      { label: 'SO101 SERIES', href: '/product' },
      { label: '获取报价', href: siteConfig.links.inquiry, external: true }
    ]
  },
  {
    title: '学习',
    links: [
      { label: '学习路径', href: '/learn' },
      { label: '术语表', href: '/glossary' },
      { label: '资源中心', href: '/resources' }
    ]
  },
  {
    title: '工具',
    links: [
      { label: '报错诊断', href: '/diagnose' },
      { label: 'AI 助手', href: '/assistant' }
    ]
  },
  {
    title: '了解',
    links: [
      { label: '关于项目', href: '/about' },
      { label: 'LeRobot', href: siteConfig.links.lerobot, external: true },
      { label: 'HuggingFace', href: siteConfig.links.huggingface, external: true }
    ]
  }
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 ring-1 ring-border/60">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{siteConfig.brand}</p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Embodied AI Platform
                </p>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:border-border hover:bg-secondary hover:text-foreground"
              >
                <Github className="h-4 w-4" />
              </a>
              <span className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-[11px] text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary" />
                开源 · 持续更新
              </span>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {section.title}
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {section.links.map((link) =>
                  'external' in link && link.external ? (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label} ↗
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/40 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.brand} · 本站内容采用 MIT 协议开源 ·
            不构成投资建议
          </p>
          <p className="flex items-center gap-1.5">
            Crafted with <Heart className="h-3 w-3 fill-rose-500 text-rose-500" /> for
            embodied AI builders
          </p>
        </div>
      </div>
    </footer>
  )
}
