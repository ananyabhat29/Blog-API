const express = require('express');
const router = express.Router();
const APIFeatures = require('./../utils/apiFeatures');
const User = require("../models/userModel");
const Post = require('../models/postModel');

const bcrypt = require('bcrypt');

//UPDATE BY ID
exports.updateUser = async (req, res)=>{
    
    if(req.body.userId === req.params.id){
        
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set : req.body
            }, { new: true, runValidators : true });
        console.log(updateUser);
        
        res.status(200).json({
            status : "success",
            data : {
                user : updateUser
            }
        });
        }catch(err){
            if (err.name == "CastError"){
                err = "USer not found"
            }
            res.status(500).json({
                status : "fail",
                message : err
            });
        }
    }else{
        res.status(401).json({
            status : "fail",
            message : "You can update only your profile!"
        });
    }
};


//DELETE
exports.deleteUser = async (req, res)=>{

    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id);

            if (user){
                try{
                    await Post.deleteMany({username: user.username});
                    await User.findByIdAndDelete(req.params.id);

                res.status(200).json({
                    status : "success",
                    data : null
                });
                }catch(err){
                    res.status(500).json({
                        status : "fail",
                        message : err
                    });
                }
            }else{
                res.status(401).json({
                    status : "fail",
                    message : "You can delete only your profile!"
                });
            }
        }catch(err){
            res.status(500).json({
                status : "fail",
                message : err
            });
        }
        
    }else{
        res.status(401).json({
            status : "fail",
            message : "You can delete only your profile!"
        });
    }
};


//GET USER BY ID
exports.getUser =async (req, res)=>{
    try{
        const user = await User.findById(req.params.id);

        if(user){
            const {password, ...others} = user._doc;
            res.status(200).json({
                status : "success",
                data : {
                    user : user
                }
            });
        }
    }catch(err){
        res.status(401).json({
            status : "fail",
            message : "Invalid data!"
        });
    }
};


//GET ALL USERS
exports.getAllUsers = async (req, res) =>{
    try{
        const features = new APIFeatures(User.find(), req.query).filter();
        const users = await features.query;

        if(users.length == 0){
            return res.status(404).json("No users found!");
        }

        res.status(200).json({
            status: 'success',
            results: users.length,
            data:{
                users
            }
        });
    }catch(err){
        res.status(401).json({
            status : "fail",
            message : "Invalid data!"
        });
    }

}
