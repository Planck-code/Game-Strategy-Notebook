import { Clock } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'

export default function TimelinePage() {
  return (
    <>
      <PageHeader
        title="时间线"
        description="按时间线整理攻略进度、版本更新和剧情发展。"
        breadcrumbs={[{ label: '首页', href: '/' }, { label: '时间线' }]}
      />
      <EmptyState
        icon={Clock}
        title="时间线功能即将上线"
        description="在这里按时间轴梳理游戏事件、版本更新和攻略进度。"
      />
    </>
  )
}
