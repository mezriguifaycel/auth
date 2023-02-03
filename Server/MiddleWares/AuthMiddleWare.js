require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.AuthMiddleWares = async(req,res,next)=>{
    const token = req.header('token')
    if(!token){
        res.status(400).json({message:'you are not authorized!'})
    }
    const decoded = await jwt.verify(token,process.env.SECRET);
    req.userId = decoded.id 
    next()
    
}