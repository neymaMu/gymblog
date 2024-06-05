import React from 'react'

import{Outlet,Navigate} from 'react-router-dom'
import{useSelector} from 'react-redux'
  

  export default function OnlyAdminRoute() {
    const{currentUser} = useSelector((state) => state.user)
   
   
    return currentUser.isAdmin || currentUser.isCo   ? <Outlet/> : <Navigate to="/signin" />
}
