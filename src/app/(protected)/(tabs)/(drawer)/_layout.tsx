import CustomDrawer from "@/components/CustomDrawer";
import { colors } from "@/styles/colors";
import { Drawer } from "expo-router/drawer";
import { Text, TouchableOpacity } from "react-native";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: colors.black },
        headerTintColor: colors.white,
        drawerStyle: { width: 280 },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{ marginHorizontal: 16 }}
          >
            <Text style={{ color: colors.white, fontSize: 25 }}>☰</Text>
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen name="index" />
      <Drawer.Screen name="filmes" options={{ headerTitle: "Filmes" }} />
      <Drawer.Screen name="series" options={{ headerTitle: "Séries" }} />
      <Drawer.Screen name="settings" options={{ headerTitle: "Configurações" }} />
    </Drawer>
  );
}
