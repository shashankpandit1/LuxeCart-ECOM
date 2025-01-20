import React, { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductModal from "./ProductModal";

const AdminPanel = () => {
  const {
    data,
    loading,
    error,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
  } = useContext(ProductContext);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    tag: "",
    categoryId: "",
    images: [],
    description: "",
  });

  const [editProduct, setEditProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmDeleteProduct, setConfirmDeleteProduct] = useState(null); // State for confirming deletion

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editProduct) {
      setEditProduct({ ...editProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (validateProduct(newProduct)) {
      handleAddProduct(newProduct);
      setNewProduct({
        name: "",
        price: "",
        tag: "",
        categoryId: "",
        images: [],
        description: "",
      });
      setShowModal(false);
    } else {
      alert("Please fill out all required fields.");
    }
  };

  const handleUpdateProductSubmit = (e) => {
    e.preventDefault();
    if (editProduct && !editProduct.canBeDeleted) {
      setErrorMessage("Error: Products added by the owner cannot be edited.");
      return;
    }
    if (validateProduct(editProduct)) {
      handleUpdateProduct(editProduct);
      setEditProduct(null);
      setShowModal(false);
    } else {
      alert("Please fill out all required fields.");
    }
  };

  const handleDeleteProductSubmit = (_id) => {
    const productToDelete = data.find((product) => product._id === _id);
    if (productToDelete && !productToDelete.canBeDeleted) {
      setErrorMessage("Error: Products added by the owner cannot be deleted.");
      return;
    }
    setConfirmDeleteProduct(productToDelete); // Set product to delete
  };

  const confirmDeletion = () => {
    if (confirmDeleteProduct) {
      handleDeleteProduct(confirmDeleteProduct._id);
      setConfirmDeleteProduct(null); // Clear the confirm delete state after deletion
    }
  };

  const cancelDeletion = () => {
    setConfirmDeleteProduct(null); // Close the confirmation modal without deletion
  };

  const validateProduct = (product) => {
    return (
      product.name &&
      product.price &&
      product.description &&
      product.images.length > 0
    );
  };

  const filteredProducts =
    selectedCategory === "all"
      ? data
      : data.filter((product) => {
          const categoryId = product.categoryId || ""; // Handle undefined categoryId
          return categoryId.toLowerCase() === selectedCategory.toLowerCase();
        });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error fetching products: {error}</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 text-xl text-white bg-gray-800">
        Admin Panel - Manage Products
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-1/4 p-4 overflow-y-auto bg-gray-100 border-r">
          <h2 className="mb-4 text-xl font-bold">Categories</h2>
          <button
            onClick={() => {
              setEditProduct(null);
              setShowModal(true);
            }}
            className="w-full px-4 py-2 mb-4 text-left text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Add New Product
          </button>

          {["all", "electronics", "beauty", "home", "fashion"].map((category) => (
            <button
              key={category}
              className={`w-full text-left px-4 py-2 mb-2 rounded-lg ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-white border"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </aside>

        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-2xl font-semibold">Products List</h2>
            <div className="grid grid-cols-3 mb-2 text-lg font-bold">
              <div>Name</div>
              <div>Description</div>
              <div>Price</div>
            </div>
            <ul className="space-y-2">
              {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <li
                    key={product._id}
                    className="grid items-center grid-cols-3 p-4 bg-white border rounded-lg shadow-sm cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="font-bold truncate">{product.name}</div>
                    <div className="text-gray-600 truncate">
                      {product.description.length > 30
                        ? `${product.description.slice(0, 30)}...`
                        : product.description}
                    </div>
                    <div>₹{product.price}</div>
                    <div className="flex justify-end col-span-3 space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!product.canBeDeleted) {
                            setErrorMessage("Error: Products added by the owner cannot be edited.");
                            return;
                          }
                          setEditProduct(product);
                          setShowModal(true);
                        }}
                        className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!product.canBeDeleted) {
                            setErrorMessage("Error: Products added by the owner cannot be deleted.");
                            return;
                          }
                          handleDeleteProductSubmit(product._id);
                        }}
                        className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <div>No products available in this category.</div>
              )}
            </ul>
          </div>
        </main>
      </div>

      {errorMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-75"
          onClick={() => setErrorMessage("")}
        >
          <div className="p-6 text-center bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-red-600">Error</h2>
            <p className="mb-4 text-gray-800">{errorMessage}</p>
            <button
              onClick={() => setErrorMessage("")}
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Delete Modal */}
      {confirmDeleteProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-75"
          onClick={cancelDeletion}
        >
          <div className="p-6 text-center bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-red-600">Are you sure?</h2>
            <p className="mb-4 text-gray-800">
              You are about to delete the product "{confirmDeleteProduct.name}". This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDeletion}
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDeletion}
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedProduct && (
        <div
          onClick={(e) => {
            if (e.target.id === "details-modal") setSelectedProduct(null);
          }}
          id="details-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50"
        >
          <div className="relative w-1/2 p-6 bg-white rounded-lg shadow-md">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute text-xl font-bold text-gray-600 top-3 right-3 hover:text-gray-900"
            >
              &times;
            </button>
            <h2 className="mb-4 text-2xl font-semibold">Product Details</h2>
            <p><strong>Name:</strong> {selectedProduct.name}</p>
            <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <p><strong>Images:</strong></p>
            <div className="flex space-x-2">
              {(selectedProduct.images && Array.isArray(selectedProduct.images) && selectedProduct.images.length > 0) ? (
                selectedProduct.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className="object-cover w-16 h-16 rounded-md"
                  />
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
            <div className="flex mt-4 space-x-4">
              <button
                onClick={() => {
                  if (!selectedProduct.canBeDeleted) {
                    setErrorMessage("Error: Products added by the owner cannot be edited.");
                    return;
                  }
                  setEditProduct(selectedProduct);
                  setShowModal(true);
                }}
                className="px-3 py-2 text-sm text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProductSubmit(selectedProduct._id)}
                className="px-3 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <ProductModal
          product={editProduct || newProduct}
          onClose={() => setShowModal(false)}
          onSubmit={editProduct ? handleUpdateProductSubmit : handleAddProductSubmit}
          onInputChange={handleInputChange}
          heading={editProduct ? "Edit Product" : "Add New Product"}
        />
      )}
    </div>
  );
};

export default AdminPanel;
