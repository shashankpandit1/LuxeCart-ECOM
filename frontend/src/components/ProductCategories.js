import React,{useContext} from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import categories from "../data/categories.json"; // Import JSON data
import {CategoriesContext} from '../context/CategoriesContext';

const ProductCategories = () => {
  const { data, loading, error } = useContext(CategoriesContext);
  
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle navigation on category click
  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId.toLowerCase()}`); // Navigate to the dynamic category route
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Shop by Category</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-5 lg:px-20">
        {data.map((category) => (
          <div
            key={category.id}
            className="relative rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleCategoryClick(category.categoryId)} // Call navigation function on click
          >
            {/* Category Image */}
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover"
            />

            {/* Category Info */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center flex-col opacity-0 hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-2xl font-semibold mb-2">
                {category.name}
              </h3>
              <button
                className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300"
              >
                {category.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCategories;
