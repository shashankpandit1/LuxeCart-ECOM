import React, { useState } from "react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex
    if (email && emailRegex.test(email)) {
      setMessage("Thank you for subscribing!");
      setIsValid(true);
      setEmail(""); // Clear input field after successful submission
    } else {
      setMessage("Please enter a valid email.");
      setIsValid(false);
    }
  };

  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold">Get exclusive access to LuxeCart offers!</h2>
        <p className="text-gray-600">
          Sign up now to receive special discounts and be the first to know about new arrivals.
        </p>

        <form onSubmit={handleSubmit} className="flex items-center justify-center space-x-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 w-64 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </form>

        {message && (
          <p
            className={`mt-3 font-medium ${
              isValid ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
};

export default NewsletterSignup;
