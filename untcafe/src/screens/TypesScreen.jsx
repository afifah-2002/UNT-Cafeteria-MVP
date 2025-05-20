import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import MenuItemCard from '../components/MenuItemCard';
import BottomNavBar from '../components/bottomNavBar';
// import { getItemsByCategory } from '../services/api';

const BURGERS_CATEGORY_ID = '6827ccffcf34d35572148384';
const BurgerMenuScreen = () => {
  const [burgers, setBurgers] = useState([]);

  // useEffect(() => {
  //   const fetchBurgers = async () => {
  //     try {
  //       const response = await getItemsByCategory(BURGERS_CATEGORY_ID);
  //       setBurgers(response);
  //     } catch (error) {
  //       console.error('Error loading burgers:', error);
  //     }
  //   };

  //   fetchBurgers();
  // }, []);

  // const getImageForBurger = (burgerName) => {
  //   switch (burgerName.toLowerCase()) {
  //     case 'Cheeseburger':
  //       return require('../../assets/images/cheeseburger.jpg');
  //     case 'Veggie burger':
  //       return require('../../assets/images/veggieBurger.jpg');
  //     case 'Chicken burger':
  //       return require('../../assets/images/ChickenBurger.jpg');
  //     case 'Bacon burger':
  //       return require('../../assets/images/BaconBurger.jpg');
  //     default:
  //       return require('../../assets/images/cheeseburger.jpg');
  //   }
  // };

  return (
    // <View style={styles.container}>
    //   <ScrollView contentContainerStyle={styles.content}>
    //     {burgers.length > 0 ? (
    //       burgers.map((burger, index) => (
    //         <MenuItemCard
    //           key={index}
    //           image={getImageForBurger(burger.name)}
    //           title={burger.name}
    //         />
    //       ))
    //     ) : (
    //       <Text style={styles.placeholder}>No burgers found.</Text>
    //     )}
    //   </ScrollView>
    //   <BottomNavBar />
    // </View>
    <View>Hi</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60, // Reserve space for nav
  },
  content: {
    padding: 16,
  },
  placeholder: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default BurgerMenuScreen;