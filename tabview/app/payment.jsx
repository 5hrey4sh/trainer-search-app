import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

/** same safe helper used in result.jsx */
function getSearchParamsSafe() {
  try {
    // eslint-disable-next-line global-require
    const maybe = require("expo-router").useSearchParams;
    if (typeof maybe === "function") {
      return maybe() || {};
    }
  } catch (e) {
    // ignore and fallback
  }

  try {
    if (typeof window !== "undefined" && window.location && window.location.search) {
      const usp = new URLSearchParams(window.location.search);
      const obj = {};
      for (const [k, v] of usp.entries()) {
        obj[k] = v;
      }
      return obj;
    }
  } catch (err) {
    // ignore
  }

  return {};
}

export default function Payment() {
  const router = useRouter();
  const params = getSearchParamsSafe() || {};

  // decode and provide safe defaults
  const id = params.id || "";
  const carrier = params.carrier ? decodeURIComponent(String(params.carrier)) : "Carrier";
  const from = params.from ? decodeURIComponent(String(params.from)) : "From";
  const to = params.to ? decodeURIComponent(String(params.to)) : "To";
  const price = params.price ? String(params.price) : "0";

  const [name, setName] = useState("");
  const [card, setCard] = useState("");

  const onPay = () => {
    if (!name.trim() || !card.trim()) {
      Alert.alert("Missing details", "Please enter passenger name and card number (mock).");
      return;
    }
    // mock booking ref
    const ref = "BK" + Math.random().toString(36).slice(2, 9).toUpperCase();
    const qs = `?ref=${encodeURIComponent(ref)}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(
      to
    )}&price=${encodeURIComponent(price)}&carrier=${encodeURIComponent(carrier)}`;
    // use replace so back button behavior feels natural after booking
    router.replace(`/success${qs}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>

      <View style={styles.summary}>
        <Text style={styles.row}><Text style={styles.bold}>{carrier}</Text></Text>
        <Text style={styles.row}>{from} → {to}</Text>
        <Text style={styles.row}>Fare: <Text style={styles.price}>₹{price}</Text></Text>
      </View>

      <Text style={styles.label}>Passenger name</Text>
      <TextInput
        style={styles.input}
        placeholder="Your name"
        placeholderTextColor="#9aa8b3"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Card number (mock)</Text>
      <TextInput
        style={styles.input}
        placeholder="4242 4242 4242 4242"
        placeholderTextColor="#9aa8b3"
        value={card}
        onChangeText={setCard}
        keyboardType="number-pad"
      />

      <TouchableOpacity style={styles.payBtn} onPress={onPay}>
        <Text style={styles.payBtnText}>Pay ₹{price}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#121212" },
  title: { color: "#4fc3f7", fontSize: 22, fontWeight: "700", marginBottom: 14 },
  summary: { backgroundColor: "#1e1e2f", padding: 12, borderRadius: 10, marginBottom: 14 },
  row: { color: "#e0e0e0" },
  bold: { fontWeight: "700", color: "#e0e0e0" },
  price: { color: "#4fc3f7", fontWeight: "800" },
  label: { color: "#b0bec5", marginTop: 12, marginBottom: 6 },
  input: { backgroundColor: "#262634", padding: 12, borderRadius: 8, color: "#e0e0e0" },
  payBtn: { backgroundColor: "#4fc3f7", padding: 14, borderRadius: 10, alignItems: "center", marginTop: 18 },
  payBtnText: { color: "#04131a", fontWeight: "700", fontSize: 16 },
});
