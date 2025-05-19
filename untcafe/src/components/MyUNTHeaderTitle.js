// import React from 'react';
// import { View, Image, StyleSheet, Dimensions } from 'react-native'; // Import Dimensions

// // Get screen width for potential use, although percentages relative to container are often sufficient
// const { width: screenWidth } = Dimensions.get('window');

// const MyUNTHeaderTitle = () => {
//   return (
//     // Give the container flex: 1 to fill the header space
//     <View style={styles.container}>
//       {/* Using your original local image */}
//       <Image
//         source={require('../../assets/images/untHeader.png')}
//         style={styles.image}
//         resizeMode="contain" // Keep resizeMode
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, // Keep flex: 1 to fill the header height (130px from Stack.Screen options)
//     flexDirection: 'row', // Keep row direction for centering
//     alignItems: 'center', // Center content vertically
//     justifyContent: 'center', // Center content horizontally
//     width: '100%', // Keep width 100%
//   },
//   image: {
//     // Use percentage dimensions relative to the container.
//     // The container's height is determined by the headerStyle height (130px),
//     // and its width is 100%.
//     height: '60%', // Example: Image height is 70% of the container's height (approx 70% of 130px)
//     width: '80%', // Example: Image width is 80% of the container's width (80% of 100%)

//     // You can adjust these percentages (e.g., '80%', '90%') to make the image larger or smaller
//     // while keeping its aspect ratio due to resizeMode="contain".

//     // If you needed to size based on screen width directly:
//     // width: screenWidth * 0.6, // Example: 60% of the total screen width
//     // height: (screenWidth * 0.6) * (imageAspectRatio), // You'd need to know the image aspect ratio

//     resizeMode: 'contain', // Ensures the image fits within the bounds while maintaining aspect ratio
//     marginTop: 0, // Keep margin top at 0
//   },
// });

// export default MyUNTHeaderTitle;


import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const MyUNTHeaderTitle = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/untHeader.png')}
        style={styles.image}
        resizeMode="contain"
        accessibilityRole="image"
        accessibilityLabel="UNT Logo"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  image: {
    height: '60%',
    width: '80%',
  },
});

export default MyUNTHeaderTitle;
