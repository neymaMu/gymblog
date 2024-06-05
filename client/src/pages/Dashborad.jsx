import React, { useEffect, useState } from 'react'
import{useLocation} from 'react-router-dom'
import DashSidebar from '../componets/DashSidebar'
import DashProfile from '../componets/DashProfile'





import UserPosts from './UserPosts'



export default function Dashborad() {
 
 
 const location = useLocation()
 
 const[tab, setTab] = useState("")
 
 
 useEffect(() => {
   
  const urlParams = new URLSearchParams(location.search)
  const tabFormUrl = urlParams.get('tab')
    
  if(tabFormUrl){
    setTab(tabFormUrl)
  }
  },[location.search])
 
 
    
  
  return (
    <div className='min-h-screen  flex flex-col md:flex-row'>
 
    
     <div className='md:w-56  '>
      
      <DashSidebar/>
      
      </div> 




    <div>

    {tab === 'profile' && <DashProfile/>}
   
    
    {tab === 'user' && <UserPosts/>}
    
    
    
    </div>
    
    
    
      
      </div>
  )
}
