'use client'

import { type ReactNode } from 'react'
import { PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useWorkspace } from './workspace-provider'

export type WorkspaceLayoutProps = {
  navigator: ReactNode
  workArea: ReactNode
  contextPanel: ReactNode
}

/**
 * WorkspaceLayout — 四栏（含 AppSidebar）WorkSpace 布局容器
 *
 * ┌──────────┬─────────────┬──────────────────┬──────────────┐
 * │ App      │ Navigator   │ Main Work Area   │ Context      │
 * │ Sidebar  │ (260px)     │ (flex-1)         │ Panel(320px) │
 * │ (已由     │             │                  │              │
 * │  Dashboard│             │                  │              │
 * │  Layout   │             │                  │              │
 * │  提供)    │             │                  │              │
 * └──────────┴─────────────┴──────────────────┴──────────────┘
 *
 * 桌面端三栏（Sidebar 由外层 DashboardLayout 提供），移动端自动适应。
 */
export function WorkspaceLayout({
  navigator,
  workArea,
  contextPanel,
}: WorkspaceLayoutProps) {
  const { isNavigatorOpen, isContextPanelOpen, toggleNavigator, toggleContextPanel } =
    useWorkspace()

  return (
    <div className="flex h-full flex-1 min-h-0">
      {/* ======== Zone 2: Guide Navigator ======== */}
      <div
        className={cn(
          'flex flex-col border-r border-border/60 bg-card/30 transition-all duration-300',
          isNavigatorOpen ? 'w-[260px]' : 'w-0 overflow-hidden border-r-0',
        )}
      >
        {isNavigatorOpen ? (
          <div className="flex h-full flex-col">
            {/* Navigator 头部：折叠按钮 */}
            <div className="flex items-center justify-between border-b border-border/50 px-3 py-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                导航器
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="size-6"
                onClick={toggleNavigator}
                aria-label="收起导航器"
              >
                <PanelLeftClose className="size-3.5" />
              </Button>
            </div>
            {/* Navigator 内容 */}
            <div className="flex-1 overflow-hidden">{navigator}</div>
          </div>
        ) : null}
      </div>

      {/* Navigator 折叠后的展开按钮 */}
      {!isNavigatorOpen ? (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 z-10 size-7 -translate-y-1/2 rounded-l-none border border-border/60 border-l-0 bg-card/80"
          onClick={toggleNavigator}
          aria-label="展开导航器"
        >
          <PanelLeftOpen className="size-3.5" />
        </Button>
      ) : null}

      {/* ======== Zone 3: Main Work Area ======== */}
      <div className="flex min-w-0 flex-1 flex-col">{workArea}</div>

      {/* ======== Zone 4: Context Panel ======== */}
      <div
        className={cn(
          'flex flex-col border-l border-border/60 bg-card/30 transition-all duration-300',
          isContextPanelOpen ? 'w-[320px]' : 'w-0 overflow-hidden border-l-0',
        )}
      >
        {isContextPanelOpen ? (
          <div className="flex h-full flex-col">
            {/* Panel 头部：折叠按钮 */}
            <div className="flex items-center justify-between border-b border-border/50 px-3 py-2">
              <Button
                variant="ghost"
                size="icon"
                className="size-6"
                onClick={toggleContextPanel}
                aria-label="收起上下文面板"
              >
                <PanelRightClose className="size-3.5" />
              </Button>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                上下文
              </span>
            </div>
            {/* Panel 内容 */}
            <div className="flex-1 overflow-hidden">{contextPanel}</div>
          </div>
        ) : null}
      </div>

      {/* Context Panel 折叠后的展开按钮 */}
      {!isContextPanelOpen ? (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 z-10 size-7 -translate-y-1/2 rounded-r-none border border-border/60 border-r-0 bg-card/80"
          onClick={toggleContextPanel}
          aria-label="展开上下文面板"
        >
          <PanelRightOpen className="size-3.5" />
        </Button>
      ) : null}
    </div>
  )
}
