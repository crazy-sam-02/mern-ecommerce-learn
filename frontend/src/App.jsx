import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/Auth/AuthLayout.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import DashBoard from "./pages/Admin/DashBoard.jsx";
import AdminLayout from "./components/Admin/AdminLayout.jsx";
import Order from "./pages/Admin/Order.jsx";
import AdminProducts from "./pages/Admin/Product.jsx";
import UserDashboard from "./pages/User/Dashboard.jsx";
import UserLayout from "./components/User/UserLayout.jsx";
import UserOrder from "./pages/User/Order.jsx";
import CheckOut from "./pages/User/CheckOut.jsx";
import UserCart from "./pages/User/Cart.jsx";
import CheckAuth from "./components/common/CheckAuth.jsx";
import { useDispatch, useSelector } from "react-redux";
import UnauthPage from "./pages/Unauth-page.jsx";
import { useEffect } from "react";
import { AuthMiddleware } from "./components/Store/Auth-slice/index.js";
import { Skeleton } from "@/components/ui/skeleton";
import Usershop from "./pages/User/shop.jsx";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.Auth,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthMiddleware());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="h-600 w-600 rounded-full" />;
  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <CheckAuth
            isAuthenticated={isAuthenticated}
            user={user}
            isLoading={isLoading}
          >
            <AuthLayout />
          </CheckAuth>
        }
      >
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route
        path="/admin"
        element={
          <CheckAuth
            isAuthenticated={isAuthenticated}
            user={user}
            isLoading={isLoading}
          >
            <AdminLayout />
          </CheckAuth>
        }
      >
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="order" element={<Order />} />
        <Route path="product" element={<AdminProducts />} />
      </Route>
      <Route
        path="/user"
        element={
          <CheckAuth
            isAuthenticated={isAuthenticated}
            user={user}
            isLoading={isLoading}
          >
            <UserLayout />
          </CheckAuth>
        }
      >
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="order" element={<UserOrder />} />
        <Route path="checkout" element={<CheckOut />} />
        <Route path="cart" element={<UserCart />} />
        <Route path="shop" element={<Usershop />} />
      </Route>
      {/* unauthorised access route */}
      <Route path="/unauth-page" element={<UnauthPage />} />
    </Routes>
  );
}

export default App;
