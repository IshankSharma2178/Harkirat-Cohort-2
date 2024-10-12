const express = require('express');
const zod =require('zod');
const router = express.Router();
const {User,Account} = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const {authMiddleware} = require('../middleware');

const JWT_SECRET = process.env.JWT_SECRET

const signUpSchema=zod.object({
    userName:zod.string().optional(),
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional(), 
})

const updateSchema = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
})

router.post('/signup',async(req,res)=>{
    try{
        const body = req.body;
        const {success} = signUpSchema.safeParse(body)
        if(!success) {
            return res.status(500).json({
                success: false,
                message:"incorrect inputs"
            })
        }

        const user = await User.find({
            userName:body.userName
        })

        if(user._id){
            return res.status(500).json({
                success:false,
                message:"UserName Already exists"
            })
        }
    
        const newUser=await User.create( {userName:body.userName,password:body.password,firstName:body.firstName,lastName:body.lastName})
        await newUser.save();  
        
        const token = jwt.sign({
            userId : newUser._id
        },JWT_SECRET)

        const userId = newUser._id;

        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })

        return res.status(200).json({
            success:true,
            message:"User created successfully",
            token:token
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"error in signup router",
            error:err.message
        })
    }
})

router.post("/login",async(req,res)=>{
    try{
        const {userName,password} = req.body;
        const validation = signUpSchema.safeParse(req.body)
        if(!validation.success){
            return res.status(400).json({
                sucess:false,
                message:"please input correct field"
            })
        }
        const userExists = await User.find({userName:userName,password:password}); 
        if(!userExists) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "User exists"
        })
    }catch(err){
        return res.status(400).json({
            success: false,
            message: " error in login controller",
            error: err.message
        })
    }
})

router.put("/updateDetails",authMiddleware,async(req,res)=>{
    try{
        const details = req.body;
        const verifyDetails = updateSchema.safeParse(details);
        if(!verifyDetails.success){
            return res.status(500).json({
                success: false,
                message: "Invalid details "
            })
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.userId,{ $set: details },{ new: true } 
        );

        if(updatedUser){
            return res.status(200).json({
                success: true,
                message: "details updated successfully"
            })
        }else{
            return res.status(500).json({
                success: false,
                message: "some error occur while updating details"
            })
        }
    }catch(err){
        return res.status(500).json({
            success:false,
            message: "some error occur while updating details",
            error:err.message
        })
    }
})
 
router.post("/bulk",authMiddleware,async(req, res)=>{
   try{
    const filter = req.query.filter || "";

    const user= await User.findOne({_id:req.userId})
    const excludedFirstName = user.firstName;
    const excludedLastName = user.lastName;;

    const findUser = await User.find({
        $or:[
            {firstName:{
                    "$regex": filter,
                    "$options":"i"
                }},
            {lastName:{
                    "$regex": filter,
                    "$options":"i"
                }},
            ],
        firstName: { $nin: [excludedFirstName] }, 
        lastName: { $nin: [excludedLastName] } 
    })

    
    
    if(findUser){
        return res.status(200).json({
            success: true,
            data: findUser
        })
    }else{
        return res.status(500).json({
            sucess: false,
            message:"cant find user"
        })
    }
   }catch(error){
        return res.status(500).json({
            sucess: false,
            message:"error in bulk controller",
            error: error.message
        })
   }
})

router.get('/isValidUser', authMiddleware , async(req,res)=>{
    return res.status(200).json({
        success: true,
    })
})

module.exports = router;