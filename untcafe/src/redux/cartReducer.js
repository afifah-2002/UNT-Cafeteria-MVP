const initialState = {
    items: [],
};

export default function cartReducer(state = initialState, action) {
    switch (action.type) {

        case 'ADD_TO_CART': {
  const index = state.items.findIndex(i => i.itemId === action.payload.itemId);

  // Calculate add-on total from payload
  const addOnTotal = (action.payload.addOns || []).reduce(
    (sum, a) => sum + (a.price || 0),
    0
  );

  const totalUnitPrice = action.payload.price + addOnTotal;

  if (index !== -1) {
    const updatedItems = [...state.items];
    updatedItems[index].quantity += action.payload.quantity;
    return { ...state, items: updatedItems };
  }

  return {
    ...state,
    items: [
      ...state.items,
      {
        ...action.payload,
        totalUnitPrice, // Store it in the cart item
      },
    ],
  };
}


        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter(item => item.itemId !== action.payload),
            };

        case 'CLEAR_CART':
            return { ...state, items: [] };

        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items.map(item =>
                    item.itemId === action.payload.itemId
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };

        default:
            return state;
    }
}
