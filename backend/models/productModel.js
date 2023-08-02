const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  first: {
    type: String,
    required: [true, "Please Enter product First Name"],
    trim: true,
  },
  last: {
    type: String,
    required: [true, "Please Enter product last name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,

  },
  phone: {
    type: String,
    required: [true, "Please Enter product ContactNo."],
   
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },

  
});

module.exports = mongoose.model("Product", productSchema);