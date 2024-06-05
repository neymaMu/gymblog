import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { Player } from "video-react";
import 'video-react/dist/video-react.css';
import { AiFillLike } from "react-icons/ai";
import{useSelector } from 'react-redux'


const FlowPage = ({item, flowuser, setFlowuser}) => {
  
  

   const[comments ,setComments] = useState([])
   
   const{currentUser} = useSelector(state => state.user)


   useEffect(() => {
       fetchComent()
     },[])  
    
    
    const fetchComent = async() => {
   
     try{
   
     const res = await fetch(`https://gymblogg.onrender.com/api/coment/getcomments/${item._id}`,{
      
    
    
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

   
    
   
    const handleLike = async () => {
      try {
       
        
        const res = await fetch(`https://gymblogg.onrender.com/api/post/likepost/${item._id}`,{
          credentials: "include",
        method:"PUT",
      },
      );
    
      if (!res.ok) {
       console.log('Bad fetch response')
      }
    
    
        if (res.ok) {
          const data = await res.json();
          
          setFlowuser(flowuser.map((comment) => comment._id === item._id ? {...comment,likes: data.likes,numberOflikes: data.likes.length,}
          : comment
        )
      )
        }
      } catch (error) {
        console.log(error.message);
      }
    };
     
   
   
   
   
   
   
   
   
   
   
   
    return (
  
  <>
     
      <div className='group transition-all mx-auto  relative w-full h-[320px] border border-teal-500 hover:border-2 overflow-hidden rounded-lg sm:w-[430px]'>

 
      <Link to={`/post/${item?.slug}`}>
      
         <div className='flex items-center gap-1'>
     
         <img src={item?.profilePicture} className='rounded-full h-10 w-10'/> 
      <h1 className='font-bold text-center'>@{item?.username} </h1>
  
    
      </div>
      
      {item?.video ? <Player  playsInline fluid={false}  autoPlay muted loop width={480}height={200} src={item?.video} />: <img src={item?.image}  className='h-[200px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20'/>}
       
       <div className='p-3 flex flex-col  gap-2'>
           <p className='font-bold text-lg line-clamp-2'>{item?.title}</p>
           <span className='italic text-sm'>{item?.category}</span>
      
            <Link to={`/post/${item?.slug}`}
             className='z-10 group-hover:bottom-0 absolute 
             bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 
             hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'>
            Read More
          
          
           </Link>
      
      
      
       </div>
     
     
    
   
      </Link>
       
  
     
     
          </div>
          <div className='w-full flex items-center justify-center gap-5 ml-[-140px] '>
          <div className='mt-[-20px] text-sm font-bold text-blue-500'>Comments: {comments.length} </div>
          <p className='mt-[-20px] flex items-center cursor-pointer'><p className={`cursor-pointer text-blue-500 text-lg hover:text-blue-900 ${currentUser &&item?.likes?.includes(currentUser._id)&&`!text-red-500`}`}><AiFillLike  onClick={handleLike}/></p><p>{item.numberOflikes}</p></p>
        
          </div>
        
      
           </>

  )
}

export default FlowPage