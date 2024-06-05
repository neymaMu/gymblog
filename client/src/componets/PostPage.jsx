import React, { useEffect, useState } from 'react'
import{Link, useParams} from 'react-router-dom'
import { Button, Spinner } from 'flowbite-react';
import ComentSection from './ComentSection';
import PostCard from './PostCard';
import{useSelector} from 'react-redux'
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
export default function PostPage() {
 
 const[loading,setLoading] = useState(true)
 const[error,setError] = useState(false)
 const[post,setPost] = useState(null)
 
    
 
 
 

 
 const { postSlug } = useParams();
 
 
 useEffect(() =>{
    fetchPost()
 },[postSlug])
 
   
   const fetchPost =async () =>{

    try{

      setLoading(true) 

      const res = await fetch(`https://gymblogg.onrender.com/api/post/getposts?slug=${postSlug}`)
      
      const data = await res.json()
      
      
      if(!res.ok){
        setError(true)
        setLoading(false)
      }
    
    
       if(res.ok){

      setPost(data.posts[0])
      setLoading(false)
      setError(false)
    
    }
    
    }
    catch(error){
        console.log(error)
        setError(true)
        setLoading(false)
    }
   }

 
 
 

  
  

  
  
  
  
  
  
  if(loading) return(

    <div className='flex items-center justify-center min-h-screen'>
     <Spinner size='xl'/>
    </div>
   )
 
  
  
  
   
   
  
   
        
   
   
   
   
   
   
   return (
          <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>


            <h1 className='text-3xl  p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{post && post.title}</h1>

          
              <Link to={`/search?categroy=${post && post.category}`} className='self-center '>
               <Button color='gray' pill size='xs'>

              {post && post.category}
               </Button>
               </Link>
          
          
           {post?.video ? <div className='mx-auto h-[40%] w-[50%] p-3'><Player autoPlay  loop   playsInline  fluid={false}width={480} height={272}   src={post.video}/></div> :<img src={post && post.image} alt={post && post.image} className=' mx-auto h-[20%] w-[30%] p-3 object-cover' />}
           
           
              <div className='flex justify-between border-b border-slate-300 mx-auto w-full max-w-2xl text-xs'>

             <span>{post && new Date(post.updatedAt).toLocaleDateString()}</span>
             <span className='italic'>{post && (post.content.length / 1000).toFixed(0)} mins Read</span>

              </div>
           
           
           <div className='p-3 max-w-2xl w-full mx-auto post-content' dangerouslySetInnerHTML={{__html: post && post.content}}>



           </div>
           
           
           
           <ComentSection postId={post._id} slug={post.slug}/>
           
           
                <div className='flex flex-col justify-center items-center mb-5'>
                  
                
              
              
          
           
           
           
              <div className=' '>


                <PostCard key={post._id} post={post} />
             
             
              </div>
              
              
                </div>




           
            </main>
 



)
}
