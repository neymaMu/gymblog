import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { FaRegCommentDots } from "react-icons/fa6";


const UserComents = ({item}) => {
 
   const[comments ,setComments] = useState([])
   
   
    const{currentUser} = useSelector(state => state.user)
 
    useEffect(() => {
        fetchComent()
      },[])  
     
     
     const fetchComent = async() => {
    
      try{
    
      const res = await fetch(`http://localhost:5000/api/coment/getcomments/${item._id}`,{
       
     
     
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
 
 

 
 
 
    return (
    <div  >
        

      <p >Comments:{comments.length}</p>



    </div>
  )
}

export default UserComents