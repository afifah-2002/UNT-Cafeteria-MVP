// screens/ManagePaymentMethodsScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert, FlatList, TouchableOpacity } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import paymentAPI from '../utils/paymentAPI'; // Import the entire paymentAPI object
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // For the delete icon

export default function ManagePaymentMethodsScreen({ navigation }) {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [isInitializingSheet, setIsInitializingSheet] = useState(false);

    // --- Functions for Managing Payment Methods ---

    const fetchUserPaymentMethods = useCallback(async () => {
        setLoading(true);
        try {
            const methods = await paymentAPI.fetchPaymentMethods();
            setPaymentMethods(methods);
        } catch (error) {
            console.error("Failed to fetch payment methods:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchUserPaymentMethods();
        });
        return unsubscribe;
    }, [navigation, fetchUserPaymentMethods]);

    const handleRemovePaymentMethod = async (paymentMethodId) => {
        Alert.alert(
            "Remove Card",
            "Are you sure you want to remove this card?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Remove",
                    onPress: async () => {
                        setLoading(true); // Indicate loading while removing
                        try {
                            await paymentAPI.detachPaymentMethod(paymentMethodId);
                            Alert.alert("Success", "Card removed successfully!");
                            fetchUserPaymentMethods(); // Re-fetch the list to update UI
                        } catch (error) {
                            // Error message already handled by paymentAPI
                            console.error("Error removing card:", error);
                        } finally {
                            setLoading(false);
                        }
                    },
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };

    const renderPaymentMethodItem = ({ item }) => (
        <View style={styles.paymentMethodCard}>
            <View style={styles.cardInfo}>
                <Text style={styles.cardBrand}>{item.card.brand.toUpperCase()}</Text>
                <Text style={styles.cardNumber}>**** **** **** {item.card.last4}</Text>
                <Text style={styles.cardExpiry}>Expires: {item.card.exp_month}/{item.card.exp_year}</Text>
            </View>
            <TouchableOpacity
                onPress={() => handleRemovePaymentMethod(item.id)}
                style={styles.removeButton}
            >
                <Icon name="delete-circle-outline" size={30} color="#DC3545" />
            </TouchableOpacity>
        </View>
    );

    // --- Functions for Adding New Payment Method ---

    const initializePaymentSheetForNewCard = async () => {
        if (isInitializingSheet) return;
        setIsInitializingSheet(true);
        setLoading(true);

        try {
            const { setupIntentClientSecret, ephemeralKey, customerId, publishableKey } =
                await paymentAPI.fetchSetupIntentClientSecret();

            if (!setupIntentClientSecret) {
                Alert.alert('Error', 'Failed to get setup details from server. Please try again.');
                return;
            }

            const { error: initError } = await initPaymentSheet({
                merchantDisplayName: 'UNTCafe',
                customerId: customerId,
                customerEphemeralKeySecret: ephemeralKey,
                setupIntentClientSecret: setupIntentClientSecret,
                allowsDelayedPaymentMethods: true,
                customFlow: false,
            });

            if (initError) {
                Alert.alert(`Error code: ${initError.code}`, initError.message);
            } else {
                await openPaymentSheetForNewCard();
            }
        } catch (error) {
            console.error("Initialization failed:", error);
            Alert.alert('Error', 'Failed to prepare for adding card.');
        } finally {
            setLoading(false);
            setIsInitializingSheet(false);
            fetchUserPaymentMethods(); // Re-fetch after attempting to add a new card
        }
    };

    const openPaymentSheetForNewCard = async () => {
        const { error: presentError } = await presentPaymentSheet();

        if (presentError) {
            if (presentError.code === 'Canceled') {
                Alert.alert('Card setup canceled', 'You closed the card setup process.');
            } else {
                Alert.alert(`Error code: ${presentError.code}`, presentError.message);
            }
        } else {
            Alert.alert('Success', 'Your card has been added!');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Manage Payment Methods</Text>

            {/* Section for displaying existing cards */}
            <Text style={styles.sectionTitle}>Your Saved Cards:</Text>
            {loading && !paymentMethods.length ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : paymentMethods.length > 0 ? (
                <FlatList
                    data={paymentMethods}
                    renderItem={renderPaymentMethodItem}
                    keyExtractor={(item) => item.id}
                    style={styles.paymentMethodsList}
                    ListFooterComponent={<View style={{ height: 10 }} />}
                />
            ) : (
                <Text style={styles.noCardsText}>No cards saved yet. Add one below!</Text>
            )}

            {/* Button to add a new card */}
            <Button
                title={loading && isInitializingSheet ? 'Loading...' : 'Add New Card'}
                onPress={initializePaymentSheetForNewCard}
                disabled={loading}
            />

            {loading && !isInitializingSheet && ( // Show general loading for fetching/removing
                <ActivityIndicator size="small" color="#0000ff" style={styles.spinner} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'center',
        color: '#333',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 15,
        color: '#555',
    },
    paymentMethodsList: {
        flexGrow: 1,
        marginBottom: 20,
    },
    paymentMethodCard: {
        flexDirection: 'row', // Arrange info and button side-by-side
        justifyContent: 'space-between', // Push button to the right
        alignItems: 'center', // Vertically center items
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardInfo: {
        flex: 1, // Allow card info to take available space
    },
    cardBrand: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    cardNumber: {
        fontSize: 16,
        color: '#666',
    },
    cardExpiry: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
    removeButton: {
        padding: 5, // Make the touchable area larger
    },
    noCardsText: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginBottom: 20,
    },
    spinner: {
        marginTop: 20,
    },
});