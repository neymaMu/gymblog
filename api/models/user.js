import mongoose from "mongoose"; 
const {ObjectId} = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true
    },

   email:{
    type:String,
    required:true,
    unique:true
   },

   profilePicture:{
    type:String,
 

   },


   isAdmin:{
    type:Boolean,
    default:false
   },


   isCo:{
    type:Boolean,
    default:false
   },



  
   password:{
    type:String,
    required:true
   },

   followers:[{type:ObjectId,ref:"User"}],
   following:[{type:ObjectId,ref:"User"}],



},{timestamps:true}) 

const User = mongoose.model("User",UserSchema)

export default User