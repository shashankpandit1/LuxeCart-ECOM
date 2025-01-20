
const mongoose = require('mongoose');

const testimonialSchema = require('../models/testimonialModel');


// API Endpoint to Fetch Products
const getTestimonial = async (req,res)=> {
    try{
        const testimonial = await testimonialSchema.find();
        res.json(testimonial);
    }catch(error){
        res.status(500).send(error.message);
    }
};


module.exports = {
  getTestimonial
};
