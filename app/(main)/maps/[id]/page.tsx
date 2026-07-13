import { Map } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'

export default function MapDetailPage() {
  return (
    <>
      <PageHeader
        title="地图详情"
        description="查看地图标记、地点信息、Boss 分布和关联任务。"
        breadcrumbs={[
          { label: '首页', href: '/' },
          { label: '地图', href: '/maps' },
          { label: '地图详情' },
        ]}
      />
      <EmptyState
        icon={Map}
        title="地图详情页即将上线"
        description="在这里查看地图标记、地点详情、Boss 分布和关联攻略。"
      />
    </>
  )
}
