import ContentCards from "@/components/ContentCards"
import HomeSkeleton from "@/components/HomeSkeleton"
import Separator from "@/components/Separator"
import { getSeriesNowPlaying, getTopRatedSeries, getTrendingSeries } from "@/services/tmdb"
import { colors } from "@/styles/colors"
import { useEffect, useState } from "react"
import {
    ScrollView,
    StyleSheet
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"


export default function SeriesScreen() {

    const [trendingSeries, setTrendingSeries] = useState<any[]>([])
    const [pageTrendingSeries, setPageTrendingSeries] = useState(1)

    const [ratedSeries, setRatedSeries] = useState<any[]>([])
    const [pageRatedSeries, setPageRatedSeries] = useState(1)

    const [airingTodaySeries, setAiringTodaySeries] = useState<any[]>([])
    const [pageAiringTodaySeries, setPageAiringTodaySeries] = useState(1)

    const [loading, setLoading] = useState(true)

    const { bottom } = useSafeAreaInsets();


    async function loadTrendingSeries(nextPage = 1) {
        const { data } = await getTrendingSeries(nextPage)

        if (nextPage === 1) {
            setTrendingSeries(data.results)
        } else {
            setTrendingSeries(prev => [...prev, ...data.results])
        }
    }

    async function loadRatedSeries(nextPage = 1) {
        const { data } = await getTopRatedSeries(nextPage)

        if (nextPage === 1) {
            setRatedSeries(data.results)
        } else {
            setRatedSeries(prev => [...prev, ...data.results])
        }
    }

    async function loadAiringTodaySeries(nextPage = 1) {
        const { data } = await getSeriesNowPlaying(nextPage)

        if (nextPage === 1) {
            setAiringTodaySeries(data.results)
        } else {
            setAiringTodaySeries(prev => [...prev, ...data.results])
        }
    }

    useEffect(() => {
        async function fetchData() {
            await Promise.all([
                loadTrendingSeries(),
                loadRatedSeries(),
                loadAiringTodaySeries()
            ]);
            setLoading(false);
        }
        fetchData();
    }, [])


    function loadMoreTrendingSeries() {
        const next = pageTrendingSeries + 1
        setPageTrendingSeries(next)
        loadTrendingSeries(next)
    }

    function loadMoreRatedSeries() {
        const next = pageRatedSeries + 1
        setPageRatedSeries(next)
        loadRatedSeries(next)
    }

    function loadMoreAiringTodaySeries() {
        const next = pageAiringTodaySeries + 1
        setPageAiringTodaySeries(next)
        loadAiringTodaySeries(next)
    }

    if (loading) {
        return <HomeSkeleton />
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container} contentContainerStyle={{ paddingBottom: bottom + 10 }}>

            <ContentCards
                title="Series - Populares"
                data={trendingSeries}
                loadMore={loadMoreTrendingSeries}
                category="serie"
            />

            <Separator />

            <ContentCards
                title="Series - Bem avaliadas"
                data={ratedSeries}
                loadMore={loadMoreRatedSeries}
                category="serie"
            />

            <Separator />

            <ContentCards
                title="Series - Em exibição"
                data={airingTodaySeries}
                loadMore={loadMoreAiringTodaySeries}
                category="serie"
            />

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