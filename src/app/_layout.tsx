import { AuthProvider } from "@/context/authContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function ProtectedLayout() {
    return (
        <SafeAreaProvider>
            <StatusBar style="light" />
            <AuthProvider>

                <Stack>
                    <Stack.Screen name="(protected)" options={{ headerShown: false }} />
                    <Stack.Screen name="login" options={{ headerShown: false }} />
                    <Stack.Screen name="register" options={{ headerShown: false }} />
                    <Stack.Screen name="reset" options={{ headerShown: false }} />
                </Stack>

            </AuthProvider>
        </SafeAreaProvider>
    )
}