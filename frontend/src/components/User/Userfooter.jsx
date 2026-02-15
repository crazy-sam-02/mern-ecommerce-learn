import React from "react";
import { Link } from "react-router-dom";

function UserFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t bg-stone-900 text-stone-300">
      {/* Top: multi-column ecommerce-style links */}
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
              Shop
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="hover:text-white" to="/user/shop">
                  All Products
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/user/cart">
                  Cart
                </Link>
                <div> fuck you bitch  ,ass your dicka nd control you </div>
              </li>
              <li>
                <Link className="hover:text-white" to="/user/checkout">
                  Checkout
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
              Orders
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="hover:text-white" to="/user/order">
                  Order History
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/user/dashboard">
                  Account Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
              Customer Service
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="hover:text-white" href="#">
                  Help Center
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Payment Options
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                Credits:{" "}
                <a
                  className="underline hover:text-white"
                  href="https://prionex.dev"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Prionex
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom: brand bar */}
      <div className="border-t border-stone-800">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-stone-400">
            © {year} • All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <Link className="hover:text-white" to="/auth/login">
              Login
            </Link>
            <Link className="hover:text-white" to="/auth/register">
              Register
            </Link>
            <Link className="hover:text-white" to="/unauth-page">
              Unauth Page
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default UserFooter;
