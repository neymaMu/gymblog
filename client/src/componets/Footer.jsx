import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram ,FaGithubSquare} from "react-icons/fa";



export default function FooterCo() {
  return (
  
  
  <Footer container className='border border-t-8 border-teal-500'  >
   
   <div className='w-full max-w-7xl mx-auto'>


    <div className='grid w-full justify-between sm:flex md:grid-cols-1'>

   <div >

    <Link to="/" className='slef-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
    
    <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 rounded-lg text-white'>Fitness</span>
    
    blog
    </Link>
  
   </div>


     <div className='grid grid-cols-2 mt-6 gap-3  sm:grid-cols-3 sm:gap-6'>
     
     <div>
   
     <Footer.Title title='About' />
     
     <Footer.LinkGroup col>

    <Footer.Link href=''>
     My Project
    </Footer.Link>

    
    <Footer.Link href='/about'>
       About
    </Footer.Link>
    
    
     </Footer.LinkGroup>
   
   
      </div>




      <div>
   
   <Footer.Title title='flow us' />
   
   <Footer.LinkGroup col>

  <Footer.Link href=''>
   Github
  </Footer.Link>

  
  <Footer.Link href='/#'>
  Discord
  </Footer.Link>
  
  
   </Footer.LinkGroup>
 
 
    </div>


    <div>
   
   <Footer.Title title='Legal' />
   
   <Footer.LinkGroup col>

  <Footer.Link href=''>
   Privecy && policy
  </Footer.Link>

  
  <Footer.Link href=''>
   terms && condition
  </Footer.Link>
    
    
    
     </Footer.LinkGroup>
 
 
    </div>
     </div>
  
  
  
     </div>
   
   <Footer.Divider/>
     
     <div className='w-full sm:flex sm:items-center sm:justify-between'>
    <Footer.Copyright by="Fitness Club" year={new Date().getFullYear()}/>
     
      <div className='flex sm:justify-center gap-6 mt-6 sm:mt-0'>

        <Footer.Icon href='#' icon={FaFacebook} />
     
        <Footer.Icon href='#' icon={FaInstagram} />
     
        <Footer.Icon href='#' icon={FaGithubSquare} />
      </div>




     </div>
    
     </div>


    </Footer>
  )
}
