import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function ShowcaseSection({
  id,
  title,
  description,
  children,
  className,
}: {
  id?: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-4 flex items-baseline gap-3">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="font-mono text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div
        className={cn(
          'glass rounded-2xl border border-border/60 p-6 shadow-lg shadow-black/20',
          className,
        )}
      >
        {children}
      </div>
    </section>
  )
}

export function Row({
  label,
  children,
  className,
}: {
  label?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      ) : null}
      <div className={cn('flex flex-wrap items-center gap-3', className)}>{children}</div>
    </div>
  )
}
