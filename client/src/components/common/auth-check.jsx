import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function AuthCheck({ isAuthenticated, childern, user }) {
  const location = useLocation();

  if (!isAuthenticated && !(location.pathname.includes("/login") || location.pathname.includes("/register"))) {
    return <Navigate to="/auth/login" />
  }
  if (isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))) {
    if (user?.role == "admin") {
      return <Navigate to="/admin/dashboard" />
    }
    if (user?.role === "user") {
      return <Navigate to="/user/dashboard" />
    }
  }
  if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("/admin")) {
    return <Navigate to="/unauthpage" />
  }
  if (isAuthenticated && user?.role === "admin" && location.pathname.includes("/user")) {
    return <Navigate to="/unauthpage" />
  }
  return <>{childern}</>
}

export default AuthCheck