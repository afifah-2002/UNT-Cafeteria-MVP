

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import BottomNavBar from '../components/bottomNavBar';
import RestaurantCard from '../components/RestaurantCard';
import MyUNTHeaderTitle from '../components/MyUNTHeaderTitle';

// Get screen height
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BASE_FONT_SIZE = 12;
const SCREEN_WIDTH_SCALE_FACTOR = 0.015;
const dynamicFontSize = BASE_FONT_SIZE + (SCREEN_WIDTH * SCREEN_WIDTH_SCALE_FACTOR);

const HomeScreen = () => {

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <MyUNTHeaderTitle />

      </View>

      <ScrollView
        contentContainerStyle={styles.content}
      >
        <Text style={[styles.greeting, { fontSize: dynamicFontSize }]}>Hi Joel, Welcome back</Text>

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
    fontSize: 18,
    fontWeight: '600'
  },
  header: {
    height: '11%'
  }
});

export default HomeScreen;
