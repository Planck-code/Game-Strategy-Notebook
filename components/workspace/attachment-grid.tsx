'use client'

import { ImageIcon, Paperclip } from 'lucide-react'
import { useWorkspace } from './workspace-provider'
import { getAttachmentsByParent } from '@/mock'

export function AttachmentGrid() {
  const { activeGuide } = useWorkspace()

  if (!activeGuide) return null

  const guideAttachments = getAttachmentsByParent('guide', activeGuide.id)
  const images = guideAttachments.filter((a) => a.type === 'image')
  const files = guideAttachments.filter((a) => a.type === 'file')

  if (guideAttachments.length === 0) {
    return (
      <div className="flex items-center gap-2 px-3 py-4 text-xs text-muted-foreground/50">
        <Paperclip className="size-3.5" />
        <span>暂无附件</span>
      </div>
    )
  }

  return (
    <div className="space-y-3 px-3 py-3">
      {/* 图片 */}
      {images.length > 0 ? (
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <ImageIcon className="size-3 text-muted-foreground/60" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
              图片 ({images.length})
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {images.map((img) => (
              <div
                key={img.id}
                className="aspect-video rounded-lg border border-border/50 bg-muted/30"
                title={img.name}
              />
            ))}
          </div>
        </div>
      ) : null}

      {/* 文件 */}
      {files.length > 0 ? (
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <Paperclip className="size-3 text-muted-foreground/60" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
              文件 ({files.length})
            </span>
          </div>
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-2 rounded-md bg-background/50 px-2.5 py-1.5 text-[13px]"
            >
              <Paperclip className="size-3 text-muted-foreground" />
              <span className="flex-1 truncate">{file.name}</span>
              {file.size ? (
                <span className="font-mono text-[10px] text-muted-foreground/60">
                  {Math.round(file.size / 1000)}KB
                </span>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
