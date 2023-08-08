const User = require('../models/userModel');
const bcrypt = require('bcrypt');


//USER REGISTER
exports.userRegister = async (req, res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashedPass
        });

        const user = await newUser.save();

        res.status(200).json({
            status : "success",
            data : {
                user 
            }
        });
        
    }catch(err){
        res.status(500).json({
            status : "fail",
            message : "Invalid data"
        });
    }
};


//USER LOGIN
exports. userLogin = async (req, res)=>{

    try{
        const user = await User.findOne({username: req.body.username});
        
        !user && res.status(400).json("wrong credentials");
        

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong credentials");
        
        
        const { password, ...others } = user
        res.status(200).json({
            status: "success",
            data : {
                user : others._doc
            }
        });

        }catch(err){
        res.status(500).json({
            status : "fail",
            message : "Invalid data"
        });
    }

};
