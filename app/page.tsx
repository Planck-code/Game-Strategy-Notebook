import { AppSidebar } from '@/components/app-sidebar'
import { TopBar } from '@/components/top-bar'
import { DashboardLayout } from '@/components/dashboard-layout'
import { WelcomeHero } from '@/components/welcome-hero'
import { RecentStrategies } from '@/components/recent-strategies'
import { FavoriteStrategies } from '@/components/favorite-strategies'
import { TodayPanel } from '@/components/today-panel'

export default function Page() {
  return (
    <DashboardLayout
      sidebar={<AppSidebar />}
      topbar={<TopBar />}
      panel={<TodayPanel />}
    >
      <WelcomeHero />
      <RecentStrategies />
      <FavoriteStrategies />
    </DashboardLayout>
  )
}
