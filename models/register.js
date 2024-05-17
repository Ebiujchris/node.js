const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
name:{
  type:String,
  trim:true
},
dob:{
  type:Date,
  trim:true
},
gender:{
  type:String,
  trim:true
},
parentName:{
 type:String,
 trim:true
},
email:{
  type:String,
  unique:true
},
phone:{
  type:String,
  trim:true
},
address:{
  type:String,
  trim:true
}
});

module.exports = mongoose.model("Register",registerSchema)
