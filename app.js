const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

app.use(bodyParser.json())

// routes


// connect db
mongoose.connect('mongodb+srv://remah:remah654312@cluster0-ytypa.mongodb.net/otp?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology:true })
  .then(result => {
    console.log('connected!');
  });

const port = process.env.PORT || 8080
app.listen(port,()=>console.log(`server started on port ${port}`))