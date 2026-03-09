import HomeSkeleton from "@/components/HomeSkeleton"
import Separator from "@/components/Separator"
import { getTopRated, getTrending, getTrendingSeries } from "@/services/tmdb"
import { colors } from "@/styles/colors"
import { useEffect, useState } from "react"
import {
    ScrollView,
    StyleSheet
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import ContentCards from "../../components/ContentCards"


export default function Home() {

    const [topMovies, setTopMovies] = useState<any[]>([])
    const [pageTopMovies, setPageTopMovies] = useState(1)

    const [ratedMovies, setRatedMovies] = useState<any[]>([])
    const [pageRatedMovies, setPageRatedMovies] = useState(1)

    const [trendingSeries, setTrendingSeries] = useState<any[]>([])
    const [pageTrendingSeries, setPageTrendingSeries] = useState(1)

    const [loading, setLoading] = useState(true)

    const { bottom } = useSafeAreaInsets();
    
    async function loadTopMovies(nextPage = 1) {
        const { data } = await getTrending(nextPage)

        if (nextPage === 1) {
            setTopMovies(data.results)
        } else {
            setTopMovies(prev => [...prev, ...data.results])
        }

        setLoading(false)
    }

    async function loadRatedMovies(nextPage = 1) {
        const { data } = await getTopRated(nextPage)
        if (nextPage === 1) {
            setRatedMovies(data.results)
        } else {
            setRatedMovies(prev => [...prev, ...data.results])
        }
    }

    async function loadTrendingSeries(nextPage = 1) {
        const { data } = await getTrendingSeries(nextPage)
        if (nextPage === 1) {
            setTrendingSeries(data.results)
        } else {
            setTrendingSeries(prev => [...prev, ...data.results])
        }
    }

    useEffect(() => {
        loadTopMovies()
        loadRatedMovies()
        loadTrendingSeries()
    }, [])

    function loadMoreTopMovies() {
        const next = pageTopMovies + 1
        setPageTopMovies(next)
        loadTopMovies(next)
    }

    function loadMoreRatedMovies() {
        const next = pageRatedMovies + 1
        setPageRatedMovies(next)
        loadRatedMovies(next)
    }

    function loadMoreTrendingSeries() {
        const next = pageTrendingSeries + 1
        setPageTrendingSeries(next)
        loadTrendingSeries(next)
    }

    if (loading) {
        return <HomeSkeleton />
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: bottom + 10 }}>

            <ContentCards
                title="Trending Movies"
                data={topMovies}
                loadMore={loadMoreTopMovies}
                category="movie"
            />

            <Separator />

            <ContentCards
                title="Top Rated Movies"
                data={ratedMovies}
                loadMore={loadMoreRatedMovies}
                category="movie"
            />

            <Separator />

            <ContentCards
                title="Trending Series"
                data={trendingSeries}
                loadMore={loadMoreTrendingSeries}
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