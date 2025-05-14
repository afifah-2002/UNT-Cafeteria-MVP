import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BottomNavBar from '../components/bottomNavBar';
import RestaurantCard from '../components/RestaurantCard';




const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
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
    paddingBottom: 60,
  },
  content: {
    padding: 16,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
});

export default HomeScreen;
