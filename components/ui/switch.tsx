'use client'

import { cn } from '@/lib/utils'

export type SwitchProps = {
  /** 开关当前状态 */
  checked: boolean
  /** 状态变更回调 */
  onCheckedChange: (checked: boolean) => void
  /** 禁用状态 */
  disabled?: boolean
  /** 无障碍标签 */
  id?: string
  className?: string
}

/**
 * Switch — 开关组件
 *
 * 用于设置页面的布尔值切换。
 * 基于原生 checkbox 实现，与项目 Design System 保持一致。
 */
export function Switch({
  checked,
  onCheckedChange,
  disabled = false,
  id,
  className,
}: SwitchProps) {
  return (
    <button
      id={id}
      role="switch"
      type="button"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-50',
        checked
          ? 'bg-primary'
          : 'bg-muted hover:bg-muted/80',
        className,
      )}
    >
      <span
        className={cn(
          'pointer-events-none block size-4 rounded-full bg-background shadow-sm ring-0 transition-transform',
          checked ? 'translate-x-4' : 'translate-x-0',
        )}
      />
    </button>
  )
}
