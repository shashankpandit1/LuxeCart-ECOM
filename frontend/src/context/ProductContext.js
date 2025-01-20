import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const products = await response.json();
        setData(products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const addedProduct = await response.json();
      setData([...data, addedProduct]);
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${updatedProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      const updated = await response.json();
      setData(data.map((product) => (product._id === updated._id ? updated : product)));
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
        method: "DELETE",
      });
      setData(data.filter((product) => product._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <ProductContext.Provider
      value={{ data, loading, error, handleAddProduct, handleUpdateProduct, handleDeleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
