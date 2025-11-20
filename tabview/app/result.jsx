import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

// safe get item (AsyncStorage if present, else localStorage)
async function safeGetItem(key) {
  try {
    // try AsyncStorage
    // eslint-disable-next-line global-require
    const AsyncStorage = require("@react-native-async-storage/async-storage").default;
    if (AsyncStorage && typeof AsyncStorage.getItem === "function") {
      const json = await AsyncStorage.getItem(key);
      return json ? JSON.parse(json) : null;
    }
  } catch (e) {
    // ignore
  }

  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const json = window.localStorage.getItem(key);
      return json ? JSON.parse(json) : null;
    }
  } catch (err) {
    // ignore
  }

  return null;
}

const makeFlights = (from = "Unknown", to = "Unknown") => {
  const carriers = ["AirSwift", "SkyJet", "IndiFly", "GoAirX", "CloudAir"];
  return Array.from({ length: 5 }).map((_, i) => {
    const carrier = carriers[i % carriers.length];
    const depart = `${7 + i}:00`;
    const arrive = `${9 + i}:30`;
    const duration = `${2 + (i % 3)}h ${15 * (i % 4)}m`;
    const price = 1500 + i * 600;
    const id = `${from}_${to}_${i}`;
    return { id, carrier, depart, arrive, duration, price };
  });
};

export default function Result() {
  const router = useRouter();
  const [search, setSearch] = useState({ from: "Unknown", to: "Unknown" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await safeGetItem("lastSearch");
      if (!mounted) return;
      if (data && data.from && data.to) {
        setSearch({ from: String(data.from), to: String(data.to) });
        // eslint-disable-next-line no-console
        console.log("Loaded lastSearch from storage:", data);
      } else {
        // fallback: if no storage, leave Unknown (or you could set defaults)
        // eslint-disable-next-line no-console
        console.log("No lastSearch found in storage.");
      }
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const flights = useMemo(() => makeFlights(search.from, search.to), [search]);

  const goToPayment = (flight) => {
    if (!flight) return;
    // pass minimal info via query string OR store selected flight in storage
    // Here we'll use query string for the payment step (safe)
    const qs = `?id=${encodeURIComponent(flight.id)}&carrier=${encodeURIComponent(
      flight.carrier
    )}&from=${encodeURIComponent(search.from)}&to=${encodeURIComponent(search.to)}&price=${encodeURIComponent(
      String(flight.price)
    )}`;
    router.push(`/payment${qs}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Flights: {search.from} → {search.to}</Text>
      <Text style={styles.sub}>{loading ? "Loading…" : `Showing ${flights.length} options`}</Text>

      <FlatList
        data={flights}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingVertical: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.carrier}>{item.carrier}</Text>
              <Text style={styles.price}>₹{item.price}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.time}>{item.depart} → {item.arrive}</Text>
              <Text style={styles.duration}>{item.duration}</Text>
            </View>

            <TouchableOpacity style={styles.bookBtn} onPress={() => goToPayment(item)}>
              <Text style={styles.bookBtnText}>Book — ₹{item.price}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  header: { color: "#4fc3f7", fontSize: 20, fontWeight: "700" },
  sub: { color: "#b0bec5", marginBottom: 12 },
  card: { backgroundColor: "#1e1e2f", padding: 14, borderRadius: 10, marginBottom: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  carrier: { color: "#e0e0e0", fontWeight: "700" },
  price: { color: "#4fc3f7", fontWeight: "700" },
  time: { color: "#cfd8dc" },
  duration: { color: "#9aa8b3" },
  bookBtn: { backgroundColor: "#4fc3f7", padding: 10, borderRadius: 8, alignItems: "center", marginTop: 8 },
  bookBtnText: { color: "#04131a", fontWeight: "700" },
});
