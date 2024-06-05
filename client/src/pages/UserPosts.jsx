import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import CoacProfile from '../componets/CoacProfile'
import{useSelector} from 'react-redux'


const UserPosts = () => {
 const[user,setUser] = useState("")
 const[post,setPost] = useState([])

 
 const{currentUser} = useSelector((state) => state.user)


 
   const fetchuser =async () => {
try{
const res = await fetch(`https://gymblogg.onrender.com/api/user/${currentUser._id}`)

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
 
 
 useEffect(() => {
  const fetchPost =async () => {
    try{
    
      const res = await fetch(`https://gymblogg.onrender.com/api/post/getposts?userId=${currentUser._id}`)
   
      const data = await res.json()

      if(res.ok){
     
        setPost(data.posts)
      
    }
   }
    catch(error){
    console.log(error)
  
    }
      }
      
  
      fetchPost()
   
    

},[])

   
     
    

  
   
   
   
   
   
   
   
   
   
     return (
    <div>

      
        <CoacProfile user={user} post={post} setPost={setPost} />
      
    </div>
  )
}

export default UserPosts