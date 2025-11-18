import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>

        {/* Neon Avatar Circle */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>SA</Text>
        </View>

        {/* Profile Heading */}
        <Text style={styles.title}>PROFILE</Text>

        {/* Profile Details */}
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
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050014', // dark cyberpunk background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  profileBox: {
    width: '90%',
    padding: 30,
    borderRadius: 20,
    backgroundColor: '#0A001F',
    borderWidth: 2,
    borderColor: '#9a00ff',
    shadowColor: '#9a00ff',
    shadowOpacity: 0.9,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 0 },
    alignItems: 'center', // centers avatar and text
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
    shadowOpacity: 0.8,
    shadowRadius: 25,
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
    marginBottom: 25,
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
});
