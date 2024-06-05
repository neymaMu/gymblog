import express from 'express' 
const router = express.Router() 
import { verifyToken } from '../utils/verifyUser.js'
import { Deletecoment, Editcoment, createComent, getComent, getcomments, likeComent } from '../controlers/coment.js'





router.post("/create",verifyToken,createComent)
router.get("/getcoment/:postId",getComent)
router.put("/likecoment/:comentId",verifyToken,likeComent)
router.put("/editcoment/:comentId",verifyToken,Editcoment)

router.delete("/deletecoment/:comentId",verifyToken,Deletecoment)

router.get('/getcomments/:postId',getcomments);





export default router
