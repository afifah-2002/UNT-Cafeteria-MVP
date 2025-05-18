import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import MenuItemCard from '../components/MenuItemCard';
import BottomNavBar from '../components/bottomNavBar';
import { getCategoriesByCafe } from '../services/api';

const MARKET_CAFE_ID = '6827c8dbcf34d3557214837d'; // Discovery Perks Market ID

const CoffeeMenuScreen = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategoriesByCafe(MARKET_CAFE_ID);
        setCategories(response);
      } catch (error) {
        console.error('Error loading market categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const getImageForCategory = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case 'coffee':
        return require('../../assets/images/coffee.jpg');
      case 'snacks':
        return require('../../assets/images/snacks.jpg');
      default:
        return require('../../assets/images/market.jpg'); // fallback
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <MenuItemCard
              key={index}
              image={getImageForCategory(category.name)}
              title={category.name}
            />
          ))
        ) : (
          <Text style={styles.placeholder}>No categories found.</Text>
        )}
      </ScrollView>
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60, // space for bottom nav
  },
  content: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  placeholder: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default CoffeeMenuScreen;
