import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">

      {/* LEFT SIDE COMMON LAYOUT */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-black w-1/2 px-12">
        <h1 className="text-white text-4xl lg:text-6xl font-bold text-center">
          Welcome To E-Commerce Website
        </h1>
        <p className="text-gray-300 text-lg mt-4 text-center">
          Shop smarter. Shop faster. Shop better.
        </p>
      </div>

      {/* RIGHT SIDE LOGIN / REGISTER */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

    </div>
  );
}
