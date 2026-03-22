import React, { useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";

import { BACKDROP_BASE, getMovieDetails, getMovieProviders, getSerieDetails, getSerieProviders, IMAGE_BASE } from "@/services/tmdb";

import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

import { colors } from "@/styles/colors";
import { useLocalSearchParams } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import DetailsSkeleton from "@/components/DetailsSkeleton";
import { FlatList } from "react-native-gesture-handler";

export default function DetailsScreen() {
    const { id, category } = useLocalSearchParams();
    const { bottom } = useSafeAreaInsets();
    const [data, setData] = useState<any>(null);
    const [dataProviders, setDataProviders] = useState<any>(null);

    async function loadMovieDetails() {
        if (category === "movie") {
            const { data } = await getMovieDetails(Number(id));

            const providers = await getMovieProviders(Number(id));

            setDataProviders(providers.data.results?.BR);
            setData(data);
        } else if (category === "serie") {
            const { data } = await getSerieDetails(Number(id));
            const providers = await getSerieProviders(Number(id));

            setDataProviders(providers.data.results?.BR);
            setData(data);
        }
    }

    useEffect(() => {
        loadMovieDetails();
    }, []);

    if (!data) return <DetailsSkeleton />;

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container} contentContainerStyle={{ paddingBottom: bottom + 10 }}>

            <View style={styles.backdropContainer}>
                <Image
                    source={{ uri: BACKDROP_BASE + data.backdrop_path }}
                    style={styles.backdrop}
                />

                <LinearGradient
                    colors={["transparent", "#0F0F0F"]}
                    style={styles.gradient}
                />
            </View>

            <Animated.View
                entering={FadeInUp.duration(600)}
                style={styles.headerContent}
            >
                <BlurView intensity={40} style={styles.posterContainer}>
                    <Image
                        source={{ uri: IMAGE_BASE + data.poster_path }}
                        style={styles.poster}
                    />
                </BlurView>

                <View style={styles.movieInfo}>
                    <Text style={styles.title}>{data.title}</Text>

                    <Text style={styles.meta}>
                        ⭐ {data.vote_average.toFixed(1)} {(category === "movie") && `• ${data.release_date?.slice(0, 4)}`}
                    </Text>

                    <Text style={styles.genre}>
                        {data.genres?.map((g: any) => g.name).join(" / ")}
                    </Text>

                    <View style={{ flexDirection: "row", marginTop: 5, alignItems: "center" }}>
                        <FlatList
                            horizontal
                            data={dataProviders?.flatrate}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.provider_id.toString()}
                            renderItem={({ item: provider }) => (
                                <Image
                                    key={provider.provider_id}
                                    source={{ uri: IMAGE_BASE + provider.logo_path }}
                                    style={{ width: 40, height: 40, marginRight: 8 }}
                                />
                            )}
                        />
                    </View>
                </View>
            </Animated.View>

            <Animated.View
                entering={FadeInUp.delay(200).duration(600)}
                style={styles.section}
            >
                <Text style={styles.sectionTitle}>Sinopse</Text>

                <Text style={styles.overview}>
                    {data.overview}
                </Text>
            </Animated.View>

            <Animated.View
                entering={FadeInUp.delay(300).duration(600)}
                style={styles.section}
            >
                {(category === "movie") ?
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Duração:</Text>
                        <Text style={styles.infoValue}>{data.runtime} min</Text>
                    </View> :

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Numero de Eps:</Text>
                        <Text style={styles.infoValue}>{data.number_of_episodes} eps</Text>
                    </View>
                }

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Status:</Text>
                    <Text style={styles.infoValue}>{data.status}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Idioma:</Text>
                    <Text style={styles.infoValue}>{data.original_language}</Text>
                </View>
            </Animated.View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingBottom: 20
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

    section: {
        paddingHorizontal: 20,
        marginBottom: 24
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.white,
        marginBottom: 10
    },

    overview: {
        fontSize: 15,
        color: "#CFCFCF",
        lineHeight: 22
    },

    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
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
    },
});