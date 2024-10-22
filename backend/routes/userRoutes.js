const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
require('../db/connection')
router.use(express.json());
const userModel = require("../model/userModel");

router.post('/login', async(req,res)=>{
    const user = await userModel.findOne({userName:req.body.userName})
    if(!user){
        res.json({message:"User not found"})
    }
    try{
        if(user.userPassword==req.body.userPassword)
        {
            const payload={uname:req.body.userName,pwd:req.body.userPassword}
            const token=jwt.sign(payload,"secret")
            res.status(200).send({message:"Login Successful",usertoken:token})
        }
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router;
