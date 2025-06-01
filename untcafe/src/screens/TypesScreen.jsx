import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import FavouritesCard from '../components/FavouriteCard';
import { getItemsByCategory } from '../utils/api';
import BottomNavBar from '../components/bottomNavBar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavorites } from '../redux/actions/FavouritesAction';

const TypesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId, categoryName } = route.params || {};
  const userId = '682c202cf08ba92be50a36f5';

  console.log('TypesScreen route.params:', route.params); // Debug log

  return (
    <TypesScreenContent
      userId={userId}
      navigation={navigation}
      categoryId={categoryId}
      categoryName={categoryName}
    />
  );
};

const TypesScreenContent = ({ userId, navigation, categoryId, categoryName }) => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { favorites, loading: favoritesLoading } = useSelector((state) => state.favourites || { favorites: [], loading: false });

  useEffect(() => {
    dispatch(fetchFavorites(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    const fetchTypes = async () => {
      if (!categoryId) {
        setError('Category ID missing.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const data = await getItemsByCategory(categoryId);
        console.log('Fetched types:', data); // Debug log
        setTypes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching types:', err.message);
        setError('Failed to load types.');
      } finally {
        setLoading(false);
      }
    };
    fetchTypes();
  }, [categoryId]);

  console.log('Rendering TypesScreenContent with:', { categoryId, categoryName, loading, favoritesLoading, error, typesLength: types.length }); // Debug log

  const handleNavigate = (item) => {
    navigation.navigate('ItemDetails', { itemId: item._id });
  };

  const renderItem = ({ item }) => {
    console.log('Rendering item:', item); // Debug log
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={() => handleNavigate(item)}>
          <FavouritesCard
            userId={userId}
            itemId={item._id}
            image={item.imageUrl ? { uri: item.imageUrl } : require('../../assets/adaptive-icon.png')}
            title={item.name}
            subtitle={item.description || ''}
            rating={item.rating || 'N/A'}
            price={item.price}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Debug: CategoryName={categoryName}, Loading={loading.toString()}</Text> {/* Temporary debug */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : types.length === 0 ? (
        <Text style={styles.placeholder}>No items found.</Text>
      ) : (
        <FlatList
          data={types}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
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
  cardContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
});

export default TypesScreen;