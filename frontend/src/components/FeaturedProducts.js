import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from '../context/ProductContext';
import { useCart } from "../context/CartContext"; // Import the useCart hook
import { useWishlist } from "../context/WishlistContext"; // Import the useWishlist hook

// ProductCard Component to handle each product's image carousel with transition
const ProductCard = ({ product, addToCart, addToWishlist }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true); // State to trigger the fade effect

  // Cycle through images every 3 seconds with fade transition
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade out
      setTimeout(() => {
        // Change the image after fade out completes
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % product.images.length
        );
        setFade(true); // Start fade in
      }, 500); // 500ms delay to match the CSS transition duration
    }, 3000); // 3-second interval

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [product.images.length]);

  return (
    <div className="relative group border rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-2xl">
      {/* Product Image with Fade Transition */}
      <div className="relative h-64 w-full overflow-hidden flex items-center justify-center">
        <img
          key={currentImageIndex}
          src={product.images[currentImageIndex]}
          alt={product.name}
          className={`absolute max-w-full max-h-full transition-opacity duration-1000 ${fade ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">₹{product.price}</p>
        <span className="inline-block px-2 py-1 text-xs text-white bg-green-500 rounded">
          {product.tag}
        </span>
      </div>

      {/* Buttons Section at Bottom */}
      <div className="flex justify-between p-4 border-t">
        <button
          className="px-3 py-2 bg-white text-black font-medium rounded-full shadow hover:bg-gray-200 transition duration-200"
          onClick={() => addToCart(product)} // Use the addToCart function from props
        >
          Add to Cart
        </button>
        <button
          className="px-3 py-2 bg-white text-black font-medium rounded-full shadow hover:bg-gray-200 transition duration-200"
          onClick={() => addToWishlist(product)} // Add to Wishlist functionality
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  const { data, loading, error } = useContext(ProductContext);
  
  const featuredProducts = data.slice(0, 6);
  const [cartMessage, setCartMessage] = useState(""); // Message to show when product is added to cart
  const [wishlistMessage, setWishlistMessage] = useState(""); // Message to show when product is added to wishlist
  const { addToCart } = useCart(); // Use the addToCart function from CartContext
  const { addToWishlist } = useWishlist(); // Use the addToWishlist function from WishlistContext

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Add to Cart Function
  const handleAddToCart = (product) => {
    addToCart(product); // Add to Cart using the context function
    setCartMessage(`${product.name} has been added to your cart!`);
    setTimeout(() => setCartMessage(""), 2000); // Clear message after 2 seconds
  };

  // Add to Wishlist Function
  const handleAddToWishlist = (product) => {
    addToWishlist(product); // Add to Wishlist using the context function
    setWishlistMessage(`${product.name} has been added to your wishlist!`);
    setTimeout(() => setWishlistMessage(""), 2000); // Clear message after 2 seconds
  };

  return (
    <section className="py-10">
      <h2 className="text-4xl font-bold text-center mb-6 eyesome tracking-wider">
        Featured Products
      </h2>

      {/* Cart message notification */}
      {cartMessage && (
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-6 rounded-lg shadow-md z-50">
          {cartMessage}
        </div>
      )}

      {/* Wishlist message notification */}
      {wishlistMessage && (
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md z-50">
          {wishlistMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5 lg:px-20 pt-16"> {/* Added pt-16 to create space for the messages */}
        {featuredProducts.map((product) => (
          <ProductCard
            key={product._id}  // Changed from product.id to product._id
            product={product}
            addToCart={handleAddToCart} // Pass the addToCart handler here
            addToWishlist={handleAddToWishlist} // Pass the addToWishlist handler here
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
