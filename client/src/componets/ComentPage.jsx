import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { AiFillLike } from "react-icons/ai";
import{useSelector } from 'react-redux'
import{Button, Textarea} from 'flowbite-react'



export default function ComentPage({comen,onLike,onEdit,onDelete}) {
 
   const[user,setUser] = useState({})
   
   const[isEditing,setIsEditing] = useState(false)
   
   const[editContent,setEditContent] = useState(comen.content)
 
 
 const{currentUser} = useSelector((state) => state.user)
 
 
 
 useEffect(() => {
getUsers()

 },[comen])
 
 
 const getUsers = async() => {
    try{
  
        const res = await fetch(`https://gymblogg.onrender.com/api/user/${comen.userId}`)

        const data = await res.json() 
       
        if(res.ok){
         setUser(data)
        }

     }
    catch(error){
        console.log(error)
    }
 }
 

 
 const handleEdit =async () => {
   setIsEditing(true)
   setEditContent(comen.content)

 }
 
     
 
 
 const handlesave = async() => {

  try{
  const res = await fetch(`https://gymblogg.onrender.com/api/coment/editcoment/${comen._id}`,{
    credentials: "include",
  method:"PUT",
  
    headers:{
     
      "Content-Type" : "application/json"
    },
    body:JSON.stringify({
      content:editContent
    })
    })

   if(res.ok){
    setIsEditing(false)
    onEdit(comen,editContent)

   }
  }
  catch(error){
    console.log(error)
  }
 }
 
 
 
 
 
   return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
    
    <div className='flex-shrink-0 mr-3'>

        <img className='w-10 h-10 rounded-full bg-gray-200' src={user.profilePicture} />
    </div>

      <div className='flex-1'>
       <div className='flex items-center mb-1'>
        <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user.username}` : `anonymouse`}</span>
      
       <span className='text-gray-500 text-sm'>
       {moment(comen.createdAt).fromNow()}
       </span>
     
       </div>
     
       
       {isEditing ?
       
       <>
       <Textarea className="mb-2"
        value={editContent}
        onChange={(e) =>setEditContent(e.target.value)}/>
       
        <div className='flex justify-end text-xs gap-2'>
        <Button onClick={handlesave} type="button" size='sm' gradientDuoTone='purpleToBlue'>save</Button>
          
          <Button onClick={() => setIsEditing(false)} type="button" size='sm' gradientDuoTone='purpleToBlue'outline>cancel</Button>
         
        </div>
       
        </>
      
      
      : <> <p className='text-gray-500 pb-2'>{comen.content}</p>

      
<div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2' >
    
     <button type='button' onClick={() => onLike(comen._id)}>
     
    <AiFillLike className={`text-blue-500 text-lg hover:text-blue-900 ${currentUser &&comen.likes.includes(currentUser._id)&&`!text-red-500`}`} />
    
    
      </button>

     <p className='text-gray-400'>{comen.numberOflikes > 0 && comen.numberOflikes + " " + (comen.numberOflikes === 1 ? "like" : "likes")}</p>


     {currentUser && (currentUser._id === comen.userId || currentUser.isAdmin)  &&
      <>
      <button 
      onClick={handleEdit}
      type='button'
      className='text-gray-400 hover:text-red-500'>
        Edit
      </button>
      
      <button 
      onClick={() => onDelete(comen._id)}
      type='button'
      className='text-gray-400 hover:text-red-500'>
      Delete
      </button>
     
     
      </>
      }
</div>

  </>}
       
     
     
     
     
      </div>



    </div>
  )
}
