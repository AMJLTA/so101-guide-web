'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, Search, X, ChevronRight, Github } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/lib/site-config'

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const triggerCommandPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'))
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border/60 bg-background/85 backdrop-blur-xl shadow-sm'
          : 'border-b border-transparent bg-background/40 backdrop-blur'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-17 w-17 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 ring-1 ring-border/60 transition-transform group-hover:scale-105">
            <Image
              src="/lvjin-logo.png"
              alt={siteConfig.brand}
              width={60}
              height={60}
              className="h-full w-full object-contain p-1"
              priority
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-tight">{siteConfig.brand}</span>
            <span className="hidden text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:inline">
              LVJIN · Embodied AI
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {siteConfig.nav.map((item) => {
            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname?.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-primary to-accent" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={triggerCommandPalette}
            className="hidden h-9 w-22 gap-2 px-2.5 text-xs text-muted-foreground sm:inline-flex"
            aria-label="搜索"
          >
            <Search className="h-3.5 w-3.5" />
            <span>搜索</span>
            
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex"
            aria-label="GitHub"
          >
          
          </Button>
          <ThemeToggle />
          <Button asChild size="sm" className="glow-primary hidden lg:inline-flex">
            <Link href="/learn">
              开始学习
              <ChevronRight className="ml-0.5 h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border/40 bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 p-4">
            {[...siteConfig.nav, ...siteConfig.navExtra].map((item) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href || pathname?.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    active
                      ? 'bg-secondary text-foreground'
                      : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                  )}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="h-4 w-4 opacity-40" />
                </Link>
              )
            })}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button asChild size="sm" className="glow-primary">
                <Link href="/learn">开始学习</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-1 h-3.5 w-3.5" />
                  GitHub
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
