import expres from 'express' 
import { verifyToken } from '../utils/verifyUser.js'
import {  DeleteNotify, DeleteUse, Folow, Getuser, getUsers, getnotify, signout, unFolow, updateUser } from '../controlers/user.js'



const router = expres.Router() 




router.put("/update/:userId",verifyToken,updateUser)
router.delete("/delete/:userId",verifyToken,DeleteUse)
router.post("/signout",signout)
router.get("/getuser",verifyToken,getUsers)
router.get("/:userId",Getuser)
router.put("/flowing",verifyToken,Folow)

router.post("/unflowing",verifyToken,unFolow)
router.get("/noti/:userId",verifyToken,getnotify) 

router.delete("/notifydelete/:notifId/:userId",verifyToken,DeleteNotify)






export default router