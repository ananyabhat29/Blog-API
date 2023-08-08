const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    }
}, { timestamps : true });

//CREATE A MODEL USING THE SCHEMA
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;