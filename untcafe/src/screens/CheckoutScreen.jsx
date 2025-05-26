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
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  Alert,
  TextInput,
  ScrollView, 
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { applyPromoCode, calculateTotal } from '../redux/actions/CheckoutAction';

const CartItem = ({ item }) => (
  <View style={styles.cartItemContainer}>
    <View>
      <Text style={styles.itemName}>{item.name} × {item.quantity}</Text>
      {item.addOns.length > 0 && (
        <Text style={styles.itemAddons}>(+{item.addOns.length} add-ons)</Text>
      )}
    </View>
    <Text style={styles.itemPrice}>${item.itemTotalPrice.toFixed(2)}</Text>
  </View>
);

export default function CheckoutScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const cart = useSelector((state) => state.cart?.items || []);
  const promoCode = useSelector((state) => state.cart?.promoCode || '');
  const discount = useSelector((state) => state.cart?.discount || 0);
  const total = useSelector((state) => state.cart?.total || 0);

  const subtotal = cart.reduce((sum, item) => sum + item.itemTotalPrice, 0);
  const tax = subtotal * 0.08;

  // Assume no saved method for now
  const [currentMethod, setCurrentMethod] = useState(null); // Replace with actual data later

  useEffect(() => {
    dispatch(calculateTotal());
  }, [dispatch, cart]);

  const handlePlaceOrder = () => {
    Alert.alert(
      'Order placed (simulation)',
      `Your order for $${total.toFixed(2)} has been placed.`,
      [{ text: 'OK' }],
    );
  };

  const handleApplyPromoCode = () => {
    dispatch(applyPromoCode(promoCode));
    dispatch(calculateTotal());
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Checkout</Text>

        {/* Order Summary */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <FlatList
            data={cart}
            keyExtractor={(item, index) => `${item.itemId}-${index}`}
            renderItem={({ item }) => <CartItem item={item} />}
            />
        </View>

        {/* Payment Method */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {currentMethod ? (
            <View style={styles.paymentOption}>
              <Icon name="credit-card-outline" size={24} color="#555" style={styles.paymentIcon} />
              <View style={styles.paymentDetails}>
                <Text style={styles.paymentName}>{currentMethod.name}</Text>
                <Text style={styles.paymentDetailText}>{currentMethod.details}</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('ManagePayment')}>
                <Icon name="pencil" size={22} color="#007bff" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.paymentOption}
              onPress={() => navigation.navigate('ManagePayment')}
            >
              <Icon name="credit-card-plus-outline" size={24} color="#555" style={styles.paymentIcon} />
              <Text style={styles.addPaymentText}>Add / Edit Payment Method</Text>
              <Icon name="chevron-right" size={24} color="#007bff" />
            </TouchableOpacity>
          )}
        </View>
        {/* Promotions card*/}
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
        <TouchableOpacity style={styles.checkoutButton} on onPress={handlePlaceOrder}>
          <Text style={styles.checkoutButtonText}>Place Order</Text>
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
    // New styles for Payment Method
    paymentOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
    },
    paymentIcon: {
      marginRight: 15,
    },
    paymentDetails: {
      flex: 1,
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
    },
    // Styles for totals and discount
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
        marginTop: 10, // Adjusted margin
        marginBottom: 20, // Add some bottom margin
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
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