'use client'

import { usePathname } from 'next/navigation'
import { AppSidebar } from '@/components/app-sidebar'
import { TopBar } from '@/components/top-bar'
import { DashboardLayout } from '@/components/dashboard-layout'
import { TodayPanel } from '@/components/today-panel'

/**
 * (main) 路由组共享布局
 *
 * 所有页面使用统一的 Sidebar + TopBar 外壳。
 * 首页（/）额外显示右侧 TodayPanel，保持首页 UI 不变。
 */
export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname === '/'
  const isWorkspace = pathname.startsWith('/guides')

  return (
    <DashboardLayout
      sidebar={<AppSidebar />}
      topbar={<TopBar />}
      panel={isDashboard ? <TodayPanel /> : undefined}
      variant={isWorkspace ? 'workspace' : 'page'}
    >
      {children}
    </DashboardLayout>
  )
}
