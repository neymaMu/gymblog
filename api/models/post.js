import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types
const postScehma = new mongoose.Schema({


    userId:{
      type: ObjectId,
      ref: "User"
},

  content:{
    type:String,
    required:true
  },

  username:{
    type:String,
    required:true,  
},

profilePicture:{
  type:String,

},

video:{
  type:String
},

  title:{
    type:String,
    required:true,
    unique:true
  },

  image:{
    type:String,
   
  },

  category:{
    type:String,
    default:"uncategorized"
  },

  slug:{
    type:String,
    required:true,
    unique:true
  },

  likes:{
    type:Array,
    default:[]
},

numberOflikes:{
    type:Number,
    default:0
}



},{timestamps:true}) 


const Post = mongoose.model("Post",postScehma)

export default Post