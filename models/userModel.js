const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Username is needed!"],
        unique : true
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        unique : true
    },
    password : {
        type : String,
        required : [true, "Password is required!"]
    },
    profilePic : {
        type : String,
        default : ""
    }
}, { timestamps : true });

//CREATE A MODEL USING THE SCHEMA
const User = mongoose.model("User", userSchema);

module.exports = User;