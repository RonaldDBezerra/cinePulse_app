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
            style={{ marginLeft: 16 }}
          >
            <Text style={{ color: colors.white, fontSize: 22 }}>☰</Text>
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen name="index" options={{ headerTitle: "CinePulse" }} />
      <Drawer.Screen name="settings" options={{ headerTitle: "Configurações" }} />
    </Drawer>
  );
}
