const express = require('express');
const router = express.Router();
const postController = require("./../controllers/postController");




router
.route("/")
.post(postController.createPost)
.get(postController.getAllPosts);


router
.route("/:id")
.put(postController.updatePost)
.delete(postController.deletePost)
.get(postController.getPost); 


module.exports = router;