require('dotenv').config()
const express = require('express')
const router = express.Router()
const {sendCode , verifyCode} = require('../services/otp')

router.post('/send',sendCode)

router.post('/verify',verifyCode)


module.exports = router