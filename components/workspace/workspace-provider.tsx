'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react'
import { guides as mockGuides, type Guide, type Section } from '@/mock/guides'

// ============================================================
// Types
// ============================================================

export type SaveStatus = 'saved' | 'saving' | 'unsaved'

type WorkspaceContextValue = {
  // ---- 数据 ----
  guides: Guide[]
  activeGuide: Guide | null
  activeSection: Section | null

  // ---- 面板状态 ----
  isNavigatorOpen: boolean
  isContextPanelOpen: boolean

  // ---- 保存状态 ----
  saveStatus: SaveStatus

  // ---- 操作 ----
  selectGuide: (guideId: string) => void
  selectSection: (sectionId: string) => void
  updateSectionContent: (sectionId: string, content: string) => void
  updateGuideTitle: (guideId: string, title: string) => void
  toggleNavigator: () => void
  toggleContextPanel: () => void
}

// ============================================================
// Context
// ============================================================

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null)

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext)
  if (!ctx) {
    throw new Error('useWorkspace 必须在 WorkspaceProvider 内使用')
  }
  return ctx
}

// ============================================================
// Provider
// ============================================================

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [guides, setGuides] = useState<Guide[]>(mockGuides)
  const [activeGuideId, setActiveGuideId] = useState<string | null>(null)
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(true)
  const [isContextPanelOpen, setIsContextPanelOpen] = useState(true)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved')

  // ---- 派生状态 ----
  const activeGuide = useMemo(
    () => guides.find((g) => g.id === activeGuideId) ?? null,
    [guides, activeGuideId],
  )

  const activeSection = useMemo(
    () => activeGuide?.sections.find((s) => s.id === activeSectionId) ?? null,
    [activeGuide, activeSectionId],
  )

  // ---- 操作 ----

  const selectGuide = useCallback(
    (guideId: string) => {
      setActiveGuideId(guideId)
      // 自动选中第一个顶层章节
      const guide = guides.find((g) => g.id === guideId)
      const firstRoot = guide?.sections.find((s) => s.parentId === null)
      setActiveSectionId(firstRoot?.id ?? null)
    },
    [guides],
  )

  const selectSection = useCallback((sectionId: string) => {
    setActiveSectionId(sectionId)
  }, [])

  const updateSectionContent = useCallback(
    (sectionId: string, content: string) => {
      setGuides((prev) =>
        prev.map((g) => ({
          ...g,
          sections: g.sections.map((s) =>
            s.id === sectionId ? { ...s, content } : s,
          ),
          updatedAt: new Date().toISOString(),
        })),
      )
      setSaveStatus('unsaved')
    },
    [],
  )

  const updateGuideTitle = useCallback((guideId: string, title: string) => {
    setGuides((prev) =>
      prev.map((g) =>
        g.id === guideId
          ? { ...g, title, updatedAt: new Date().toISOString() }
          : g,
      ),
    )
    setSaveStatus('unsaved')
  }, [])

  const toggleNavigator = useCallback(() => {
    setIsNavigatorOpen((prev) => !prev)
  }, [])

  const toggleContextPanel = useCallback(() => {
    setIsContextPanelOpen((prev) => !prev)
  }, [])

  // ---- 自动保存模拟（实际由组件调用） ----
  const markSaved = useCallback(() => {
    setSaveStatus('saved')
  }, [])

  // 暴露 markSaved 通过一个 hack（将其挂在 window 上不优雅，重新设计）
  // 改用: 在 value 中暴露 saveStatus 和手动触发保存的方式

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      guides,
      activeGuide,
      activeSection,
      isNavigatorOpen,
      isContextPanelOpen,
      saveStatus,
      selectGuide,
      selectSection,
      updateSectionContent,
      updateGuideTitle,
      toggleNavigator,
      toggleContextPanel,
    }),
    [
      guides,
      activeGuide,
      activeSection,
      isNavigatorOpen,
      isContextPanelOpen,
      saveStatus,
      selectGuide,
      selectSection,
      updateSectionContent,
      updateGuideTitle,
      toggleNavigator,
      toggleContextPanel,
    ],
  )

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  )
}
