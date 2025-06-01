import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import favoritesReducer from './reducers/FavouriteReducer';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        favourites : favoritesReducer,
    },
});
