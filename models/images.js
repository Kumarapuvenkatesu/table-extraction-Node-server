const mongoose=require("mongoose");

const imagesSchema=new mongoose.Schema(
    {
        image:String
    },
    {
        collection:"ImageDetails"
    }
);
module.exports=mongoose.model("images",imagesSchema)


