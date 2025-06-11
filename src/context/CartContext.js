'use client'

import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleAddToCart = (item, table) => {
    const existingItem = selectedItems.find((i) => i.id === item.id);

    if (existingItem) {
      setSelectedItems(
        selectedItems.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setSelectedItems([...selectedItems, { ...item, qty: 1, table }]);
    }
  };

  const removeItem = (itemId) => {
    setSelectedItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <CartContext.Provider
      value={{
        selectedItems,
        handleAddToCart,
        removeItem,
        setSelectedItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
