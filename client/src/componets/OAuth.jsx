import { Button } from 'flowbite-react'
import React from 'react'
import { FaGoogle } from "react-icons/fa6";
import{GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth'
import{app} from '../firbase'
import{useDispatch} from 'react-redux'
import { signInSuccess,signInFailure} from '../redux/user/userSlice'
import{useNavigate} from 'react-router-dom'



export default function OAuth() {
 
  const auth = getAuth(app)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  
  
  const handleGoogle = async() => {
    
 const provider = new GoogleAuthProvider()
 provider.setCustomParameters({prompt:"select_account"})
 
  
try{

 const resultfromgoogle = await signInWithPopup(auth,provider)

console.log(resultfromgoogle)
 const res = await fetch('https://mern-blog-kdbu.onrender.com/api/auth/google',{
  credentials: 'include',
 method:"POST",
 
  headers:{'Content-Type' : 'application/json'},
   body:JSON.stringify({
    name:resultfromgoogle.user.displayName,
    email:resultfromgoogle.user.email,
    googlePhotoUrl:resultfromgoogle.user.photoURL   
   })
 })

const data = await res.json() 

if(res.ok){
  dispatch(signInSuccess(data))
  navigate("/")
}


}
catch(error){
  dispatch(signInFailure(error.message))
}


}
  
  
  
  
  
  
  
    return (
    <Button  type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogle}>
      <FaGoogle color='blue' className='mr-2 mt-1 '/>
      <span>Continue With Google</span>
    </Button>
  )
}
