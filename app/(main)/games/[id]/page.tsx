import { Library } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'

export default function GameDetailPage() {
  return (
    <>
      <PageHeader
        title="游戏详情"
        description="查看游戏详细信息、攻略列表和相关资料。"
        breadcrumbs={[
          { label: '首页', href: '/' },
          { label: '游戏库', href: '/games' },
          { label: '游戏详情' },
        ]}
      />
      <EmptyState
        icon={Library}
        title="游戏详情页即将上线"
        description="在这里查看游戏的详细信息、关联攻略、人物资料、地图等内容。"
      />
    </>
  )
}
