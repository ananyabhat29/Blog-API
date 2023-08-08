const Category = require('./../models/categoryModel');

//CREATE NEW CATEGORY
exports.createCategory = async (req, res)=>{

    const newCat = new Category(req.body);
    try{
        const saveCat = await newCat.save();
        res.status(200).json({
            status : "success",
            data : {
                category : newCat
            }
        });
        
    }catch(err){
        res.status(404).json({
            status : "fail",
            message : "Inavlid data!"
        });
    }
};


//GET ALL CATEGORIES
exports.getAllCategories = async (req, res)=>{

    try{
        const cats = await Category.find();
        res.status(200).json({
            status : "success",
            results : cats.length,
            data : {
                categories : cats
            }
        });
    }catch(err){
        res.status(404).json({
            status : "fail",
            message : "Invalid Data!"
        });
    }
};


