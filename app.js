const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);
var CodeGenerator = require('node-code-generator');
var generator = new CodeGenerator();
const otp = require('./models/otp')


const app = express()

app.use(bodyParser.json())

app.use('/otp',require('./routes/otp'))
app.use(require('./routes/user'))

// connect db
mongoose.connect('mongodb+srv://remah:remah654312@cluster0-ytypa.mongodb.net/otp?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology:true })
  .then(result => {
    console.log('connected!');
  });

const port = process.env.PORT || 8080
app.listen(port,()=>console.log(`server started on port ${port}`))