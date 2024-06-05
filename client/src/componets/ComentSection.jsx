import React, { useEffect, useState } from 'react'
import{useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import{Alert, Button, Textarea,Modal} from 'flowbite-react'
import ComentPage from './ComentPage'
import { FaCircleExclamation, FaHouseMedicalCircleExclamation } from "react-icons/fa6";
import {  useNavigate } from 'react-router-dom';
import axios from 'axios'
export default function ComentSection({postId,slug}) {
 
   const[comment,setComment] = useState('')
   const[errormessage,setErrormessage] = useState(null)
    const[comments,setComments] = useState([])
     const[showmodel,setShowmodel] = useState(false)
     const[comenttodelete,setComenttodelete] = useState(null)
   
     const navigate = useNavigate();
    const{currentUser} = useSelector((state) => state.user)
 
 
     const handleSubmit = async(e) => {
     e.preventDefault() 

     if(comment.length >  200){
      return
     }
      
     try{
      const res = await fetch(`http://localhost:5000/api/coment/create`,{
        credentials: "include",
      method:"POST",
     
        headers:{
          "Content-Type" : "application/json",
          'x-auth-token': "JWT_SECRET",
        },
       
        body:JSON.stringify({content:comment,postId,userId:currentUser._id,username:currentUser.username,slug})
       })
      
      
        const data = await res.json()
        if(res.ok){
          setComment('')
          setErrormessage(null)
          setComments([data, ...comments])
        }
     }
     catch(error){
      console.log(error)
      setErrormessage(error.message)
     }
    
 }
    
    
    
    
  useEffect(() => {
    fetchComent()
  },[postId])  
 
 
 const fetchComent = async() => {

  try{

  const res = await fetch(`http://localhost:5000/api/coment/getcoment/${postId}`,{
   
 
 
  })
    if(res.ok){
    const data = await res.json()
    setComments(data)
   }
  
  }
  catch(error){
    console.log(error)
  }
 }
 


 
 
 

 
 
 const handleLike = async (commentId) => {
  try {
    if (!currentUser) {
      navigate('/signin');
      return;
    }
    const res = await fetch(`http://localhost:5000/api/coment/likecoment/${commentId}`,{
      credentials: "include",
    method:"PUT",
  },
  );

  if (!res.ok) {
   console.log('Bad fetch response')
  }


    if (res.ok) {
      const data = await res.json();
 setComments(comments.map((comment) => comment._id === commentId ? {...comment,likes: data.likes,numberOflikes: data.likes.length,}
            : comment
        )
      );
    }
  } catch (error) {
    console.log(error.message);
  }
};
 
 
 
 const handleEditing = (comment,editContent)=>{


  setComments(
    comments.map((c)=>
      c._id === comment._id?{...c,content:editContent}:c
    )
  )
 }
 
 
 const handleDelete = async(commentId) => {
   setShowmodel(false)
 try{



const res = await fetch(`http://localhost:5000/api/coment/deletecoment/${commentId}`,{
  credentials: "include",
method:"DELETE",
 
  headers:{
    "Content-Type" : "application/json"
  },
  
  })

if(res.ok){
  const data = await res.json() 


 
      setComments(comments.filter((coment) => coment._id !== commentId))
  
  
}



}
 catch(error){
  console.log(error)
 }


}
 
 
 
 
 return (
    <div className='p-2 max-w-2xl mx-auto w-full '>


   {currentUser ? 
   
  <div className='flex items-center justify-center text-sm text-gray-500 my-2 gap-2'>

  <p>Signed In as :</p>
  <img src={currentUser.profilePicture} className='h-5 w-5 object-cover rounded-full' />

  <Link to={'/dashbord?tab=profile'} className='text-xs text-cyan-600 hover:underline'>
  
  @{currentUser.username}
  </Link>



  </div>

:
<div className='text-sm text-teal-500 my-5 flex gap-1'>
 you must be Sign In to Comment 
 <Link to="/signin" className='text-blue-500 hover:underline'>
 Sign In
 </Link>



</div>
}

{currentUser &&
 
   <form className='border border-teal-500 rounded-md p-3' onSubmit={handleSubmit}>
   
    <Textarea 
    placeholder='add a Comment...'
    rows='3'
    maxLength='200'
    onChange={(e) => setComment(e.target.value)}
    value={comment}
  
  />

      <div className='flex justify-between mt-5 items-center'>
        <p className='text-gray-500 text-sm'>{200 - comment.length}charector left</p>
        
        <Button outline gradientDuoTone='purpleToBlue' type="submit">
          Submit
        </Button>
      </div>

   {errormessage && <Alert color='failure' className='mt-5'>{errormessage}</Alert>}
  
   
   </form>
}

   
   {comments === 0 ? <p>no Comments</p> :
   
   
   
   <>
   <div className='text-sm my-5 flex items-center gap-1'>
    <p>Comments</p>
    <div className='border border-gray-500 py-1 px-2 rounded-sm'>
      <p>{comments.length}</p>
    </div>
   </div>
   
  
  {comments.map((comen) => (
    <ComentPage key={comen._id} comen={comen} onLike={handleLike} onEdit={handleEditing}
    
    
    onDelete={(commentId) => {
      setShowmodel(true) 
      setComenttodelete(commentId)
    }}
    />
  
  
  ))}
  
  
   </>
   
   
   }
   
   
   
    
   <Modal show={showmodel} 
      
      onClose={() => setShowmodel(false)}
      popup
      size="md"
      >
         <Modal.Header/> 

       <Modal.Body>
     <div className='text-center'>
      <FaCircleExclamation  className='h-14 w-14 text-gray-500 dark:text-gray-200 mb-4 mx-auto'/>
      <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this Coment</h3>
      
        
        <div className='flex justify-center gap-4'>
          <Button color="failure" onClick={()=>handleDelete(comenttodelete)}>
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
