import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()


  const navigate = useNavigate();

 
  

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch("https://foodapp-backend-l0u0.onrender.com/login",{
         method:"POST",
         headers: {
            'Content-Type': 'application/json'
          },
         body:JSON.stringify({email: email,password: password})

       });
     
      const data = await response.json();
      console.log(data);

      if (data.success) {
        localStorage.setItem("email",email)
        localStorage.setItem("Token",data.user)
        navigate('/'); 
      }
      else if (!data) {
        alert("Register first")
        
      }
      else{
        alert("enter valid details")
      }
     
     
    } catch (error) {
      console.error('Error:', error);
      
    }
  };

  return (
    <div className="flex pt-28 justify-center items-center  flex-col h-auto bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white px-8 py-9 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">Login</button>
      </form>
      <h1 className=''> Account is created ?
        <Link to={'/register'} className='text-blue-800 text-xl font-bold underline mr-1'>Go Register</Link>
      </h1>
    </div>
  );
};

export default Login;
