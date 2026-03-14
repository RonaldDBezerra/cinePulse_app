import { colors } from "@/styles/colors";
import { Stack } from "expo-router";

export default function StackRoutesLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: colors.black },
                headerTintColor: colors.white,
                animation: "none",
                contentStyle: { backgroundColor: colors.background },
            }}
        >
            <Stack.Screen
                name="about"
                options={{ headerTitle: "Sobre o App" }}
            />
            <Stack.Screen
                name="delete-account"
                options={{ headerTitle: "Excluir Conta" }}
            />
            <Stack.Screen
                name="details/[id]/index"
                options={{ headerTitle: "Detalhes" }}
            />
        </Stack>
    );
}