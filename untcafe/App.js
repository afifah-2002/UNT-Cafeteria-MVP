import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/views/HomeScreen';
import LoadingScreen from './src/views/LoadingScreen';
import LoginScreen from './src/views/login';
import MyUNTHeaderTitle from './src/views/MyUNTHeaderTitle';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
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
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}