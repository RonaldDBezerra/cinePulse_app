import { getImage } from "@/services/tmdb";
import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type HorizontalCardListProps = {
    title: string;
    data: any[];
    category: string;
    onEndReached?: () => void;
};

export default function HorizontalCardList({ title, data, category, onEndReached }: Readonly<HorizontalCardListProps>) {
    const router = useRouter();

    return (
        <>
            <Text style={styles.header}>{title}</Text>

            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ height: 210 }}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => router.push({ pathname: "/(protected)/(stack_routes)/details/[id]", params: { id: item.id, category } })}
                    >
                        <Image
                            source={{ uri: getImage(item.poster_path) }}
                            style={styles.poster}
                        />

                        <View style={styles.rating}>
                            <Text style={styles.ratingText}>
                                ⭐ {item.vote_average.toFixed(1)}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        color: colors.text,
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    card: {
        width: 120,
        height: 180,
        marginRight: 12,
    },
    poster: {
        width: 120,
        height: 180,
        borderRadius: 12,
    },
    rating: {
        position: "absolute",
        bottom: 2,
        right: 6,
        backgroundColor: "rgba(0,0,0,0.7)",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    ratingText: {
        color: colors.textSecond,
        fontSize: 12,
    },
});
