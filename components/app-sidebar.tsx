'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Gamepad2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navItems } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useDashboardMobile } from '@/components/dashboard-layout'

export type AppSidebarProps = {
  className?: string
  /** 外部导航回调（兼容独立使用场景） */
  onNavigate?: () => void
}

/**
 * AppSidebar — 全局侧边导航栏
 *
 * - 使用 Next.js App Router 路由（Link + usePathname）
 * - 桌面端固定左栏（w-64）
 * - 移动端通过 DashboardLayout 的 Context 自动关闭
 * - 若独立使用，提供 onNavigate 回调
 */
export function AppSidebar({ className, onNavigate }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  // DashboardLayout Context — 导航时自动关闭移动端抽屉
  const { closeMobile } = useDashboardMobile()

  const handleNav = () => {
    closeMobile()
    onNavigate?.()
  }

  /** 根据当前 pathname 匹配活跃的导航项 key */
  const getIsActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <aside
      className={cn(
        'flex h-full w-64 flex-col gap-4 border-r border-sidebar-border bg-sidebar px-3 py-4',
        className,
      )}
    >
      {/* 品牌 */}
      <div className="flex items-center gap-2.5 px-2 py-1">
        <Link href="/" onClick={handleNav} className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
            <Gamepad2 className="size-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold leading-tight">
              Strategy Notebook
            </p>
            <p className="truncate font-mono text-[11px] text-muted-foreground">
              v1.0 · 创作者版
            </p>
          </div>
        </Link>
      </div>

      {/* 新建攻略 */}
      <Button
        className="w-full justify-start gap-2 rounded-lg bg-primary/90 text-primary-foreground hover:bg-primary"
        onClick={() => {
          router.push('/guides')
          handleNav()
        }}
      >
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
          const isActive = getIsActive(item.href)
          return (
            <Link
              key={item.key}
              href={item.href}
              onClick={handleNav}
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
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground group-hover:text-foreground',
                )}
              />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge ? (
                <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {item.badge}
                </span>
              ) : null}
              {isActive ? (
                <span className="size-1.5 rounded-full bg-primary" />
              ) : null}
            </Link>
          )
        })}
      </nav>

      {/* 用户 */}
      <div className="flex items-center gap-2.5 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-2">
        <Avatar className="size-8">
          <AvatarImage src="/user-avatar-gamer.png" alt="用户头像" />
          <AvatarFallback className="bg-primary/20 text-xs text-primary">
            GM
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium">攻略猎人</p>
          <p className="truncate font-mono text-[10px] text-muted-foreground">
            Pro 创作者
          </p>
        </div>
        <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400/50" />
      </div>
    </aside>
  )
}
