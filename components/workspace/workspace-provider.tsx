'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import {
  guides as mockGuides,
  sections as mockSections,
  guideRelations as mockRelations,
  type Guide,
  type Section,
  type GuideRelation,
  type ReferenceType,
  type SectionTemplate,
} from '@/mock'
import {
  loadGuides,
  saveGuides,
  loadSections,
  saveSections,
  loadRelations,
  saveRelations,
  loadFavorites,
  saveFavorites,
} from '@/lib/storage'

// ============================================================
// Types
// ============================================================

export type SaveStatus = 'saved' | 'saving' | 'unsaved'
export type SortOrder = 'updated_desc' | 'updated_asc' | 'title'

type WorkspaceContextValue = {
  guides: Guide[]
  sections: Section[]
  relations: GuideRelation[]
  activeGuide: Guide | null
  activeSection: Section | null
  favoriteGuideIds: Set<string>

  searchQuery: string
  gameFilter: string | null
  tagFilter: string | null
  sortOrder: SortOrder
  filteredGuides: Guide[]

  isNavigatorOpen: boolean
  isContextPanelOpen: boolean
  isCreateDialogOpen: boolean

  saveStatus: SaveStatus

  selectGuide: (guideId: string) => void
  selectSection: (sectionId: string) => void
  updateSectionContent: (sectionId: string, content: string) => void
  updateGuideTitle: (guideId: string, title: string) => void
  toggleNavigator: () => void
  toggleContextPanel: () => void

  setSearchQuery: (q: string) => void
  setGameFilter: (gameId: string | null) => void
  setTagFilter: (tag: string | null) => void
  setSortOrder: (order: SortOrder) => void

  openCreateDialog: () => void
  closeCreateDialog: () => void
  createGuide: (gameId: string, title: string, template?: SectionTemplate[]) => void
  deleteGuide: (guideId: string) => void
  renameGuide: (guideId: string, newTitle: string) => void
  duplicateGuide: (guideId: string) => void
  toggleFavorite: (guideId: string) => void
  addReference: (guideId: string, targetType: ReferenceType, targetId: string, note?: string) => void
  removeReference: (relationId: string) => void
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
// Helpers
// ============================================================

let idCounter = 100

function nextId(prefix: string): string {
  return `${prefix}-${++idCounter}-${Date.now().toString(36)}`
}

function now(): string {
  return new Date().toISOString()
}

// ============================================================
// Provider
// ============================================================

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  // ---- 核心数据（初始统一用 Mock，避免 SSR/客户端 hydration 不一致） ----
  const [guides, setGuides] = useState<Guide[]>(mockGuides)
  const [sections, setSections] = useState<Section[]>(mockSections)
  const [relations, setRelations] = useState<GuideRelation[]>(mockRelations)

  // ---- 选中态 ----
  const [activeGuideId, setActiveGuideId] = useState<string | null>(null)
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)

  // ---- 面板 ----
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(true)
  const [isContextPanelOpen, setIsContextPanelOpen] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // ---- 筛选/搜索/排序 ----
  const [searchQuery, setSearchQuery] = useState('')
  const [gameFilter, setGameFilter] = useState<string | null>(null)
  const [tagFilter, setTagFilter] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>('updated_desc')

  // ---- 收藏（内部存数组以便序列化，对外暴露 Set） ----
  const [favoriteArr, setFavoriteArr] = useState<string[]>([])
  const favoriteGuideIds = useMemo(() => new Set(favoriteArr), [favoriteArr])

  // ---- 保存状态 ----
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved')
  const hydrated = useRef(false)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ============================================================
  // 客户端挂载后从 LocalStorage 恢复（避免 Hydration Mismatch）
  // ============================================================

  useEffect(() => {
    setGuides(loadGuides(mockGuides))
    setSections(loadSections(mockSections))
    setRelations(loadRelations(mockRelations))
    setFavoriteArr(loadFavorites([]))
    hydrated.current = true
  }, [])

  // ============================================================
  // 自动持久化（guides / sections / relations / favorites 变化时）
  // ============================================================

  useEffect(() => {
    // 跳过 hydration 阶段（数据刚从 storage 恢复到 state）
    if (!hydrated.current) return
    // 标记未保存，启动防抖保存
    setSaveStatus('unsaved')
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => {
      setSaveStatus('saving')
      // 使用 requestAnimationFrame 确保 React 先渲染 saving 状态
      requestAnimationFrame(() => {
        saveGuides(guides)
        saveSections(sections)
        saveRelations(relations)
        saveFavorites(favoriteArr)
        setSaveStatus('saved')
      })
    }, 800)
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    }
  }, [guides, sections, relations, favoriteArr])

  // ============================================================
  // 派生状态
  // ============================================================

  const activeGuide = useMemo(
    () => guides.find((g) => g.id === activeGuideId) ?? null,
    [guides, activeGuideId],
  )

  const activeSection = useMemo(
    () => sections.find((s) => s.id === activeSectionId) ?? null,
    [sections, activeSectionId],
  )

  const filteredGuides = useMemo(() => {
    let result = [...guides]
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter((g) => g.title.toLowerCase().includes(q))
    }
    if (gameFilter) {
      result = result.filter((g) => g.gameId === gameFilter)
    }
    if (tagFilter) {
      result = result.filter((g) => g.tags.includes(tagFilter))
    }
    switch (sortOrder) {
      case 'updated_desc':
        result.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        break
      case 'updated_asc':
        result.sort((a, b) => a.updatedAt.localeCompare(b.updatedAt))
        break
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title, 'zh'))
        break
    }
    return result
  }, [guides, searchQuery, gameFilter, tagFilter, sortOrder])

  // ============================================================
  // 导航操作
  // ============================================================

  const selectGuide = useCallback(
    (guideId: string) => {
      setActiveGuideId(guideId)
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
          s.id === sectionId ? { ...s, content, updatedAt: now() } : s,
        ),
      )
      setGuides((prev) =>
        prev.map((g) =>
          g.id === activeGuideId ? { ...g, updatedAt: now() } : g,
        ),
      )
    },
    [activeGuideId],
  )

  const updateGuideTitle = useCallback((guideId: string, title: string) => {
    setGuides((prev) =>
      prev.map((g) =>
        g.id === guideId ? { ...g, title, updatedAt: now() } : g,
      ),
    )
  }, [])

  const toggleNavigator = useCallback(
    () => setIsNavigatorOpen((prev) => !prev),
    [],
  )
  const toggleContextPanel = useCallback(
    () => setIsContextPanelOpen((prev) => !prev),
    [],
  )

  // ============================================================
  // CRUD 操作
  // ============================================================

  const openCreateDialog = useCallback(() => setIsCreateDialogOpen(true), [])
  const closeCreateDialog = useCallback(() => setIsCreateDialogOpen(false), [])

  const createGuide = useCallback(
    (gameId: string, title: string, template?: SectionTemplate[]) => {
      const guideId = nextId('guide')
      const ts = now()
      const newGuide: Guide = {
        id: guideId, title, gameId, status: 'draft', tags: [],
        createdAt: ts, updatedAt: ts,
      }
      const newSections: Section[] = template
        ? template.map((tpl, i) => ({
            id: nextId('sec'), guideId, parentId: null,
            title: tpl.title, type: tpl.type, content: '',
            order: i + 1, createdAt: ts, updatedAt: ts,
          }))
        : []
      setGuides((prev) => [newGuide, ...prev])
      if (newSections.length > 0) setSections((prev) => [...prev, ...newSections])
      setIsCreateDialogOpen(false)
      setActiveGuideId(guideId)
      setActiveSectionId(newSections[0]?.id ?? null)
    },
    [],
  )

  const deleteGuide = useCallback(
    (guideId: string) => {
      if (activeGuideId === guideId) {
        const remaining = guides.filter((g) => g.id !== guideId)
        const next = remaining[0]
        setActiveGuideId(next?.id ?? null)
        if (next) {
          const nextRoots = sections
            .filter((s) => s.guideId === next.id && s.parentId === null)
            .sort((a, b) => a.order - b.order)
          setActiveSectionId(nextRoots[0]?.id ?? null)
        } else {
          setActiveSectionId(null)
        }
      }
      setGuides((prev) => prev.filter((g) => g.id !== guideId))
      setSections((prev) => prev.filter((s) => s.guideId !== guideId))
      setRelations((prev) => prev.filter((r) => r.guideId !== guideId))
      setFavoriteArr((prev) => prev.filter((id) => id !== guideId))
    },
    [activeGuideId, guides, sections],
  )

  const renameGuide = useCallback((guideId: string, newTitle: string) => {
    setGuides((prev) =>
      prev.map((g) =>
        g.id === guideId ? { ...g, title: newTitle, updatedAt: now() } : g,
      ),
    )
  }, [])

  const duplicateGuide = useCallback(
    (guideId: string) => {
      const source = guides.find((g) => g.id === guideId)
      if (!source) return
      const newGuideId = nextId('guide')
      const ts = now()
      const idMap = new Map<string, string>()

      const newGuide: Guide = {
        ...source, id: newGuideId,
        title: `${source.title} (副本)`,
        status: 'draft', createdAt: ts, updatedAt: ts,
      }

      const sourceSections = sections
        .filter((s) => s.guideId === guideId)
        .sort((a, b) => a.order - b.order)
      const newSections: Section[] = sourceSections.map((s) => {
        const newId = nextId('sec')
        idMap.set(s.id, newId)
        return { ...s, id: newId, guideId: newGuideId, parentId: null, createdAt: ts, updatedAt: ts }
      })
      for (let i = 0; i < newSections.length; i++) {
        const orig = sourceSections[i]
        if (orig.parentId) {
          newSections[i].parentId = idMap.get(orig.parentId) ?? null
        }
      }

      const sourceRelations = relations.filter((r) => r.guideId === guideId)
      const newRelations: GuideRelation[] = sourceRelations.map((r) => ({
        id: nextId('rel'), guideId: newGuideId,
        targetType: r.targetType, targetId: r.targetId,
        note: r.note, createdAt: ts,
      }))

      setGuides((prev) => [newGuide, ...prev])
      setSections((prev) => [...prev, ...newSections])
      if (newRelations.length > 0) setRelations((prev) => [...prev, ...newRelations])
    },
    [guides, sections, relations],
  )

  const toggleFavorite = useCallback((guideId: string) => {
    setFavoriteArr((prev) =>
      prev.includes(guideId) ? prev.filter((id) => id !== guideId) : [...prev, guideId],
    )
  }, [])

  const addReference = useCallback(
    (guideId: string, targetType: ReferenceType, targetId: string, note?: string) => {
      // 防重复
      setRelations((prev) => {
        const exists = prev.some(
          (r) => r.guideId === guideId && r.targetType === targetType && r.targetId === targetId,
        )
        if (exists) return prev
        const newRel: GuideRelation = {
          id: nextId('rel'),
          guideId,
          targetType,
          targetId,
          note,
          createdAt: now(),
        }
        return [...prev, newRel]
      })
    },
    [],
  )

  const removeReference = useCallback((relationId: string) => {
    setRelations((prev) => prev.filter((r) => r.id !== relationId))
  }, [])

  // ============================================================
  // Context Value
  // ============================================================

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      guides, sections, relations,
      activeGuide, activeSection,
      favoriteGuideIds,
      searchQuery, gameFilter, tagFilter, sortOrder,
      filteredGuides,
      isNavigatorOpen, isContextPanelOpen, isCreateDialogOpen,
      saveStatus,
      selectGuide, selectSection,
      updateSectionContent, updateGuideTitle,
      toggleNavigator, toggleContextPanel,
      setSearchQuery, setGameFilter, setTagFilter, setSortOrder,
      openCreateDialog, closeCreateDialog,
      createGuide, deleteGuide, renameGuide, duplicateGuide, toggleFavorite,
      addReference, removeReference,
    }),
    [
      guides, sections, relations,
      activeGuide, activeSection,
      addReference, removeReference,
      favoriteGuideIds,
      searchQuery, gameFilter, tagFilter, sortOrder,
      filteredGuides,
      isNavigatorOpen, isContextPanelOpen, isCreateDialogOpen,
      saveStatus,
      selectGuide, selectSection,
      updateSectionContent, updateGuideTitle,
      toggleNavigator, toggleContextPanel,
      setSearchQuery, setGameFilter, setTagFilter, setSortOrder,
      openCreateDialog, closeCreateDialog,
      createGuide, deleteGuide, renameGuide, duplicateGuide, toggleFavorite,
      addReference, removeReference,
    ],
  )

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  )
}
