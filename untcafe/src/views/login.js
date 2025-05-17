import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MyUNTHeaderTitle from './MyUNTHeaderTitle';
import Checkbox from 'expo-checkbox';
import { login } from '../controllers/auth';

const LoginScreen = ({ navigation }) => {
  const [euid, setEuid] = useState('');
  const [password, setPassword] = useState('');
  const [rememberLogin, setRememberLogin] = useState(true);

  const handleLogin = async () => {
  try {
    console.log('Login attempt started:', { euid, password }); // Initial debug
    const result = await login(euid, password,navigation);
    console.log('Login result:', result); // Log the result
    Alert.alert('Success', 'Login successful!');
    navigation.navigate('Home');
  } catch (error) {
    console.error('Login error caught:', error); // Detailed error log
    Alert.alert('Error', error.message);
  }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MyUNTHeaderTitle />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.innerContainer}
      >
        {/* EUID Input */}
        <Text style={styles.label}>Username (EUID)</Text>
        <TextInput
          style={styles.input}
          placeholder="EUID"
          placeholderTextColor="#C4C4C4"
          value={euid}
          onChangeText={setEuid}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* Password Input */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#C4C4C4"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* Remember Login */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={rememberLogin}
            onValueChange={setRememberLogin}
          />
          <Text style={styles.checkboxLabel}>Remember Login</Text>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Footer Links */}
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.linkText}>▸ Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linkText}>▸ Need Help?</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4F4DC',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 20,
    padding: 25,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  input: {
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#000',
  },
  button: {
    backgroundColor: '#34C240',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#000',
    fontSize: 14,
    marginBottom: 5,
  },
});

export default LoginScreen;