import Post from "../models/post.js"
import { errorHandler } from "../utils/error.js"

  
  
  export const Create =async (req,res,next) =>{

  

     if(!req.body.title || !req.body.content){
           return next(errorHandler(400,"please provide all the fields"))
     }

      const slug = req.body.title
     .split(' ')
     .join('-')
     .toLowerCase()
     .replace(/[^a-zA-Z0-9-]/g, '');


     const NewPost = new Post({...req.body,slug,userId:req.user.id})

   try{
  const savedPost = await NewPost.save() 

  res.status(201).json(savedPost)

   }
   catch(error){
    next(error)
   }
   
    }


    //get posts 
    
    
    export const getPosts = async(req,res,next) =>{

      try{

      const startIndex = parseInt(req.query.startIndex) || 0 
      const limit = parseInt(req.query.limit) || 9   
      
       
        const posts = await Post.find({
          ...(req.query.userId && { userId: req.query.userId }),
          ...(req.query.category && {category: req.query.category }),
          
          
         
          ...(req.query.slug && { slug: req.query.slug }),
          ...(req.query.postId && { _id: req.query.postId }),
          ...(req.query.searchTerm && {
            $or: [
              { title: { $regex: req.query.searchTerm, $options: 'i' } },
              { content: { $regex: req.query.searchTerm, $options: 'i' } },
            ],
          }),
        })
    
      
       .sort({createdAt:-1})
       .skip(startIndex)
       .limit(limit)
    
    const totalposts = await Post.countDocuments()
    
    
       const now = new Date() 


       const oneMonthGo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
       )
  
       const lasmonthpost = await Post.countDocuments({
         createdAt:{$gte:oneMonthGo}
      })
  
        res.status(200).json({posts,totalposts,lasmonthpost})
        }
      catch(error){
        next(error)
      }
    } 



    //delet post  


    export const DeletePost = async(req,res,next) => {

         if(req.user.id !== req.params.userId){
        return next(errorHandler(403,"you are not alowed to deltet this post"))
      }
     
     try{
      
      await Post.findByIdAndDelete(req.params.postId)
       res.status(200).json("post have been deleted")
      
       }

      catch(error){
        next(error)
      }
    }


//update post 


export const UpdatePost = async(req,res) =>{

if(!req.user.isAdmin || req.user.id !== req.params.userId){
  return next(errorHandler(403,"you are not alowed to update"))
}

 try{

  const updatePost = await Post.findByIdAndUpdate(req.params.postId,{$set:
    {title:req.body.title,content:req.body.content,image:req.body.image,category:req.body.category}},{new:true})


    res.status(200).json(updatePost)

}

catch(error){
  next(error)
}
} 


export const getflowingpost = async(req,res,next) => {
  
  const startIndex = parseInt(req.query.startIndex) || 0
  const limit = parseInt(req.query.limit) || 5

 
  try{
  
   const newposts = await Post.find({userId:{$in:req.user.following}}).sort({createdAt:-1}).limit(limit).skip(startIndex)
  
   
   const totalposts = await Post.countDocuments()

 
   res.status(200).json({posts:newposts,totalposts})
  


}
  catch(error){
    next(error)
  }
} 



export const getRelatedPosts = async(req,res,next) => {
 
 
 try{
  const {postId} = req.params

  
  const startIndex = parseInt(req.query.startIndex) || 0 
  const limit = parseInt(req.query.limit) || 3   
  const sortDirection = req.query.order === 'asc' ? 1 : -1 
  
  
  
  const post = await Post.findById(postId)
  
  if(!post)
  return res.status(404).json({error: "post not found"})
  
  
  const relatedPosts = await Post.find({userId:{$in:post.userId} ,category:{$in:post.category},_id: {$ne: post._id}}).sort({updatedAt:sortDirection})
  .skip(startIndex)
  .limit(limit)

  
  res.json({
    posts: relatedPosts.map((post) => ({
    id: post._id,
    title:post.title,
    category:post.category,
    
content:post.content,
    
username:post.username,
    image:post.image,
   
     slug: post.slug,
    createdAt: post.createdAt,
    
userId: post.userId,
}))
    
  })

 }

  catch(error){
   next(error)
  }  
  
  } 


  export const likePost =async (req,res,next) => {

    try{
  
   const post = await Post.findById(req.params.postId)
    
    if(!post){
      return next(errorHandler(404,"no coment"))
    }
  
  
  const userIndex = post.likes.indexOf(req.user.id)
  
    if(userIndex === -1){
      post.numberOflikes +=1
      post.likes.push(req.user.id)
    }
  
    else{
      post.numberOflikes -=1
     post.likes.splice(userIndex, 1)
    }
      
  await post.save() 
  res.status(200).json(post)
  
  
  }
    catch(error){
      next(error)
    }
   
  } 