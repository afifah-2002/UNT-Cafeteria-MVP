import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import FavouritesCard from '../components/FavouriteCard';
import { getItemsByCategory } from '../utils/api';
import BottomNavBar from '../components/bottomNavBar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavorites, clearError } from '../redux/actions/FavouritesAction';

const TypesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId, categoryName } = route.params || {};
  const userId = '682c202cf08ba92be50a36f5';

  if (!categoryId) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Category ID is missing from route.</Text>
      </SafeAreaView>
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

  const { favorites, loading: favoritesLoading, error: favoritesError } = useSelector(
    (state) => state.favourites || { favorites: [], loading: false, error: null }
  );

  useEffect(() => {
    console.log('[TypesScreen] Fetching favorites...');
    dispatch(fetchFavorites(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (favoritesError) {
      Alert.alert('Favorites Error', favoritesError, [
        { text: 'OK', onPress: () => dispatch(clearError()) },
      ]);
    }
  }, [favoritesError, dispatch]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log(`[TypesScreen] Fetching items for category ID: ${categoryId}`);
        const data = await getItemsByCategory(categoryId);
        console.log('[TypesScreen] API response:', JSON.stringify(data, null, 2));
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
    navigation.navigate('ItemDetails', { itemId: item._id });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.cardContainer}>
        <FavouritesCard
          userId={userId}
          itemId={item._id}
          image={item.imageUrl || 'default'}
          title={item.name}
          subtitle={item.description || ''}
          rating={item.rating || 'N/A'}
          price={item.price}
          onCardPress={() => handleNavigate(item)}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
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
      </View>
      <BottomNavBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
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
});

export default TypesScreen;