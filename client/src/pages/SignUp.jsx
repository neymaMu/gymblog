import React, { useEffect, useRef, useState } from 'react'
import gym from '../assets/gym.jpg'
import { Link,useNavigate } from 'react-router-dom'
import { Alert, Button, Label, Spinner, TextInput,FileInput } from 'flowbite-react'
import OAuth from '../componets/OAuth'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import{app} from '../firbase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default function SignUp() {
 
 
     const[errorMessage,setErrorMessage] = useState(false)
     
     const[loading,setLoading] = useState(false)
      
     const navigate = useNavigate()
     
     const[imageFile,setImageFile] = useState(null)
     const[imageUrl,setImageUrl] = useState(null)
     const[imageProgress,setImageProgress] = useState(null)
     const[imageError,setImageError] = useState(null)
     
     const[imageuploding,setImageuploding] = useState(false)
   
     const[username,setUsername] = useState()
     const[email,setEmail] = useState() 
 
     const[password,setPassword] = useState() 

     const[image,setImage] = useState()
   
    const[isCo,setIsCo] = useState()
    
    



    
     const filePickerRef = useRef()
   
   
     const handleimagechange = (e) => {
      const file = e.target.files[0]
      
      if(file){
       setImageFile(file)
       setImageUrl(URL.createObjectURL(file))
      }
     }
     
    
     useEffect(() => {
     if(imageFile){
       uploadimage()
     }
 
     },[imageFile])
    
     
     
     
     const  uploadimage = async() =>{
     
 
       try{
 
         if(!imageFile){
          setImageError('please select an image')
       
          return
      }
       setImageError(null)
       setImageuploding(true)
      const storage = getStorage(app)
      const fileName = new Date().getTime() + '-' + imageFile.name
      
      const storageRef = ref(storage,fileName)
      const uploadTask = uploadBytesResumable(storageRef,imageFile)
      
      uploadTask.on(
        'state_changed',
        (snapshot)=>{
          const progress = 
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setImageProgress(progress.toFixed(0))
        },
 
        (error)=>{
          setImageError('image upload faild')
          setImageProgress(null)
          setImageuploding(null)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
            setImageProgress(null)
            setImageError(null)
            setImage(downloadURL)
            setImageuploding(false)
          })
        }
       )
    }
        catch(error){
        console.log(error)
       }
     }
 

    
    
    
    

    
   
    
     
  
   
     
 
   
   
   
    
   
    
     
     
     
     




    const handleSubmit = async(e) => {
    
      e.preventDefault()
   
     
     if(!username || !email || !password){
      return setErrorMessage("please fill all the field")
     }
     
      try{
       
        setLoading(true)
        setErrorMessage(false)
      const res = await fetch("http://localhost:5000/api/auth/signup",{
        credentials: "include",
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({isCo:isCo,profilePicture:image,username:username,email:email,password: password})
  
      });
  
          const data = await res.json()
          if(data.success === false){
            return setErrorMessage(data.message)
           }
          
          
            setLoading(false)
            setErrorMessage(true)
   
           if(res.ok){
            navigate("/signin")
           }
   
   
          }catch(error){
 
    setLoading(false)
    setErrorMessage(false)
   
   }
  }
    



   
   
   
   
    return (
  
  
 
    <div className='min-h-screen mt-3 '>
 
   
    <div className='flex md:gap-20 gap-5 p-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center '>
 
  
   
  
  
  
  
     <div className='flex-1  '>
 
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
  
   
   
    
   
  <input hidden type="file" accept='image/*'  onChange={handleimagechange } ref={filePickerRef}/>
       
       
       
       <div onClick={() => filePickerRef.current.click()} className='w-20 h-20 relative  self-center cursor-pointer  shadow-md overflow-hidden rounded-full'>
            
         
            
             
             {imageProgress &&  <CircularProgressbar
                   value={imageProgress || 0}
                   text={`${imageProgress}%`}
                   strokeWidth={5}
                   styles={{
                     root: {
                       width: '100%',
                       height: '100%',
                       position: 'absolute',
                       top: 0,
                       left: 0,
                     },
                     path: {
                       stroke: `rgba(62, 152, 199, ${
                         imageProgress / 100
                       })`,
                     },
                   }}
                  />}
             
             
    {image ?<img alt="user" src={image}   className='rounded-full  object-cover  h-full w-full border-8 border-[lightgray]'  /> : 
    
    <p className='flex flex-col rounded-full  object-cover text-center h-full w-full border-8 border-[lightgray]'>add profile pic</p>
    
    }
        
              
              </div> 
              {imageError && <Alert>{imageError}</Alert>}
             
             
             
    <div>
  
  <Label value="your User Name" />

 <TextInput type="text" placeholder='UserName'   onChange={(e) => setUsername(e.target.value)}/>
 
   </div>

   <div>
 <Label value="your  email" />

 <TextInput  type="email" placeholder='Email'  onChange={(e) => setEmail(e.target.value)}/>
 
   </div>
  

   <div className='flex gap-3 items-center'>
  
  
   <input onChange={(e) => setIsCo(e.target.checked)} type="checkbox" className=' w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
              <span className='text-blue-700 font-bold'>Register as Coach</span>
           
 
   </div>
  
       


 
   
   
   
   
   <div>
 <Label value="your Password" />

 <TextInput  type="password" placeholder='Password'  onChange={(e) =>setPassword(e.target.value)}/>
 
   </div>
  
  
  
  <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
   {loading ? <> <Spinner /> <span className='pl-3'>Loading</span></> : 'SignUp' }
   
   
   
 
  
  </Button>
  
   
   <OAuth/>
   
   
   </form>
  
  
  <div className='mt-5 flex gap-3 text-sm'>
   <span>Have an Account?</span>
   <Link to="/signin" className='text-blue-700 font-bold'>
   Sign In
   </Link>
  
  
  </div>
  
  
  
 
   </div>
   
   
   
</div>
    
    
    </div>
  )
}
