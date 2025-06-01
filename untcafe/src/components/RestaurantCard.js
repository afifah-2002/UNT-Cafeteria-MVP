// Used this card in home screen 
import React from 'react';
import { View, Text, Image, StyleSheet, useColorScheme } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

const RestaurantCard = ({ image, title, subtitle, rating, time, location,price }) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#1c1c1e' : '#fff' }]}>
      <Image source={image} style={styles.image} />
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: isDarkMode ? '#aaa' : '#555' }]}>{subtitle}</Text>
      <View style={styles.infoRow}>
        <FontAwesome name="star" size={14} color="#f5a623" />
        <Text style={styles.infoText}>{rating}</Text>
        {price !== undefined && (
        <Text style={[styles.subtitle, { color: isDarkMode ? '#aaa' : '#555' }]}>
          Price: ${price.toFixed(2)}
        </Text>
      )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'flex-start',
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginBottom: 8,
  },
  title: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: RFValue(13),
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: RFValue(12),
    marginLeft: 4,
  },
});

export default RestaurantCard;