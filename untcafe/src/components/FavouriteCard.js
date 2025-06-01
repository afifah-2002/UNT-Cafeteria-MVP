import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as faHeartOutline,
} from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { addFavorite, removeFavorite } from '../redux/actions/FavouritesAction';

const FavouritesCard = ({
  userId,
  itemId,
  image,
  title,
  subtitle,
  rating,
  price,
  onCardPress,
}) => {
  console.log('CARD: Image prop:', image);
  console.log('CARD: userId:', userId, 'itemId:', itemId);
  const dispatch = useDispatch();
  const isDark = useColorScheme() === 'dark';
  const { favorites, loading } = useSelector(
    (s) => s.favourites || { favorites: [], loading: false }
  );
  console.log('CARD: Loading state:', loading);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(null);

  const isFavorite = favorites.some((fav) => fav.item === itemId);
  console.log('CARD: isFavorite:', isFavorite, 'Item ID:', itemId, 'Favorites:', favorites);

  const toggleFavorite = () => {
    console.log('HIIIHIHIHIHIHI');
    if (loading) return;
    console.log('CARD: Toggling favorite, isFavorite:', isFavorite);
    if (isFavorite) {
      dispatch(removeFavorite({ userId, itemId }));
    } else {
      dispatch(addFavorite({ userId, itemId }));
    }
  };

  let imageSource;
  try {
    imageSource = image === 'default' || !image
      ? require('../../assets/adaptive-icon.png')
      : { uri: image };
    console.log('CARD: Image source resolved:', imageSource);
  } catch (e) {
    console.log('CARD: Fallback image error:', e.message);
    imageSource = { uri: 'https://via.placeholder.com/150' };
  }

  return (
    <View style={[styles.card, { backgroundColor: isDark ? '#1c1c1e' : '#fff' }]}>
      <TouchableOpacity
        onPress={onCardPress}
        activeOpacity={0.7}
        style={styles.cardContent}
      >
        <View style={styles.imageContainer}>
          {imageLoading && !imageError && (
            <ActivityIndicator
              size="small"
              color={isDark ? '#aaa' : '#555'}
              style={styles.activityIndicator}
            />
          )}
          {imageError ? (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imageErrorText}>Image failed to load</Text>
            </View>
          ) : (
            <Image
              source={imageSource}
              style={styles.image}
              resizeMode="cover"
              onLoadStart={() => setImageLoading(true)}
              onLoad={() => setImageLoading(false)}
              onError={(e) => {
                console.log('CARD: Image load error:', e.nativeEvent.error);
                setImageLoading(false);
                setImageError(e.nativeEvent.error);
              }}
            />
          )}
        </View>
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
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log('Heart button pressed');
          toggleFavorite();
        }}
        disabled={loading}
        style={styles.favoriteButton}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        accessibilityRole="button"
        accessibilityLabel={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
      >
        <FontAwesomeIcon
          icon={isFavorite ? faHeartSolid : faHeartOutline}
          size={RFValue(20)}
          color={isFavorite ? '#ff0000' : isDark ? '#aaa' : '#555'}
        />
      </TouchableOpacity>
    </View>
  );
};

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
    position: 'relative',
  },
  cardContent: {
    width: '100%',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 160,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginBottom: 8,
  },
  imagePlaceholder: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  imageErrorText: {
    color: '#555',
    fontSize: RFValue(12),
    textAlign: 'center',
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: RFValue(13),
    marginBottom: 6,
  },
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
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
});

export default FavouritesCard;