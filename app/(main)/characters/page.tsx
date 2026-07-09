import { Users } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'

export default function CharactersPage() {
  return (
    <>
      <PageHeader
        title="人物资料"
        description="整理游戏角色信息、关系图谱、技能数据和背景故事。"
        breadcrumbs={[{ label: '首页', href: '/' }, { label: '人物资料' }]}
      />
      <EmptyState
        icon={Users}
        title="人物资料库即将上线"
        description="在这里创建和管理游戏角色的人物卡和关系网。"
      />
    </>
  )
}
