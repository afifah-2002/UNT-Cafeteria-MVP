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

  if (!categoryId) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Category ID is missing from route.</Text>
      </View>
    );
  }

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

  const { favorites, loading: favoritesLoading } = useSelector(
    (state) => state.favourites || { favorites: [], loading: false }
  );

  useEffect(() => {
    console.log('[TypesScreen] Fetching favorites...');
    dispatch(fetchFavorites(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log(`[TypesScreen] Fetching items for category ID: ${categoryId}`);
        const data = await getItemsByCategory(categoryId);
        console.log('[TypesScreen] API response:', data);
        setTypes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('[TypesScreen] Error fetching types:', err.message);
        setError('Failed to load items. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, [categoryId]);

  const handleNavigate = (item) => {
    navigation.navigate('ItemDetails', { itemID: item._id });
  };

  const renderItem = ({ item }) => {
    const isFavorite = favorites.some((fav) => fav.item === item._id || fav.item?._id === item._id);

    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={() => handleNavigate(item)}>
          <FavouritesCard
            userId={userId}
            itemId={item._id}
            image={item.imageUrl ? item.imageUrl : require('../../assets/adaptive-icon.png')}
            title={item.name}
            subtitle={item.description || ''}
            rating={item.rating || 'N/A'}
            price={item.price}
            isFavorite={isFavorite}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* UI States */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : types.length === 0 ? (
        <Text style={styles.placeholder}>No items found in this category.</Text>
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
  debugText: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default TypesScreen;
