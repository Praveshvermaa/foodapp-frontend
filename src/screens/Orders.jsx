import React, { useEffect, useState } from 'react'

function About() {
  const [cartnoti,setcartnoti] =useState([])

  const dataload = async ()=>{
    let response  = await fetch("https://foodapp-backend-l0u0.onrender.com/api/findcheckout",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email:localStorage.getItem("email")})
    })
    response = await response.json()
    
    if (response.success) {
      setcartnoti(response.data)
    }

  }
  useEffect(()=>{
    dataload()
  },[])


  return (
    <div className='text-white pt-20  md:px-96  '>
      <div className='text--white text-center underline text-4xl  '>My orders</div>
      {
        cartnoti&& cartnoti.map((item)=>(
          <div className='mt-5'>
          <div className="bg-white shadow-md rounded p-6">
          <div className='text-black text-center'>{item.date.slice(0,10)}</div>
 
              <img src={item.imageUrl} alt="Food Item" className="w-full h-48 object-cover rounded mb-4" />
              <h3 className="text-xl font-bold mb-2 text-black">{item.name}</h3>
              <p className="text-gray-700 font-semibold">{item.description}</p>
 
              <div className='flex flex-wrap justify-between items-center mt-2'>
                 
                      <option className='bg-gray-500 font-bold px-2 py-1 ' value="">quantity:{item.quantity}</option>
 
                 
                      <option className='bg-gray-500 font-bold px-2 py-1 ' value="">{item.amount}</option>
                 
                  <div className='inline text-xl text-black '>Total price: US${item.total}</div>
                  
 
              </div>
             
 
          </div>
      </div>
        ))
      }
   
    {!cartnoti?<div className='text-xl font-bold text-white underline text-center'>The order box is empty!</div>:""}

  
  
   
  </div>
  )
}

export default About
