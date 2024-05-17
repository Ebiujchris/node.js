//introducing mongoose
const mongoose = require("mongoose");

//using the function to build schema
const contactSchema = new mongoose.Schema(
  {
email: {type:String},
password:{ type:String, trim:true},
address:{ type:String, trim:true},
apartment:{type:String, trim:true},
city:{type:String, trim:true},
state:{type:String, trim:true},
zip:{type:Number},
checkout:{type:String, trim:true}
  }
);



module.exports = mongoose.model("Contact",contactSchema);