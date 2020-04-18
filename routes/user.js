const express = require('express')
const router = express.Router()
const {check} = require('express-validator');
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);
const {signUp,signIn,send,verify,forgetPassword} = require('../services/user')

router.post('/signup',
[
    check('ar','you have to fill name field').not().isEmpty(),
    check('en','you have to fill name field').not().isEmpty(),
    check('password',"Please enter a password contain At least one uppercase.At least one lower case.At least one special character.At least one number ").matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
      ) 
],signUp)

router.post('/signin',signIn)

router.post('/forget-password',[
    check('newPassword',"Please enter a password contain At least one uppercase.At least one lower case.At least one special character.At least one number ").matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
      )
],forgetPassword)

router.post('/forget-password/send',send)

router.post('/forget-password/verify',verify)


module.exports = router