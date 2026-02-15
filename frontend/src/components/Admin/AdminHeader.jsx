
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { LogoutUser } from "../Store/Auth-slice";

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(LogoutUser());
  };

  return (
    <header className="flex items-center justify-between border-b bg-background px-6 py-4">
      <button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </button>
      <div className="flex flex-1 justify-end">
        <button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <LogOut />
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;