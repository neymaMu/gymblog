import expres from 'express' 
import { Couser } from '../controlers/getAll.js'
import { verifyToken } from '../utils/verifyUser.js'




const router = expres.Router() 



router.get("/getuser/:userId",verifyToken, Couser)


export default router