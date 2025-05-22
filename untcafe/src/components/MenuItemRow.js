// components/MenuItemRow.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const MenuItemRow = ({ item, onPress, onAddToCart, showAddButton = true }) => {
    const { name, description, price, imageUrl } = item;

    return (
        <TouchableOpacity style={styles.rowContainer} onPress={() => onPress(item)}>
            {imageUrl && <Image source={{ uri: imageUrl }} style={styles.itemImage} />}
            <View style={styles.textContainer}>
                <Text style={styles.itemName}>{name}</Text>
                {description ? (
                    <Text style={styles.itemDescription} numberOfLines={2}>{description}</Text>
                ) : null}
            </View>
            <Text style={styles.itemPrice}>${price ? price.toFixed(2) : 'N/A'}</Text>
            {showAddButton && (
                <TouchableOpacity style={styles.addButton} onPress={() => onAddToCart?.(item)}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        justifyContent: 'space-between',
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
        resizeMode: 'cover',
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    itemName: {
        fontSize: RFValue(16),
        fontWeight: 'bold',
        color: '#333',
    },
    itemDescription: {
        fontSize: RFValue(12),
        color: '#666',
        marginTop: 2,
    },
    itemPrice: {
        fontSize: RFValue(16),
        fontWeight: 'bold',
        color: '#000',
    },
    addButton: {
        backgroundColor: 'green',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: RFValue(14),
    },
});

export default MenuItemRow;
