import mongoose from 'mongoose' 

const ComentSchema = new mongoose.Schema({


    content:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },

    postId:{
        type:String,
        required:true
    },

    userId:{
        type:String,
        required:true
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

const Comment = mongoose.model("Comment",ComentSchema)

export default Comment