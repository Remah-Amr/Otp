require('dotenv').config()
const express = require('express')
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);
var CodeGenerator = require('node-code-generator');
var generator = new CodeGenerator();
const otp = require('../models/otp')
const router = express.Router()

module.exports = {
    sendCode : async (req,res)=>{
        try{
            const phoneExist = await otp.findOne({phone:req.body.phoneNumber})
            if(phoneExist){return res.status(401).json({msg : "already phone exist"})}
            var code = generator.generateCodes('#+#+', 100)[0];
            await client.messages.create({
                from : 'whatsapp:+14155238886',
                to:    `whatsapp:${req.body.phoneNumber}`,
                body: `${code}`,
            })
           const newOtp = new otp({phone:req.body.phoneNumber,code})
           await newOtp.save()
           res.status(201).json({msg : "send verification code"})
        } catch(err){
            res.status(500).json({err})
        }
    },
    verifyCode : async (req,res)=>{
        try{
            const phoneVerified = await otp.findOne({phone:req.body.phoneNumber,code:req.body.code})
            if(phoneVerified){ 
                phoneVerified.confirmed = true
                await phoneVerified.save()
                return res.status(201).json({msg : "phone verified"})
            }
            res.status(401).json({msg:"phoneNumber/code is incorrect"})
        } catch(err){
            res.status(500).json({err})
        }
    
    }
}