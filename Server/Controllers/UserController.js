const { validationResult } = require('express-validator')
const User = require('../Models/UserModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//create an account
const Register = async(req,res)=>{
    try {
        //extract the validation errors from the req
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(402).json({errors: errors.mapped() })
        }
        //vérifier l'utilisateur n'a pas du compte existant
        const {name,age,email,password,Role} = req.body;
        /* const isAdmin = await User.findOne({Role:'admin'})
        if(!isAdmin){
            await User.create({email:'admin@gmail.com', password:'123456', Role:'admin'})
        } */
        const found = await User.findOne({email})
        if(found){
            return res.status(401).json({message:'You have already registered!'})
        }

        //creation of user + save in the DB
        //1 cryptage du password ==> security ==> hashing
        const salt = bcrypt.genSaltSync(10); //synchrone //déjà bloquant
        const hashedPassword = await bcrypt.hash(password, salt);
        //2 save the user int he DB
        const newUser = await User.create({name,age,email,password:hashedPassword,Role})
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

//login
const Login = async(req,res)=>{
    try {
        //extract the validation errors from the req
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(402).json({errors: errors.mapped() })
        }

        //vérifier si l'utilisateur existe ou nn !
        const {email,password} = req.body;
        const isfound = await User.findOne({email})
        if(!isfound){
            return res.status(402).json({message:'You have to register before'})
        }

        //comparer le password (saved in the DB) with password (tapped by the user : req.body)
        const isMatch = await bcrypt.compare(password, isfound.password);
        if(!isMatch){
            return res.status(403).json({message:'Wrong password'})
        }
        //generate a key : token
        const token = await jwt.sign({ id: isfound._id}, process.env.SECRET, { expiresIn: '30d' });
        res.status(200).json({isfound,token})


    } catch (error) {
        res.status(500).json({message: error})
    }
}

const getAllDataUSers = async(req,res)=>{
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error})

    }
}

module.exports = {Register,Login,getAllDataUSers}