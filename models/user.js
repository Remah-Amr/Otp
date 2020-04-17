const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  autoIncrement = require('mongoose-auto-increment')
// var connection = mongoose.createConnection("mongodb+srv://remah:remah654312@cluster0-ytypa.mongodb.net/otp?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});
var i18n = require("i18n")
// autoIncrement.initialize(connection);
 

const userSchema = new Schema({
 name :{
    type:Object,
    i18n : true
   },
 phone : {
    type: Schema.Types.ObjectId,
    ref:'otp'
 },
 password : String
});

userSchema.plugin(autoIncrement.plugin, { model: 'user', field: 'id' });
module.exports = mongoose.model('user',userSchema);