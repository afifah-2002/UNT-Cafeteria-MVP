import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'; // Import ActivityIndicator
import BottomNavBar from '../components/bottomNavBar'; // Ensure this is the correct path
import RestaurantCard from '../components/RestaurantCard'; // Ensure this is the correct path
import { useNavigation } from '@react-navigation/native';
import { getAllCafes } from '../utils/api'; // Import the API function

// Get screen height
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Set space taken up by fixed UI elements (adjust HEADER_HEIGHT if it's dynamic now)
// Note: If your header height is truly dynamic, calculating CONTENT_HEIGHT this way might be imprecise.
// A better approach for dynamic headers/footers is often using flexbox on the main content area.
const HEADER_HEIGHT = 130; // Use the fixed or average header height if it's dynamic
const NAVBAR_HEIGHT = 60;
const CONTENT_HEIGHT = SCREEN_HEIGHT - HEADER_HEIGHT - NAVBAR_HEIGHT;

const HomeScreen = () => {
  const navigation = useNavigation();

  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Clear previous errors
        const fetchedCafes = await getAllCafes();

        if (Array.isArray(fetchedCafes)) {
          setCafes(fetchedCafes);
        } else {
          console.error('API did not return an array for cafes:', fetchedCafes);

          setCafes([]);

        }


      } catch (err) {
        console.error('Error fetching cafes:', err);
        setError('Failed to load cafes. Please try again.'); // Set a user-friendly error message
        setCafes([]); // Ensure cafes is an empty array on error
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchCafes();
  }, []);

  const handleNavigate = (cafe) => {
    console.log('Navigating to cafe:', cafe.name, 'with ID:', cafe._id);
    navigation.navigate('CategoriesScreen', { cafeId: cafe._id, cafeName: cafe.name }); // Pass cafe ID and name
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.content, { minHeight: CONTENT_HEIGHT }]}
      >
        <Text style={styles.greeting}>Hi Joel, Welcome back</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : cafes.length > 0 ? (
          // Map over the fetched cafes and render a RestaurantCard for each
          cafes.map((cafe) => (
            <TouchableOpacity
              key={cafe._id} // Use the unique cafe ID as the key
              onPress={() => handleNavigate(cafe)} // Pass the entire cafe object
            >
              <RestaurantCard
                // Assuming your cafe object has properties like name, description, rating, time, imageUrl
                image={cafe.imageURL ? { uri: cafe.imageURL } : require('../../assets/adaptive-icon.png')} // Use cafe image URL or a fallback
                title={cafe.name}
                subtitle={cafe.description} // Assuming description can serve as subtitle
                rating={cafe.rating ? cafe.rating.toFixed(1) : 'N/A'} // Assuming rating is a number
                time={cafe.deliveryTime || 'N/A'} // Assuming deliveryTime exists
                location={String(cafe.location || 'N/A')}
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.placeholder}>No cafes found.</Text>
        )}

      </ScrollView>
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 60,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
  placeholder: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default HomeScreen;
