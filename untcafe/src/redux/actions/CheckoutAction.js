import * as types from '../types';

export const applyPromoCode = (promoCode) => ({
  type: types.APPLY_PROMO_CODE,
  payload: promoCode,
});

export const setDiscount = (discount) => ({
  type: types.SET_DISCOUNT,
  payload: discount,
});

export const calculateTotal = () => ({
  type: types.CALCULATE_TOTAL,
});