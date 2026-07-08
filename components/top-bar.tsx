'use client'

import { Search, Command, Bell, Menu } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDashboardMobile } from '@/components/dashboard-layout'

export type TopBarProps = {
  /** 外部传入的菜单回调（独立使用时）；在 DashboardLayout 内优先走 Context */
  onMenu?: () => void
  /** 页面标题（可选，显示在搜索框左侧） */
  title?: string
  /** 标题右侧的额外操作（如面包屑） */
  children?: React.ReactNode
}

/**
 * TopBar — 全局顶部栏
 *
 * - 移动端显示汉堡菜单按钮，通过 DashboardLayout Context 或 onMenu prop 打开侧边栏
 * - 居中搜索框 + CmdK 快捷键提示
 * - 右侧通知铃铛
 *
 * @example
 * // 在 DashboardLayout 内自动连接
 * <TopBar title="攻略编辑" />
 *
 * // 独立使用时手动传 onMenu
 * <TopBar onMenu={() => setOpen(true)} />
 */
export function TopBar({ onMenu, title, children }: TopBarProps) {
  // DashboardLayout Context — 如果在 Layout 内，自动获取 openMobile
  const { openMobile, hasLayout } = useDashboardMobile()
  const handleMenu = onMenu ?? (hasLayout ? openMobile : undefined)

  return (
    <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-border/60 bg-background/70 px-4 py-3 backdrop-blur-xl md:px-6">
      {/* 移动端菜单按钮 */}
      {handleMenu ? (
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 lg:hidden"
          onClick={handleMenu}
          aria-label="打开菜单"
        >
          <Menu className="size-5" />
        </Button>
      ) : null}

      {/* 页面标题（可选） */}
      {title ? (
        <h1 className="shrink-0 text-sm font-semibold hidden sm:block">{title}</h1>
      ) : null}

      {/* 标题右侧自定义区域（面包屑等） */}
      {children ? (
        <div className="shrink-0 hidden md:flex items-center gap-2">{children}</div>
      ) : null}

      {/* 搜索框 */}
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

      {/* 通知 */}
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
