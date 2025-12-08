import { createContext, useContext, useState } from 'react';


export const CartContext = createContext();


export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    setCartItems((prev) => {
      const existe = prev.find((item) => item._id === productToAdd._id);
      if (existe) {
        return prev.map((item) =>
          item._id === productToAdd._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...productToAdd, quantity: 1 }];
    });
  };

  const removeItemFromCart = (_id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== _id));
  };

  const clearCart = () => setCartItems([]);

  const getTotalItems = () => cartItems.reduce((t, i) => t + i.quantity, 0);
  const getTotalPrice = () => cartItems.reduce((t, i) => t + (i.precio || 0) * i.quantity, 0);

  const value = {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};