const initialState = {
  items: [],
  promoCode: '',
  discount: 0,
  taxRate: 0.08, // 8% tax
  total: 0,
};

export default function cartReducer(state = initialState, action) {
  const areAddOnsEqual = (a1, a2) => {
    if (a1.length !== a2.length) return false;
    const sortedA1 = [...a1].sort((a, b) => a.name.localeCompare(b.name));
    const sortedA2 = [...a2].sort((a, b) => a.name.localeCompare(b.name));
    return sortedA1.every((addon, index) =>
      addon.name === sortedA2[index].name && addon.price === sortedA2[index].price
    );
  };

  switch (action.type) {
    case 'ADD_TO_CART': {
      const { itemId, name, price, quantity, addOns = [] } = action.payload;

      const addOnsTotal = addOns.reduce((sum, addon) => sum + (addon.price || 0), 0);
      const totalUnitPrice = price + addOnsTotal;

      const existingItem = state.items.find(
        (item) => item.itemId === itemId && areAddOnsEqual(item.addOns, addOns)
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item === existingItem
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  itemTotalPrice: (item.quantity + quantity) * item.totalUnitPrice,
                }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [
            ...state.items,
            {
              itemId,
              name,
              price,
              quantity,
              addOns,
              totalUnitPrice,
              itemTotalPrice: totalUnitPrice * quantity,
            },
          ],
        };
      }
    }

    case 'REMOVE_FROM_CART': {
      const { itemId, addOns = [] } = action.payload;

      return {
        ...state,
        items: state.items.filter(
          (item) => !(item.itemId === itemId && areAddOnsEqual(item.addOns, addOns))
        ),
      };
    }

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'UPDATE_QUANTITY': {
      const { itemId, quantity, addOns = [] } = action.payload;

      return {
        ...state,
        items: state.items.map((item) =>
          item.itemId === itemId && areAddOnsEqual(item.addOns, addOns)
            ? {
                ...item,
                quantity,
                itemTotalPrice: quantity * item.totalUnitPrice,
              }
            : item
        ),
      };
    }

    case 'APPLY_PROMO_CODE':
      return { ...state, promoCode: action.payload };

    case 'SET_DISCOUNT':
      return { ...state, discount: action.payload };

    case 'CALCULATE_TOTAL': {
      const subtotal = state.items.reduce((sum, item) => sum + item.itemTotalPrice, 0);
      const tax = subtotal * state.taxRate;
      const discount = state.promoCode === 'SAVE10' ? subtotal * 0.10 : 0;
      return { ...state, discount, total: subtotal + tax - discount };
    }

    default:
      return state;
  }
}

