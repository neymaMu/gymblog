import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import CoacProfile from '../componets/CoacProfile'



const CoachPage = () => {
 const[user,setUser] = useState("")
 const[post,setPost] = useState([])

 const userId = useParams().id
 


 
   const fetchuser =async () => {
try{
const res = await fetch(`http://localhost:5000/api/user/${userId}`)

const data = await res.json()
if(res.ok){
setUser(data)
}
}
catch(error){
console.log(error)
}
  }

 
 useEffect(() => {
fetchuser()
 },[])
 
 
 
 const fetchPost =async () => {
    try{
    const res = await fetch(`http://localhost:5000/api/post/getposts?userId=${userId}`)
    
    const data = await res.json()
    if(res.ok){
    setPost(data.posts)

    
    }
    }
    catch(error){
    console.log(error)
    }
      }
   
     
     useEffect(() => {
        fetchPost()
       
     },[])
     


    


 
 
 
 
 
 return (
    <div >
    
  
       <CoacProfile user={user} post={post} setPost={setPost}  />
   

    
      
      
      
    </div>
  )
}

export default CoachPage