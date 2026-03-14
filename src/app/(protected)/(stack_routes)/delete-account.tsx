import { deleteAccount, getCurrentUser, logout } from "@/services/auth";
import { colors } from "@/styles/colors";
import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function DeleteAccountScreen() {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        Alert.alert(
            "Excluir Conta",
            "Tem certeza que deseja excluir sua conta permanentemente?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            setLoading(true);
                            const user = getCurrentUser();

                            if (user) {
                                await deleteAccount(user);
                                logout();
                            }
                        } catch (error) {
                            Alert.alert(
                                "Erro",
                                "Por segurança, faça login novamente antes de excluir a conta."
                            );
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Excluir Conta</Text>

            <Text style={styles.warning}>
                Ao excluir sua conta, todos os seus dados serão removidos
                permanentemente.
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleDelete}>
                <Text style={styles.buttonText}>
                    {loading ? "Excluindo..." : "Excluir Minha Conta"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
    },
    title: {
        color: colors.white,
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    warning: {
        color: colors.warningText,
        fontSize: 15,
        marginBottom: 30,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "bold",
    },
});