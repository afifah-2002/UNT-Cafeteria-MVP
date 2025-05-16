import React from 'react';
import { View, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const BottomNavBar = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const iconColor = isDarkMode ? '#ffffff' : '#000000';
  const bgColor = isDarkMode ? '#1c1c1e' : '#fff';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Feather name="home" size={22} color={iconColor} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Feather name="shopping-cart" size={22} color={iconColor} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
        <Feather name="bell" size={22} color={iconColor} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Feather name="user" size={22} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '10%',
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    width: '100%',

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,

    // Android shadow
    elevation: 8,
  },
  navButton: {
    padding: 10,
  }
});

export default BottomNavBar;
