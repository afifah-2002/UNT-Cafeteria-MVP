// import React from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import BottomNavBar from '../components/bottomNavBar';
// import RestaurantCard from '../components/RestaurantCard';




// const HomeScreen = () => {
//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.content}>
//         <Text style={styles.greeting}>Hi Joel, Welcome back</Text>

//         <RestaurantCard
//           image={require('../../assets/images/burger.jpg')}
//           title="Discovery Perks Grill"
//           subtitle="Burgers · Sandwiches · Fries"
//           rating="4.6"
//           time="10–15 min"
//         />

//         <RestaurantCard
//           image={require('../../assets/images/market.jpg')}
//           title="Discovery Perks Market"
//           subtitle="Coffee · Ice Cream"
//           rating="4.2"
//           time="2–3 min"
//         />
//       </ScrollView>
//       <BottomNavBar />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingBottom: 60,
//   },
//   content: {
//     padding: 16,
//   },
//   greeting: {
//     fontSize: 22,
//     fontWeight: '600',
//     marginBottom: 16,
//   },
// });

// export default HomeScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // ✅ import
import BottomNavBar from '../components/bottomNavBar';
import RestaurantCard from '../components/RestaurantCard';
import { getAllCafes } from '../services/api';


const HomeScreen = () => {
  const [cafes, setCafes] = useState([]);
  const navigation = useNavigation(); // ✅ used here

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const data = await getAllCafes();
        setCafes(data);
      } catch (err) {
        console.error('Failed to load cafes');
      }
    };

    fetchCafes();
  }, []);


const handleNavigate = (cafeName) => {
  const cleanedName = cafeName?.toLowerCase().trim();
  console.log('Navigating to:', cleanedName);

  if (cleanedName.includes('grill')) {
    navigation.navigate('GrillMenu');
  } else if (cleanedName.includes('market')) {
    navigation.navigate('CoffeeMenu');
  } else {
    console.warn('Unknown cafe name, no navigation performed:', cleanedName);
  }
};


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>Hi Joel, Welcome back</Text>

        {cafes.map((cafe, index) => (
         <TouchableOpacity key={index} onPress={() => handleNavigate(cafe.name)}>

            <RestaurantCard
              title={cafe.name}
              subtitle={cafe.description || 'Tap to explore'}
              rating="4.5"
              time="5–10 min"
              image={
                cafe.name.toLowerCase().includes('grill')
                  ? require('../../assets/images/burger.jpg')
                  : require('../../assets/images/market.jpg')
              }
            />
          </TouchableOpacity>
        ))}
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
