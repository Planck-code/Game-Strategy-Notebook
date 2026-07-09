import { Library } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'

export default function GamesPage() {
  return (
    <>
      <PageHeader
        title="游戏库"
        description="管理你的所有游戏攻略资源，按游戏分类整理内容。"
        breadcrumbs={[{ label: '首页', href: '/' }, { label: '游戏库' }]}
      />
      <EmptyState
        icon={Library}
        title="游戏库功能即将上线"
        description="在这里管理你的游戏库、查看游戏详情、创建和整理攻略。"
      />
    </>
  )
}
