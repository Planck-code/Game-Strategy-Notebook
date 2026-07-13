import { Users } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'

export default function CharacterDetailPage() {
  return (
    <>
      <PageHeader
        title="人物详情"
        description="查看角色详细信息、关联攻略和关系图谱。"
        breadcrumbs={[
          { label: '首页', href: '/' },
          { label: '人物资料', href: '/characters' },
          { label: '人物详情' },
        ]}
      />
      <EmptyState
        icon={Users}
        title="人物详情页即将上线"
        description="在这里查看角色的详细信息、技能数据、背景故事和关联攻略。"
      />
    </>
  )
}
