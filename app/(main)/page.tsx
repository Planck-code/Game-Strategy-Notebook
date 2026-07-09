import { WelcomeHero } from '@/components/welcome-hero'
import { RecentStrategies } from '@/components/recent-strategies'
import { FavoriteStrategies } from '@/components/favorite-strategies'

export default function DashboardPage() {
  return (
    <>
      <WelcomeHero />
      <RecentStrategies />
      <FavoriteStrategies />
    </>
  )
}
