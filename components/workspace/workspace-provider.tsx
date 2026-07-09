'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react'
import {
  guides as mockGuides,
  sections as mockSections,
  type Guide,
  type Section,
} from '@/mock'

// ============================================================
// Types
// ============================================================

export type SaveStatus = 'saved' | 'saving' | 'unsaved'

type WorkspaceContextValue = {
  // ---- 数据 ----
  guides: Guide[]
  sections: Section[]
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
  const [sections, setSections] = useState<Section[]>(mockSections)
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
    () => sections.find((s) => s.id === activeSectionId) ?? null,
    [sections, activeSectionId],
  )

  // ---- 操作 ----

  const selectGuide = useCallback(
    (guideId: string) => {
      setActiveGuideId(guideId)
      // 自动选中第一个顶层章节
      const guideSections = sections.filter(
        (s) => s.guideId === guideId && s.parentId === null,
      )
      const firstRoot = guideSections.sort((a, b) => a.order - b.order)[0]
      setActiveSectionId(firstRoot?.id ?? null)
    },
    [sections],
  )

  const selectSection = useCallback((sectionId: string) => {
    setActiveSectionId(sectionId)
  }, [])

  const updateSectionContent = useCallback(
    (sectionId: string, content: string) => {
      setSections((prev) =>
        prev.map((s) =>
          s.id === sectionId ? { ...s, content, updatedAt: new Date().toISOString() } : s,
        ),
      )
      setGuides((prev) =>
        prev.map((g) =>
          g.id === activeGuideId
            ? { ...g, updatedAt: new Date().toISOString() }
            : g,
        ),
      )
      setSaveStatus('unsaved')
    },
    [activeGuideId],
  )

  const updateGuideTitle = useCallback(
    (guideId: string, title: string) => {
      setGuides((prev) =>
        prev.map((g) =>
          g.id === guideId
            ? { ...g, title, updatedAt: new Date().toISOString() }
            : g,
        ),
      )
      setSaveStatus('unsaved')
    },
    [],
  )

  const toggleNavigator = useCallback(() => {
    setIsNavigatorOpen((prev) => !prev)
  }, [])

  const toggleContextPanel = useCallback(() => {
    setIsContextPanelOpen((prev) => !prev)
  }, [])

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      guides,
      sections,
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
      sections,
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
