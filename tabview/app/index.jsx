import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.welcomeText}>Welcome to Book My Flight !</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}><Text style={styles.label}>Name:</Text> SHREYASH</Text>
        <Text style={styles.infoText}><Text style={styles.label}>USN:</Text> 4NI24IS195</Text>
        <Text style={styles.infoText}><Text style={styles.label}>College:</Text> The National Institute Of Engineering, Mysore</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4fc3f7',
    textAlign: 'center',
    marginBottom: 25,
  },
  infoContainer: {
    backgroundColor: '#1e1e2f',
    padding: 20,
    borderRadius: 12,
    width: '100%',
  },
  infoText: {
    fontSize: 18,
    color: '#e0e0e0',
    marginBottom: 12,
  },
  label: {
    fontWeight: '700',
    color: '#4fc3f7',
  },
});
