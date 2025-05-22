
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getItemById, getAddOnsByCategory } from '../utils/api';
import ItemDetailCard from '../components/itemDetailCard';

const ItemDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { itemId } = route.params;
  const [item, setItem] = useState(null);
  const [addOns, setAddOns] = useState([]);
  const [loading, setLoading] = useState(true);


useEffect(() => {
  const fetchData = async () => {
    try {
      const fetchedItem = await getItemById(itemId);
      setItem(fetchedItem);

      if (fetchedItem.category) {
        console.log('Fetching add-ons for category ID:', fetchedItem.category);
        const fetchedAddOns = await getAddOnsByCategory(fetchedItem.category);
        setAddOns(fetchedAddOns);
      } else {
        console.warn('No category ID found in item.');
        setAddOns([]);
      }
    } catch (error) {
      console.error('Error while fetching item/add-ons:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [itemId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007b3c" />
      </View>
    );
  }

  return (
    <View style={styles.overlay}>
      {item && (
        <View style={styles.cardWrapper}>
          <ItemDetailCard
            item={item}
            categoryId={item.category}
            addOns={addOns}
            onClose={() => navigation.goBack()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 16,
  },
  cardWrapper: {
    width: '100%',
    height: Dimensions.get('window').height * 0.9,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden',
  },
});

export default ItemDetailsScreen;
