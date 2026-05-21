export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute -right-32 top-1/3 h-[320px] w-[320px] rounded-full bg-accent/10 blur-[100px] animate-slow-pulse" />
      <div className="absolute -left-24 bottom-0 h-[280px] w-[280px] rounded-full bg-primary/10 blur-[100px] animate-slow-pulse" />
    </div>
  )
}
