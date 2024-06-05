 import User from '../models/user.js'
 import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken' 
 
 


export const Signup = async(req,res,next) =>{

    try{

  const{username,email,password, profilePicture,isCo} = req.body 

  if(!username || !email || !password || username === "" || email === "" || password === ""){
    next(errorHandler(400,"All Fields are required"))
  }

  const hashpassword = bcryptjs.hashSync(password,10)


  const NewUser = new User({username,email,password:hashpassword, profilePicture,isCo})
  
   await NewUser.save()
  res.status(200).json({message:"new User have been Saved"})
  
  
    }
    catch(error){
     next(error)
    }
 }


 //sign in 


 export const SignIn =async(req,res,next) =>{

 try{

     const{email,password} = req.body 
    

     if(!email || !password || email=== "" || password === ""){
      return next(errorHandler(400,"all field are required"))
     }

 
   const validUser = await User.findOne({email})
   
   if(!validUser){
   return next(errorHandler(404,"User not found"))
   }

   const validPassword = bcryptjs.compareSync(password,validUser.password)
    
   if(!validPassword){
   return  next(errorHandler(400,"password invalid"))
   }
  
 
  
  
 
  
   
  const token = jwt.sign({id:validUser._id,isAdmin:validUser.isAdmin,isCo:validUser.isCo,followers:validUser.followers,following:validUser.following},process.env.JWT_SECRET,)
  
  const{password:pass, ...rest} = validUser._doc
 
  res.status(200).cookie("access_token",token,{httpOnly:true,sameSite: "strict"}).json(rest)







}
 catch(error){
  next(error)
 }
} 


//sign in with google 

export const google =async (req,res,next) =>{

  const{email,name,googlePhotoUrl} = req.body 

  try{
 
const user = await User.findOne({email})
if(user){
  const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
  const{password, ...rest} = user._doc 

  res.status(200).cookie("access_token",token,).json(rest)
 
}else{

const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)

const hashpassword = bcryptjs.hashSync(generatedPassword,10)
  
const NewUser = new User({
  username:name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
 email,password:hashpassword,profilePicture:googlePhotoUrl

}) 

await NewUser.save() 

const token = jwt.sign({id:NewUser._id},process.env.JWT_SECRET)
const{password, ... rest} = NewUser._doc 
res.status(200).cookie("access_token",token,{httpOnly:true}).json(rest)

}
 

 }
  catch(error){
  next(error)
  }
}  


