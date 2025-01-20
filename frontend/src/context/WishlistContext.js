import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Context for the Wishlist
const WishlistContext = createContext();

// Custom hook to use the Wishlist context
export const useWishlist = () => {
  return useContext(WishlistContext);
};

// WishlistProvider component that wraps the children with the context provider
export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    // Initialize wishlist from localStorage if available
    const storedWishlist = localStorage.getItem('wishlistItems');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  // Persist wishlist items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Add product to the wishlist
  const addToWishlist = (product) => {
    // Check if product is already in the wishlist
    const existingProduct = wishlistItems.find(item => item.id === product.id);
    if (!existingProduct) {
      setWishlistItems([...wishlistItems, product]); // Add to wishlist if not already present
    }
  };

  // Remove product from the wishlist
  const removeFromWishlist = (productId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId)); // Remove product by ID
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
