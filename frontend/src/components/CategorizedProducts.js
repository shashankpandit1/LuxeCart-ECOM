import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get the category ID
import { useCart } from "../context/CartContext"; // Import the CartContext
import { useWishlist } from "../context/WishlistContext"; // Import the WishlistContext
import { ProductContext } from '../context/ProductContext';
const CategorizedProducts = () => {
    const { categoryId } = useParams(); // Get category ID from the URL
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [cartMessage, setCartMessage] = useState(""); // State for the cart message
    const [wishlistMessage, setWishlistMessage] = useState(""); // State for the wishlist message
    const { addToCart } = useCart(); // Access the addToCart function from CartContext
    const { addToWishlist } = useWishlist(); // Access the addToWishlist function from WishlistContext
    const { data, loading, error } = useContext(ProductContext);
  
    // Filter products by category ID, ensuring that categoryId and product.categoryId are valid
    const filteredProducts = data.filter(
      (product) =>
        categoryId?.toLowerCase() === product.categoryId?.toLowerCase()
    );
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
  
    const handleProductClick = (product) => {
      setSelectedProduct(product);
      setCurrentImageIndex(0); // Reset to the first image
    };
  
    const closeProductDetails = () => {
      setSelectedProduct(null);
    };
  
    const handleNextImage = () => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % selectedProduct.images.length
      );
    };
  
    const handlePreviousImage = () => {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + selectedProduct.images.length) % selectedProduct.images.length
      );
    };
  
    const handleAddToCart = (product) => {
      addToCart(product); // Add the product to the cart
      setCartMessage(`${product.name} has been added to your cart!`); // Show cart message
      setTimeout(() => setCartMessage(""), 2000); // Clear message after 2 seconds
    };
  
    const handleAddToWishlist = (product) => {
      addToWishlist(product); // Add the product to the wishlist
      setWishlistMessage(`${product.name} has been added to your wishlist!`); // Show wishlist message
      setTimeout(() => setWishlistMessage(""), 2000); // Clear message after 2 seconds
    };
  
    return (
      <div className="max-w-screen-xl mx-auto p-5">
        {/* Cart and Wishlist message notifications */}
        {cartMessage && (
          <div className="fixed top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-6 rounded-lg shadow-md z-50">
            {cartMessage}
          </div>
        )}
        {wishlistMessage && (
          <div className="fixed top-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md z-50">
            {wishlistMessage}
          </div>
        )}
  
        {/* Product Grid */}
        {!selectedProduct ? (
          <div>
            <h1 className="text-3xl font-bold text-center mb-8 capitalize">
              {categoryId} Products
            </h1>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="w-full h-48 flex justify-center items-center bg-gray-100 rounded-lg">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain"
                        onClick={() => handleProductClick(product)}
                      />
                    </div>
                    <div className="mt-4">
                      <h2 className="text-lg font-semibold">{product.name}</h2>
                      <p className="text-gray-500 text-sm">{product.tag}</p>
                      <p className="text-gray-700 font-bold mt-1">₹{product.price}</p>
                    </div>
                    <div className="mt-4 flex space-x-2 justify-between">
                      <button
                        className="bg-black text-white px-3 py-2 text-sm rounded-lg hover:bg-gray-800 transition"
                        onClick={() => handleAddToCart(product)} // Add to cart when clicked
                      >
                        Add to Cart
                      </button>
                      <button
                        className="bg-gray-300 text-black px-3 py-2 text-sm rounded-lg hover:bg-gray-400 transition"
                        onClick={() => handleAddToWishlist(product)} // Add to wishlist when clicked
                      >
                        Add to Wishlist
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-10">No products found in this category.</p>
            )}
          </div>
        ) : (
          // Product Details Modal
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white max-w-3xl p-6 rounded-lg shadow-lg relative">
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                onClick={closeProductDetails}
              >
                ✖
              </button>
              {/* Modal Content */}
              <div className="flex flex-col md:flex-row">
                {/* Product Images */}
                <div className="md:w-1/2 relative">
                  <div className="w-full h-[400px] flex justify-center items-center bg-gray-100 rounded-lg">
                    <img
                      src={selectedProduct.images[currentImageIndex]}
                      alt={selectedProduct.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  {/* Carousel Controls */}
                  {selectedProduct.images.length > 1 && (
                    <>
                      <button
                        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                        onClick={handlePreviousImage}
                      >
                        ←
                      </button>
                      <button
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                        onClick={handleNextImage}
                      >
                        →
                      </button>
                    </>
                  )}
                  {/* Thumbnail Navigation */}
                  <div className="mt-4 flex space-x-2">
                    {selectedProduct.images.map((image, index) => (
                      <div
                        key={index}
                        className={`w-20 h-20 flex justify-center items-center bg-gray-100 rounded-lg cursor-pointer transition-transform transform ${
                          currentImageIndex === index
                            ? "scale-110 border-2 border-black"
                            : "hover:scale-110"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Product Details */}
                <div className="md:w-1/2 md:ml-5">
                  <h1 className="text-2xl font-semibold">{selectedProduct.name}</h1>
                  <p className="text-lg text-gray-700 mt-2">₹{selectedProduct.price}</p>
                  <p className="mt-4">Tag: {selectedProduct.tag}</p>
                  <p className="mt-4 text-gray-600">
                    {selectedProduct.description}
                  </p>
                  <div className="mt-4 flex space-x-4">
                    <button
                      className="bg-black text-white px-3 py-2 text-sm rounded-lg hover:bg-gray-800 transition"
                      onClick={() => handleAddToCart(selectedProduct)} // Add to cart when clicked
                    >
                      Add to Cart
                    </button>
                    <button
                      className="bg-gray-300 text-black px-3 py-2 text-sm rounded-lg hover:bg-gray-400 transition"
                      onClick={() => handleAddToWishlist(selectedProduct)} // Add to wishlist when clicked
                    >
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default CategorizedProducts;
  