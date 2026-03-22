import { AuthProvider } from "@/context/authContext";
import { colors } from "@/styles/colors";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function ProtectedLayout() {
    return (
        <SafeAreaProvider>
            <StatusBar style="light" />
            <AuthProvider>

                <Stack screenOptions={{ contentStyle: { backgroundColor: colors.background }, animation: "none", headerShown: false }}>
                    <Stack.Screen name="(protected)" />
                    <Stack.Screen name="login" />
                    <Stack.Screen name="register" />
                    <Stack.Screen name="reset" />
                </Stack>

            </AuthProvider>
        </SafeAreaProvider>
    )
}