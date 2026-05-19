import React, {
    useEffect,
    useState
} from "react";

import {
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";

import {
    BACKDROP_BASE,
    getMovieDetails,
    getMovieProviders,
    getSerieDetails,
    getSerieProviders,
    getSerieRatingsGrid,
    IMAGE_BASE,
} from "@/services/tmdb";

import { BlurView } from "expo-blur";

import { LinearGradient } from "expo-linear-gradient";

import { colors } from "@/styles/colors";

import { useLocalSearchParams } from "expo-router";

import Animated, { FadeInUp } from "react-native-reanimated";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import DetailsSkeleton from "@/components/DetailsSkeleton";
import { SeasonGrid } from "@/types/services-types";

interface IStatusTranslation extends Record<string, string> {
    "Returning Series": "Retorno da série";
    "Ended": "Finalizada";
    "Released": "Lançado recentemente";
    "Post Production": "Em pós-produção";
}

export default function DetailsScreen() {

    const { id, category } =
        useLocalSearchParams();

    const { bottom } =
        useSafeAreaInsets();

    const [data, setData] =
        useState<any>(null);

    const [providers, setProviders] =
        useState<any>(null);

    const [ratingsGrid, setRatingsGrid] =
        useState<SeasonGrid[]>([]);

    const [expandedSeasons,
        setExpandedSeasons] =
        useState<number[]>([1]);

    const statusTranslation: IStatusTranslation = {
        "Returning Series": "Retorno da série",
        "Ended": "Finalizada",
        "Released": "Lançado recentemente",
        "Post Production": "Em pós-produção",
    }

    async function loadDetails() {

        try {

            if (category === "movie") {

                const { data } =
                    await getMovieDetails(
                        Number(id)
                    );

                const providers =
                    await getMovieProviders(
                        Number(id)
                    );

                setProviders(
                    providers.data.results?.BR
                );

                setData(data);

            } else {

                const [
                    details,
                    providers,
                    ratings
                ] = await Promise.all([
                    getSerieDetails(Number(id)),
                    getSerieProviders(Number(id)),
                    getSerieRatingsGrid(Number(id))
                ]);

                setProviders(
                    providers.data.results?.BR
                );

                setRatingsGrid(ratings);

                setData(details.data);
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadDetails();
    }, []);

    function toggleSeason(
        seasonNumber: number
    ) {

        setExpandedSeasons(prev => {

            if (prev.includes(seasonNumber)) {

                return prev.filter(
                    item => item !== seasonNumber
                );
            }

            return [...prev, seasonNumber];
        });
    }

    function getRatingColor(
        rating: number
    ) {

        if (rating >= 9)
            return "#0B8F55";

        if (rating >= 8)
            return "#22C55E";

        if (rating >= 7)
            return "#84CC16";

        if (rating >= 6)
            return "#EAB308";

        return "#EF4444";
    }

    function InfoRow({
        label,
        value
    }: {
        label: string;
        value: string;
    }) {

        return (
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                    {label}
                </Text>

                <Text style={styles.infoValue}>
                    {value}
                </Text>
            </View>
        );
    }

    if (!data)
        return <DetailsSkeleton />;

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}
            contentContainerStyle={{
                paddingBottom: bottom + 40
            }}
        >

            <View style={styles.backdropContainer}>

                <Image
                    source={{
                        uri:
                            BACKDROP_BASE +
                            data.backdrop_path
                    }}
                    style={styles.backdrop}
                />

                <LinearGradient
                    colors={[
                        "transparent",
                        "#0e0d0d"
                    ]}
                    style={styles.gradient}
                />
            </View>

            <Animated.View
                entering={FadeInUp.duration(500)}
                style={styles.headerContent}
            >

                <BlurView
                    intensity={40}
                    style={styles.posterContainer}
                >

                    <Image
                        source={{
                            uri:
                                IMAGE_BASE +
                                data.poster_path
                        }}
                        style={styles.poster}
                    />
                </BlurView>

                <View style={styles.movieInfo}>

                    <Text style={styles.title}>
                        {data.title || data.name}
                    </Text>

                    <Text style={styles.meta}>
                        ⭐ {data.vote_average.toFixed(1)}
                    </Text>

                    <Text style={styles.genre}>
                        {data.genres
                            ?.map((g: any) => g.name)
                            .join(" / ")}
                    </Text>

                    <FlatList
                        horizontal
                        data={providers?.flatrate}
                        keyExtractor={(item) =>
                            item.provider_id.toString()
                        }
                        showsHorizontalScrollIndicator={
                            false
                        }
                        contentContainerStyle={{
                            marginTop: 10
                        }}
                        renderItem={({ item }) => (
                            <Image
                                source={{
                                    uri:
                                        IMAGE_BASE +
                                        item.logo_path
                                }}
                                style={styles.providerLogo}
                            />
                        )}
                    />
                </View>
            </Animated.View>

            <Animated.View
                entering={FadeInUp.delay(100)}
                style={styles.section}
            >

                <Text style={styles.sectionTitle}>
                    Sinopse
                </Text>

                <Text style={styles.overview}>
                    {data.overview}
                </Text>
            </Animated.View>

            {category === "serie" && (
                <Animated.View
                    entering={FadeInUp.delay(200)}
                    style={styles.section}
                >

                    <Text style={styles.sectionTitle}>
                        Avaliações por temporada
                    </Text>

                    {ratingsGrid.map((season) => {

                        const isExpanded =
                            expandedSeasons.includes(
                                season.season
                            );

                        return (
                            <View
                                key={season.season}
                                style={styles.seasonContainer}
                            >

                                <Pressable
                                    onPress={() =>
                                        toggleSeason(
                                            season.season
                                        )
                                    }
                                    style={styles.seasonHeader}
                                >

                                    <Text
                                        style={styles.seasonTitle}
                                    >
                                        Temporada{" "}
                                        {season.season}
                                    </Text>

                                    <Text
                                        style={styles.expandText}
                                    >
                                        {isExpanded
                                            ? "Ocultar"
                                            : "Mostrar"}
                                    </Text>
                                </Pressable>

                                {isExpanded && (

                                    <View style={styles.grid}>

                                        {season.episodes.map(
                                            (ep) => (

                                                <View
                                                    key={ep.episode}
                                                    style={[
                                                        styles.ratingBox,
                                                        {
                                                            backgroundColor:
                                                                getRatingColor(
                                                                    ep.rating
                                                                )
                                                        }
                                                    ]}
                                                >

                                                    <Text
                                                        style={
                                                            styles.episodeNumber
                                                        }
                                                    >
                                                        E{ep.episode}
                                                    </Text>

                                                    <Text
                                                        style={
                                                            styles.ratingText
                                                        }
                                                    >
                                                        {ep.rating.toFixed(
                                                            1
                                                        )}
                                                    </Text>
                                                </View>
                                            )
                                        )}
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </Animated.View>
            )}

            <Animated.View
                entering={FadeInUp.delay(300)}
                style={styles.section}
            >

                {category === "movie" ? (

                    <InfoRow
                        label="Duração"
                        value={`${data.runtime} min`}
                    />

                ) : (

                    <InfoRow
                        label="Episódios"
                        value={`${data.number_of_episodes}`}
                    />
                )}

                <InfoRow
                    label="Status"
                    value={statusTranslation[data.status] || data.status}
                />

                <InfoRow
                    label="Idioma"
                    value={data.original_language}
                />
            </Animated.View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor:
            colors.background
    },

    backdropContainer: {
        width: "100%",
        height: 260
    },

    backdrop: {
        width: "100%",
        height: "100%"
    },

    gradient: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 120
    },

    headerContent: {
        flexDirection: "row",
        paddingHorizontal: 20,
        marginTop: -80,
        marginBottom: 20
    },

    posterContainer: {
        borderRadius: 16,
        overflow: "hidden"
    },

    poster: {
        width: 130,
        height: 190,
        borderRadius: 16
    },

    movieInfo: {
        flex: 1,
        marginLeft: 16,
        justifyContent: "center"
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: colors.white,
        marginBottom: 8
    },

    meta: {
        fontSize: 15,
        color: colors.textSecond,
        marginBottom: 6
    },

    genre: {
        fontSize: 14,
        color: "#B0B0B0"
    },

    providerLogo: {
        width: 42,
        height: 42,
        borderRadius: 12,
        marginRight: 8
    },

    section: {
        paddingHorizontal: 20,
        marginBottom: 26
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.white,
        marginBottom: 14
    },

    overview: {
        fontSize: 15,
        color: "#CFCFCF",
        lineHeight: 24
    },

    seasonContainer: {
        marginBottom: 20
    },

    seasonHeader: {
        flexDirection: "row",
        justifyContent:
            "space-between",
        alignItems: "center",
        marginBottom: 14
    },

    seasonTitle: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "bold"
    },

    expandText: {
        color: "#888",
        fontSize: 13
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8
    },

    ratingBox: {
        width: 58,
        height: 58,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center"
    },

    episodeNumber: {
        color: "#fff",
        fontSize: 11,
        opacity: 0.8
    },

    ratingText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold"
    },

    infoRow: {
        flexDirection: "row",
        justifyContent:
            "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#222"
    },

    infoLabel: {
        color: "#AAA",
        fontSize: 14
    },

    infoValue: {
        color: colors.white,
        fontSize: 14
    }
});