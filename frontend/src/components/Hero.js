import React from "react";
import { useState, useEffect } from "react";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import image6 from "../assets/image6.jpg";

const slides = [
  { image: image2, text: "Slide 1" },
  { image: image3, text: "Slide 2" },
  { image: image4, text: "Slide 3" },
  { image: image6, text: "Slide 4" },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          } flex items-center`}
        >
          <div className="relative flex flex-col items-center justify-between w-full h-full px-10 space-y-5 lg:flex-row lg:space-y-0 lg:space-x-10">
            {/* Text Section */}
            <div className="flex flex-col justify-center w-2/5 ml-5">
              <h1 className="max-w-xl font-serif text-4xl md:text-6xl">
                <span className=" decoration-black decoration-4">
                Redefine 
                </span>{" "}
                your Luxury
              </h1>
              <br></br>
              <h2 className="w-9/12 font-normal ">
              Flash Sale: 20% Off Designer Wear
              </h2>
              <br />
              <button className="px-4 py-2 font-medium transition duration-100 bg-white border border-black rounded-full active:scale-90">
              Explore Deals
              </button>
            </div>

            {/* Image Section */}
            <div className="flex justify-center w-3/5">
              <img
                src={slide.image}
                alt={slide.text}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;
