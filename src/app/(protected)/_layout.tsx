import { AuthContext } from "@/context/authContext";
import { colors } from "@/styles/colors";
import { Redirect, Stack } from "expo-router";
import { useContext } from "react";
import { ActivityIndicator, View } from "react-native";


export default function ProtectedLayout() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{headerStyle: { backgroundColor: colors.black }, headerTintColor: colors.white }} >
        <Stack.Screen name="index" options={{ headerTitle: "Home" }} />
        <Stack.Screen name="details/[id]/index" options={{ headerTitle: "Detalhes" }} />
    </Stack>
  );
}