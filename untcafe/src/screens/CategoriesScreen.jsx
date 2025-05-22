// screens/CategoryItemListScreen.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';
import MenuItemCard from '../components/MenuItemCard';
import { getCategoriesByCafe } from '../utils/api';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const CategoryItemListScreen = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const route = useRoute();
  const { cafeId, cafeName } = route.params || {};

  useEffect(() => {
    const fetchItems = async () => {
      if (!cafeId) {
        setError('Category ID not provided.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const response = await getCategoriesByCafe(cafeId);
        setItems(response);
      } catch (err) {
        console.error('Error loading menu items:', err.response ? err.response.data : err.message);
        setError('Failed to load menu items.');
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [cafeId]);

  const navigation = useNavigation();


  const handleNavigate = (category) => {
  console.log('Navigating to category:', category.name, 'with ID:', category._id);
  navigation.navigate('TypesScreen', {
    categoryId: category._id,
    categoryName: category.name,
  });
  };


  const renderItem = ({ item }) => (
  <MenuItemCard
    item={item}
    imageUrl={item.imageUrl && { uri: item.imageUrl }}
    name={item.name}
    onPress={() => handleNavigate(item)}
    showAddButton={false}
  />
  );

  
  return (
    <View style={styles.container}>
      {cafeName && <Text style={styles.heading}>{cafeName}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : items.length > 0 ? (
        <FlatList
          data={items}
          keyExtractor={(item, index) => item._id ? item._id.toString() : index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.placeholder}>No items found for this category.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
  placeholder: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default CategoryItemListScreen;
