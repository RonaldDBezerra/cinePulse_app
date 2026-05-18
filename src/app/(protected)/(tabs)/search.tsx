import HorizontalCardList from "@/components/HorizontalCardList";
import { searchMovies, searchTv } from "@/services/tmdb";
import { colors } from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useRef, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SearchResult = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
};

export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<SearchResult[]>([]);
  const [series, setSeries] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { top, bottom } = useSafeAreaInsets();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback((text: string) => {
    setQuery(text);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (text.trim().length < 2) {
      setMovies([]);
      setSeries([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    debounceRef.current = setTimeout(async () => {
      try {
        const [moviesRes, seriesRes] = await Promise.all([
          searchMovies(text.trim()),
          searchTv(text.trim()),
        ]);

        setMovies(
          moviesRes.data.results.filter((item: SearchResult) => item.poster_path)
        );
        setSeries(
          seriesRes.data.results.filter((item: SearchResult) => item.poster_path)
        );
      } catch {
        setMovies([]);
        setSeries([]);
      } finally {
        setLoading(false);
      }
    }, 500);
  }, []);

  const hasResults = movies.length > 0 || series.length > 0;

  return (
    <View style={[styles.container, { paddingTop: top + 16 }]}>
      <Text style={styles.title}>Buscar</Text>

      <View style={styles.inputContainer}>
        <Ionicons
          name="search"
          size={20}
          color={colors.textSecondary}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Buscar filmes e séries..."
          placeholderTextColor={colors.textSecondary}
          value={query}
          onChangeText={handleSearch}
          autoCorrect={false}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch("")}>
            <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {loading && (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loader}
        />
      )}

      {!loading && query.length >= 2 && !hasResults && (
        <View style={styles.emptyState}>
          <Ionicons name="film-outline" size={64} color={colors.textSecondary} />
          <Text style={styles.emptyText}>Nenhum resultado encontrado</Text>
        </View>
      )}

      {!loading && query.length < 2 && !hasResults && (
        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={64} color={colors.textSecondary} />
          <Text style={styles.emptyText}>
            Digite pelo menos 2 caracteres para buscar
          </Text>
        </View>
      )}

      {!loading && hasResults && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: bottom + 16 }}
          keyboardShouldPersistTaps="handled"
        >
          {movies.length > 0 && (
            <HorizontalCardList
              title="🎬 Filmes"
              data={movies}
              category="movie"
            />
          )}

          {series.length > 0 && (
            <HorizontalCardList
              title="📺 Séries"
              data={series}
              category="serie"
            />
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    color: colors.text,
    fontSize: 16,
  },
  loader: {
    marginTop: 32,
  },
  emptyState: {
    alignItems: "center",
    marginTop: 64,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
  },
});
