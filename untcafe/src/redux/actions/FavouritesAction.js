import * as types from '../types';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.138:5000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

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
    const response = await axiosInstance.get(`/favourites/${userId}`);
    const favorites = response.data.map(fav => ({
      _id: fav._id,
      userId: fav.userId || userId, // Fallback to input userId
      item: fav.itemID,
    }));
    console.log('Fetched favorites:', favorites);
    dispatch(fetchFavoritesSuccess(favorites));
  } catch (err) {
    const errorMsg = err.response?.data?.message || err.message;
    console.log('Fetch favorites error:', errorMsg);
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
  console.log('Add Favorite payload:', { userId, itemId });
  if (!userId || !itemId) {
    dispatch(addFavoriteFailure('Missing userId or itemId'));
    return;
  }
  dispatch(addFavoriteRequest());
  try {
    const response = await axiosInstance.post('/favourites', {
      userId,
      itemId,
    });
    dispatch(addFavoriteSuccess(response.data.favourite));
    dispatch(fetchFavorites(userId));
  } catch (err) {
    const errorMsg = err.response?.data?.message || err.message;
    console.log('Add favorite error:', errorMsg, 'Status:', err.response?.status);
    dispatch(addFavoriteFailure(errorMsg));
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
  console.log('Remove Favorite payload:', { userId, itemId });
  if (!userId || !itemId) {
    dispatch(removeFavoriteFailure('Missing userId or itemId'));
    return;
  }
  dispatch(removeFavoriteRequest());
  try {
    await axiosInstance.delete(`/favourites/${userId}/${itemId}`);
    dispatch(removeFavoriteSuccess(itemId));
    dispatch(fetchFavorites(userId));
  } catch (err) {
    const errorMsg = err.response?.data?.message || err.message;
    console.log('Remove favorite error:', errorMsg, 'Status:', err.response?.status);
    if (err.response?.status === 404) {
      dispatch(removeFavoriteSuccess(itemId));
      dispatch(fetchFavorites(userId));
    } else {
      dispatch(removeFavoriteFailure(errorMsg));
    }
  }
};

export const clearError = () => ({
  type: types.CLEAR_ERROR,
});