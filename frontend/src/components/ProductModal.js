import React, { useState, useEffect } from "react";

const ProductModal = ({
  product,
  onClose,
  onSubmit,
  onInputChange,
  heading,
}) => {
  const [imagePreviews, setImagePreviews] = useState(product.images || []);

  useEffect(() => {
    // Ensure images are always handled as an array of strings.
    setImagePreviews(product.images || []);
  }, [product.images]);

  // Handle local image uploads
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImagePreviews = files.map((file) => URL.createObjectURL(file));

    // Add local images (URLs created from the files) to the previews
    setImagePreviews((prevImages) => [...prevImages, ...newImagePreviews]);

    // Call onInputChange with the new images (files as strings)
    const newImages = files.map((file) => URL.createObjectURL(file)); // Get local image URLs
    onInputChange({
      target: {
        name: "images",
        value: [...product.images, ...newImages], // Ensure it's an array of URLs (strings)
      },
    });
  };

  // Handle URL-based image updates
  const handleImageChange = (e) => {
    const value = e.target.value;
    const imageArray = value.split(",").map((url) => url.trim());

    // Update the previews with the URLs entered
    setImagePreviews(imageArray);

    // Update the product state with URLs
    onInputChange(e);
  };

  // Remove image from preview
  const handleRemoveImage = (index) => {
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newImagePreviews);

    // Update the product images state
    onInputChange({
      target: {
        name: "images",
        value: newImagePreviews, // Update with the modified list of images
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-md relative w-full max-w-screen-sm max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute text-2xl font-bold text-gray-600 top-2 right-2 hover:text-gray-900"
        >
          &times;
        </button>
        <h2 className="mb-4 text-xl font-semibold">{heading}</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-semibold text-gray-700">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={onInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-semibold text-gray-700">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={onInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-semibold text-gray-700">
              Tag <span className="text-red-500">*</span>
            </label>
            <select
              name="tag"
              value={product.tag}
              onChange={onInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Tag</option>
              <option value="new">New</option>
              <option value="featured">Featured</option>
              <option value="bestseller">Bestseller</option>
              <option value="sale">Sale</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-semibold text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="categoryId"
              value={product.categoryId}
              onChange={onInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="beauty">Beauty</option>
              <option value="home">Home</option>
              <option value="fashion">Fashion</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-semibold text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={onInputChange}
              className="w-full p-2 border rounded"
              rows={3}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-semibold text-gray-700">
              Upload Images (Local Files or URLs){" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="block w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              name="images"
              value={imagePreviews.join(", ")} // Convert previews to a string for URL input
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
              placeholder="Enter image URLs separated by commas"
            />
            <div className="relative flex flex-wrap gap-2 mt-2">
              {imagePreviews.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Preview ${index}`}
                    className="object-cover w-16 h-16 border rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute flex items-center justify-center w-8 h-8 text-white transition-opacity duration-300 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full opacity-0 top-1/2 left-1/2 group-hover:opacity-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      className="w-4 h-4"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        fill="currentColor"
                        d="M18.36 5.64L12 12l6.36 6.36-1.73 1.73L12 13.73l-6.36 6.36-1.73-1.73L10.27 12 3.91 5.64l1.73-1.73L12 10.27l6.36-6.36z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
