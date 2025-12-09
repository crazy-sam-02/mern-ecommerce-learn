import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Login() {
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")

  const handleSubmit=()=>{
    
  }
  return (
    <div className='w-full mb-2'>
      <div className='flex items-center text-center justify-around mb-6'>
        LOGIN
      </div>
      <form className=' space-y-4 border-2 border-gray-300 rounded-lg p-6'>
        <div className='flex justify-around items-center'> 
          <label htmlFor="email">Email</label>
          <input type="email"
          value={email}
          onChange={()=>(setEmail(value))}
          className="border-2 rounded-md focus:outline-none px-3 py-2 focus:ring-2 focus:ring-green-400"
          placeholder='Enter the registered Email' 
          />
        </div>
        <div className='flex justify-around items-center'>
          <label htmlFor="password">Password</label>
          <input type="password" 
          placeholder='Enter the Password'
          className='border-2 border-gray-300 rounded-md focus:outline-none ms-2 px-3 py-2 focus:outline-ring-2 focus:ring-green-400'
          value={password}
          />
        </div>
        <div className='grid grid-cols-1 align-center mb-4'>
          <button className='bg-green-500 text-white mb-2 px-16 py-2 rounded-md text-center'>login</button>
          <Link className='bg-blue-500 text-white mb-1 px-16 py-2 rounded-md text-center '> Don't Have A Account , Create it!</Link>
        </div>
      </form>
    </div>
  )
}

export default Login