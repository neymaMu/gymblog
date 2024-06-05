import { Button } from 'flowbite-react';
import React from 'react'

import { useSelector } from 'react-redux';

import { MdDelete } from "react-icons/md";

const DeletePost = ({item,setPost}) => {
    const{currentUser} = useSelector(state => state.user)

 
    const handleDeletUser = async() =>{

        try{
      
        const res = await fetch(`http://localhost:5000/api/post/deletpost/${item._id}/${currentUser._id}`,{
          credentials: "include",
        method:"DELETE"
        
      
      })
         
        
        const data = await res.json() 
      
      
       if(!res.ok){
        console.log(data.message)
       }else{
       
      
        setPost((prev) => prev.filter((post) => post._id !== item._id))
      
      }
        
        }
        catch(error){
          console.log(error)
        }
    
        
        
        }
    
 
    return (
    <div className=''>
    
    <div onClick={handleDeletUser}><MdDelete className='text-red-500' size={20} /></div>
    </div>
  )
}

export default DeletePost