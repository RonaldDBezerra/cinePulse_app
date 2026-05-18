import { colors } from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

function HomeIcon({ color, size }: Readonly<{ color: string; size: number }>) {
  return <Ionicons name="home" size={size} color={color} />;
}

function SearchIcon({ color, size }: Readonly<{ color: string; size: number }>) {
  return <Ionicons name="search" size={size} color={color} />;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.black,
          borderTopColor: colors.card,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name="(drawer)"
        options={{
          title: "Home",
          tabBarIcon: HomeIcon,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Pesquisar",
          tabBarIcon: SearchIcon,
        }}
      />
    </Tabs>
  );
}
