import * as types from '../types';
import axios from 'axios';

export const fetchFavoritesRequest = () => ({
  type: types.FETCH_FAVORITES_REQUEST,
});

export const fetchFavoritesSuccess = (favorites) => ({
  type: types.FETCH_FAVORITES_SUCCESS,
  payload: favorites,
});

export const fetchFavoritesFailure = (error) => ({
  type: types.FETCH_FAVORITES_FAILURE,
  payload: error,
});

export const fetchFavorites = (userId) => async (dispatch) => {
  dispatch(fetchFavoritesRequest());
  try {
    const response = await axios.get(`http://192.168.1.138:5000/favourites/${userId}`);
    const favorites = response.data.map(fav => ({
      _id: fav._id,
      userId: fav.userId,
      item: fav.itemID, // <-- This ensures we have the full item object
    }));

    dispatch(fetchFavoritesSuccess(favorites));
  } catch (err) {
    const errorMsg = err.response?.data?.message || err.message;
    if (errorMsg !== 'No favorites found for this user') {
      dispatch(fetchFavoritesFailure(errorMsg));
    } else {
      dispatch(fetchFavoritesSuccess([]));
    }
  }
};


export const addFavoriteRequest = () => ({
  type: types.ADD_FAVORITE_REQUEST,
});

export const addFavoriteSuccess = (favorite) => ({
  type: types.ADD_FAVORITE_SUCCESS,
  payload: favorite,
});

export const addFavoriteFailure = (error) => ({
  type: types.ADD_FAVORITE_FAILURE,
  payload: error,
});

export const addFavorite = ({ userId, itemId }) => async (dispatch) => {
  console.log('Add Favorite payload:', { userId, itemId }); // Debug log
  dispatch(addFavoriteRequest());
  try {
    const response = await axios.post('http://192.168.1.230:5000/favourites', {
      UserID: userId,
      itemID: itemId,
    });
    dispatch(addFavoriteSuccess(response.data.favourite));
  } catch (err) {
    dispatch(addFavoriteFailure(err.response?.data?.message || err.message));
  }
};

export const removeFavoriteRequest = () => ({
  type: types.REMOVE_FAVORITE_REQUEST,
});

export const removeFavoriteSuccess = (itemId) => ({
  type: types.REMOVE_FAVORITE_SUCCESS,
  payload: itemId,
});

export const removeFavoriteFailure = (error) => ({
  type: types.REMOVE_FAVORITE_FAILURE,
  payload: error,
});

export const removeFavorite = ({ userId, itemId }) => async (dispatch) => {
  dispatch(removeFavoriteRequest());
  try {
    await axios.delete(`http://192.168.1.230:5000/favourites/${userId}/${itemId}`);
    dispatch(fetchFavorites(userId)); // Refetch to sync
    dispatch(removeFavoriteSuccess(itemId));
  } catch (err) {
    if (err.response?.status === 404) {
      dispatch(fetchFavorites(userId)); // Sync on 404
      dispatch(removeFavoriteSuccess(itemId));
    } else {
      dispatch(removeFavoriteFailure(err.response?.data?.message || err.message));
    }
  }
};

export const clearError = () => ({
  type: types.CLEAR_ERROR,
});