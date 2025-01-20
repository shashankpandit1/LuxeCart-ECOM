const categorySchema = require('../models/categoryModel');


// API Endpoint to Fetch Products
const getCategory = async (req,res)=> {
    try{
        const category = await categorySchema.find();
        res.json(category);
    }catch(error){
        res.status(500).send(error.message);
    }
};


module.exports = {
  getCategory
};
