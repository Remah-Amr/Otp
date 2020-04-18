const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  autoIncrement = require('mongoose-auto-increment')
const connection = mongoose.createConnection(process.env.db,{useNewUrlParser:true,useUnifiedTopology:true});
const i18n = require("i18n")
autoIncrement.initialize(connection);
const csts = require('../constants')
require('dotenv').config()
 

const userSchema = new Schema({
 name :{
    type:Object,
    i18n : true,
    required: true
   },
 phone : {
    type: Schema.Types.ObjectId,
    ref:'otp',
    required:true
 },
 password : {type : String , required: true}
});

userSchema.plugin(autoIncrement.plugin, { model: csts.USER_MODEL_NAME, field: 'id' });
module.exports = mongoose.model(csts.USER_MODEL_NAME,userSchema);