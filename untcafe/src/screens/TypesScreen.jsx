// screens/TypesScreen.js
import React, { useEffect, useState } from 'react';

import {
  View, Text, StyleSheet, TouchableOpacity,
  ActivityIndicator, FlatList
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import RestaurantCard from '../components/RestaurantCard';
import {  getItemsByCategory } from '../utils/api';    


const TypesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId, categoryName } = route.params || {};

  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  
  //UseEffect Fetches types whenever categoryId changes
  
  useEffect(() => {
    const fetchTypes = async () => {
      if (!categoryId) {
        setError('Category ID missing.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const data = await getItemsByCategory(categoryId);
        setTypes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching types:', err.message);
        setError('Failed to load types.');
      } finally {
        setLoading(false);
      }
    };
    fetchTypes();
  }, [categoryId]);

  
  /* When a type is tapped → navigate to next screen */
  
  /*const handleNavigate = (items) => {
    navigation.navigate('', {
      itemId: items._id,
      itemName: items.name
    });
  };

  
  How each row looks in FlatList   */
  
  const renderItem = ({ item }) => (
    <TouchableOpacity key={item._id} onPress={() => handleNavigate(item)}>
      <RestaurantCard
        item={item}
        image={item.imageURL ? { uri: item.imageURL } : require('../../assets/adaptive-icon.png')}
        subtitle={item.description || ''}
        price = {item.price}
                   
      />
    </TouchableOpacity>
  );

  

  
  return (
    <View style={styles.container}>
      {categoryName && <Text style={styles.heading}>{categoryName}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader}/>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : types.length ? (
        <FlatList
          data={types}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.placeholder}>No types found.</Text>
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


export default TypesScreen;