const express = require('express');
const { AuthMiddleWares } = require('../MiddleWares/AuthMiddleWare');
const router = express.Router()
const PostController = require('../Controllers/PostController')

//Add a Post
router.post('/',AuthMiddleWares,PostController.AddPost)
router.get('/',PostController.getAllPosts)



module.exports = router