const mongoose=require("mongoose");
const Schema = mongoose.Schema;


const loginSchema=new Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        required: true,
    },
    password:String,
    role:{
        type:String,
        enum:["user","superUser"],
        default:"user"
    },
    status:{
        type:String,
        enum:["InActive","Active"],
        default:"Active"
    }
    
});

module.exports=mongoose.model("login",loginSchema)