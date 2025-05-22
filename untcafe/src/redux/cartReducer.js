const initialState = {
    items: [
        {
            itemId: '1',
            name: 'Test Burger',
            price: 5.99,
            quantity: 2,
        },
        {
            itemId: '2',
            name: 'Test Fries',
            price: 2.49,
            quantity: 1,
        },
    ],
};

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            const index = state.items.findIndex(i => i.itemId === action.payload.itemId);
            if (index !== -1) {
                const updatedItems = [...state.items];
                updatedItems[index].quantity += action.payload.quantity;
                return { ...state, items: updatedItems };
            }
            return { ...state, items: [...state.items, action.payload] };

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
