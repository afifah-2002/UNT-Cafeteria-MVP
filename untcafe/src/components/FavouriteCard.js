import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHeart as faHeartOutline,
  faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import {
  addFavorite,       // thunk
  removeFavorite,    // thunk
  clearError,
} from '../redux/actions/FavouritesAction';
const FavouritesCard = ({
  image, title, subtitle, rating,price }) => {
  const dispatch = useDispatch();
  const isDark   = useColorScheme() === 'dark';

  /* --- redux slice --- */
  const { favorites, loading, error } = useSelector(
    (s) => s.favourites || { favorites: [], loading: false, error: null }
  );

  /* --- is this specific item in favourites? --- */
  const isFavorited = favorites.some(
    (fav) =>
      String(fav.itemID?._id ?? fav.itemId) === String(itemId) // handles both shapes
  );

  /* --- show any API error once --- */
  useEffect(() => {
    if (error) {
      Alert.alert('Favorites error', error);
      dispatch(clearError());
    }
  }, [error]);

  /* --- toggle add/remove --- */
  const toggleFavorite = () => {
    if (loading) return;                
    if (isFavorited) {
      dispatch(removeFavorite({ userId, itemId }));
    } else {
      dispatch(addFavorite({ userId, itemId }));
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: isDark ? '#1c1c1e' : '#fff' }]}>
      <Image source={image} style={styles.image} />

      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
        {title || 'No title'}
      </Text>
      <Text style={[styles.subtitle, { color: isDark ? '#aaa' : '#555' }]}>
        {subtitle || 'No description'}
      </Text>

      <View style={styles.infoRow}>
        <FontAwesome name="star" size={14} color="#f5a623" />
        <Text style={styles.infoText}>{rating ?? 'N/A'}</Text>
        {price !== undefined && (
          <Text
            style={[
              styles.subtitle,
              { color: isDark ? '#aaa' : '#555' },
            ]}
          >
            Price: ${price.toFixed(2)}
          </Text>
        )}
      </View>

      <TouchableOpacity
        onPress={toggleFavorite}
        disabled={loading}
        style={styles.favoriteButton}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityRole="button"
        accessibilityLabel={
          isFavorited ? 'Remove from favourites' : 'Add to favourites'
        }
      >
        <FontAwesomeIcon
          icon={isFavorited ? faHeartSolid : faHeartOutline}
          size={RFValue(24)}
          color={isFavorited ? '#ff0000' : isDark ? '#aaa' : '#555'}
        />
      </TouchableOpacity>
    </View>
  );
};

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginBottom: 8,
  },
  title: { fontSize: RFValue(18), fontWeight: 'bold' },
  subtitle: { fontSize: RFValue(13), marginBottom: 6 },
  infoRow: { flexDirection: 'row', alignItems: 'center' },
  infoText: { fontSize: RFValue(12), marginLeft: 4 },
  favoriteButton: { alignSelf: 'flex-end', padding: 8 },
});

export default FavouritesCard;
