import React,{useContext, useEffect,useState}  from 'react';
import { Link, } from 'react-router-dom'
import axios from 'axios'

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Button } from 'flowbite-react';
import {  useDispatch} from 'react-redux'



import{useSelector } from 'react-redux'



import FollowButton from './FollowButton';







const Coatch = () => {
 
 
  
  const{currentUser} = useSelector(state => state.user)
   
 
  
  const[user,setUser] = useState([])


  
  
  
  const dispatch = useDispatch();
  

 
  useEffect(() =>{
    featchusers()
  },[])
  
  const  featchusers = async() => {
    
    try{
  
  const res = await fetch(`https://gymblogg.onrender.com/api/getAll/getuser/${currentUser._id}`,{
    credentials: "include",
  
  })
   
   const data = await res.json()
  
  if(res.ok){
      setUser(data)
     
    }
    }
    catch(error){
      console.log(error)
    }
  }
   

 

 
  

 

































 
 
 
 
 
 
 
  const slideLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  };



  



 


  

 
 








return (
  
 <div className='relative p-10  flex items-center  mt-[-100px] '>
  <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
 
 <div
   id='slider'
   className='w-full  h-full hover:overflow-x-scroll   overflow-x-hidden scroll  whitespace-nowrap scroll-smooth scrollbar-hide'
 > 

{user.map((item) => (
 
  <div key={item._id} className=' inline-grid space-y-[-40px] ml-3  grid-cols-1'>
       {item.isCo && <Link to={`/co/${item._id}`} >
    
  
     {item.username.length > 13 ?<p className='text-center text-blue-600'>@{item.username.slice(0,13)+"...."}</p> : <p className='text-center text-blue-600'>@{item.username}</p>}
  <p className='text-center text-gray-500'>Followers:{item.followers.length}</p>
    <div className='mt-[-40px] '>
     <img  className='w-[190px] p-10 h-[190px] object-cover rounded-full inline-block  cursor-pointer hover:scale-105 ease-in-out duration-300' src={item.profilePicture}/>
   </div>
  
    
 
    
     </Link>}
       
      {item.isCo && <div className='flex items-center justify-center'>
  
     <FollowButton  item={item} setUser={setUser} user={user} />
   </div>}



 






</div> 

   ))}             
   
   </div>
  


 <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
</div>  
  
 
 
  )
}

export default Coatch