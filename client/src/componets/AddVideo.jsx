import { TextInput,Button,FileInput,Select } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import { app } from '../firbase';
import { CircularProgressbar } from 'react-circular-progressbar';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import{useSelector } from 'react-redux'
import { Player } from "video-react";
import 'video-react/dist/video-react.css'; // import css

const AddVideo = ({setShow}) => {
 
  
    const{currentUser} = useSelector(state => state.user)
    const[category,setCategory] = useState()
    const[publisherror,setPublisherror] = useState(false)
    const[file,setFile] = useState(null)
   
    const[imageProgress,setImageProgress] = useState(null)
   
    const[imageError,setImageError] = useState(null)
 
    const[content,setContent] = useState()
     const[title,setTitle] = useState()
     const[video,setVideo] = useState()
 
    const handleuploadimage = async() =>{

        try{
 
          if(!file){
           setImageError('please select an image')
        
           return
       }
        setImageError(null)
       const storage = getStorage(app)
     
       const fileName = new Date().getTime() + '-' + file.name
    
       const storageRef = ref(storage,fileName)
       const uploadTask = uploadBytesResumable(storageRef,file)
       
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
         },
         ()=>{
           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
             setImageProgress(null)
             setImageError(null)
             setVideo(downloadURL)
         
           })
         }
        )
     }
         catch(error){
         console.log(error)
        }
      }
     
     
     
     
      const handleSubmit = async(e) =>{
     
        e.preventDefault() 
 
 
        try{
          const res = await fetch("http://localhost:5000/api/post/create",{
           credentials: "include",
           method:"POST",
      
           headers:{
             "Content-Type" : "application/json"
           },
 
           body:JSON.stringify({ profilePicture:currentUser.profilePicture,category:category,video:video,title:title,content:content,userId:currentUser.userId,username:currentUser.username})
          
         
          })
 
           const data = await res.json()
 
             if(!res.ok){
               setPublisherror(data.message)
               return
             } 
             if(res.ok){
               setPublisherror(null)
               setShow(false)
             
             }
 
         }
        catch(error){
 
       setPublisherror("somthing went wrong")
       
       }
 }
      
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
  return (
   
  
   <div className="border  border-white-300 bg-blue-500 w-[600px]   transition ml-40  top-10  z-40 flex flex-col items-start absolute top-12 rounded-md p-4 space-y-4">
        
        
        <div className='p-3  max-w-3xl  mx-auto '> 



        <form onSubmit={handleSubmit} className='flex my-2 w-[500px] flex-col '> 


       
    
       
       
       
        <div className='flex  flex-col gap-[-2px]   '> 
       
       <div className='flex mt-[-20px]'>
       <TextInput type="text" placeholder='Title' required id="title" className='flex-1' onChange={(e) => setTitle(e.target.value)}/>
        
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>

              
<option value='uncategorized'> Select a category</option>

<option value='fullBody'> full Body</option>

<option value='upperBody'> Upper Body</option>

<option value='LowerBody'> Lower Body</option>
<option value='Motivation'>Motivation</option>

</Select>
        
     
      
      
      

</div>

    
      <div className='flex gap-4 justify-between items-center border-1 border-teal-500 border-dotted p-3'>

<FileInput type="file" accept='video/*' onChange={(e) => setFile(e.target.files[0])}/>



<Button  disabled={imageProgress} onClick={handleuploadimage}  type="button" gradientDuoTone="purpleToBlue" size="sm" outline>


{
            imageProgress ? 
            <div className='w-10 h-10'>
              <CircularProgressbar value={imageProgress} text={`${imageProgress || 0}%`}/>
            </div>
           
           :'upload video'}

</Button>

</div>
    
    
    
    

    
    
<Player
         autoPlay  
         loop
         playsInline
          src={video}
          fluid={false}
          width={480}
          height={180}
         
      />
    
    
    
    
    
    
    
    
      <ReactQuill required placeholder='Write Somthing' className='h-20 mb-12' 
             
             value={content} onChange={setContent}
             
             />

  </div>





  <Button className='bg-black text-white' type="submit" >Publish
           
           
           
           </Button>



        </form>










        </div>
       
       
       
       
       
       
       
       
       
       
       </div>

 
  )
}

export default AddVideo