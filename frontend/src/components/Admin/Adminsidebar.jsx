
import { ChartNoAxesCombined, LayoutDashboard, ShoppingBasket } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";

const AdminSideBar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold text-foreground">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="relative flex w-64 flex-col gap-4 border-r bg-background p-6 shadow-xl transition-transform duration-300 ease-in-out">
            <div
              onClick={() => {
                navigate("/admin/dashboard");
                setOpen(false);
              }}
              className="flex cursor-pointer items-center gap-2"
            >
              <ChartNoAxesCombined size={30} />
              <h1 className="text-2xl font-extrabold text-foreground">Admin Panel</h1>
            </div>
            <MenuItems setOpen={setOpen} />
          </aside>
        </div>
      )}
    </Fragment>
  );
};

const MenuItems = ({ setOpen }) => {
  return (
    <div className="mt-8 flex flex-col gap-4">
      <Link
        onClick={() => setOpen?.(false)}
        className="flex items-center gap-2 rounded-md px-3 py-2  hover:bg-muted hover:text-foreground text-xl text-black-900 font-bold"
        to="/admin/dashboard"
      >
        <LayoutDashboard />
        Dashboard
      </Link>
      <Link
        onClick={() => setOpen?.(false)}
        className="flex items-center gap-2 rounded-md px-3 py-2  hover:bg-muted hover:text-foreground text-xl text-black-900 font-bold"
        to="/admin/product"
      >
        <ShoppingBasket />
        Products
      </Link>
      <Link
        onClick={() => setOpen?.(false)}
        className="flex items-center gap-2 rounded-md px-3 py-2  hover:bg-muted hover:text-foreground text-xl text-black-900 font-bold"
        to="/admin/order"
      >
        <ShoppingBasket />
        Orders
      </Link>
    </div>
  )
}

export default AdminSideBar;
