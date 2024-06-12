import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const [cartnoti, setcartnoti] = useState([])
  const navigate = useNavigate()

  const checkouthandler =  async()=>{
    let data = await fetch("https://foodapp-backend-l0u0.onrender.com/api/checkoutadd",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: localStorage.getItem("email")})
    })
    data = await data.json()
    if (data.success) {
      navigate("/")
      localStorage.setItem("boolean",true)
      
    }

  }
  const cartnotification = async () => {
    

    const data = await fetch("https://foodapp-backend-l0u0.onrender.com/api/cartnav", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: localStorage.getItem("email") })
    })
   const response = await data.json()
   console.log(response.data);
   
    if (response) {
      
      setcartnoti(response.data)
    }

  }
  
  useEffect(()=>{
    cartnotification()
    
  },[])
const removecart = async (itemid) =>{
  let response = await fetch("https://foodapp-backend-l0u0.onrender.com/api/removecart",{
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({email:localStorage.getItem("email"),id:itemid})
  })
  let checkout = await fetch("https://foodapp-backend-l0u0.onrender.com/api/removecartcheckout",{
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({email:localStorage.getItem("email"),id:itemid})
  })
  response = await response.json()
  if (response.success) {
    alert("food item removed from cart")
    navigate("/")
    
  }
 

}

  

  return (
    <div className='text-white pt-20  md:px-96  '>
      {cartnoti && cartnoti.map((item)=>(
         <div className='mt-5'>
         <div className="bg-white shadow-md rounded p-6">
             <img src={item.imageUrl} alt="Food Item" className="w-full h-48 object-cover rounded mb-4" />
             <h3 className="text-xl font-bold mb-2 text-black">{item.name}</h3>
             <p className="text-gray-700 font-semibold">{item.description}</p>

             <div className='flex flex-wrap justify-between items-center mt-2'>
                
                     <option className='bg-gray-500 font-bold px-2 py-1 ' value="">quantity:{item.quantity}</option>

                
                     <option className='bg-gray-500 font-bold px-2 py-1 ' value="">{item.amount}</option>
                
                 <div className='inline text-xl text-black '>Total price: US${item.total}</div>
                 <button onClick={()=>removecart(item._id)} className='px-2 py-1 border-2 border-white rounded-md bg-sky-400 text-white'> Remove from Cart</button>

             </div>
            

         </div>
     </div>
     

      ))
      
      
      }
      {!cartnoti?  <div className='text-xl font-bold text-white underline text-center'>The cart is empty!</div>:<div className='px-5 py-1 bg-sky-400 text-white text-center mt-5 cursor-pointer' onClick={checkouthandler}>checkout</div>}

    
    
     
    </div>
  )
}

export default Cart
