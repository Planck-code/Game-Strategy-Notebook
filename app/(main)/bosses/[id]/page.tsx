import { Skull } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'
import { bosses } from '@/mock'

export function generateStaticParams() {
  return bosses.map((b) => ({ id: b.id }))
}

export default function BossDetailPage() {
  return (
    <>
      <PageHeader
        title="Boss 详情"
        description="查看 Boss 详细信息、战斗机制、掉落物品和关联攻略。"
        breadcrumbs={[
          { label: '首页', href: '/' },
          { label: 'Boss 图鉴', href: '/bosses' },
          { label: 'Boss 详情' },
        ]}
      />
      <EmptyState
        icon={Skull}
        title="Boss 详情页即将上线"
        description="在这里查看 Boss 的详细数据、阶段机制、掉落表和关联攻略。"
      />
    </>
  )
}
