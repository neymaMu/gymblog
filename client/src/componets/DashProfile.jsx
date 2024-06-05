import React, { useEffect, useRef, useState } from 'react'

import{Alert, Button, Modal, TextInput} from 'flowbite-react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import{app} from '../firbase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import{useSelector } from 'react-redux'
import { FaCircleExclamation } from "react-icons/fa6";
import{Link} from 'react-router-dom'



import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from '../redux/user/userSlice';


export default function DashProfile() {
 
  const{currentUser,error,loading} = useSelector((state) => state.user)

 

    const[imageFile,setImageFile] = useState(null)
    const[imageUrl,setImageUrl] = useState(null)
    const[imageProgress,setImageProgress] = useState(null)
    const[imageError,setImageError] = useState(null)
    
    const[imageuploding,setImageuploding] = useState(false)

    const[updateUsersuccses,setUpdateUsersuccses] = useState(false)
    
    const[updateUserError, setUpdateUserError] = useState(null)
    
    
    const[formData, setFormData] = useState({})
    
    const[showmodel,setShowmodel] = useState(false)
   
   
   
   
   
    
    
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
           setFormData({ ...formData,profilePicture:downloadURL})
           setImageuploding(false)
         })
       }
      )
   }
       catch(error){
       console.log(error)
      }
    }
   

















   
   
   
const handleChange = (e) =>{

 setFormData({...formData,[e.target.id]: e.target.value})

}
   

    
   const handleSubmit =async (e) =>{
    e.preventDefault();
     
  
  
  setUpdateUserError(null)
  setUpdateUsersuccses(null)
  
    if(Object.keys(formData).length === 0){
     
     setUpdateUserError('no changes made')
      return
     }

  if(imageuploding){
    setUpdateUserError('please wait the file to update')
    return
  }
    try{
      dispatch(updateStart())
     const res = await fetch(`http://localhost:5000/api/user/update/${currentUser._id}`,{
      credentials: 'include',
     method:"PUT",
     
     headers:{
      'Content-Type': 'application/json',
     },
     body:JSON.stringify(formData)
    
     })
    
      const data = await res.json()
      
      if(!res.ok){
        dispatch(updateFailure(data.message))
        setUpdateUserError(data.message)
      }
      
      else{
        dispatch(updateSuccess(data))
        setUpdateUsersuccses('User updated succssfully')

      }
    
    }
    catch(error){
  
     setUpdateUserError(false)
    }
  
 
}
   
   
   
   
     const handleDeletUser = async() =>{
     setShowmodel(false)

     try{
    
      dispatch(deleteUserStart())
     const res = await fetch(`http://localhost:5000/api/user/delete/${currentUser._id}`,{
      credentials: 'include',
     method:"DELETE",
    
     })
     
      const data =await res.json() 
      if(!res.ok){
      dispatch( deleteUserFailure(error.message))
      }
    else{
      dispatch(deleteUserSuccess(data))
    }
    }
     catch(error){
      dispatch( deleteUserFailure(error.message))
     }
    
    }


  
    const handlesignout =async () =>{

    try{
   const res = await fetch('http://localhost:5000/api/user/signout',{
    method:"POST"
   })

    const data = await res.json()

    if(!res.ok){
      console.log(data.message)
    }
  
  else{
    dispatch(signoutSuccess())
  }
     
  
  }
    catch(error){
      console.log(error)
    }
    }

    
    
    
    
    
    
    
    
    return (
    <div className='  max-w-lg mx-auto w-full  p-6 cursor-pinter'>
      
      <h1 className='my-7 text-center font-semibold text-3xl md:w-full  md:ml-60'>Profile</h1>

       <div className='flex w-full mx-auto'>
      
       
         <form onSubmit={handleSubmit} className='flex flex-col md:ml-80 gap-3 '>
         
       
       <input hidden type="file"   onChange={handleimagechange } ref={filePickerRef}/>
       
       
       
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
        
        
        <img alt="user" src={imageUrl ||currentUser.profilePicture}   className='rounded-full  object-cover  h-full w-full border-8 border-[lightgray]'  />
   
         
         </div> 
         {imageError && <Alert>{imageError}</Alert>}
        
        
         {updateUsersuccses&& <Alert >{updateUsersuccses}</Alert>}
   
   
   {updateUserError && <Alert >{updateUserError}</Alert>}
   {error && <Alert >{error}</Alert>} 
       
   
        <TextInput className='w-80' id="username" type="text" placeholder='username' defaultValue={currentUser.username} onChange={handleChange}/>
       
        <TextInput className='w-90' id="email" type="email" placeholder='email' defaultValue={currentUser.email} onChange={handleChange}/>
         
        <TextInput className='w-80' id="passowrd" type="password" placeholder='password' onChange={handleChange} />
        
    
        
        
        <Button type="submit" gradientDuoTone='purpleToBlue' outline disabled={loading || imageuploding}>{loading ? "loading":"update"}</Button>
         
        
         {currentUser.isAdmin && 
         
         <Link to="/createpost">
         <Button type="button" gradientDuoTone='purpleToPink' className='w-full'>Create Post
          
         
          </Button>
          
          </Link>
          }
        
        
        
         <div className='flex justify-between text-red-500 mt-4'>
               
                <span onClick={() => setShowmodel(true)} className='font-bold cursor-pointer'>Delete Account</span>
              
                <span onClick={handlesignout} className='font-bold'>Sign Out</span>
             </div>
          </form>
       </div>

      <Modal show={showmodel} 
      
      onClose={() => setShowmodel(false)}
      popup
      size="md"
      >
         <Modal.Header/> 

       <Modal.Body>
     <div className='text-center'>
      <FaCircleExclamation  className='h-14 w-14 text-gray-500 dark:text-gray-200 mb-4 mx-auto'/>
      <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account</h3>
      
        
        <div className='flex justify-center gap-4'>
          <Button color="failure" onClick={handleDeletUser}>
            Yes Am Sure
          </Button>
       
       
         <Button color="gray" onClick={() => setShowmodel(false)}>No ,Cancel</Button>
         </div>
         </div>

      </Modal.Body>
        </Modal>
   
      
      
      
      
      
      </div>
  )
}
