const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  autoIncrement = require('mongoose-auto-increment')
const connection = mongoose.createConnection(process.env.db,{useNewUrlParser:true,useUnifiedTopology:true});
const i18n = require("i18n")
autoIncrement.initialize(connection);
require('dotenv').config()
 

const userSchema = new Schema({
 name :{
    type:Object,
    i18n : true
   },
 phone : {
    type: Schema.Types.ObjectId,
    ref:process.env.otp_model_name
 },
 password : String
});

userSchema.plugin(autoIncrement.plugin, { model: process.env.user_model_name, field: 'id' });
module.exports = mongoose.model(process.env.user_model_name,userSchema);