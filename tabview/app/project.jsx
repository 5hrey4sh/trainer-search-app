import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Project() {
  return (
    <View style={styles.container}>
      <Text style={styles.projectName}>To-Do List App</Text>
      <Text style={styles.projectDetails}>
        A simple React Native project built with JavaScript.{"\n\n"}
        Features:
        {"\n"}- Add tasks
        {"\n"}- Mark tasks as completed
        {"\n"}- Delete tasks{"\n\n"}
        Perfect for beginners to learn state management, user input, and simple UI design.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  projectName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#4fc3f7',
    marginBottom: 15,
    textShadowColor: '#1a1a1a',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  projectDetails: {
    fontSize: 18,
    color: '#e0e0e0',
    lineHeight: 28,
  },
});
