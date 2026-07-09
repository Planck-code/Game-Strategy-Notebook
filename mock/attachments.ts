// ============================================================
// Attachment — 附件实体（多态关联 Guide / Section）
// ============================================================

export type AttachmentParent = 'guide' | 'section'
export type AttachmentType = 'image' | 'file'

export type Attachment = {
  id: string
  parentType: AttachmentParent
  parentId: string
  name: string
  type: AttachmentType
  url: string
  size?: number
  mimeType?: string
  uploadedAt: string
}

export const attachments: Attachment[] = [
  {
    id: 'att-1',
    parentType: 'guide',
    parentId: 'guide-1',
    name: 'margit-hitbox.png',
    type: 'image',
    url: '/placeholder.jpg',
    size: 245000,
    mimeType: 'image/png',
    uploadedAt: '2025-12-22',
  },
  {
    id: 'att-2',
    parentType: 'guide',
    parentId: 'guide-1',
    name: 'stormveil-route.png',
    type: 'image',
    url: '/placeholder.jpg',
    size: 380000,
    mimeType: 'image/png',
    uploadedAt: '2025-12-23',
  },
  {
    id: 'att-3',
    parentType: 'guide',
    parentId: 'guide-1',
    name: 'boss-stats-comparison.xlsx',
    type: 'file',
    url: '#',
    size: 56000,
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    uploadedAt: '2025-12-24',
  },
]

export function getAttachmentsByParent(
  parentType: AttachmentParent,
  parentId: string,
): Attachment[] {
  return attachments.filter(
    (a) => a.parentType === parentType && a.parentId === parentId,
  )
}
