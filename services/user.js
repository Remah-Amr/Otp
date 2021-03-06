const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {isAuth} = require('../middleware/isAuth')
const userModel = require('../models/user') 
const otpModel = require('../models/otp')
const router = express.Router()
const {check} = require('express-validator');
const {validationResult} = require('express-validator');
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);
const CodeGenerator = require('node-code-generator');
const generator = new CodeGenerator();
require('dotenv').config()

module.exports = {
    signUp : 
    async (req,res,next)=>{
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty())
            {
                const error = errors.array()[0].msg;
                return res.status(422).json({error})
            }
            const phone = await otpModel.findOne({phone:req.body.phone,confirmed:true})
            if(!phone){return res.status(401).json({msg : "phone is not verified"})}
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const newUser = new userModel({
                name: {
                    ar : req.body.ar,
                    en : req.body.en
                },
                phone: req.body.phone,
                password: hash
            })
            const user = await newUser.save()
            user.password = undefined
            const token = jwt.sign({user},process.env.secret,{expiresIn : '1h'})
            res.status(201).json({user,token})
        
        }
         catch(err){
            res.status(500).json(err)
        }
    },
    
    signIn :async (req,res,next) => {
        try{
            const phone = await otpModel.findOne({phone:req.body.phone,confirmed:true})
            if(!phone){return res.status(401).json({msg : "phone is not verified"})}
            const user = await userModel.findOne({phone:req.body.phone})
            if(user){
                const isMatch = await bcrypt.compare(req.body.password,user.password)
                if(!isMatch)
                {
                    res.status(401).json({
                        msg: "Password incorrect"
                    })
                }
                else{
                    user.password = undefined
                    const token = jwt.sign({user},process.env.secret,{expiresIn : '1h'})
                    res.status(201).json({
                        token,
                        user
                    })
                }
            }
            else {
                res.json({
                    msg: "name not found!"
                })
            }
        } catch(err){
            res.status(500).json(err)
        }
    },
    forgetPassword :  
    async (req,res) => {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty())
            {
                const error = errors.array()[0].msg;
                return res.status(422).json({error})
            }
            let user = await userModel.findOne({phone:req.body.phone})
            const isMatch = await bcrypt.compare(req.body.oldPassword,user.password)
            if(!isMatch)
            {
                return res.status(401).json({
                    msg: "old Password incorrect"
                })
            }  
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.newPassword, salt);
            user.password = hash
            await user.save()
            res.status(201).json({msg : "password changed correctly"})
    
        } catch(err){
            res.status(500).json(err)
        }
    },
    send : async(req,res) => {
        try{
            const phoneExist = await otpModel.findOne({phone:req.body.phone})
            if(phoneExist === undefined){return res.status(401).json({msg : "phone does not exist"})}
            const newCode = generator.generateCodes('#+#+', 100)[0];
            await client.messages.create({
                from : 'whatsapp:+14155238886',
                to:    `whatsapp:${req.body.phone}`,
                body: `${newCode}`,
            })
           phoneExist.code = newCode
           await phoneExist.save()
           res.status(201).json({msg : "send verification code"})
        } catch(err){
            res.status(500).json({err})
        }
    }, 
    verify : async (req,res)=>{
        try{
            const phoneVerified = await otpModel.findOne({phone:req.body.phone,code:req.body.code})
            if(phoneVerified){ 
                return res.status(201).json({msg : "phone verified"})
            }
            res.status(401).json({msg:"phoneNumber/code is incorrect"})
        } catch(err){
            res.status(500).json({err})
        }
        
    }
} 