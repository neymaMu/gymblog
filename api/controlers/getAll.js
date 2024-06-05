import User from "../models/user.js"



export const Couser = async(req,res,next) => {
   
  const loggedInUserId = req.params.userId;
 
    try{
  
 
    
    
      const user = await User.find({ _id: { $ne: loggedInUserId } }).sort({createdAt:-1})
    
  
    res.status(200).json(user)
     }
    catch(error){
      next(error)
    }
  }  

