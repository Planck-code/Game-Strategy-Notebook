import { Clock } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'

export default function TimelineDetailPage() {
  return (
    <>
      <PageHeader
        title="事件详情"
        description="查看时间线事件的详细信息、关联内容和时间节点。"
        breadcrumbs={[
          { label: '首页', href: '/' },
          { label: '时间线', href: '/timeline' },
          { label: '事件详情' },
        ]}
      />
      <EmptyState
        icon={Clock}
        title="事件详情页即将上线"
        description="在这里查看事件的完整信息和关联内容。"
      />
    </>
  )
}
