const express = require('express');
const router = express.Router();
const categoryController = require("./../controllers/categoryController");
// const { route } = require('./authRoutes');



router
.route('/')
.post(categoryController.createCategory) 
.get(categoryController.getAllCategories);



module.exports = router;