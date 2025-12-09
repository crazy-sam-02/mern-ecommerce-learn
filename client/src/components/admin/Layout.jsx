import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import AdminSideBar from './AdminSideBar'

export default function AdminLayout() {
  return (
    <div className='flex min-h-screen  w-full'>
        <AdminSideBar/>
        <div className='flex flex-1 flex-col'>
        <AdminHeader/>
            <main className='felx flex-col felx-1 bg-muted/40 p-4 md:p-6'>
              <Outlet/>
            </main>
        </div>
    </div>
  )
}
