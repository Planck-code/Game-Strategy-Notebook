import Link from 'next/link'
import { Palette, ArrowLeft, PanelLeft } from 'lucide-react'
import { AppSidebar } from '@/components/app-sidebar'
import { TokensShowcase } from '@/components/showcase/tokens'
import { ControlsShowcase } from '@/components/showcase/controls'
import { ShowcaseSection } from '@/components/showcase/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const anchors = [
  { href: '#tokens', label: '设计令牌' },
  { href: '#button', label: 'Button' },
  { href: '#input', label: 'Input & Search' },
  { href: '#badge', label: 'Badge & Tag' },
  { href: '#avatar', label: 'Avatar & Card' },
  { href: '#overlay', label: 'Overlay' },
  { href: '#tabs', label: 'Tabs' },
  { href: '#progress', label: 'Progress' },
  { href: '#nav', label: 'Breadcrumb' },
  { href: '#sidebar', label: 'Sidebar' },
]

export default function DesignSystemPage() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      {/* 顶部栏 */}
      <header className="glass sticky top-0 z-30 border-b border-border/60">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
            <Palette className="size-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-sm font-semibold leading-tight sm:text-base">
              Design System
            </h1>
            <p className="truncate font-mono text-[11px] text-muted-foreground">
              Game Strategy Notebook · 组件展示
            </p>
          </div>
          <Badge variant="outline" className="hidden font-mono sm:inline-flex">
            深色科技风
          </Badge>
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft className="size-4" /> 返回首页
            </Link>
          </Button>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-8 px-4 py-8 sm:px-6">
        {/* 锚点导航 */}
        <nav className="sticky top-24 hidden h-fit w-44 shrink-0 flex-col gap-1 lg:flex">
          <p className="px-3 pb-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            组件目录
          </p>
          {anchors.map((a) => (
            <a
              key={a.href}
              href={a.href}
              className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {a.label}
            </a>
          ))}
        </nav>

        {/* 主内容 */}
        <main className="flex min-w-0 flex-1 flex-col gap-10">
          <TokensShowcase />
          <ControlsShowcase />

          {/* Sidebar 展示 */}
          <ShowcaseSection
            id="sidebar"
            title="Sidebar 侧边导航"
            description="全局导航 · 首页同款"
          >
            <div className="flex items-start gap-4">
              <div className="hidden overflow-hidden rounded-xl border border-border/60 sm:block">
                <div className="h-[480px]">
                  <AppSidebar className="h-full" />
                </div>
              </div>
              <div className="flex-1 rounded-xl border border-border/60 bg-background/40 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <PanelLeft className="size-4 text-primary" /> 使用说明
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  侧边栏作为全局导航贯穿所有页面，桌面端固定展示，移动端折叠为抽屉（Drawer）。
                  激活项使用主色高亮、左侧强调环与右侧圆点指示，与首页保持完全一致的设计语言。
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">固定定位</Badge>
                  <Badge variant="secondary">响应式折叠</Badge>
                  <Badge variant="secondary">激活态高亮</Badge>
                </div>
              </div>
            </div>
          </ShowcaseSection>

          <footer className="border-t border-border/60 py-6 text-center font-mono text-xs text-muted-foreground">
            Game Strategy Notebook Design System · 全部继承首页设计令牌
          </footer>
        </main>
      </div>
    </div>
  )
}
