import { useCallback, useRef, useState } from "react"

type FetchFn = (page: number) => Promise<{ data: { results: any[] } }>

export interface ContentSection {
    title: string
    category: string
    fetchFn: FetchFn
}

export interface PagedSection {
    title: string
    category: string
    data: any[]
    loadMore: () => void
}

export function usePagedContent(sections: ContentSection[]) {
    const [data, setData] = useState<any[][]>(() => sections.map(() => []))
    const [loading, setLoading] = useState(true)
    const pagesRef = useRef<number[]>(sections.map(() => 1))

    const loadSection = useCallback(async (index: number, page: number) => {
        const { data: response } = await sections[index].fetchFn(page)

        setData(prev => {
            const updated = [...prev]
            if (page === 1) {
                updated[index] = response.results
            } else {
                updated[index] = [...prev[index], ...response.results]
            }
            return updated
        })
    }, [sections])

    const initialize = useCallback(async () => {
        await Promise.all(sections.map((_, i) => loadSection(i, 1)))
        setLoading(false)
    }, [sections, loadSection])

    const loadMore = useCallback((index: number) => {
        const next = pagesRef.current[index] + 1
        pagesRef.current[index] = next
        loadSection(index, next)
    }, [loadSection])

    const pagedSections: PagedSection[] = sections.map((section, index) => ({
        title: section.title,
        category: section.category,
        data: data[index] ?? [],
        loadMore: () => loadMore(index),
    }))

    return { pagedSections, loading, initialize }
}
