'use client'

import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SearchInput({
  placeholder = '搜索攻略、人物、道具…',
  shortcut = '⌘K',
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { shortcut?: string }) {
  return (
    <div
      className={cn(
        'group flex items-center gap-2 rounded-lg border border-border/60 bg-background/50 px-3 py-2 transition-colors focus-within:border-primary/40 focus-within:ring-1 focus-within:ring-primary/30',
        className,
      )}
    >
      <Search className="size-4 shrink-0 text-muted-foreground transition-colors group-focus-within:text-primary" />
      <input
        type="search"
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:appearance-none"
        {...props}
      />
      {shortcut ? (
        <kbd className="hidden shrink-0 rounded border border-border/60 bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
          {shortcut}
        </kbd>
      ) : null}
    </div>
  )
}
