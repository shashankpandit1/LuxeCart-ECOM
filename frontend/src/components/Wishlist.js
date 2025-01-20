import React, { useState } from 'react';
import { useWishlist } from '../context/WishlistContext'; // Import the WishlistContext
import { useCart } from '../context/CartContext'; // Import the useCart hook

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist(); // Access wishlist items and remove function
  const { addToCart } = useCart(); // Access the addToCart function from CartContext
  const [cartMessage, setCartMessage] = useState(""); // State for the cart message

  // Handle removing an item from the wishlist
  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId); // Call remove function from context
  };

  // Handle adding an item to the cart
  const handleAddToCart = (product) => {
    addToCart(product); // Add to Cart using the context function
    setCartMessage(`${product.name} has been added to your cart!`); // Show cart message
    setTimeout(() => setCartMessage(""), 2000); // Clear message after 2 seconds
  };

  return (
    <div className="max-w-screen-xl mx-auto p-5">
      {/* Cart message notification */}
      {cartMessage && (
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-6 rounded-lg shadow-md z-50">
          {cartMessage}
        </div>
      )}

      <h1 className="text-3xl font-bold text-center mb-8">Your Wishlist</h1>

      {/* Check if wishlist is empty */}
      {wishlistItems.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Your wishlist is currently empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Map through all wishlist items */}
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-full h-48 flex justify-center items-center bg-gray-100 rounded-lg">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-500 text-sm">{product.tag}</p>
                <p className="text-gray-700 font-bold mt-1">₹{product.price}</p>
              </div>

              <div className="mt-4 flex justify-between space-x-2">
                <button
                  className=" bg-red-600 text-white px-3 py-2 text-sm rounded-lg hover:bg-red-700 transition"
                  onClick={() => handleRemoveFromWishlist(product.id)} // Remove item from wishlist
                >
                  Remove
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-2 text-sm rounded-lg hover:bg-green-600 transition"
                  onClick={() => handleAddToCart(product)} // Add item to cart
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
