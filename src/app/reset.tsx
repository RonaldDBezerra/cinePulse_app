import { router } from "expo-router";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import { resetPassword } from "../services/auth";

export default function ResetScreen() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        try {
            setLoading(true);
            await resetPassword(email);
            Alert.alert("Sucesso", "Email de recuperação enviado!");
            router.back();
        } catch (error) {
            console.error("Erro ao enviar email de recuperação:", error);
            Alert.alert("Erro", "Não foi possível enviar o email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>

            <MotiView
                from={{ opacity: 0, translateY: -20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 600 }}
            >
                <Text style={styles.title}>Recuperar Senha</Text>
            </MotiView>

            <MotiView
                from={{ opacity: 0, translateY: 30 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 200, duration: 500 }}
            >
                <TextInput
                    placeholder="Digite seu email"
                    placeholderTextColor="#6B7280"
                    style={styles.input}
                    value={email}
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
            </MotiView>

            <MotiView
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 400, type: "spring" }}
            >
                <TouchableOpacity style={styles.button} onPress={handleReset}>
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.buttonText}>Enviar link</Text>
                    )}
                </TouchableOpacity>
            </MotiView>

            <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.linkSecondary}>Voltar para login</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0F0F0F",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#E50914",
        textAlign: "center",
        marginBottom: 40,
    },
    input: {
        backgroundColor: "#1C1C1C",
        height: 52,
        borderRadius: 12,
        paddingHorizontal: 16,
        color: "#FFF",
        marginBottom: 16,
    },
    button: {
        backgroundColor: "#E50914",
        height: 52,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16,
    },
    link: {
        color: "#FFF",
        textAlign: "center",
        marginTop: 24,
    },
    linkSecondary: {
        color: "#6B7280",
        textAlign: "center",
        marginTop: 8,
    },
    error: {
        color: "#EF4444",
        textAlign: "center",
        marginBottom: 10,
    },
});