const Post = require('../Models/PostModel');
const cloudinary = require('../Config/cloudinairy')

const AddPost = async(req,res)=>{
    try {
        const {title,Des} = req.body
        const savedImage = await cloudinary.uploader.upload(req.files.Img.tempFilePath)
        //save the post in the DB
        const newPost = await Post.create({owner:req.userId,title,Des,Img:{public_id:savedImage.public_id, imgUrl:savedImage.url}})
        res.json({newPost,msg:'Post has been added successfully!'})
        
    } catch (error) {
        res.status(504).json({message:error})
    }
}

const getAllPosts = async(req,res)=>{
    try {
        const AllPosts = await Post.find({}).populate({path:'owner', select:'-password -__v'})
        res.json(AllPosts)
    } catch (error) {
        res.status(504).json({message:error})
    
    }
}

module.exports = {AddPost,getAllPosts}