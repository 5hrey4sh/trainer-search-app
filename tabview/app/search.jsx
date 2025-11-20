import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";
import { useRouter } from "expo-router";

// helper: write storage in a safe way (AsyncStorage if present, otherwise localStorage for web)
async function safeSetItem(key, valueObj) {
  const json = JSON.stringify(valueObj);
  try {
    // try AsyncStorage (native)
    // eslint-disable-next-line global-require
    const AsyncStorage = require("@react-native-async-storage/async-storage").default;
    if (AsyncStorage && typeof AsyncStorage.setItem === "function") {
      await AsyncStorage.setItem(key, json);
      return;
    }
  } catch (e) {
    // ignore if package not installed
  }

  // fallback for web
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(key, json);
      return;
    }
  } catch (err) {
    // ignore
  }

  // final fallback: nothing (but avoid crash)
  // eslint-disable-next-line no-console
  console.warn("No persistent storage available to save search.");
}

export default function Search() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const onSearch = async () => {
    const sFrom = String(from || "").trim();
    const sTo = String(to || "").trim();

    if (!sFrom || !sTo) {
      Alert.alert("Missing fields", "Please enter both From and To.");
      return;
    }

    // Save search into storage (key: lastSearch)
    await safeSetItem("lastSearch", { from: sFrom, to: sTo, ts: Date.now() });

    // Debug log
    // eslint-disable-next-line no-console
    console.log("Saved search ->", { from: sFrom, to: sTo });

    // navigate to result page (filename: app/result.jsx -> route /result)
    try {
      await router.push("/result");
    } catch (e) {
      // fallback push without await
      router.push("/result");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Flights</Text>

      <Text style={styles.label}>From</Text>
      <TextInput
        value={from}
        onChangeText={setFrom}
        placeholder="City or airport (e.g. Mysore)"
        placeholderTextColor="#9aa8b3"
        style={styles.input}
      />

      <Text style={styles.label}>To</Text>
      <TextInput
        value={to}
        onChangeText={setTo}
        placeholder="City or airport (e.g. Bengaluru)"
        placeholderTextColor="#9aa8b3"
        style={styles.input}
      />

      <TouchableOpacity style={styles.btn} onPress={onSearch}>
        <Text style={styles.btnText}>Search Flights</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#121212" },
  title: { color: "#4fc3f7", fontSize: 26, fontWeight: "700", marginBottom: 20 },
  label: { color: "#b0bec5", marginTop: 8 },
  input: {
    backgroundColor: "#1e1e2f",
    color: "#e0e0e0",
    padding: 12,
    borderRadius: 8,
    marginTop: 6,
  },
  btn: { backgroundColor: "#4fc3f7", padding: 14, marginTop: 18, borderRadius: 10, alignItems: "center" },
  btnText: { color: "#04131a", fontWeight: "700" },
});
