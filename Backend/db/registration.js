const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    role:String,
    name:String,
    username:String,
    email:String,
    contact:Number,
    dept:String,
    password:String,
    file:Buffer,
   
  })

module.exports = mongoose.model("user",userSchema)