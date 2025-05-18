import React from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';

  // Screens
  import HomeScreen from './src/views/HomeScreen';
  import LoadingScreen from './src/views/LoadingScreen';
  import LoginScreen from './src/views/LoginScreen';
  import GrillMenuScreen from './src/views/GrillMenuScreen'; // Added import
  import CoffeeMenuScreen from './src/views/CoffeeMenuScreen'; // Added import
  import BurgerMenuScreen from './src/views/BurgerMenuScreen'; // Added import for BurgerMenuScreen
  import MyUNTHeaderTitle from './src/components/MyUNTHeaderTitle';

  const Stack = createStackNavigator();

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
                height: 130,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
                elevation: 8,
              },
              headerTransparent: false,
            }}
          />
          {/* Grill Menu */}
          <Stack.Screen
            name="GrillMenu"
            component={GrillMenuScreen}
            options={{
              title: 'Grill Menu',
            }}
          />
          {/* Coffee Menu */}
          <Stack.Screen
            name="CoffeeMenu"
            component={CoffeeMenuScreen}
            options={{
              title: 'Coffee Market',
            }}
          />
          {/* Burger Menu */}
          <Stack.Screen
            name="BurgerMenu"
            component={BurgerMenuScreen}
            options={{
              title: 'Burger Menu',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }