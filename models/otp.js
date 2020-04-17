const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  autoIncrement = require('mongoose-auto-increment')
// var connection = mongoose.createConnection("mongodb+srv://remah:remah654312@cluster0-ytypa.mongodb.net/otp?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});
 
// autoIncrement.initialize(connection);
const otpSchema = new Schema({
 phone : String,
 code : String,
 confirmed :{
     type : Boolean,
     default : false
 }
});

otpSchema.plugin(autoIncrement.plugin, { model: 'otp', field: 'id' });
module.exports = mongoose.model('otp',otpSchema);