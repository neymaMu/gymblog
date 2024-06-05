import express from 'express' 
import { verifyToken } from '../utils/verifyUser.js'
import { Create, DeletePost, UpdatePost, getPosts,  getRelatedPosts,  getflowingpost, likePost } from '../controlers/post.js'



const router = express.Router() 

router.post("/create",verifyToken,Create)
router.get("/getposts",getPosts)


router.delete("/deletpost/:postId/:userId",verifyToken,DeletePost)

router.put("/updatedpost/:postId/:userId",verifyToken,UpdatePost)

router.get("/getflowing",verifyToken,getflowingpost) 

router.get("/relate/:postId",verifyToken,getRelatedPosts)

router.put("/likepost/:postId",verifyToken,likePost)






export default router