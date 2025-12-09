import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/AuthLayout.jsx'
import Layout from '../src/components/admin/Layout.jsx'
import AdminDashBoard from './pages/Admin/AdminDashBoard'
import AdminProducts from './pages/Admin/AdminProducts'
import AdminOrders from './pages/Admin/AdminOrders'
import AdminFeatures from './pages/Admin/AdminFeatures'
import UserLayout from './components/user/UserLayout'
import UserCart from './pages/user/UserCart'
import UserProducts from './pages/user/UserProducts'
import UserOrders from './pages/user/UserOrders'
import UserDashBoard from './pages/user/UserDashBoard'
import AuthCheck from './components/common/auth-check'
import UnAuthPage from './pages/auth/UnAuthPage'
function App() {

  const isAuthenticated = false;
  const user = null;

  return (
    <div>
      <Routes>

{/* Public Auth Routes */}
<Route path="/auth" element={<AuthLayout />}>
  <Route path="login" element={<Login />} />
  <Route path="register" element={<Register />} />
</Route>

{/* Protected Admin Routes */}
<Route path="/admin"
  element={
    <AuthCheck isAuthenticated={isAuthenticated} user={user}>
      <Layout />
    </AuthCheck>
  }
>
  <Route path="dashboard" element={<AdminDashBoard />} />
  <Route path="products" element={<AdminProducts />} />
  <Route path="orders" element={<AdminOrders />} />
  <Route path="features" element={<AdminFeatures />} />
</Route>

{/* Protected User Routes */}
<Route path="/user"
  element={
    <AuthCheck isAuthenticated={isAuthenticated} user={user}>
      <UserLayout />
    </AuthCheck>
  }
>
  <Route path="cart" element={<UserCart />} />
  <Route path="products" element={<UserProducts />} />
  <Route path="orders" element={<UserOrders />} />
  <Route path="dashboard" element={<UserDashBoard />} />
</Route>

<Route path="/unauthpage" element={<UnAuthPage />} />
</Routes>

    </div>
  )
}

export default App
