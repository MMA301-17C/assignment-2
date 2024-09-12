import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { NavigationProp } from '@react-navigation/native';

interface LoginScreenProps {
  navigation: NavigationProp<any>;
}

export default function LoginScreen({ navigation }: Readonly<LoginScreenProps>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const EMAIL_REQUIRED_ERROR = "Please enter your email!";
  const INVALID_EMAIL_ERROR = "Please enter a valid email address!";
  const PASSWORD_REQUIRED_ERROR = "Please enter your password!";
  const PASSWORD_LENGTH_ERROR = "Password must be at least 8 characters long!";
  
  const validateAndLogin = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let emailError = "";
    let passwordError = "";
  
    if (!email) {
      emailError = EMAIL_REQUIRED_ERROR;
    } else if (!emailRegex.test(email)) {
      emailError = INVALID_EMAIL_ERROR;
    }
  
    if (!password) {
      passwordError = PASSWORD_REQUIRED_ERROR;
    } else if (password.length < 8) {
      passwordError = PASSWORD_LENGTH_ERROR;
    }
  
    const newErrors = {
      email: emailError,
      password: passwordError
    };
  
    setErrors(newErrors);
  
    if (!newErrors.email && !newErrors.password) {
      navigation.navigate('Welcome');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Little Lemon</Text>
      <Text style={styles.title}>Login to continue</Text>
      <View style={styles.form}>
        {["Email", "Password"].map((placeholder) => (
          <View key={placeholder} style={styles.inputContainer}>
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