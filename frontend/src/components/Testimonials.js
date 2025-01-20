import React, { useContext, useState } from "react";
import { TestimonialContext } from "../context/TestimonialContext";

const Testimonials = () => {
  const { data, loading, error } = useContext(TestimonialContext);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data.length === 0) {
    return <div>No testimonials available.</div>;
  }

  const { name, avatar, review, stars } = data[currentIndex];

  return (
    <section className="py-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">
        What Our Customers Say
      </h2>

      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8 flex flex-col items-center">
        <img
          src={avatar}
          alt={name}
          className="w-20 h-20 rounded-full mb-4"
        />
        <p className="text-lg text-center italic mb-4">"{review}"</p>

        <div className="flex space-x-1 mb-4">
          {Array.from({ length: stars || 0 }).map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5 text-yellow-400"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>

        <h3 className="text-xl font-medium">{name}</h3>

        <div className="flex space-x-4 mt-6">
          <button
            onClick={prevTestimonial}
            className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            Previous
          </button>
          <button
            onClick={nextTestimonial}
            className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
