import React, { useEffect, useState } from 'react'

import Card from '../components/Card'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [fooditem,setFooditem] = useState([])
    const [categoryfood, setCategoryfood] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate()

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  

    const dataload = async ()=>{
        let data = await fetch("https://foodapp-backend-l0u0.onrender.com/api/findfooditem")
        let response = await fetch("https://foodapp-backend-l0u0.onrender.com/api/findfoodcategoryitem")
        response = await response.json()
        data = await data.json()
        setFooditem(data)
        setCategoryfood(response)
        
    }
    useEffect(()=>{
        if (localStorage.getItem("Token")) {
            dataload()
        }
       else{
        navigate("/login")

       }
        
    },[])
    
    return (
        <div>
          <div className="flex items-center justify-center pt-28 mt-8">
      <input
        type="search"
        placeholder="Enter your search term..."
        value={searchTerm}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-l focus:outline-none focus:border-blue-500"
      />
     
    </div>
            
            <main className="container mt-auto py-10">
                <section className="text-center mb-10">
                    <h2 className="text-4xl font-bold mb-4 text-white">Delicious Food Delivered To You</h2>
                </section>
               
                <section className="grid grid-cols-1   md:grid-cols-3 gap-6">
                    {
                       categoryfood&&categoryfood.map((item)=>(
                        <div key={item._id}className=''>
                            <p className=' text-sky-400 text-center fond-bold text-xl underline p-3'>{item.category}</p>
               <div className=''>
               {fooditem&&fooditem.filter((fooditem)=>((item.category===fooditem.category)&&(fooditem.name.toLowerCase().includes(searchTerm.toLowerCase())))).map((food)=>(
                                <div className='' key={food._id}><Card foodname={food.name} description={food.description} imagepath={food.imageUrl} price={food.price} category={item.category}/>
                                <br/>
                                </div>
                            ))}
               </div>
                        </div>
                       ))
                    }

               
                </section>
            </main>
        </div>
    )
}

export default Home
