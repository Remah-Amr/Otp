const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);



const app = express()

app.use(bodyParser.json())

app.use('/otp',require('./routes/otp'))
app.use(require('./routes/user'))

// connect db
mongoose.connect(process.env.db, { useNewUrlParser: true,useUnifiedTopology:true })
  .then(result => {
    console.log('connected!');
  });

const port = process.env.PORT || 9999
app.listen(port,()=>console.log(`server started on port ${port}`))