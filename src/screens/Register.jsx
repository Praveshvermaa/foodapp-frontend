import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
 const [username, setUsername] = useState("")
 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")
 const [address, setAddress] = useState("")

 const navigate = useNavigate()

 

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://foodapp-backend-l0u0.onrender.com/register",{
         method:"POST",
         headers: {
            'Content-Type': 'application/json'
          },
         body:JSON.stringify({username,email,password,address})

       }
      )
      const data = await response.json()

      
      

      console.log(data.user);
      // Handle success (e.g., display a message or redirect)
    } catch (error) {
      console.error(error);
      // Handle error (e.g., display an error message)
    }
    navigate("/login")
  };

  return (
    <div className="flex justify-center flex-col items-center pt-28 h-auto bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"

            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">Register</button>
      </form>
      <h1 className=''>Already account exists ?
        <Link to={'/login'} className='text-blue-800 text-xl font-bold underline mr-1'>Go Login</Link>
      </h1>
    </div>
  );
};

export default Register;
