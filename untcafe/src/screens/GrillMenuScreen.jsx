import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import MenuItemCard from '../components/MenuItemCard';
import BottomNavBar from '../components/bottomNavBar'; 
import { getCategoriesByCafe } from '../services/api';

const GRILL_CAFE_ID = '6827c89dcf34d35572148379';

const GrillMenuScreen = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchGrillCategories = async () => {
      try {
        const response = await getCategoriesByCafe(GRILL_CAFE_ID);
        setCategories(response);
      } catch (error) {
        console.error('Error loading grill menu:', error);
      }
    };

    fetchGrillCategories();
  }, []);

  const getImageForCategory = (categoryName) => {
  switch (categoryName.toLowerCase()) {
    case 'burgers':
      return require('../../assets/images/burger.jpg');
    case 'sides':
      return require('../../assets/images/sides.jpg');
    case 'drinks':
      return require('../../assets/images/drinks.jpg');
    case 'sandwiches':
      return require('../../assets/images/sub.jpg');
    default:
      return require('../../assets/images/burger.jpg'); // optional fallback
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
    paddingBottom: 60, // reserve space for nav
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

export default GrillMenuScreen;
