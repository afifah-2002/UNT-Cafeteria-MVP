// screens/FavouritesScreen.jsx
import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { fetchFavorites } from '../redux/actions/FavouritesAction';

const userId = '682c202cf08ba92be50a36f5';   // <-- replace with real auth later

export default function FavouritesScreen() {
  const dispatch   = useDispatch();
  const navigation = useNavigation();

  /* favourites slice */
  const { favorites = [], loading, error } = useSelector(
    (s) => s.favourites || { favorites: [], loading: false, error: null }
  );

  /* fetch once on mount */
  useEffect(() => {
    dispatch(fetchFavorites(userId));
  }, [dispatch]);

  /* render one favourite card */
  const renderItem = ({ item }) => {
    if (!item?.itemID) return null;     // defensive
    const prod = item.itemID;           // populated product

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

  /* loading / error / empty states */
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>No favourites added yet.</Text>
      </View>
    );
  }

  /* list */
  return (
    <FlatList
      data={favorites}
      keyExtractor={(fav) => fav._id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
}

/* ───── styles ───── */
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
  info:  { padding: 10 },
  name:  { fontSize: 18, fontWeight: '600' },
  price: { marginTop: 5, color: '#666' },

  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty:  { fontSize: 16, color: '#888' },
  error:  { fontSize: 16, color: 'red', textAlign: 'center' },
});
