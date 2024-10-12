const express = require('express');
const { authMiddleware } = require('../middleware');
const {User,Account} = require("../db")
const { startSession } = require('mongoose')

const router = express.Router();

router.get("/balance",authMiddleware,async(req,res)=>{
    try{
        console.log(req.userId)
        const user = await Account.findOne({userId:req.userId});

        if(user){
            return res.status(200).json({
                success: true,
                data:user.balance
            })
        }else{
            return res.status(400).json({
                success: false,
                message:"account not found"
            })
        }
    }catch(err){
        return res.status(500).json({
            success: false,
            message:"error occured in balance route",
            error: err.message
        })
    }
})

router.post("/transfer",authMiddleware,async(req, res)=>{
    const session = await startSession();
    try{
        const {amount ,to }=req.body;
        session.startTransaction();

        const account = await Account.findOne({userId:req.userId});
        if(!account || account.balance < amount ){
            await session.abortTransaction()
            return res.status(401).json({
                success: false,
                message: 'Account does not have enough balance'
            })
        }       
        const toAccount = await Account.findOne({userId:to})
        if(!toAccount){
            await session.abortTransaction();
            return res.status(401).json({
                success: false,
                message: 'To account does not exist'
            })
        }

        await Account.findOneAndUpdate({userId:req.userId},{$inc:{balance:-amount}},{new:true})
        await Account.findOneAndUpdate({userId:to},{$inc:{balance:amount}},{new:true})

        await session.commitTransaction()
        session.endSession()

        return res.status(200).json({
            success: true,
            message: 'transaction successfully done'
        })

    }catch(err){
        session.abortTransaction()
        return res.status(500).json({
            success: false,
            message: 'transaction failed',
            error: err.message
        })
    }
})

module.exports = router;