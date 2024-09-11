import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateAndLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {
      email: !email ? "Please enter your email!" : !emailRegex.test(email) ? "Please enter a valid email address!" : "",
      password: !password ? "Please enter your password!" : password.length < 8 ? "Password must be at least 8 characters long!" : ""
    };
    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      Alert.alert("Login successful", "Welcome to Little Lemon!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Little Lemon</Text>
      <Text style={styles.title}>Login to continue</Text>
      <View style={styles.form}>
        {["Email", "Password"].map((placeholder, index) => (
          <View key={index} style={styles.inputContainer}>
            <TextInput
              placeholder={placeholder}
              keyboardType={placeholder === "Email" ? "email-address" : "default"}
              secureTextEntry={placeholder === "Password"}
              style={styles.input}
              value={placeholder === "Email" ? email : password}
              onChangeText={placeholder === "Email" ? setEmail : setPassword}
            />
            {errors[placeholder.toLowerCase() as keyof typeof errors] && <Text style={styles.errorText}>{errors[placeholder.toLowerCase() as keyof typeof errors]}</Text>}
          </View>
        ))}
        <TouchableOpacity style={styles.loginButton} onPress={validateAndLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#333333" },
  header: { fontSize: 25, color: "#fff", textAlign: "center", marginTop: 60 },
  title: { fontSize: 20, color: "#fff", textAlign: "center", marginTop: 100 },
  form: { alignItems: "center", marginTop: 30 },
  inputContainer: { width: 300, marginBottom: 20 },
  input: { backgroundColor: "#fff", height: 40, borderColor: "gray", borderWidth: 1, paddingLeft: 10, marginTop: 15 },
  errorText: { color: "red", position: "absolute", left: 10, top: 60 },
  loginButton: { backgroundColor: "#EE9972", width: 200, height: 50, justifyContent: "center", alignItems: "center", borderRadius: 25, marginTop: 20 },
  loginButtonText: { color: "#000", fontSize: 18, fontWeight: "bold" },
});