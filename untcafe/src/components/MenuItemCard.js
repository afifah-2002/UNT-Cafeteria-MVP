import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, useColorScheme, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const { width } = Dimensions.get('window');
const CARD_HEIGHT = width * 0.45;

const MenuItemCard = ({ imageUrl, name, onPress }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
      <ImageBackground
        source={imageUrl}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <Text style={[styles.title, { color: '#fff' }]}>
            {String(name)}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
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
    fontSize: RFValue(20),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default MenuItemCard;
