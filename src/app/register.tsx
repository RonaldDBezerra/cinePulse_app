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
import { register } from "../services/auth";

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await register(email, password);
      Alert.alert("Sucesso", "Conta criada com sucesso!");
    } catch (err: any) {
      setError("Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding"  style={styles.container}>
      
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 600 }}
      >
        <Text style={styles.title}>Criar Conta</Text>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 200, duration: 500 }}
      >
        <TextInput
          placeholder="Email"
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
        transition={{ delay: 350, duration: 500 }}
      >
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#6B7280"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 450, duration: 500 }}
      >
        <TextInput
          placeholder="Confirmar senha"
          placeholderTextColor="#6B7280"
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </MotiView>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 600, type: "spring" }}
      >
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Criar Conta</Text>
          )}
        </TouchableOpacity>
      </MotiView>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.link}>Já tenho conta</Text>
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