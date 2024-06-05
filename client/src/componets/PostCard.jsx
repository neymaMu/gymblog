import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import SmilerPost from '../pages/SmilerPost'





export default function PostCard({post}) {
 
  const[related,setRelated] = useState([])
  useEffect(() =>{
    smilerPost()
 },[])
 
   
   const smilerPost =async () =>{

    try{

     const res = await fetch(`http://localhost:5000/api/post/relate/${post._id}`,{
        credentials: "include",
      })
      
      const data = await res.json()
      
     
         if(res.ok){
          setRelated(data.posts)
         }
     
      }
    catch(error){
        console.log(error)
       
    }
   }
  
 
  
  

  
  
  
  
   return (
   
  <>
 {related.length >0 && 
 
 <div className='flex gap-2 justify-center items-center p-2'>
  <h1 className='font-bold text-xl'>Related Post By:</h1>
 <h1 className='text-blue text-xl text-blue-700'>@{related[0]?.username}</h1>
 
 </div>
 
 }
  
  
   <div className='flex' >
    {related.map((post) => (
   
   
     
   <SmilerPost key={post._id} post={post}/>
   
   
   
   
   ))}
 
   </div>
   </>

   
  )
}
