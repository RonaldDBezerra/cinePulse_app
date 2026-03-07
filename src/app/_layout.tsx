import { AuthProvider } from "@/context/authContext";
import { Stack } from "expo-router";

export default function ProtectedLayout() {
    return (
        <AuthProvider>

            <Stack>
                <Stack.Screen name="(protected)" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="register" options={{ headerShown: false }} />
                <Stack.Screen name="reset" options={{ headerShown: false }} />
            </Stack>

        </AuthProvider>
    )
}