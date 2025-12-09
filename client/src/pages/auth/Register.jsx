import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {
 const[data,Setdata] = useState({
  name:"",
  email:"",
  password:"",
  role:"",
 })

 const HandleInput =(event)=>{
  const [name,value]=event.target;
  Setdata((prev)=>({...prev,[name]:value}))
 }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className=' mb-2'>
      <div >
        <h2 className='text-2xl font-bold text-center mb-4'>Register</h2>
      </div>
      <form onSubmit={handleSubmit} className='space-y-4 border-2 border-gray-200 rounded-lg'>
        <div className='flex flex-col m-6'>

          <div className='mb-2 flex justify-around align-items'>
            <label htmlFor="name" className="mb-1">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder='Enter the Name'
              value={data.name}
              onChange={HandleInput}
              className=' rounded-md border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
            />
          </div>

          <div className=' mb-2 flex justify-around align-items '>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder='Enter The Email Address'
              value={data.email}
              onChange={HandleInput}
              className='border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
            />
          </div>

          <div className='mb-2 flex justify-around align-items '>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder='Enter The Password'
              value={data.password}
              onChange={HandleInput}
              className='border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
            />
          </div>

          <button type="submit" className='text-white rounded-md py-2 bg-green-500 text-center '>Sign up</button>
          <Link className='text-white  bg-red-600 text-center py-2 mt-2 rounded-md hover:bg-red-800 transition' to="/auth/login">Already Have Account ? Login </Link>

        </div>
      </form>
    </div>

  );
}

export default Register;
