import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';



function Card(props) {
    const navigate = useNavigate()
    const half = props.price.large;
    const [tprice, setTprice] = useState(half)
    const [ishalf, setishalf] = useState('large')

    const [quantity, setquantity] = useState(1)

    const obj = props.price
    const keys = Object.keys(obj);
    

    

    
    
    const pricehandle = (e) => {
        setTprice(e.target.value)
        if (tprice==half) {
            setishalf("medium")       
        }
        else{
            setishalf("large")
        
       } 
       
        

    }
    const handlequantity = (e) => {
        setquantity(e.target.value)


    }
    const total = tprice * quantity
    const payload = {
        name: props.foodname,
        description: props.description,
        price: {
            half: props.price.half,
            full: props.price.full
        },
        category: props.category,
        imageUrl: props.imagepath,
        quantity:quantity,
        amount:ishalf,
        total:total


    }
    const carthandler =  async()=>{
        let response = await fetch("https://foodapp-backend-l0u0.onrender.com/api/cartdata",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
              body : JSON.stringify({email:localStorage.getItem("email"),cartData:payload})
        })
        let checkout = await fetch("https://foodapp-backend-l0u0.onrender.com/api/checkout",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
              body : JSON.stringify({email:localStorage.getItem("email"),cartData:payload})
        })
        
        response = await response.json()
        if (response.success) {
           navigate("/")
           
            
        }
    }
  
   


    
    return (
        <div>
            <div className="bg-white shadow-md rounded p-6 md:w-96 md:h-96 ">
                <img src={props.imagepath} alt="Food Item" className="w-full h-48 object-cover rounded mb-4" />
                <h3 className="text-xl font-bold mb-2">{props.foodname}</h3>
                <p className="text-gray-700 font-semibold">{props.description}</p>

                <div className='flex flex-wrap justify-between items-center mt-2'>
                    <select onChange={handlequantity} className='bg-gray-500 font-bold text-xs' id="">
                        {Array.from(Array(6), (e, i) => (
                            <option value={i + 1} key={i + 1} >{i + 1}</option>
                        ))}
                    </select>
                    <select onChange={pricehandle} className='bg-gray-500 font-bold text-xs' name="" id="">
                        <option id="half" value={props.price.large}>{keys[0]}</option>
                        <option id="full" value={props.price.medium}>{keys[1]}</option>
                    </select>
                    <div className='inline text-sm'>Total price: US${total}</div>
                    <button onClick={carthandler} className='px-2 py-1 border-2 border-white rounded-md bg-sky-400 text-white'>Add to Cart</button>
                </div>

            </div>
        </div>
    )
}

export default Card
