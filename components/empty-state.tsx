import { type LucideIcon, Package } from 'lucide-react'
import { cn } from '@/lib/utils'

export type EmptyStateProps = {
  /** 图标（默认 Package） */
  icon?: LucideIcon
  /** 主标题 */
  title: string
  /** 描述文字 */
  description?: string
  /** 自定义 className */
  className?: string
}

/**
 * EmptyState — 空状态占位组件
 *
 * 用于尚未实现具体功能的页面，提供统一的空状态视觉。
 *
 * @example
 * <EmptyState
 *   icon={Library}
 *   title="游戏库"
 *   description="此功能正在开发中，敬请期待。"
 * />
 */
export function EmptyState({
  icon: Icon = Package,
  title,
  description = '此功能正在开发中，敬请期待。',
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/30 px-6 py-16 text-center',
        className,
      )}
    >
      <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
        <Icon className="size-7 text-primary/70" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {description ? (
        <p className="mt-1.5 max-w-sm text-pretty text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  )
}
