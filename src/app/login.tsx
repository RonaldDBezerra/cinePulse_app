import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { login } from "../services/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      await login(email, password);
      router.replace("/(protected)");
    } catch (err: any) {
      console.error("Erro ao fazer login:", err);
      setError("Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 600 }}
      >
        <Text style={styles.title}>CinePulse</Text>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 200, type: "timing", duration: 500 }}
      >
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#6B7280"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 350, type: "timing", duration: 500 }}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#6B7280"
            style={styles.inputFlex}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(v => !v)} style={styles.eyeButton}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </MotiView>

      {error ? (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", duration: 300 }}
        >
          <Text style={styles.error}>{error}</Text>
        </MotiView>
      ) : null}

      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 500, type: "spring" }}
      >
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
      </MotiView>

      <TouchableOpacity
        onPress={() => router.push("/register")}
      >
        <Text style={styles.link}>Criar conta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/reset")}
      >
        <Text style={styles.linkSecondary}>Esqueci minha senha</Text>
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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1C",
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inputFlex: {
    flex: 1,
    color: "#FFF",
  },
  eyeButton: {
    padding: 4,
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