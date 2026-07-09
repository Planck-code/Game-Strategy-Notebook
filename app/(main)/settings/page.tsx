import { Settings } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="设置"
        description="自定义你的工作区、偏好设置和账户信息。"
        breadcrumbs={[{ label: '首页', href: '/' }, { label: '设置' }]}
      />
      <EmptyState
        icon={Settings}
        title="设置功能即将上线"
        description="在这里管理你的账户偏好、工作区配置和通知设置。"
      />
    </>
  )
}
