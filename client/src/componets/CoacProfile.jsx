import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react'

import AddVideo from './AddVideo';
import { Player } from "video-react";
import 'video-react/dist/video-react.css';
import { useSelector } from 'react-redux';
import { RiUserFollowFill } from "react-icons/ri";
import { SlUserFollowing } from "react-icons/sl";
import DeletePost from './DeletePost';
import UserComents from './UserComents';
import LilePost from './LilePost';


const CoacProfile = ({user,post,setPost}) => {
 
  const[showmore ,setShowmore] = useState(true)
  const{currentUser} = useSelector(state => state.user)
 

  const[show,setShow] = useState(false)
 
 
  const handleshow = () => {
    setShow(!show)
    
   }
 
 

   const handleShowMore = async () => {
    const startIndex = post.length;
    try {
      const res = await fetch(
        `https://gymblogg.onrender.com/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setPost((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowmore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  
 












   return (
  
    <div className='flex gap-20 '>
  
 
 
 
  <div className='min-h-screen   w-40 flex flex-col gap-5 border border-r'>
 
 
    
    
    <div className='mt-10 space-y-4 '>

   
      <div className='flex flex-col items-center justify-center mt-[-20px] '>
       <h1 className='font-semibold'>@{user.username}</h1>
  
       <img src={user.profilePicture} className='h-20 w-20 rounded-full'/>
      
      </div>
 
      {currentUser?._id === user?._id   &&<Button onClick={handleshow} className='w-full' gradientDuoTone="purpleToBlue">
  <p className="cursor-pointer relative">Add Video</p>
 

 </Button>}
 {show && <AddVideo show={show} setShow={setShow}/>} 
  
  
  
  
  
  
 {currentUser?._id === user?._id && <Button className='w-full'  gradientDuoTone='purpleToPink'><Link to="/createpost">Create a Post</Link></Button>}
  
 
 
 
  

 {currentUser?._id == user?._id ?
 <p></p>:
 <div className='flex items-center gap-2 justify-center'>
 <SlUserFollowing size={24} className='font-bold' />
<p className='font-bold'> Following:{user?.following?.length}</p>
 </div>}
 
 
 {currentUser?._id == user?._id ?
 <p></p>:
 <div className='flex items-center gap-1 justify-center'>
 <RiUserFollowFill size={24} className='font-bold' />
<p className='font-bold '> Followers:{user?.followers?.length}</p>
 </div>}
 

 
 
  </div>
 

 
 
  </div>
 
 
 
 
 
  <div className='flex-1 min-h-screen p-3  ' >
  <div className='p-3 flex flex-col max-w-6xl gap-5 mx-auto min-h-screen'>

     

     
  {post.map((item) => (
  
 
<>
  {currentUser?._id === item?.userId && <DeletePost item={item} setPost={setPost}/>}
  
  
 
 
 <div className='group transition-all mx-auto mt-[-10px]  relative w-full h-[280px] border border-teal-500 hover:border-2 overflow-hidden rounded-lg sm:w-[430px]'>



  <Link to={`/post/${item.slug}`}>

{item.video ? <Player  playsInline fluid={false}  autoPlay muted loop width={480}height={200} src={item.video} /> :<img src={item.image}  className='h-[200px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20'/>}

 <div className='p-3 flex flex-col  '>
     <p className='font-bold text-lg line-clamp-2'>{item.title}</p>
     <span className='italic text-sm'>{item.category}</span>
    
   
   

      <Link to={`/post/${item.slug}`}
       className='z-10 group-hover:bottom-0 absolute 
       bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 
       hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'>
      Read More
      </Link>

 </div>



</Link>






 
 </div>
 

 <div className='flex   mt-[-20px] items-center justify-center gap-20 '>
 <div className=' z-10 font-bold '><UserComents item={item} /></div>

 <div className='z-10  flex '> <p><LilePost item={item} post={post} setPost={setPost}/></p><p>{item.numberOflikes}</p></div>
</div>
</>
))} 


   
  
   
 
   
   
   
   
   
   
   
  </div>
  
    <Button gradientDuoTone="purpleToPink" className='mx-auto w-30 bottom-[-15px] ' onClick={handleShowMore}>show more posts</Button>
</div>

 
  </div>
 





)
}

export default CoacProfile 


