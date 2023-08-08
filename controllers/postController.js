const APIFeatures = require('./../utils/apiFeatures');
const Post = require('../models/postModel');


//CREATE NEW POST
exports.createPost = async (req, res)=>{
    const newPost = new Post(req.body);
    try{

        const savedPost = await newPost.save();
        res.status(200).json({
            status : "success",
            data : {
                post : savedPost
            }
        });
    }catch(err){
        res.status(500).json({
            status : "fail",
            message : err
        });
    }
};

//UPDATE POST BY ID
exports.updatePost = async (req, res)=>{

    try{
        const post = await Post.findById(req.params.id);

        if(post.username === req.body.username){
            
            try{
                const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {
                    new :true,
                    runValidators : true
                });
                res.status(200).json({
                    status : "success",
                    data : {
                        user : updatePost
                    }
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
                message : "You can update only your post!"
            });
        }
    }catch{
        res.status(401).json({
            status : "fail",
            message : "You can update only your post!"
        });
    }
};

//DELETE POST BY ID
exports.deletePost = async (req, res)=>{
    
    try{
        
        const post = await Post.findById(req.params.id);
        
        if (post.username === req.body.username){
            try{
                
                await post.delete();

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
                message : "You can delete only your post!"
            });
        }
    }catch(err){
        res.status(500).json({
            status : "fail",
            message : err
        });
    }
};


//GET POST BY ID
exports.getPost = async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            status : "success",
            data : {
                post : post
            }
        });
    }catch(err){
        res.status(401).json({
            status : "fail",
            message : "Invalid data!"
        });
    }
};

//GET ALL POSTS
exports.getAllPosts = async(req, res)=>{
    try{
        //EXECUTE QUERY
        const features = new APIFeatures(Post.find(), req.query).filter();
        //.filter();
        // .sort()
        // .limitfields()
        // .paginate();
        const posts = await features.query;

        //SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: posts.length,
            // requestedAt: req.requestTime,
            data:{
                posts
            }
        });
        }catch(err){
            res.status(404).json({
                status : "fail", 
                message: 'Invalid data!'
            });
        }
    
};