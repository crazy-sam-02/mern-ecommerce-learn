import React from 'react'
import UserSidebar from './UserSidebar.jsx'
import UserHeader from './UserHeader.jsx'
import { Outlet } from 'react-router-dom'

function UserLayout() {
  return (
    <div className='flex min-h-screen  w-full'>
    <UserSidebar/>
    <div className='flex flex-1 flex-col'>
    <UserHeader/>
        <main className='felx flex-col felx-1 bg-muted/40 p-4 md:p-6'>
          <Outlet/>
        </main>
    </div>
</div>
  )
}

export default UserLayout