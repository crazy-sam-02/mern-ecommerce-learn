import React from "react";
import { Link } from "react-router-dom";
import {
  CircleUserRound,
  Heart,
  LogIn,
  Menu,
  ShoppingCart,
  Volleyball,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogoutUser } from "@/components/Store/Auth-slice";
import { useNavigate } from "react-router-dom";

function HeaderMenuItems() {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:flex-row lg:items-center gap-6 text-sm">
      
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Link
          key={menuItem.id}
          className="text-stone-300 font-semibold hover:text-white"
          to={menuItem.path}
        >
          {menuItem.label}
        </Link>
      ))}
    </nav>
  );
}

function RightHeaderContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.Auth,
  );

  function handleLogoutUser() {
    dispatch(LogoutUser());
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-6">
        <ShoppingCart
          onClick={() => navigate("/user/cart")}
          strokeWidth={2.5}
          size={20}
          className="cursor-pointer text-stone-300 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:text-white active:scale-95"
        />
        <Heart
          strokeWidth={2.5}
          size={20}
          className="cursor-pointer text-stone-300 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:text-red-400 active:scale-95"
        />
      </div>
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black cursor-pointer">
              <AvatarFallback className="bg-black text-white font-bold text-sm">
                {user?.username?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            align="end"
            className="w-48 bg-stone-900 text-stone-300 border border-stone-800 shadow-lg rounded mt-2"
          >
            <DropdownMenuLabel className="px-3 py-2 text-xs text-stone-400">
              Logged in as {user?.username}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-stone-800" />
            <DropdownMenuItem
              onClick={() => navigate("/user/dashboard")}
              className="px-3 py-2 hover:bg-stone-800 cursor-pointer"
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate("/user/order")}
              className="px-3 py-2 hover:bg-stone-800 cursor-pointer"
            >
              Orders
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate("/user/cart")}
              className="px-3 py-2 hover:bg-stone-800 cursor-pointer"
            >
              Cart
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-stone-800" />
            <DropdownMenuItem
              onClick={handleLogoutUser}
              className="px-3 py-2 hover:bg-stone-800 cursor-pointer"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={() => navigate("/auth/login")}
          variant="outline"
          size="sm"
        >
          Login
        </Button>
      )}
    </div>
  );
}
function UserHeader() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.Auth,
  );
  return (
    <header className="sticky top-0 z-40 w-full bg-stone-900 text-stone-300 border-b border-stone-800">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between gap-6">
          {/* Left: logo + mobile menu */}
          <div className="flex items-center gap-4">
            <Link to="/user/dashboard" className="flex items-center gap-2">
              <Volleyball size={28} className="text-white" />
              <span className=" font-bold text-white">E-Commerce</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Header Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs">
                <HeaderMenuItems />
                <RightHeaderContent />
              </SheetContent>
            </Sheet>
          </div>

          {/* Middle: nav (desktop) */}
          <div className="hidden lg:block">
            <HeaderMenuItems />
          </div>

          {/* Right: actions (desktop) */}
          <div className="hidden lg:flex">
            <RightHeaderContent />
          </div>
        </div>
      </div>
    </header>
  );
}

export default UserHeader;
