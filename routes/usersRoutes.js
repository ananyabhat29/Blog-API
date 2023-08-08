const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

//UPDATE BY ID
router
.route("/:id")
.put(userController.updateUser)
.delete(userController.deleteUser)
.get(userController.getUser); 

router
.route('/')
.get(userController.getAllUsers);

module.exports = router;