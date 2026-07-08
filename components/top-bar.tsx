'use client'

import { Search, Command, Bell, Menu } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function TopBar({ onMenu }: { onMenu?: () => void }) {
  return (
    <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-border/60 bg-background/70 px-4 py-3 backdrop-blur-xl md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 lg:hidden"
        onClick={onMenu}
        aria-label="打开菜单"
      >
        <Menu className="size-5" />
      </Button>

      <div className="relative flex-1 max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="搜索攻略、游戏、人物、道具…"
          className="h-10 rounded-xl border-border/70 bg-card/60 pl-9 pr-16 backdrop-blur-sm placeholder:text-muted-foreground/70 focus-visible:ring-primary/40"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:flex">
          <Command className="size-2.5" />K
        </kbd>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="relative shrink-0 text-muted-foreground hover:text-foreground"
        aria-label="通知"
      >
        <Bell className="size-5" />
        <span className="absolute right-2 top-2 size-2 rounded-full bg-primary shadow-[0_0_6px] shadow-primary/60" />
      </Button>
    </div>
  )
}
