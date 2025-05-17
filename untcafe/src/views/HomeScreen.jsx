

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import BottomNavBar from './bottomNavBar';
import RestaurantCard from './RestaurantCard';

// Get screen height
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Set space taken up by fixed UI elements
const HEADER_HEIGHT = 130;
const NAVBAR_HEIGHT = 60;
const CONTENT_HEIGHT = SCREEN_HEIGHT - HEADER_HEIGHT - NAVBAR_HEIGHT;

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.content, { minHeight: CONTENT_HEIGHT }]}
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
    fontWeight: '600',
    marginBottom: 16,
  },
});

export default HomeScreen;
