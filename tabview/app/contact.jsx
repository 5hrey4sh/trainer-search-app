import { View, Text, StyleSheet, Linking, TouchableOpacity, Alert } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Contact() {

  const openLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "Unable to open link");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.contactItem}
        onPress={() => openLink('https://linkedin.com/in/yourprofile')}
      >
        <FontAwesome name="linkedin-square" size={24} color="#0A66C2" style={styles.icon} />
        <Text style={styles.link}>LinkedIn</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.contactItem}
        onPress={() => openLink('https://github.com/yourusername')}
      >
        <FontAwesome name="github" size={24} color="#ffffff" style={styles.icon} />
        <Text style={styles.link}>GitHub</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.contactItem}
        onPress={() => openLink('mailto:youremail@example.com')}
      >
        <FontAwesome name="envelope" size={24} color="#4fc3f7" style={styles.icon} />
        <Text style={styles.link}>Email</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#121212',
    padding: 30,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  icon: {
    marginRight: 15,
  },
  link: {
    fontSize: 18,
    color: '#4fc3f7',
    fontWeight: '600',
  },
});
