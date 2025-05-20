import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomNavBar from '../components/bottomNavBar';


export default function CartScreen({ navigation }) {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const removeItem = (itemId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const renderItem = ({ item }) => (
        <View style={styles.itemRow}>
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemSub}>${item.price.toFixed(2)} each</Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() =>
                        dispatch({
                            type: 'UPDATE_QUANTITY',
                            payload: {
                                itemId: item.itemId,
                                quantity: Math.max(1, item.quantity - 1),
                            },
                        })
                    }
                >
                    <Text style={styles.qtyBtnText}>−</Text>
                </TouchableOpacity>

                <Text style={styles.quantity}>{item.quantity}</Text>

                <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() =>
                        dispatch({
                            type: 'UPDATE_QUANTITY',
                            payload: {
                                itemId: item.itemId,
                                quantity: item.quantity + 1,
                            },
                        })
                    }
                >
                    <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>

                <Text style={styles.totalPrice}>${(item.price * item.quantity).toFixed(2)}</Text>

                <TouchableOpacity onPress={() => removeItem(item.itemId)} style={styles.trashBtn}>
                    <Icon name="trash-outline" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );


    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>🛒 Your Cart</Text>

                {cartItems.length === 0 ? (
                    <Text style={styles.emptyText}>Your cart is empty</Text>
                ) : (
                    <>
                        <FlatList
                            data={cartItems}
                            keyExtractor={(item) => item.itemId}
                            renderItem={renderItem}
                        // contentContainerStyle={{ paddingBottom: 120 }}
                        />

                        <View style={styles.totalContainer}>
                            <Text style={styles.totalText}>Total:</Text>
                            <Text style={styles.totalAmount}>${totalPrice.toFixed(2)}</Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Checkout')}
                            style={styles.checkoutButton}
                        >
                            <Icon name="arrow-forward-circle-outline" size={20} color="#fff" />
                            <Text style={styles.checkoutButtonText}>Go to Checkout</Text>
                        </TouchableOpacity>


                    </>
                )}

            </View>
            <BottomNavBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, marginTop: 10, backgroundColor: '#f8f8f8' },
    title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
    emptyText: { fontSize: 16, textAlign: 'center', marginTop: 30 },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 12,
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        marginBottom: 120
    },
    itemInfo: { flex: 1 },
    itemName: { fontSize: 16, fontWeight: '600' },
    itemPrice: { fontSize: 14, color: '#444' },
    removeButton: {
        backgroundColor: '#ff4444',
        borderRadius: 20,
        padding: 8,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    totalText: { fontSize: 18, fontWeight: 'bold' },
    totalAmount: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    clearButton: {
        flexDirection: 'row',
        backgroundColor: '#444',
        padding: 12,
        marginTop: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    clearButtonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 8,
        fontWeight: '500',
    },
    checkoutButton: {
        flexDirection: 'row',
        backgroundColor: '#28a745',
        padding: 12,
        marginTop: 12,
        borderRadius: 10,
        justifyContent: 'center',
        marginBottom: 60,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 8,
        fontWeight: '500',
    }, itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 12,
        padding: 15,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        gap: 10,
    },

    itemDetails: {
        flex: 1,
        flexShrink: 1, // Allow wrapping if text is too long
    },

    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flexWrap: 'wrap',
    },

    itemSub: {
        fontSize: 13,
        color: '#888',
        marginTop: 2,
    },

    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexWrap: 'nowrap',
        flexShrink: 0,
        gap: 6,
        marginLeft: 10,
    },

    qtyBtn: {
        backgroundColor: '#ddd',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },

    qtyBtnText: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    quantity: {
        fontSize: 16,
        fontWeight: '500',
        marginHorizontal: 4,
    },

    totalPrice: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        marginHorizontal: 6,
    },

    trashBtn: {
        backgroundColor: '#ff4d4f',
        padding: 6,
        borderRadius: 6,
    },


});
