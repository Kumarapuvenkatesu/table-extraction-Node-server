const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const createschema=new Schema({
    name:String,
    email:String,
    message:String,
});
module.exports=mongoose.model("contact",createschema);



// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   id: {
//     type: Number,
//     required: true,
//     unique: true
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   username: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   address: {
//     street: String,
//     suite: String,
//     city: String,
//     zipcode: String,
//     geo: {
//       lat: String,
//       lng: String
//     }
//   },
//   phone: String,
//   website: String,
//   company: {
//     name: String,
//     catchPhrase: String,
//     bs: String
//   }
// });

// module.exports = mongoose.model('User', userSchema);
