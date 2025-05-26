import * as types from '../types';

export const addToCart = (itemId, name, price, quantity, addOns = []) => ({
  type: types.ADD_TO_CART,
  payload: { itemId, name, price, quantity, addOns },
});

export const removeFromCart = (itemId, addOns = []) => ({
  type: types.REMOVE_FROM_CART,
  payload: { itemId, addOns },
});

export const clearCart = () => ({
  type: types.CLEAR_CART,
});

export const updateQuantity = (itemId, quantity, addOns = []) => ({
  type: types.UPDATE_QUANTITY,
  payload: { itemId, quantity, addOns },
});