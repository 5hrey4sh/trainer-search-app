import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';

const quotes = [
  "Code like neon: bright, bold, and impossible to ignore.",
  "Dream in code, live in color.",
  "Stay curious, stay glowing.",
  "Build your world one line at a time."
];

export default function App() {
  const glowAnim = useRef(new Animated.Value(0.7)).current; // opacity for glow
  const moveAnim = useRef(new Animated.Value(0)).current;
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    // Neon glow pulse using opacity (safe)
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true, // safe because opacity
        }),
        Animated.timing(glowAnim, {
          toValue: 0.7,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true, // safe
        }),
      ])
    ).start();

    // Floating effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, {
          toValue: 10,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(moveAnim, {
          toValue: -10,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Cycle quotes
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Floating Profile Box */}
      <Animated.View
        style={[
          styles.profileBox,
          {
            transform: [{ translateY: moveAnim }],
            shadowOpacity: glowAnim, // animate shadow glow
          },
        ]}
      >
        {/* Avatar */}
        <Animated.View style={[styles.avatar, { shadowOpacity: glowAnim }]}>
          <Text style={styles.avatarText}>SA</Text>
        </Animated.View>

        <Text style={styles.title}>PROFILE</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>SHREYASH AKKI</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>USN:</Text>
          <Text style={styles.value}>4NI24IS195</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>College:</Text>
          <Text style={styles.value}>
            The National Institute of Engineering, Mysore
          </Text>
        </View>

        {/* Quote */}
        <Text style={styles.quote}>{quotes[currentQuote]}</Text>
      </Animated.View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050014',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileBox: {
    width: '90%',
    padding: 30,
    borderRadius: 20,
    backgroundColor: '#0A001F',
    borderWidth: 3,
    borderColor: '#00eaff', // fixed neon color
    shadowColor: '#00eaff',
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#120033',
    borderWidth: 3,
    borderColor: '#00eaff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#00eaff',
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 0 },
  },
  avatarText: {
    fontSize: 36,
    color: '#00eaff',
    fontWeight: '800',
    textShadowColor: '#00eaff',
    textShadowRadius: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#00eaff',
    marginBottom: 20,
    textShadowColor: '#00eaff',
    textShadowRadius: 20,
  },
  infoRow: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    color: '#b366ff',
    fontWeight: '700',
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    color: '#00eaff',
    fontWeight: '600',
    lineHeight: 24,
    textShadowColor: '#00eaff',
    textShadowRadius: 8,
  },
  quote: {
    marginTop: 25,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#ff6ec7',
    textAlign: 'center',
    lineHeight: 22,
    textShadowColor: '#ff6ec7',
    textShadowRadius: 8,
  },
});
