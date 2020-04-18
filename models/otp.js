const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  autoIncrement = require('mongoose-auto-increment')
const csts = require('../constants')
require('dotenv').config()

const connection = mongoose.createConnection(process.env.db,{useNewUrlParser:true,useUnifiedTopology:true});
 
autoIncrement.initialize(connection);
const otpSchema = new Schema({
 phone : {type:String,required:true},
 code : {type:String,required:true},
 confirmed :{
     type : Boolean,
     default : false,
     required: true
 }
});

otpSchema.plugin(autoIncrement.plugin, { model:csts.OTP_MODEL_NAME, field: 'id' });
module.exports = mongoose.model(csts.OTP_MODEL_NAME,otpSchema);