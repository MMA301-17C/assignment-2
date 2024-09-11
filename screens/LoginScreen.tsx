import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateAndLogin = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Please enter your email!";
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Please enter a valid email address!";
        valid = false;
      }
    }

    if (!password) {
      newErrors.password = "Please enter your password!";
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long!";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      // Perform login action here
      Alert.alert("Login successful", "Welcome to Little Lemon!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Little Lemon</Text>
      <Text style={styles.title}>Login to continue</Text>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={validateAndLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
  },
  header: {
    fontSize: 25,
    color: "#fff",
    textAlign: "center",
    marginTop: 60,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginTop: 100,
  },
  form: {
    alignItems: "center",
    marginTop: 30,
  },
  inputContainer: {
    width: 300,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    marginTop: 15,
  },
  errorText: {
    color: "red",
    position: "absolute",
    left: 10,
    top: 60,
  },
  loginButton: {
    backgroundColor: "#EE9972",
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 20,
  },
  loginButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});