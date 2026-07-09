import { Map } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'

export default function MapsPage() {
  return (
    <>
      <PageHeader
        title="地图"
        description="标注游戏地图、标记关键地点、规划探索路线。"
        breadcrumbs={[{ label: '首页', href: '/' }, { label: '地图' }]}
      />
      <EmptyState
        icon={Map}
        title="地图功能即将上线"
        description="在这里上传和标注游戏地图，规划最佳探索路线。"
      />
    </>
  )
}
