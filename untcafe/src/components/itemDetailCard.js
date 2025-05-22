


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { RFValue } from 'react-native-responsive-fontsize';
//import { getAddOnsByCategory } from '../utils/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ItemDetailCard = ({ item, onClose, categoryId, addOns }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [open, setOpen] = useState(false);
  const [addOnItems, setAddOnItems] = useState([]);

useEffect(() => {
  if (addOns && addOns.length > 0) {
    const formatted = addOns.map((addon) => ({
      label: `${addon.name} +$${addon.price.toFixed(2)}`,
      value: addon.name,
    }));
    setAddOnItems(formatted);
  } else {
    setAddOnItems([]); // clear if no add-ons
  }
}, [addOns]);


  const calculateTotal = () => {
    const base = item.price * quantity;
    const addOnCost = addOnItems
      .filter(a => selectedAddOns.includes(a.value))
      .reduce((sum, a) => sum + parseFloat(a.label.split('$')[1]), 0);
    return base + addOnCost;
  };

  const increase = () => quantity < 10 && setQuantity(quantity + 1);
  const decrease = () => quantity > 0 && setQuantity(quantity - 1);


const addToCart = () => {
  if (quantity === 0) return;

  const selectedAddOnObjects = addOnItems.filter((addon) =>
    selectedAddOns.includes(addon.value)
  );

  dispatch({
    type: 'ADD_TO_CART',
    payload: {
      itemId: item._id,
      name: item.name,
      price: item.price,
      quantity,
      addOns: selectedAddOnObjects, // full objects with label+value
    },
  });

  onClose();
};


  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="close" size={RFValue(24)} color="#333" />
        </TouchableOpacity>
      </View>

      <Image
        source={item.imageUrl ? { uri: item.imageUrl } : require('../../assets/adaptive-icon.png')}
        style={styles.image}
      />

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price?.toFixed(2)} each</Text>

      {addOnItems.length > 0 && (
        <>
          <Text style={styles.addOnLabel}>Add-ons:</Text>
          <View style={{ zIndex: 1000 }}>
            <DropDownPicker
              multiple
              open={open}
              setOpen={setOpen}
              value={selectedAddOns}
              setValue={setSelectedAddOns}
              items={addOnItems}
              setItems={setAddOnItems}
              placeholder="Select Add-ons"
              style={styles.dropdown}
              dropDownContainerStyle={{ zIndex: 1000 }}
            />
          </View>
        </>
      )}

      <Text style={styles.total}>Total: ${calculateTotal().toFixed(2)}</Text>

      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.quantityButton} disabled>
          <TouchableOpacity onPress={decrease} style={styles.qtyInnerBtn}>
            <Icon name="remove" size={RFValue(20)} color="#000" />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{quantity}</Text>
          <TouchableOpacity onPress={increase} style={styles.qtyInnerBtn}>
            <Icon name="add" size={RFValue(20)} color="#000" />
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={addToCart}>
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: RFValue(16),
    paddingTop: RFValue(24),
    paddingBottom: RFValue(24),
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: RFValue(4),
  },
  closeButton: {
    padding: RFValue(4),
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: SCREEN_WIDTH * 0.5,
    borderRadius: 12,
    marginBottom: RFValue(16),
    marginTop: RFValue(8),
  },
  name: {
    fontSize: RFValue(22),
    fontWeight: 'bold',
    marginBottom: RFValue(6),
  },
  description: {
    fontSize: RFValue(14),
    color: '#555',
    marginBottom: RFValue(6),
  },
  price: {
    fontSize: RFValue(16),
    color: '#000',
    fontWeight: '600',
    marginBottom: RFValue(12),
  },
  addOnLabel: {
    fontSize: RFValue(15),
    fontWeight: '600',
    marginBottom: RFValue(4),
  },
  dropdown: {
    marginBottom: RFValue(12),
  },
  total: {
    fontSize: RFValue(16),
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: RFValue(10),
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: RFValue(16),
    gap: 10,
  },
  quantityButton: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: RFValue(12),
    paddingVertical: RFValue(12),
  },
  qtyInnerBtn: {
    paddingHorizontal: RFValue(8),
  },
  qtyText: {
    fontSize: RFValue(18),
    fontWeight: '600',
    color: '#000',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#28a745',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(12),
  },
  addButtonText: {
    color: '#fff',
    fontSize: RFValue(16),
    fontWeight: '600',
  },
});

export default ItemDetailCard;
