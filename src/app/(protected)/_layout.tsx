import { AuthContext } from "@/context/authContext";
import { colors } from "@/styles/colors";
import { Redirect, Stack } from "expo-router";
import { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false, animation: "none", contentStyle: { backgroundColor: colors.background } }}>
        <Stack.Screen name="(drawer)" />
        <Stack.Screen name="(stack_routes)" />
      </Stack>
    </GestureHandlerRootView>
  );
}