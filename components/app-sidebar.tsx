'use client'

import { useState } from 'react'
import { Gamepad2, ChevronsLeft, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navItems } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function AppSidebar({
  className,
  onNavigate,
}: {
  className?: string
  onNavigate?: () => void
}) {
  const [active, setActive] = useState('home')

  return (
    <aside
      className={cn(
        'flex h-full w-64 flex-col gap-4 border-r border-sidebar-border bg-sidebar px-3 py-4',
        className,
      )}
    >
      {/* 品牌 */}
      <div className="flex items-center gap-2.5 px-2 py-1">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
          <Gamepad2 className="size-5 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold leading-tight">Strategy Notebook</p>
          <p className="truncate font-mono text-[11px] text-muted-foreground">v1.0 · 创作者版</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="size-7 shrink-0 text-muted-foreground hover:text-foreground lg:flex hidden"
          aria-label="收起侧边栏"
        >
          <ChevronsLeft className="size-4" />
        </Button>
      </div>

      {/* 新建攻略 */}
      <Button className="w-full justify-start gap-2 rounded-lg bg-primary/90 text-primary-foreground hover:bg-primary">
        <Plus className="size-4" />
        新建攻略
      </Button>

      {/* 导航 */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
        <p className="px-2 pb-1 pt-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          工作区
        </p>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.key
          return (
            <button
              key={item.key}
              onClick={() => {
                setActive(item.key)
                onNavigate?.()
              }}
              className={cn(
                'group flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-sidebar-accent text-foreground shadow-sm ring-1 ring-primary/20'
                  : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground',
              )}
            >
              <Icon
                className={cn(
                  'size-[18px] shrink-0 transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground',
                )}
              />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge ? (
                <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {item.badge}
                </span>
              ) : null}
              {isActive ? <span className="size-1.5 rounded-full bg-primary" /> : null}
            </button>
          )
        })}
      </nav>

      {/* 用户 */}
      <div className="flex items-center gap-2.5 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-2">
        <Avatar className="size-8">
          <AvatarImage src="/user-avatar-gamer.png" alt="用户头像" />
          <AvatarFallback className="bg-primary/20 text-xs text-primary">GM</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium">攻略猎人</p>
          <p className="truncate font-mono text-[10px] text-muted-foreground">Pro 创作者</p>
        </div>
        <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400/50" />
      </div>
    </aside>
  )
}
