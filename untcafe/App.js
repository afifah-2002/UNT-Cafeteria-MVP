

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './src/screens/HomeScreen';
// import LoadingScreen from './src/screens/LoadingScreen';

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Loading">
//         <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// ✅ Screens
import LoadingScreen from './src/screens/LoadingScreen';
import HomeScreen from './src/screens/HomeScreen';
import GrillMenuScreen from './src/screens/GrillMenuScreen';
import CoffeeMenuScreen from './src/screens/CoffeeMenuScreen';
import { useNavigation } from '@react-navigation/native';


// ✅ Custom Header
import MyUNTHeaderTitle from './src/components/MyUNTHeaderTitle';

const Stack = createStackNavigator();

export default function App() {
  return (
    
    //<NavigationContainer ref={navigationRef}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        
        {/* ✅ Splash/Loading screen (no header) */}
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />

        {/* ✅ Home screen with UNT header */}
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

        {/* ✅ Grill Menu */}
        <Stack.Screen
          name="GrillMenu"
          component={GrillMenuScreen}
          options={{
            title: 'Grill Menu',
          }}
        />

        {/* ✅ Coffee Menu */}
        <Stack.Screen
          name="CoffeeMenu"
          component={CoffeeMenuScreen}
          options={{
            title: 'Coffee Market',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
