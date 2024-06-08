import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import User from "../models/user.js"
import Notification from "../models/notification.js"



export const updateUser =async(req,res,next) =>{

  if(req.user.id !== req.params.userId){
    return next(errorHandler(403,"you are not alowed to update"))
  }


  if(req.body.password){
    if(req.body.password.length < 6){
        return next(errorHandler(400,"error password must have at least 6 charcters"))
    }
 
    req.body.password = bcryptjs.hashSync(req.body.password,10)
   }


  if(req.body.username){
    if(req.body.username.length < 7 || req.body.username > 20){
        return next(errorHandler(400,"user must be between 7 and 20 charcter"))
    }
   
    if(req.body.username.includes(' ')){
        return next(errorHandler(400,"cannont contain spaces"))
    }

   if(req.body.username !== req.body.username.toLowerCase()){
    return next(errorHandler(400,"error"))
   }

  if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
    return next(errorHandler(400,"user name can only contain leeters and numbers"))
  }

  }


  try{
    const updateUser = await User.findByIdAndUpdate(req.params.userId,
        {$set:{username:req.body.username,email:req.body.email,
            profilePicture:req.body.profilePicture,password:req.body.password},},{new:true})
    
     const{password, ...rest} = updateUser._doc
     res.status(200).json(rest)
    }
     catch(error){
        next(error)
     }

} 


//delete user 

export const DeleteUse = async(req,res,next) =>{
  if(!req.user.isAdmin && req.user.id !== req.params.userId){
    return next(errorHandler(403,"you cant delete"))
  }


try{
await User.findByIdAndDelete(req.params.userId)
res.status(200).json("user delted")

}
catch(error){
  next(error)
}
} 


//sign out 

export const signout = (req,res,next) =>{

  try{

    res.clearCookie('access_token').status(200).json("User is sign out")
  }
  catch(error){
    next(error)
  }
} 


//get users 

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};


//get user 

export const Getuser = async(req,res,next) => {
 
  
  try{

  const user = await User.findById(req.params.userId)
  if(!user){
    return next(errorHandler(404,"no user"))
  }
  const{password, ...rest} = user._doc
  res.status(200).json(rest)
   }
  catch(error){
    next(error)
  }
} 
  


export const Folow =async(req,res,next)=>{
 
  const { currentUserId, selectedUserId } = req.body;

  try {
   
    await User.findByIdAndUpdate(selectedUserId, {
      $push: {followers : currentUserId },
    });

  
    const folow= await User.findByIdAndUpdate(currentUserId, {
      $push: { following: selectedUserId },
    });
     
    const admin =await User.findById(selectedUserId)
     
    await Notification.create({
      subject:`${req.user.username} start following you` ,
      userId:admin.id
      
     })
 

   
   res.status(200).json(folow);
  
  next()
  } catch (error) {
    res.sendStatus(500);
  }
}

 




export const unFolow =async(req,res,next)=>{
 
  const { currentUserId, selectedUserId } = req.body;

  try {
    //update the recepient's friendRequestsArray!
    await User.findByIdAndUpdate(selectedUserId, {
      $pull: {followers : currentUserId },
    });

    //update the sender's sentFriendRequests array
    const folow= await User.findByIdAndUpdate(currentUserId, {
      $pull: { following: selectedUserId },
    });

    res.status(200).json(folow);
    next()
  } catch (error) {
    res.sendStatus(500);
  }
}
   





export const getnotify = async(req,res,next) => {
  
  const {userId} = req.params
   
  const user = await User.findById(userId)
  
  if(!user)
  return res.status(404).json({error: "post not found"})
  
  
  
  try{
 
  const notify = await Notification.find({userId},{$ne: user._id}).sort({createdAt:-1})
   
  res.json({posts:notify})
   
  }
  catch(error){
    next(error)
  }
}


export const DeleteNotify = async(req,res,next) => {
 
  if( req.user.id !== req.params.userId){
    return next(errorHandler(403,"you are not alowed to deltet this post"))
  }

try{

await Notification.findByIdAndDelete(req.params.notifId)
res.status(200).json("post have been deleted")

}

catch(error){
 next(error)
}
}








