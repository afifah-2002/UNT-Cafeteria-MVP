// import React from 'react';
// import {
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   useColorScheme,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Feather } from '@expo/vector-icons';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const BottomNavBar = () => {
//   const navigation = useNavigation();
//   const isDarkMode = useColorScheme() === 'dark';

//   const iconColor = isDarkMode ? '#ffffff' : '#000000';
//   const bgColor = isDarkMode ? '#1c1c1e' : '#ffffff';

//   return (
//     <SafeAreaView edges={['bottom']} style={[styles.container, { backgroundColor: bgColor }]}>
//       <TouchableOpacity
//         style={styles.navButton}
//         onPress={() => navigation.navigate('Home')}
//         accessibilityRole="button"
//         accessibilityLabel="Go to Home"
//       >
//         <Feather name="home" size={22} color={iconColor} />
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.navButton}
//         onPress={() => navigation.navigate('CartScreen')}
//         accessibilityRole="button"
//         accessibilityLabel="Go to Cart"
//       >
//         <Feather name="shopping-cart" size={22} color={iconColor} />
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.navButton}
//         onPress={() => navigation.navigate('Notifications')}
//         accessibilityRole="button"
//         accessibilityLabel="Go to Notifications"
//       >
//         <Feather name="bell" size={22} color={iconColor} />
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.navButton}
//         onPress={() => navigation.navigate('Profile')}
//         accessibilityRole="button"
//         accessibilityLabel="Go to Profile"
//       >
//         <Feather name="user" size={22} color={iconColor} />
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     height: 70,
//     borderTopWidth: 0,
//     // borderColor: '#ccc',
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',

//     // iOS shadow
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 6,

//     // Android shadow
//     elevation: 8,
//   },
//   navButton: {
//     padding: 10,
//   },
// });

// export default BottomNavBar;
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
import { faHeart as faHeartOutline} from '@fortawesome/free-solid-svg-icons';

const BottomNavBar = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const iconColor = isDarkMode ? '#ffffff' : '#000000';
  const bgColor = isDarkMode ? '#1c1c1e' : '#ffffff';

const handleNavigation = (screen) => {
  navigation.navigate(screen);
};

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0); // total quantity

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

      <TouchableOpacity onPress={() => handleNavigation('Favourites')}>
      <FontAwesomeIcon icon={faHeartOutline} size={24} color="#555" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
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
