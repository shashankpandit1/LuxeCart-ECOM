import React from "react";
import Hero from "./Hero";
import FeaturedProducts from './FeaturedProducts';
import ProductCategories from './ProductCategories';
import Testimonials from "./Testimonials";
import { TestimonialProvider } from "../context/TestimonialContext";

const Home = () => {
  return (
    <div>
      <TestimonialProvider>
        <Hero />
        <FeaturedProducts /> 
        <ProductCategories />
        <Testimonials />
      </TestimonialProvider>
    </div>
  );
};

export default Home;
