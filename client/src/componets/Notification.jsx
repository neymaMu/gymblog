
import React from 'react'
import{useSelector } from 'react-redux'
import { RxCrossCircled } from "react-icons/rx";


const Notification = ({item,setNotify}) => {
  const{currentUser} = useSelector(state => state.user)
 
 
 
  const handleDeletUser = async() =>{

    try{
  
    const res = await fetch(`https://gymblogg.onrender.com/api/user/notifydelete/${item._id}/${currentUser._id}`,{
      credentials: "include",
    method:"DELETE"
    
  
  })
     
    
    const data = await res.json() 
  
  
   if(!res.ok){
    console.log(data.message)
   }else{
   
  
    setNotify((prev) => prev.filter((post) => post._id !== item._id))
  
  }
    
    }
    catch(error){
      console.log(error)
    }

    
    
    }
 
 
 
 
 
 
  return (
    



<div className="bg-blue-400 w-[200px]   flex flex-col items-start  top-12  rounded-lg p-4 ">
 
<div className='flex'>


<div>
<div className='flex   flex-col gap-1'>
{currentUser === item._id ? <h1>{item.me}</h1>:<h1 className='text-white '>@{item.subject}</h1>}
{item?.slug?.length > 20? <p className='text-gray-900 italic'>{item?.slug?.slice(0,20)+"..."}</p>:<p className='text-gray-900 italic'>{item?.slug}</p>}

</div>

<div>
{item?.content?.length > 20? <p>{item?.content?.slice(0,20)+"..."}</p> : <p>{item?.content}</p>}
</div>

 </div>
 <p onClick={handleDeletUser}><RxCrossCircled /></p>
 </div>

</div>





  )
}

export default Notification