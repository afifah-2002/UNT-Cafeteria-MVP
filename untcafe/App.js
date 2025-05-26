import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from 'react-redux';
import { Dimensions } from 'react-native'; // Import Dimensions

// Redux
import { store } from './src/redux/store';

//Stripe
import { StripeProvider } from '@stripe/stripe-react-native';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import LoginScreen from './src/screens/LoginScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import TypesScreen from './src/screens/TypesScreen';
import MyUNTHeaderTitle from './src/components/MyUNTHeaderTitle.js';
import CartScreen from './src/screens/CartScreen';
import CheckoutScreen from './src/screens/CheckoutScreen.jsx';
import ItemDetailsScreen from './src/screens/ItemDetailsScreen';
import AddPaymentMethodScreen from './src/screens/AddPaymentMethodScreen'; // Create this file



const Stack = createStackNavigator();

const { height: screenHeight } = Dimensions.get('window');
const dynamicHeaderHeight = screenHeight * 0.15;

export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider
        publishableKey="pk_test_51RS024P1k6T6Yr1Mwf7UYLe6lwemg0ScPhxzdubMOrzFAIJPnGyHYVbjmxjcSZDzq2rWlTUxGrlnTCz0vWcqaCQ300HtWi4aqu"
        merchantIdentifier="merchant.com.your_company.your_app_name"
        urlScheme="stripe-redirect"
      >
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
                animation: 'default', //
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
            <Stack.Screen
              name="ItemDetails"
              component={ItemDetailsScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="CartScreen"
              component={CartScreen}
              options={{ title: 'Cart', headerShown: false }}
            />
            <Stack.Screen
              name="Checkout"
              component={CheckoutScreen}
            />
            <Stack.Screen
              name="AddPaymentMethod"
              component={AddPaymentMethodScreen}
              options={{ title: 'Add Payment Method' }}
            />
            {/* <Stack.Screen
              name="Checkout"
              component={CheckoutScreen}
              options={{ title: 'Checkout' }}
            /> */}
          </Stack.Navigator>

        </NavigationContainer>
      </StripeProvider>
    </Provider>
  );
}