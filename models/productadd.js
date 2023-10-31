import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    slug:{
        type:String,
        require:true

    },
    price:{
        type:Number,
        require:true
    },
    discripition:{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    catergory:{
        type:mongoose.ObjectId,
        ref:"catergory",
        require:true
    },

    photo:{
        data:Buffer,
        contentType:String
    },
    shipping:{
        type:Boolean
    }

},{timestamps:true})

export default mongoose.model("productdetails",productSchema)