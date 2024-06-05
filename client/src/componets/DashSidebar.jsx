import{Sidebar, SidebarItem} from 'flowbite-react'
import { HiUser,HiArrowRight  } from "react-icons/hi";
import React, { useEffect, useState } from 'react'
import{Link, useLocation} from 'react-router-dom'

import { signoutSuccess } from '../redux/user/userSlice';
import {  useDispatch} from 'react-redux'
import { MdOutlinePostAdd } from "react-icons/md";

import { FaUsers } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { useSelector } from 'react-redux';
import { RiUserFollowFill } from "react-icons/ri";
import { SlUserFollowing } from "react-icons/sl";



export default function DashSidebar() {
 
  const dispatch = useDispatch()
  const{currentUser} = useSelector(state => state.user)
   
  const location = useLocation()
  const[user,setUser] = useState("")
 const[tab, setTab] = useState("")
 
  
 
 useEffect(() => {
   
  const urlParams = new URLSearchParams(location.search)
  const tabFormUrl = urlParams.get('tab')
    
  if(tabFormUrl){
    setTab(tabFormUrl)
  }
  },[location.search])
 
   
   
   
   
   
  const handlesignout =async () =>{

    try{
   const res = await fetch('http://localhost:5000/api/user/signout',{
    method:"POST"
   })

    const data = await res.json()

    if(!res.ok){
      console.log(data.message)
    }
  
  else{
    dispatch(signoutSuccess())
  }
     
  
  }
    catch(error){
      console.log(error)
    }
    }
   
   
  
   
    const fetchuser =async () => {
      try{
      const res = await fetch(`http://localhost:5000/api/user/${currentUser._id}`)
      
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
       
       
       
  
  
  
  
  
  
  return (
  
   <Sidebar  className='w-full md:w-56'>

   <Sidebar.Items>

   <Sidebar.ItemGroup className='flex flex-col gap-3'>

  
   
   
   
   
   
   
   
   
    <Link to="/dashbord?tab=profile">
    <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isCo ? "Coach" : "user"} labelColor='dark' as='div'>

        Profile
    </Sidebar.Item>
     </Link>
       
      
      
   
       {currentUser.isCo && <Link to={"/dashbord?tab=user"}>
       <Sidebar.Item active={tab === 'user'} as="div" 
       icon={MdOutlinePostAdd }>
        posts
       
       </Sidebar.Item>
        </Link>}
   
    
     {currentUser.isCo && <div className='flex gap-1'>
     <RiUserFollowFill size={24} className='font-bold ' />
     <p>Followers: {currentUser?.followers?.length}</p>
     </div>}
    
    
     {currentUser && <div className='flex gap-1'>
     <SlUserFollowing size={24} className='font-bold ' />
    <p>Following: {currentUser?.following?.length}</p>
     </div>}






    <Sidebar.Item onClick={handlesignout}  icon={HiArrowRight} className="cursor-pointer">
       Sign Out
        
    </Sidebar.Item>
  
  
  
   </Sidebar.ItemGroup>

   </Sidebar.Items>
  
    </Sidebar>



  )
}
