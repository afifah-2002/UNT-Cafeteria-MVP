// screens/FavouritesScreen.jsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { fetchFavorites } from '../redux/actions/FavouritesAction';

const userId = '682c202cf08ba92be50a36f5'; // TODO: Replace with auth

export default function FavouritesScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const { favorites = [], loading, error } = useSelector(
    (s) => s.favourites || { favorites: [], loading: false, error: null }
  );

  useEffect(() => {
    dispatch(fetchFavorites(userId));
  }, [dispatch]);
  console.log('***********************888')
  console.log('Favorites from Redux:', favorites);
  console.log('Loading:', loading, 'Error:', error);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchFavorites(userId));
    setRefreshing(false);
  };

  const renderItem = ({ item }) => {
    if (!item?.item) return null; // Defensive check
    const prod = item.item;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('ItemDetails', { itemId: prod._id })}
      >
        <Image
          source={
            prod.imageUrl
              ? { uri: prod.imageUrl }
              : require('../../assets/adaptive-icon.png')
          }
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{prod.name}</Text>
          <Text style={styles.price}>₹{prod.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(fav) => fav._id}
      renderItem={renderItem}
      contentContainerStyle={favorites.length === 0 ? styles.center : styles.list}
      ListEmptyComponent={
        <Text style={styles.empty}>
          {error ? `Error: ${error}` : 'No favourites added yet.'}
        </Text>
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: {
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  image: { height: 200, width: '100%' },
  info: { padding: 10 },
  name: { fontSize: 18, fontWeight: '600' },
  price: { marginTop: 5, color: '#666' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { fontSize: 16, color: '#888', textAlign: 'center' },
});
