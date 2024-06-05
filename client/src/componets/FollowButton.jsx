import { Button } from 'flowbite-react'
import React,{useState,useEffect} from 'react'
import{useSelector } from 'react-redux'
import {  useDispatch} from 'react-redux'
import { folowupdateSuccess, unfolowupdateSuccess } from '../redux/user/userSlice';



const FollowButton = ({item,setUser,user}) => {
  
    const{currentUser} = useSelector(state => state.user)
    
    const dispatch = useDispatch();
   
    const [showfolow, setShowfolow] = useState( currentUser.following.includes(item._id));
   
   
   
    const Follow = async(currentUserId, selectedUserId) => {
   
        try{
        const res = await fetch(`http://localhost:5000/api/user/flowing`,{
         
        credentials: "include",
        method:"PUT",
       
       
          headers:{
          "Content-Type":"application/json",
        
          },
         body:JSON.stringify({ currentUserId, selectedUserId})
        })
      
        if(res.ok){
          const data = await res.json()
          dispatch(folowupdateSuccess(data))
      
       
          setShowfolow(true)
          }
        }
        catch(error){
      
          console.log(error)
        }
      }
   
   
      const unFollow = async(currentUserId, selectedUserId) => {
   
        try{
        const res = await fetch(`http://localhost:5000/api/user/unflowing`,{
         
        credentials: "include",
        method:"POST",
       
       
          headers:{
          "Content-Type":"application/json",
         
          },
         body:JSON.stringify({currentUserId, selectedUserId})
        })
      
        if(res.ok){
          const data = await res.json()
          dispatch(unfolowupdateSuccess(data))
       
        
       
          setShowfolow(false) 
         
        }
      
        }
        catch(error){
      
          console.log(error)
        }
      }
   
   
   
    
   
   
   
   
     
   
   
   return (
   
   <div >
     {showfolow ?<Button gradientDuoTone="purpleToPink"  onClick={() =>unFollow(currentUser._id,item._id)}>unfolow</Button>
    
   
    : 
 
    <Button gradientDuoTone="purpleToPink"  onClick={() => Follow(currentUser._id,item._id)}>Follow</Button>}

      </div>
)
}

export default FollowButton