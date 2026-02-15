import React from "react";
import { useLocation, Navigate } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, isLoading, children }) {
  const location = useLocation();


  if (isLoading || isAuthenticated === null) {
    return null;
  }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("login") ||
      location.pathname.includes("register")
    )
  ) {
    return <Navigate to={"/auth/login"} />;
  }
  if (
    isAuthenticated &&
    (location.pathname.includes("register") ||
      location.pathname.includes("login"))
  ) {
    if (user?.role == "admin") {
      return <Navigate to={"/admin/dashboard"} />;
    } else {
      return <Navigate to={"/user/dashboard"} />;
    }
  }
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to={"/unauth-page"} />;
  }

  if (
    isAuthenticated &&
    user?.role !== "user" &&
    location.pathname.includes("user")
  ) {
    return <Navigate to={"/admin/dashboard"} />;
  }
  return <>{children}</>;
}

export default CheckAuth;
