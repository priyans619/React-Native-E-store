import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':

      const existingProductIndex = state.findIndex(
        (product) => product.id === action.payload.id
      );

      if (existingProductIndex !== -1) {
        // If  product exists we have to increase the quantity
        const updatedCart = [...state];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        // also if the product is not in the cart, we have to add with quantity 1
        return [...state, { ...action.payload, quantity: 1 }];
      }

    case 'INCREASE_QUANTITY':
      return state.map((product) =>
        product.id === action.payload.id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );

    case 'DECREASE_QUANTITY':
      return state
        .map((product) =>
          product.id === action.payload.id
            ? { ...product, quantity: Math.max(0, product.quantity - 1) }
            : product
        ) 
        .filter((product) => product.quantity > 0); 
        // .filter for removing when - Is 0

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const increaseQuantity = (product) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: product });
  };

  const decreaseQuantity = (product) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: product });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, }}>
      {children}
    </CartContext.Provider>
  );
};
