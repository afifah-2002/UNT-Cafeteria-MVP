

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import BottomNavBar from '../components/bottomNavBar';
import RestaurantCard from '../components/RestaurantCard';
import MyUNTHeaderTitle from '../components/MyUNTHeaderTitle';

// Get screen height

// Set space taken up by fixed UI elements

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerArea}>
        <MyUNTHeaderTitle />
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
      >
        <Text style={styles.greeting}>Hi Joel, Welcome back</Text>

        <RestaurantCard
          image={require('../../assets/images/burger.jpg')}
          title="Discovery Perks Grill"
          subtitle="Burgers · Sandwiches · Fries"
          rating="4.6"
          time="10–15 min"
        />

        <RestaurantCard
          image={require('../../assets/images/market.jpg')}
          title="Discovery Perks Market"
          subtitle="Coffee · Ice Cream"
          rating="4.2"
          time="2–3 min"
        />
      </ScrollView>
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 60, // Extra space above the bottom nav
  },
  greeting: {
    fontSize: 22,
    fontWeight: '600'
  },
});

export default HomeScreen;
