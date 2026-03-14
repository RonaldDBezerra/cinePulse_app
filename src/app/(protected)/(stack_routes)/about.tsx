import { StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sobre o CinePulse</Text>

      <Text style={styles.text}>
        O CinePulse é um aplicativo desenvolvido para ajudar usuários a
        descobrir filmes e séries em alta no momento.
      </Text>

      <Text style={styles.subtitle}>Dados de Filmes</Text>
      <Text style={styles.text}>
        Este produto utiliza a API da The Movie Database (TMDB), mas não é
        endossado ou certificado pelo TMDB.
      </Text>

      <Text style={styles.text}>
        Todas as informações de filmes e séries são fornecidas pela API pública
        da TMDB.
      </Text>

      <Text style={styles.version}>Versão 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
    padding: 20,
  },
  title: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    color: "#E50914",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: "#CCC",
    fontSize: 15,
    lineHeight: 22,
  },
  version: {
    marginTop: 40,
    color: "#666",
    fontSize: 14,
  },
});