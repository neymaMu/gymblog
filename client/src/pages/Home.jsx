import React,{useState,useEffect, useContext} from 'react'
import{Link} from 'react-router-dom'
import PostCard from '../componets/PostCard';

import{useSelector } from 'react-redux'
import Coatch from '../componets/Coatch';
import FlowPage from '../componets/FlowPage';
import { Button } from 'flowbite-react';






export default function Home() {
  
 

 const[showmore ,setShowmore] = useState(true)



  const[flowuser,setFlowuser] = useState([])
 


  const handleShowMore = async () => {
    const startIndex = flowuser.length;
    try {
      const res = await fetch(
        `https://gymblogg.onrender.com/api/post/getflowing?startIndex=${startIndex}`,{
          credentials: "include",
        } );
   
      if (res.ok) {
        const data = await res.json();
        setFlowuser((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 5) {
          setShowmore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  
  
 
 useEffect(() => {
  fetchflowpost()
 },[])

 
 const fetchflowpost = async( ) =>{
    
      try{
        const res = await fetch(`https://gymblogg.onrender.com/api/post/getflowing`,{
        
        credentials: "include",
    
     
       })
       const data = await res.json()
       
       if(res.ok){
     
         
          setFlowuser(data.posts)
         
         
         }
    }
  
        catch(error){
    console.log("somthing went wrong")
   
   }
}







return (
    <div>
 

     <div className='flex flex-col gap-3 p-28 px-3 max-w-6xl mx-auto '>
    
     <div className='mt-[-70px]  p-10 flex '>
  
  
  
  <Coatch   />

  </div>
    
  
     
     
     
  <div className='mt-[-60px] space-y-5'>
    {flowuser && <h1 className='text-center font-bold text-lg'>Recent Following Coach posts :</h1>}
     
  
    
      { flowuser && flowuser?.map((item) => (
        <FlowPage item={item} flowuser={flowuser} setFlowuser={setFlowuser}  />
      ))
      }
     
   
    </div>
  
    
 {showmore && <Button gradientDuoTone="purpleToPink" onClick={handleShowMore} className='text-center w-60 mx-auto bottom-[-20px] '>show More Following Posts</Button>}
      
       <div>
      <h1 className='text-3xl font-bold lg:text-3xl '>Welcome to my Gym Blog</h1>
       
       
      <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500  font-bold hover:underline'
        >
          View all posts
        </Link>
       
       </div>
       
       <div className='flex justify-end items-center   '>
      
        <div className='flex flex-col '>
      <p className='text-blue-900 font-bold text-lg'>But it ain't about how hard you hit</p>
      <p className='text-blue-900 font-bold text-lg'> it's about how hard you " </p>
     <p className='text-blue-900 font-bold text-lg'>can get hit and keep moving forward</p>
      </div>
      <img className='h-[30%] w-[30%] rounded-md shadow-md' src="https://static1.pocketlintimages.com/wordpress/wp-content/uploads/151331-tv-feature-what-is-the-best-order-to-watch-the-rocky-movies-image1-y39ixawpmf.jpg" />
     
     </div>
      
    
      <div className='border-b border-gray-300'/>
      
     <div className='max-w-6xl  mx-auto p-3 flex flex-col gap-8 py-7'>
       
      </div>
    </div>
      
      
       </div>
   
   
      
   
   
   
   
   
  
  )
}
