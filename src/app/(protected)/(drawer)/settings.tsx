import { logout } from "@/services/auth";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configurações</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/(protected)/(stack_routes)/about")}
            >
                <Text style={styles.buttonText}>Sobre o App</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/(protected)/(stack_routes)/delete-account")}
            >
                <Text style={styles.buttonText}>Excluir Conta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logout} onPress={() => logout()}>
                <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0F0F0F",
        padding: 20,
    },
    title: {
        color: "#FFF",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
    },
    button: {
        backgroundColor: "#1C1C1C",
        padding: 16,
        borderRadius: 12,
        marginBottom: 15,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
    },
    logout: {
        marginTop: 30,
    },
    logoutText: {
        color: "#E50914",
        fontSize: 16,
    },
});