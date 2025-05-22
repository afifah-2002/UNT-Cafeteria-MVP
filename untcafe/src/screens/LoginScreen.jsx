import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert, // Keeping Alert for now, but consider replacing with a modal for better UX
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView, // Added ScrollView for content that might exceed screen height
} from 'react-native';
import MyUNTHeaderTitle from '../components/MyUNTHeaderTitle'; // Assuming this component exists and renders the header content
import Checkbox from 'expo-checkbox';
import { login } from '../utils/auth'; // Assuming your combined auth logic is here

const LoginScreen = ({ navigation }) => {
  const [euid, setEuid] = useState('');
  const [password, setPassword] = useState('');
  const [rememberLogin, setRememberLogin] = useState(true);
  const [loading, setLoading] = useState(false); // Added loading state to prevent multiple taps

  const handleLogin = async () => {
    if (loading) return; // Prevent login attempt if already loading

    setLoading(true); // Start loading

    try {
      console.log('Login attempt started:', { euid, password });
      // The login function from '../utils/auth' should handle navigation on success
      await login(euid, password, navigation); // Pass navigation object
      // If login function handles navigation, the lines below might not be reached on success
      console.log('Login process completed (navigation handled by auth)');
      // Alert.alert('Success', 'Login successful!'); // Avoid showing success alert before navigation
    } catch (error) {
      console.error('Login error caught:', error);
      Alert.alert('Login Failed', error.message); // Show error message
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Area - Give it a defined space */}
      <View style={styles.headerArea}>
        <MyUNTHeaderTitle />
      </View>

      {/* Form Area - Takes remaining space, handles keyboard avoidance and scrolling */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formArea}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Adjust offset if needed
      >
        {/* ScrollView for form content - Important for handling many inputs or small screens */}
        <ScrollView contentContainerStyle={styles.formContent}>

          {/* Inner White Container */}
          <View style={styles.innerContainer}>
            <Text style={styles.loginTitle}>Welcome Back!</Text> {/* Added a title for the form area */}

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
              keyboardType="email-address" // Suggest email keyboard for EUID
              textContentType="username" // Assist autofill
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
              textContentType="password" // Assist autofill
            />

            {/* Remember Login */}
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={rememberLogin}
                onValueChange={setRememberLogin}
                color={rememberLogin ? '#34C240' : undefined} // Add color when checked
              />
              <Text style={styles.checkboxLabel}>Remember Login</Text>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]} // Disable button while loading
              onPress={handleLogin}
              disabled={loading} // Disable touch feedback while loading
            >
              <Text style={styles.buttonText}>{loading ? 'Logging In...' : 'Login'}</Text>
            </TouchableOpacity>

            {/* Footer Links */}
            <TouchableOpacity onPress={() => { /* Implement navigation or action */ }}>
              <Text style={styles.linkText}>▸ Forgot your password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { /* Implement navigation or action */ }}>
              <Text style={styles.linkText}>▸ Need Help?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4F4DC', // Background color for the whole screen
  },
  headerArea: {
    // Define a fixed height for the header area to control its size
    height: 120, // Adjust this height as needed to fit your MyUNTHeaderTitle image
    backgroundColor: '#ffffff', // Match header background
    alignItems: 'center', // Center header content horizontally
    justifyContent: 'center', // Center header content vertically
    // Remove paddingBottom if using fixed height and centering
  },
  formArea: {
    flex: 1, // Takes up the remaining vertical space
    // No background color here, let innerContainer handle it
  },
  formContent: {
    flexGrow: 1, // Allows ScrollView content to grow
    justifyContent: 'center', // Center content vertically in ScrollView if it doesn't fill the screen
    padding: 10, // Padding around the inner white container
  },
  innerContainer: {
    backgroundColor: '#fff', // White background for the form box
    borderRadius: 20,
    padding: 25,
    // Remove flex: 1 from here
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 30, // Space below the title
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
    marginLeft: 8, // Space between checkbox and label
  },
  button: {
    backgroundColor: '#34C240',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#a0a0a0', // Grey out button when disabled
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#000',
    fontSize: 14,
    marginBottom: 10, // Increased space between links
    textAlign: 'center', // Center links
  },
});

export default LoginScreen;
