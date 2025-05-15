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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden',
    width: '100%'
  },
  image: {
    height: '60%',
    paddingTop: '10'
  },
});

export default MyUNTHeaderTitle;
