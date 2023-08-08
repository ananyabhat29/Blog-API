const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, "Title is needed!"],
        unique : true
    },
    desc : {
        type : String,
        required : [true, "Description is required"],
    },
    photo : {
        type : String,
        required : false
    },
    username : {
        type : String,
        required : true
    },
    categories : {
        type : Array,
        required : false
    }
}, { timestamps : true });

//CREATE A MODEL USING THE SCHEMA
const Post = mongoose.model("Post", postSchema);

module.exports = Post;