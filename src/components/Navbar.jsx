import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'



function Navbar() {
  const [cartnoti, setcartnoti] = useState([])
  
  const navigate = useNavigate()
  let data;
 
  

  const cartnotification = async () => {
     data = await fetch("https://foodapp-backend-l0u0.onrender.com/api/cartnav", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: localStorage.getItem("email") })
    })
   const response = await data.json()
   
    if (response) {
      
      setcartnoti(response.data)
    }

  }
  

  useEffect(() => {
    if (localStorage.getItem("Token")) {

      navigate("/")
    }
    else {
      navigate("/login")
    }
    
  }, [])
  useEffect(()=>{
    cartnotification()
  },[data])
  
  
  const logouthandle = () => {
    localStorage.removeItem("Token")
    localStorage.removeItem("email")
    navigate("/login")
  }
  
  return (
    <div>
      <div className='flex flex-wrap justify-between fixed top-0 items-center bg-slate-900 text-white w-full  h-16 md:h-16'>
        <div className='w-10 h-10 overflow-hidden rounded-sm block'>
          <img className='w-full h-full object-cover' src="https://th.bing.com/th/id/OIP.C7GAGLkPmkvC57HiEVNLHAAAAA?rs=1&pid=ImgDetMain" alt="logo" />
        </div>
        {
          localStorage.getItem("Token") ? <div className='flex flex-wrap justify-between items-center md:gap-48 '>
            <NavLink to={'/'} className={({ isActive }) => isActive ? "text-red-600 font-bold mr-3" : "font-bold text-white"}>Home</NavLink>
            <NavLink to={'/order'} className={({ isActive }) => isActive ? "text-red-600 font-bold mr-3" : "font-bold text-white "}>My orders</NavLink>

            <NavLink to={'/cart'} className={({ isActive }) => isActive ? "font-bold text-white px-2 py-1 border-2 rounded-lg bg-sky-400 mr-1" : "font-bold text-white px-2 py-1 border-2 rounded-lg bg-sky-400 mr-1"}>
              Cart

             

            </NavLink>
            <button onClick={logouthandle} className='border-2 px-2 py-1 rounded-lg bg-sky-400 font-bold '>
              Logout
            </button>
          </div> : <div>
            <Link className='font-bold text-white px-2 py-1 border-2 rounded-lg bg-sky-400 mr-1' to={"/login"}>Login</Link>
            <Link className='font-bold text-white px-2 py-1 border-2 rounded-lg bg-sky-400 mr-1' to={"/register"}>Singup</Link>

          </div>
        }

      </div>
    </div>
  )
}

export default Navbar
