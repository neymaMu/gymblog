import mongoose from "mongoose"; 

const notificationSchema = new mongoose.Schema({

subject:{
    type:String,
   
},

status:{
    type:String,
  
},

content:{
    type:String,
  
},


reseve:{
    type:String,
  
},

slug:{
    type:String,
   
},
userId:{
    type:String,

}


},{timestamps:true})

const Notification = mongoose.model("Notification",notificationSchema)

export default Notification