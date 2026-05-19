import ContentCards from "@/components/ContentCards"
import HomeSkeleton from "@/components/HomeSkeleton"
import { ContentSection, usePagedContent } from "@/hooks/usePagedContent"
import { getSeriesNowPlaying, getTopRatedSeries, getTrendingSeries } from "@/services/tmdb"
import { colors } from "@/styles/colors"
import { useEffect } from "react"
import {
    ScrollView,
    StyleSheet
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"


const sections: ContentSection[] = [
    { title: "Series - Populares", category: "serie", fetchFn: getTrendingSeries },
    { title: "Series - Bem avaliadas", category: "serie", fetchFn: getTopRatedSeries },
    { title: "Series - Em exibição", category: "serie", fetchFn: getSeriesNowPlaying },
]

export default function SeriesScreen() {
    const { bottom } = useSafeAreaInsets();
    const { pagedSections, loading, initialize } = usePagedContent(sections)

    useEffect(() => {
        initialize()
    }, [])

    if (loading) {
        return <HomeSkeleton />
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container} contentContainerStyle={{ paddingBottom: bottom }}>

            {pagedSections.map((section) => (
                <ContentCards
                    key={section.title}
                    title={section.title}
                    data={section.data}
                    loadMore={section.loadMore}
                    category={section.category}
                />
            ))}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: colors.primary,
        textAlign: "center",
        marginBottom: 40,
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 2,
        paddingHorizontal: 16
    },
})