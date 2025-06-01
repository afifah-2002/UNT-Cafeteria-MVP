// src/screens/CheckoutScreen.jsx
/*import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { applyPromoCode, calculateTotal } from '../redux/actions/CheckoutAction';

const CartItem = ({ item }) => (
  <View style={styles.cartItemContainer}>
    <View>
      <Text style={styles.itemName}>{item.name} x{item.quantity}</Text>
      {item.addOns.length > 0 && <Text style={styles.itemAddons}>(+{item.addOns.length} add-ons)</Text>}
    </View>
    <Text style={styles.itemPrice}>${item.itemTotalPrice.toFixed(2)}</Text>
  </View>
);

export default function CheckoutScreen() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart?.items || []);
  const promoCode = useSelector((state) => state.cart?.promoCode || '');
  const discount = useSelector((state) => state.cart?.discount || 0);
  const total = useSelector((state) => state.cart?.total || 0);
  const subtotal = cart.reduce((sum, item) => sum + item.itemTotalPrice, 0);
  const tax = subtotal * 0.08;

  useEffect(() => {
    dispatch(calculateTotal());
  }, [dispatch, cart]);

  const handleApplyPromoCode = () => {
    dispatch(applyPromoCode(promoCode));
    dispatch(calculateTotal());
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.header}>Checkout</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.itemId}
            renderItem={({ item }) => <CartItem item={item} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Promotions</Text>
          <View style={styles.promoContainer}>
            <TextInput
              style={styles.promoInput}
              value={promoCode}
              onChangeText={(text) => dispatch(applyPromoCode(text))}
              placeholder="Enter promo code"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.applyButton} onPress={handleApplyPromoCode}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
          {discount > 0 && <Text style={styles.discountText}>Discount Applied: -${discount.toFixed(2)}</Text>}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax (8%)</Text>
            <Text style={styles.totalValue}>${tax.toFixed(2)}</Text>
          </View>
          {discount > 0 && (
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, styles.discountText]}>Discount</Text>
              <Text style={[styles.totalValue, styles.discountText]}>-${discount.toFixed(2)}</Text>
            </View>
          )}
          <View style={styles.separator} />
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemName: {
    fontSize: 16,
    color: '#333',
  },
  itemAddons: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  discountText: {
    color: '#28a745',
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: '#555',
  },
  totalValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    borderRadius: 12,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});*/



import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, StatusBar, Alert, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'; // Checked state
import { faCircle } from '@fortawesome/free-regular-svg-icons'; // Unchecked state
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { applyPromoCode, calculateTotal } from '../redux/actions/CheckoutAction';

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userId = "682c202cf08ba92be50a36f5"; // Hardcoded as per previous setup
  const cart = useSelector((state) => state.cart?.items || []);
  const promoCode = useSelector((state) => state.cart?.promoCode || '');
  const discount = useSelector((state) => state.cart?.discount || 0);
  const total = useSelector((state) => state.cart?.total || 0);
  const subtotal = cart.reduce((sum, item) => sum + item.itemTotalPrice, 0);
  const tax = subtotal * 0.08;
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [isCardSelected, setIsCardSelected] = useState(false); // New state for checkbox

  useEffect(() => {
    dispatch(calculateTotal());
  }, [dispatch, cart]);

  const handleApplyPromoCode = () => {
    dispatch(applyPromoCode(promoCode));
    dispatch(calculateTotal());
  };

  const CartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <View>
        <Text style={styles.itemName}>{item.name} x{item.quantity}</Text>
        {item.addOns.length > 0 && <Text style={styles.itemAddons}>(+{item.addOns.length} add-ons)</Text>}
      </View>
      <Text style={styles.itemPrice}>${item.itemTotalPrice.toFixed(2)}</Text>
    </View>
  );

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.post('http://192.168.1.138/stripe/get-payment-methods', {
          userId: userId
        }, { timeout: 5000 });
        console.log('API Response:', response.data);
        const methods = response.data?.paymentMethods || [];
        console.log(methods)
        if (methods.length > 0) {
          setPaymentMethod(methods[0]);
        } else {
          setPaymentMethod(null);
        }
      } catch (error) {
        console.error('Failed to load payment methods:', error.message);
        if (error.response) {
          console.error('Response error:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPaymentMethods();
  }, [userId]);

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      Alert.alert('No Payment Method', 'Please add a payment method before placing your order.');
      return;
    }
    if (!isCardSelected) {
      Alert.alert('Card Not Selected', 'Please select the payment card to proceed.');
      return;
    }

    setProcessing(true);
    try {
      console.log('Sending payment request:', {
        userId: userId,
        paymentMethodId: paymentMethod.id,
        amount: Math.round(total * 100),
        currency: 'usd',
      });
      const response = await axios.post('http://192.168.1.230:5000/stripe/create-payment-intent', {
        userId: userId,
        paymentMethodId: paymentMethod.id,
        amount: Math.round(total * 100),
        currency: 'usd',
      }, { timeout: 10000 });

      console.log('Payment Intent Response:', response.data);

      if (response.data.clientSecret) {
        Alert.alert(
          'Payment Successful',
          `Your order of $${total.toFixed(2)} has been placed successfully using ${paymentMethod.card.brand.toUpperCase()} ending in ${paymentMethod.card.last4}.`,
          [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
        );
        dispatch({ type: 'CLEAR_CART' });
      } else {
        throw new Error('Payment Intent creation failed');
      }
    } catch (error) {
      console.error('Payment Error:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      }
      Alert.alert(
        'Payment Failed',
        error.response?.data?.error || 'There was an error processing your payment. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.header}>Checkout</Text>

        {/* Order Summary Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.itemId}
            renderItem={({ item }) => <CartItem item={item} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            scrollEnabled={false}
          />
        </View>

        {/* Payment Method Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {loading ? (
            <ActivityIndicator size="small" />
          ) : paymentMethod ? (
            <View style={styles.paymentOption}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setIsCardSelected(!isCardSelected)}
              >
                <FontAwesomeIcon
                  icon={isCardSelected ? faCircleCheck : faCircle}
                  size={24}
                  color={isCardSelected ? '#28a745' : '#555'}
                />
              </TouchableOpacity>
              <View style={styles.paymentDetailsContainer}>
                <View style={styles.paymentDetails}>
                  <Icon name="credit-card-outline" size={24} color="#555" style={styles.paymentIcon} />
                  <View>
                    <Text style={styles.paymentName}>
                      {paymentMethod.card.brand.toUpperCase()} •••• {paymentMethod.card.last4}
                    </Text>
                    <Text style={styles.paymentDetailText}>
                      Expires {paymentMethod.card.exp_month}/{paymentMethod.card.exp_year}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('AddPaymentMethod')}>
                  <Text style={styles.editLink}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.paymentOption}>
              <Text>No payment method available</Text>
              <TouchableOpacity onPress={() => navigation.navigate('AddPaymentMethod')}>
                <Text style={styles.editLink}>Add</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Promotions card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Promotions</Text>
          <View style={styles.promoContainer}>
            <TextInput
              style={styles.promoInput}
              value={promoCode}
              onChangeText={(text) => dispatch(applyPromoCode(text))}
              placeholder="Enter promo code"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.applyButton} onPress={handleApplyPromoCode}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
          {discount > 0 && <Text style={styles.discountText}>Discount Applied: -${discount.toFixed(2)}</Text>}
        </View>

        {/* Total Summary */}
        <View style={styles.card}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax (8%)</Text>
            <Text style={styles.totalValue}>${tax.toFixed(2)}</Text>
          </View>
          {discount > 0 && (
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, styles.discountTextLabel]}>Discount</Text>
              <Text style={[styles.totalValue, styles.discountText]}>-${discount.toFixed(2)}</Text>
            </View>
          )}
          <View style={styles.separator} />
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.checkoutButton,
            processing || !isCardSelected ? styles.checkoutButtonDisabled : null,
          ]}
          onPress={handlePlaceOrder}
          disabled={processing || !isCardSelected}
        >
          {processing ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.checkoutButtonText}>Place Order</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemName: {
    fontSize: 16,
    color: '#333',
  },
  itemAddons: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  paymentDetailsContainer: {
    flex: 1,
    flexDirection: 'row', // Changed from 'column' to 'row'
    alignItems: 'center', // Align items vertically
    justifyContent: 'space-between', // Space between payment details and edit link
  },
  paymentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentIcon: {
    marginRight: 15,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  paymentDetailText: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
    marginLeft: 10,
  },
  editLink: {
    color: '#28a745',
    fontSize: 14,
    marginLeft: 10, // Space between payment details and edit link
    // Removed marginTop: 5, no longer needed
  },
  checkboxContainer: {
    marginRight: 15, // Space between checkbox and payment details
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  discountTextLabel: {
    color: '#28a745',
  },
  discountText: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: '#555',
  },
  totalValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    borderRadius: 12,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkoutButtonDisabled: {
    backgroundColor: '#a5d6a7',
    opacity: 0.7,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});