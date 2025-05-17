import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, useColorScheme } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const { width } = Dimensions.get('window');
const CARD_HEIGHT = width * 0.45;

const MenuItemCard = ({ image, title }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.card, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
      <ImageBackground
        source={image}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <Text style={[styles.title, { color: isDark ? '#fff' : '#fff' }]}>
            {String(title)}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: RFValue(20), // ✅ Dynamic font size
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default MenuItemCard;
