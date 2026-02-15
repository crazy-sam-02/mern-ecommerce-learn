import { User } from 'lucide-react'
import React from 'react'
import UserHeader from './UserHeader'
import UserFooter from '@/components/User/Userfooter.jsx'
import { Outlet } from 'react-router-dom'


function UserLayout() {
  return (
    <div className='flex w-full min-h-screen flex-col'>
      <UserHeader/>
      <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
        <Outlet/>
      </main>
      <div>
      <UserFooter/>
      </div>
      
    </div>  
  )
}

export default UserLayout