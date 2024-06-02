import React from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './screens/Home'
import Order from './screens/Orders'
import Cart from './screens/Cart'
import Register from './screens/Register'
import Login from './screens/Login'


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
        <Route path='' element={<Home/>}/>
        <Route path='order' element={<Order/>}/>
        <Route path='cart' element={<Cart/>} />
        <Route path='register' element={<Register/>}/>
        <Route path='login' element={<Login/>}/>

 
      </Route>
    )
  )
  return (
   <RouterProvider router={router} />
  )
}

export default App
