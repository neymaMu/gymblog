import React, { useContext } from 'react'
import gym from '../assets/gym.jpg'
import { Link,useNavigate } from 'react-router-dom'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import OAuth from '../componets/OAuth'
import {useState} from 'react'
import {signInSuccess,} from '../redux/user/userSlice';
import {  useDispatch} from 'react-redux'


export default function SignIn() {
 

     const dispatch = useDispatch();
  
     const[formData,setFormData] = useState({})
    
     const[errorMessage,setErrorMessage] = useState(false)
     
     const[loading,setLoading] = useState(false)
      
     const navigate = useNavigate()
     
    
     
     const handleChane = (e) =>{
     setFormData({...formData,[e.target.id] : e.target.value.trim()})
   
    }
 

    const handleSubmit = async(e) => {
    
      e.preventDefault()
   
     
     if( !formData.email || !formData.password){
      return setErrorMessage("please fill all the field")
     }
     
      try{
       
        setLoading(true)
        setErrorMessage(false)
      const res = await fetch("https://gymblogg.onrender.com/api/auth/signIn",{
        credentials: "include",
    
      method:"POST",
   
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(formData)
  
      });
  
          const data = await res.json()
          if(data.success === false){
            return setErrorMessage(data.message)
           }
          
          
            setLoading(false)
            setErrorMessage(true)
   
         
            if(res.ok){
        
              dispatch(signInSuccess(data))
          
                navigate("/")
              }
  
           
   
   
          }catch(error){
 
    setLoading(false)
    setErrorMessage(false)
   
   }
  }
    
     


   
   
   
   
    return (
  
  
 
    <div className='min-h-screen mt-20 '>
 
   
    <div className='flex md:gap-20 gap-5 p-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center '>
 
  
   
     <div className='flex-1  '>
      <div className='flex flex-col'>
     <p className='text-sm'>Every person experiences different relationships at different stages of their life. Moreover, relationships
      <p className='text-sm'> change with time; some are never-ending bonds, and some end in a few months. </p>
      <p className='text-sm'>But one relationship that always remains the same no matter what difficulties life throws at</p>
      <p className='text-sm'> them is the bond of a brother . It is an unshakeable bond which becomes stronger with time </p>
      and has no expiry date</p>
      <p className='font-bold text-md'>THIS WORK Was Dedicated to My Best Brother</p>
  </div>
  
   <img src={gym} className='w-[100%] h-[100%] object-cover rounded-md shadow-2xl'/>
   
   <Link to="/" className='flex items-center justify-center  '>

   <div>
    <p className='font-extrabold text-xl shadow-2xl px-2 text-blue-500 '>Strengthen your</p>
    <p className='font-extrabold text-lg shadow-2xl text-gray-500 px-8'> mind-body</p>
  </div>
   
   </Link>
   
   
   </div>
   
   
   
   
   <div className='flex-1  '>
  
   <form className='flex flex-col gap-3' onSubmit={handleSubmit}>

   
   {
    errorMessage ? <Alert className='flex items-center justify-center ' color="failure">{errorMessage}</Alert>:null
  }
  
   
   
   
  

   <div className='mt[-20px]'>
 <Label value="your  email" />

 <TextInput  type="email" placeholder='Email' id="email" onChange={handleChane}/>
 
   </div>
  

   <div>
 <Label value="your Password" />

 <TextInput  type="password" placeholder='Password' id="password" onChange={handleChane}/>
 
   </div>
  
  
  
  <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
   {loading ? <> <Spinner /> <span className='pl-3'>Loading</span></> : 'SignIn' }
   
   
   
 
  
  </Button>
  
   
   <OAuth/>
   
   
   </form>
  
  
  <div className='mt-5 flex gap-3 text-sm'>
   <span> Dont Have an Account?</span>
   <Link to="/signup" className='text-blue-700 font-bold'>
   Sign up
   </Link>
  
  
  </div>
  
  
  
 
   </div>
   
   
   
</div>
    
    
    </div>
  )
}



