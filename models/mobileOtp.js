const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const mobileOtp=new Schema({
    mobile:{
        type:String,
        required: true,
    }}

)
module.exports=mongoose.model("mobile",mobileOtp)


