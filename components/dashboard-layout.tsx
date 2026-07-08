'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

// ============================================================
// Context — 让 TopBar 等子组件能触发侧边栏
// ============================================================

type DashboardContextValue = {
  mobileOpen: boolean
  openMobile: () => void
  closeMobile: () => void
  /** 是否在 DashboardLayout 内（用于区分默认 context 值） */
  hasLayout: boolean
}

const DashboardContext = createContext<DashboardContextValue>({
  mobileOpen: false,
  openMobile: () => {},
  closeMobile: () => {},
  hasLayout: false as boolean,
})

/** 在 DashboardLayout 内部的组件可通过此 Hook 控制移动端侧边栏 */
export function useDashboardMobile() {
  return useContext(DashboardContext)
}

// ============================================================
// Layout
// ============================================================

export type DashboardLayoutProps = {
  /** 主内容区 */
  children: ReactNode
  /** 左侧侧边栏（桌面固定，移动端折叠为抽屉） */
  sidebar?: ReactNode
  /** 右侧面板（仅 xl 以上显示） */
  panel?: ReactNode
  /** 顶部栏（如需触发移动端侧边栏，在 TopBar 内调用 useDashboardMobile().openMobile） */
  topbar?: ReactNode
  /** 主内容区 className */
  className?: string
  /** 主内容区最大宽度，默认 max-w-4xl */
  maxWidth?:
    | 'max-w-3xl'
    | 'max-w-4xl'
    | 'max-w-5xl'
    | 'max-w-6xl'
    | 'max-w-7xl'
    | 'max-w-none'
}

/**
 * DashboardLayout — 通用的三栏仪表盘布局
 *
 * 桌面端：Sidebar | Main | Panel
 * 移动端：Sidebar 折叠为抽屉覆盖层
 *
 * @example
 * ```tsx
 * // 在 TopBar 中使用 useDashboardMobile() 打开侧边栏
 * function TopBar() {
 *   const { openMobile } = useDashboardMobile()
 *   return <Button onClick={openMobile} ... />
 * }
 *
 * <DashboardLayout
 *   sidebar={<AppSidebar />}
 *   topbar={<TopBar />}
 *   panel={<TodayPanel />}
 * >
 *   <YourPageContent />
 * </DashboardLayout>
 * ```
 */
export function DashboardLayout({
  children,
  sidebar,
  panel,
  topbar,
  className,
  maxWidth = 'max-w-4xl',
}: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const ctx: DashboardContextValue = {
    mobileOpen,
    openMobile: () => setMobileOpen(true),
    closeMobile: () => setMobileOpen(false),
    hasLayout: true,
  }

  return (
    <DashboardContext.Provider value={ctx}>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* ---- 左侧导航 — 桌面端固定 ---- */}
        {sidebar ? (
          <div className="hidden shrink-0 lg:flex">{sidebar}</div>
        ) : null}

        {/* ---- 左侧导航 — 移动端抽屉 ---- */}
        {sidebar && mobileOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* 遮罩 */}
            <div
              className="absolute inset-0 bg-background/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            {/* 抽屉内容 */}
            <div className="absolute left-0 top-0 h-full animate-in slide-in-from-left duration-300">
              {sidebar}
              <Button
                variant="ghost"
                size="icon"
                className="absolute -right-12 top-3 text-foreground"
                onClick={() => setMobileOpen(false)}
                aria-label="关闭菜单"
              >
                <X className="size-5" />
              </Button>
            </div>
          </div>
        ) : null}

        {/* ---- 中间主内容区 ---- */}
        <main className="flex min-w-0 flex-1 flex-col">
          {topbar}

          {/* 内容滚动区 */}
          <div className="flex-1 overflow-y-auto">
            <div
              className={cn(
                'mx-auto flex flex-col gap-6 px-4 py-6 md:px-6',
                maxWidth,
                className,
              )}
            >
              {children}
            </div>
          </div>
        </main>

        {/* ---- 右侧面板 — 大屏固定 ---- */}
        {panel ? (
          <div className="hidden shrink-0 xl:flex">{panel}</div>
        ) : null}
      </div>
    </DashboardContext.Provider>
  )
}
