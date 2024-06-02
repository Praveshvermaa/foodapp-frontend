import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'


function Layout() {
  const navigate = useNavigate()
  
  return (
    <div className='w-full min-h-screen bg-zinc-800'>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout
