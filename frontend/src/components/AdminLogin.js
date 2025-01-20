import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router

const AdminLogin = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Validate credentials
    if (credentials.username === "admin" && credentials.password === "admin@1234#") {
      navigate("/adminDashboard"); // Redirect to Admin Panel
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-1/3 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Admin Login
        </h1>
        <p className="mb-6 text-center text-gray-600">
          To access the Admin Panel, use the following credentials:
          <br />
          <strong>Username:</strong> admin
          <br />
          <strong>Password:</strong> admin@1234#
        </p>
        {errorMessage && (
          <div className="p-4 mb-4 text-center text-red-700 bg-red-100 rounded-lg">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1 font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={credentials.username}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
