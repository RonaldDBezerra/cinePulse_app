import { AuthContext } from "@/context/authContext";
import { logout } from "@/services/auth";
import { colors } from "@/styles/colors";
import {
    DrawerContentComponentProps,
    DrawerContentScrollView
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type MenuItem = {
    label: string;
    icon: string;
    route: string;
};

const menuItems: MenuItem[] = [
    { label: "Home", icon: "🏠", route: "/(protected)/(drawer)" },
    { label: "Configurações", icon: "⚙️", route: "/(protected)/(drawer)/settings" },
];

export default function CustomDrawer(props: DrawerContentComponentProps) {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    async function handleLogout() {
        await logout();
        router.replace("/login");
    }

    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={styles.container}
        >
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {user?.email?.[0].toUpperCase() ?? "?"}
                    </Text>
                </View>
                <Text style={styles.email} numberOfLines={1}>
                    {user?.email}
                </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.menu}>
                {menuItems.map((item) => (
                    <TouchableOpacity
                        key={item.label}
                        style={styles.menuItem}
                        onPress={() => {
                            props.navigation.closeDrawer();
                            router.push(item.route as any);
                        }}
                    >
                        <Text style={styles.menuIcon}>{item.icon}</Text>
                        <Text style={styles.menuLabel}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutIcon}>🚪</Text>
                <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.card,
        paddingTop: 0,
    },

    header: {
        padding: 24,
        paddingTop: 40,
        backgroundColor: colors.black,
        alignItems: "center",
    },

    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },

    avatarText: {
        color: colors.white,
        fontSize: 26,
        fontWeight: "bold",
    },

    email: {
        color: colors.textSecondary,
        fontSize: 13,
    },

    divider: {
        height: 1,
        backgroundColor: "#333",
        marginVertical: 8,
    },

    menu: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },

    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginBottom: 4,
    },

    menuIcon: {
        fontSize: 20,
        marginRight: 14,
    },

    menuLabel: {
        color: colors.text,
        fontSize: 16,
        fontWeight: "500",
    },

    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 24,
        marginTop: 8,
    },

    logoutIcon: {
        fontSize: 20,
        marginRight: 14,
    },

    logoutText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: "600",
    },
});
