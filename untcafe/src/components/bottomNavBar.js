import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart as faHeartOutline } from '@fortawesome/free-solid-svg-icons';

const BottomNavBar = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const iconColor = isDarkMode ? '#ffffff' : '#000000';
  const bgColor = isDarkMode ? '#1c1c1e' : '#ffffff';

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <SafeAreaView edges={['bottom']} style={[styles.container, { backgroundColor: bgColor }]}>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
        <Feather name="home" size={22} color={iconColor} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('CartScreen')}>
        <View>
          <Feather name="shopping-cart" size={22} color={iconColor} />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Notifications')}>
        <Feather name="bell" size={22} color={iconColor} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AddPaymentMethod')}>
        <Feather name="user" size={22} color={iconColor} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('Favourites')}>
        <FontAwesomeIcon icon={faHeartOutline} size={24} color="#555" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',  // Even spacing with padding
    alignItems: 'center',
    height: 70,
    paddingHorizontal: 16,            // Space at edges
    position: 'absolute',
    bottom: 0,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 8,
  },
  navButton: {
    padding: 10,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#ff4d4f',
    borderRadius: 10,
    minWidth: 16,
    paddingHorizontal: 5,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default BottomNavBar;
