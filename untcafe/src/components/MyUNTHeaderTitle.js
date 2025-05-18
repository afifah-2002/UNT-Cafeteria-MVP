import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const MyUNTHeaderTitle = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/untHeader.png')} // your logo/banner
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 180,
    height: 60, // adjust this for height
  },
});

export default MyUNTHeaderTitle;
