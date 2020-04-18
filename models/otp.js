const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  autoIncrement = require('mongoose-auto-increment')
require('dotenv').config()

const connection = mongoose.createConnection(process.env.db,{useNewUrlParser:true,useUnifiedTopology:true});
 
autoIncrement.initialize(connection);
const otpSchema = new Schema({
 phone : String,
 code : String,
 confirmed :{
     type : Boolean,
     default : false
 }
});

otpSchema.plugin(autoIncrement.plugin, { model: process.env.otp_model_name, field: 'id' });
module.exports = mongoose.model(process.env.otp_model_name,otpSchema);