import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate()
 
  return (
    <div className='flex flex-wrap justify-between px-10 items-center bg-slate-900 text-white w-full h-16 mt-10'>
{localStorage.getItem("Token")? <div className='flex items-center space-x-4'>
        <Link to="/" className='font-bold text-white hover:text-orange-500'>
          Home
        </Link>
        <Link to="/order" className='font-bold text-white hover:text-orange-500'>
          My order
        </Link>
        <Link to="/cart" className='font-bold text-white hover:text-orange-500'>
          cart
        </Link>
      </div>:<Link className='font-bold underline text-xl text-blue-600' to={'/login'}>login</Link>}
      <div className='text-sm'>
        © 2024 food app. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
