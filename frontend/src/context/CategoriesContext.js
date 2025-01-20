import React, { createContext, useState, useEffect } from "react";

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/category`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError("Error in Fetching");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <CategoriesContext.Provider value={{ data, loading, error }}>
      {children}
    </CategoriesContext.Provider>
  );
};

