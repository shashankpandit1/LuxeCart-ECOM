import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Cart Context
const CartContext = createContext();

// Cart Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cart from localStorage if available
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [discountCode, setDiscountCode] = useState(() => {
    // Initialize discount code from localStorage if available
    return localStorage.getItem('discountCode') || '';
  });

  const [discountApplied, setDiscountApplied] = useState(() => {
    // Initialize discount applied status from localStorage if available
    return JSON.parse(localStorage.getItem('discountApplied')) || false;
  });

  // Save cartItems, discountCode, and discountApplied to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('discountCode', discountCode);
  }, [discountCode]);

  useEffect(() => {
    localStorage.setItem('discountApplied', JSON.stringify(discountApplied));
  }, [discountApplied]);

  // Function to add an item to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find(item => item.id === product.id);
      if (itemExists) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  // Function to update the quantity of an item
  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Function to delete an item from the cart
  const deleteItem = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  // Function to calculate the total price of the items in the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Function to handle discount submission (apply discount code)
  const handleDiscountSubmit = () => {
    if (discountCode === 'DISCOUNT10') {
      setDiscountApplied(true); // Simulate a discount application
    } else {
      setDiscountApplied(false);
      alert('Invalid discount code');
    }
  };

  // The value we want to provide to the components
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    deleteItem,
    discountCode,
    setDiscountCode,
    discountApplied,
    handleDiscountSubmit,
    calculateTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to access the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
