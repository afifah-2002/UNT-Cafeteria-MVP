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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as faHeartOutline,
} from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // star icon
import { RFValue } from 'react-native-responsive-fontsize';

import {
  addFavorite,
  removeFavorite,
  clearError,
} from '../redux/actions/FavouritesAction';

const FavouritesCard = ({
  userId,
  itemId,
  image,
  title,
  subtitle,
  rating,
  price,
}) => {
  const dispatch = useDispatch();
  const isDark = useColorScheme() === 'dark';

  const { favorites, loading, error } = useSelector(
    (s) => s.favourites || { favorites: [], loading: false, error: null }
  );

  const isFavorited = favorites.some(
    (fav) =>
      String(fav.itemId?._id ?? fav.itemId) === String(itemId)
  );

  useEffect(() => {
    if (error) {
      Alert.alert('Favorites error', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

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
      <Image
        source={
          typeof image === 'string'
            ? { uri: image }
            : image
        }
        style={styles.image}
      />

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

      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
        {title || 'No title'}
      </Text>
      <Text style={[styles.subtitle, { color: isDark ? '#aaa' : '#555' }]}>
        {subtitle || 'No description'}
      </Text>

      <View style={styles.infoRow}>
        <FontAwesomeIcon icon={faStar} size={14} color="#f5a623" />
        <Text style={styles.infoText}>{rating ?? 'N/A'}</Text>
        {typeof price === 'number' && (
          <Text style={[styles.subtitle, { color: isDark ? '#aaa' : '#555', marginLeft: 12 }]}>
            Price: ${price.toFixed(2)}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 12,
    padding: 12,
    paddingRight: 24,  // add extra right padding for space near heart icon
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginBottom: 8,
  },
  title: { fontSize: RFValue(18), fontWeight: 'bold' },
  subtitle: { fontSize: RFValue(13), marginBottom: 6 },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: RFValue(12),
    marginLeft: 4,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 8,
    zIndex: 10,
  },
});

export default FavouritesCard;
