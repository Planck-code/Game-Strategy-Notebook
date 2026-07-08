'use client'

import { useState } from 'react'
import { CheckCircle2, ListTodo, Flame, Calendar, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { todayTasks, type TodoItem } from '@/lib/mock-data'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'

const priorityStyle: Record<TodoItem['priority'], string> = {
  high: 'bg-destructive/15 text-destructive',
  medium: 'bg-primary/15 text-primary',
  low: 'bg-muted text-muted-foreground',
}

const priorityLabel: Record<TodoItem['priority'], string> = {
  high: '高',
  medium: '中',
  low: '低',
}

export function TodayPanel({ className }: { className?: string }) {
  const [tasks, setTasks] = useState<TodoItem[]>(todayTasks)

  const doneCount = tasks.filter((t) => t.done).length
  const percent = Math.round((doneCount / tasks.length) * 100)

  const toggle = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  return (
    <aside
      className={cn(
        'flex h-full w-80 flex-col gap-4 border-l border-border/60 bg-card/30 p-4 backdrop-blur-xl',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <ListTodo className="size-4 text-primary" />
        <h2 className="text-sm font-semibold">今日待完成</h2>
        <span className="ml-auto flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
          <Calendar className="size-3" />
          7月8日
        </span>
      </div>

      {/* 进度卡片 */}
      <div className="relative overflow-hidden rounded-xl border border-border/60 bg-background/40 p-4">
        <div
          aria-hidden="true"
          className="absolute -right-8 -top-8 size-24 rounded-full bg-primary/20 blur-2xl"
        />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="font-mono text-[11px] text-muted-foreground">完成进度</p>
            <p className="mt-1 text-2xl font-bold">
              {doneCount}
              <span className="text-base font-normal text-muted-foreground">/{tasks.length}</span>
            </p>
          </div>
          <div className="flex size-12 items-center justify-center rounded-full border-2 border-primary/30">
            <span className="font-mono text-sm font-semibold text-primary">{percent}%</span>
          </div>
        </div>
        <Progress value={percent} className="mt-3 h-1.5" />
      </div>

      {/* 任务列表 */}
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
        {tasks.map((t) => (
          <label
            key={t.id}
            className={cn(
              'group flex cursor-pointer items-start gap-3 rounded-xl border border-border/60 bg-background/40 p-3 transition-all duration-200 hover:border-primary/30',
              t.done && 'opacity-60',
            )}
          >
            <Checkbox
              checked={t.done}
              onCheckedChange={() => toggle(t.id)}
              className="mt-0.5 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
            />
            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  'text-sm font-medium leading-snug transition-all',
                  t.done && 'line-through',
                )}
              >
                {t.title}
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                <span
                  className={cn(
                    'rounded px-1.5 py-px font-mono text-[10px] font-medium',
                    priorityStyle[t.priority],
                  )}
                >
                  {priorityLabel[t.priority]}优先
                </span>
                <span className="truncate font-mono text-[10px] text-muted-foreground">
                  {t.meta}
                </span>
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* 底部小结 */}
      <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 p-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/15">
          <Flame className="size-4 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium">连续创作 12 天</p>
          <p className="font-mono text-[10px] text-muted-foreground">保持节奏，继续加油</p>
        </div>
        <TrendingUp className="size-4 text-emerald-400" />
      </div>

      {doneCount === tasks.length ? (
        <p className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500/10 py-2 text-xs font-medium text-emerald-400">
          <CheckCircle2 className="size-4" />
          今日任务已全部完成！
        </p>
      ) : null}
    </aside>
  )
}
