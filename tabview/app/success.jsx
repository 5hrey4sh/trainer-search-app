import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

/** reuse safe param helper */
function getSearchParamsSafe() {
  try {
    // eslint-disable-next-line global-require
    const maybe = require("expo-router").useSearchParams;
    if (typeof maybe === "function") {
      return maybe() || {};
    }
  } catch (e) {
    // ignore
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

export default function Success() {
  const router = useRouter();
  const params = getSearchParamsSafe() || {};

  const ref = params.ref ? decodeURIComponent(String(params.ref)) : "—";
  const from = params.from ? decodeURIComponent(String(params.from)) : "";
  const to = params.to ? decodeURIComponent(String(params.to)) : "";
  const price = params.price ? String(params.price) : "";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Confirmed</Text>

      <View style={styles.card}>
        <Text style={styles.row}>Ref: <Text style={styles.bold}>{ref}</Text></Text>
        <Text style={styles.row}>{from} → {to}</Text>
        <Text style={[styles.row, { marginTop: 8 }]}>Paid: <Text style={styles.price}>₹{price}</Text></Text>
      </View>

      <TouchableOpacity style={styles.homeBtn} onPress={() => router.push("/")}>
        <Text style={styles.homeBtnText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#121212", alignItems: "center", justifyContent: "center" },
  title: { color: "#4fc3f7", fontSize: 22, fontWeight: "700", marginBottom: 14 },
  card: { backgroundColor: "#1e1e2f", padding: 18, borderRadius: 12, width: "100%" },
  row: { color: "#e0e0e0", marginBottom: 6 },
  bold: { fontWeight: "700", color: "#e0e0e0" },
  price: { color: "#4fc3f7", fontWeight: "800" },
  homeBtn: { marginTop: 18, backgroundColor: "#4fc3f7", padding: 12, borderRadius: 10 },
  homeBtnText: { color: "#04131a", fontWeight: "700" },
});
