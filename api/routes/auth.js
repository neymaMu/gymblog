import express from 'express'
import {  SignIn, Signup, google } from '../controlers/auth.js'



const router = express.Router() 

router.post("/signup",Signup)

router.post("/signIn",SignIn)

router.post("/google",google)

export default router