import React, { useState } from 'react'
import { AiTwotoneLike } from "react-icons/ai";
import{useSelector } from 'react-redux'

const LilePost = ({item, setPost,post}) => {
  
    const{currentUser} = useSelector(state => state.user)
  
   
 
    const handleLike = async () => {
        try {
         
          
          const res = await fetch(`http://localhost:5000/api/post/likepost/${item._id}`,{
            credentials: "include",
          method:"PUT",
        },
        );
      
        if (!res.ok) {
         console.log('Bad fetch response')
        }
      
      
          if (res.ok) {
            const data = await res.json();
            
            setPost(post.map((comment) => comment._id === item._id ? {...comment,likes: data.likes,numberOflikes: data.likes.length,}
            : comment
          )
        )
          }
        } catch (error) {
          console.log(error.message);
        }
      };
       
     
 
 
 
 
 
 
 
 
 
 
 
 
    return (
    <div onClick={  handleLike}>
        
     
       <AiTwotoneLike size={22}className={`cursor-pointer text-blue-500 text-lg hover:text-blue-900 ${currentUser &&item?.likes?.includes(currentUser._id)&&`!text-red-500`}`} />
       
    
       
       </div>
  )
}

export default LilePost