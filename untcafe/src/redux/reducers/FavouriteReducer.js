import * as types from '../types';

const initialState = {
  favorites: [],
  loading: false,
  error: null,
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_FAVORITES_REQUEST:
    case types.ADD_FAVORITE_REQUEST:
    case types.REMOVE_FAVORITE_REQUEST:
      return { ...state, loading: true, error: null };
    case types.FETCH_FAVORITES_SUCCESS:
      return { ...state, loading: false, favorites: action.payload };
    case types.FETCH_FAVORITES_FAILURE:
    case types.ADD_FAVORITE_FAILURE:
    case types.REMOVE_FAVORITE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case types.ADD_FAVORITE_SUCCESS:
      return { ...state, loading: false, favorites: [...state.favorites, action.payload] };
    case types.REMOVE_FAVORITE_SUCCESS:
      return { ...state, loading: false };
    case types.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default favoritesReducer;