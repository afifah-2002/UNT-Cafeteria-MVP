import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions } from 'react-native'; // Import Dimensions

// Screens
import HomeScreen from './src/screens/HomeScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import LoginScreen from './src/screens/LoginScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import TypesScreen from './src/screens/TypesScreen';
import MyUNTHeaderTitle from './src/components/MyUNTHeaderTitle.js';

const Stack = createStackNavigator();

const { height: screenHeight } = Dimensions.get('window');
const dynamicHeaderHeight = screenHeight * 0.15;

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        {/* Splash/Loading screen (no header) */}
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        {/* Login screen (no header) */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        {/* Home screen with UNT header */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => <MyUNTHeaderTitle />,
            headerStyle: {
              backgroundColor: '#ffffff',
              height: dynamicHeaderHeight,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 8,
            },
            headerTransparent: false,
            headerLeft: () => null,
          }}
        />
        {/* Grill Menu */}
        <Stack.Screen
          name="CategoriesScreen"
          component={CategoriesScreen}
          options={{
            title: 'Categories Menu',
          }}
        />
        {/* Burger Menu */}
        <Stack.Screen
          name="TypesScreen"
          component={TypesScreen}
          options={{
            title: 'Types',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}