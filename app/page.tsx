'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { AppSidebar } from '@/components/app-sidebar'
import { TopBar } from '@/components/top-bar'
import { WelcomeHero } from '@/components/welcome-hero'
import { RecentStrategies } from '@/components/recent-strategies'
import { FavoriteStrategies } from '@/components/favorite-strategies'
import { TodayPanel } from '@/components/today-panel'
import { Button } from '@/components/ui/button'

export default function Page() {
  const [mobileNav, setMobileNav] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* 左侧固定导航栏 - 桌面 */}
      <AppSidebar className="hidden shrink-0 lg:flex" />

      {/* 左侧导航 - 移动端抽屉 */}
      {mobileNav ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={() => setMobileNav(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 top-0 h-full animate-in slide-in-from-left duration-300">
            <AppSidebar onNavigate={() => setMobileNav(false)} />
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-12 top-3 text-foreground"
              onClick={() => setMobileNav(false)}
              aria-label="关闭菜单"
            >
              <X className="size-5" />
            </Button>
          </div>
        </div>
      ) : null}

      {/* 中间主内容区 */}
      <main className="flex min-w-0 flex-1 flex-col">
        <TopBar onMenu={() => setMobileNav(true)} />
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-6 md:px-6">
            <WelcomeHero />
            <RecentStrategies />
            <FavoriteStrategies />
          </div>
        </div>
      </main>

      {/* 右侧属性面板 - 待完成事项 */}
      <TodayPanel className="hidden shrink-0 xl:flex" />
    </div>
  )
}
