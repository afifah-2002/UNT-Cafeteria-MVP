import React from 'react';
import { View, Text, StyleSheet  } from 'react-native';

export default function ManagePayment() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Payment Settings</Text>
      <Text style={styles.subtitle}>Here you can add or update your payment methods.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});