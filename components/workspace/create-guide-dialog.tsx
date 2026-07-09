'use client'

import { useState } from 'react'
import { Gamepad2 } from 'lucide-react'
import { useWorkspace } from './workspace-provider'
import { games, templates } from '@/mock'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function CreateGuideDialog() {
  const { isCreateDialogOpen, closeCreateDialog, createGuide } = useWorkspace()

  const [selectedGameId, setSelectedGameId] = useState(games[0]?.id ?? '')
  const [title, setTitle] = useState('')
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)

  if (!isCreateDialogOpen) return null

  const handleCreate = () => {
    if (!selectedGameId || !title.trim()) return
    const template = selectedTemplateId
      ? templates.find((t) => t.id === selectedTemplateId)?.sections
      : undefined
    createGuide(selectedGameId, title.trim(), template)
    // 重置表单
    setTitle('')
    setSelectedTemplateId(null)
  }

  const handleClose = () => {
    closeCreateDialog()
    setTitle('')
    setSelectedTemplateId(null)
  }

  const canCreate = selectedGameId && title.trim().length > 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 遮罩 */}
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* 弹窗 */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border/60 bg-card p-6 shadow-2xl">
        <h2 className="text-lg font-semibold">新建攻略</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          选择游戏并输入攻略标题
        </p>

        <div className="mt-5 space-y-4">
          {/* 游戏选择 */}
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium">游戏 *</label>
            <div className="grid grid-cols-2 gap-2 max-h-[180px] overflow-y-auto">
              {games.map((game) => (
                <button
                  key={game.id}
                  onClick={() => setSelectedGameId(game.id)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-[13px] transition-all ${
                    selectedGameId === game.id
                      ? 'border-primary/50 bg-primary/10 text-foreground ring-1 ring-primary/20'
                      : 'border-border/50 bg-background/50 text-muted-foreground hover:border-border hover:text-foreground'
                  }`}
                >
                  <Gamepad2 className="size-3.5 shrink-0" />
                  <span className="truncate">{game.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 标题 */}
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium">标题 *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="输入攻略标题…"
              className="h-10 rounded-xl"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter' && canCreate) handleCreate()
              }}
            />
          </div>

          {/* 模板选择 */}
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium">模板（可选）</label>
            <div className="space-y-1.5">
              <button
                onClick={() => setSelectedTemplateId(null)}
                className={`w-full rounded-lg border px-3 py-2 text-left text-[13px] transition-all ${
                  selectedTemplateId === null
                    ? 'border-primary/50 bg-primary/10 text-foreground ring-1 ring-primary/20'
                    : 'border-border/50 bg-background/50 text-muted-foreground hover:border-border hover:text-foreground'
                }`}
              >
                从空白开始
              </button>
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setSelectedTemplateId(tpl.id)}
                  className={`w-full rounded-lg border px-3 py-2 text-left transition-all ${
                    selectedTemplateId === tpl.id
                      ? 'border-primary/50 bg-primary/10 text-foreground ring-1 ring-primary/20'
                      : 'border-border/50 bg-background/50 text-muted-foreground hover:border-border hover:text-foreground'
                  }`}
                >
                  <span className="text-[13px] font-medium">{tpl.name}</span>
                  <span className="ml-2 text-[11px] text-muted-foreground/70">
                    {tpl.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 按钮 */}
        <div className="mt-6 flex items-center justify-end gap-2">
          <Button variant="ghost" onClick={handleClose}>
            取消
          </Button>
          <Button onClick={handleCreate} disabled={!canCreate}>
            创建攻略
          </Button>
        </div>
      </div>
    </div>
  )
}
