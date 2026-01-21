import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import {
  MdOutlineShoppingCart,
  MdMenu,
  MdClose,
  MdLogout,
  MdPersonOutline,
  MdStarOutline,
} from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { FiUser } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import Api from "../service/Api";
import { useAuth } from "../context/useAuth";
import { useCart } from "../context/useCart";

const navLinks = [
  { label: "Home", to: "/home" },
  { label: "Contact", to: "/contactUs" },
  { label: "About", to: "/about" },
  { label: "Explore", to: "/explore" },
];

const linkClassName = ({ isActive }) =>
  `relative cursor-pointer text-base font-medium transition-colors duration-300 hover:text-red-500 ${
    isActive ? "text-red-500 after:w-full" : "text-black after:w-0"
  } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();

  const isAdmin = user?.role === "admin";

  const handleLogout = async () => {
    await Api.logout().catch(() => null);
    await logout();
    navigate("/auth/login");
  };

  return (
    <header className="w-full z-50 font-sans sticky top-0 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300">
      <nav className="w-full py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="text-3xl font-extrabold tracking-wider">
              <NavLink to="/home" className="flex items-center gap-1">
                Exclusive
              </NavLink>
            </div>

            <ul className="hidden md:flex items-center space-x-10 text-base font-medium text-black">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} className={linkClassName}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
              {isAdmin && (
                <li>
                  <NavLink to="/admin" className={linkClassName}>
                    Admin
                  </NavLink>
                </li>
              )}
            </ul>

            <div className="flex items-center space-x-5">
              <div className="flex items-center gap-3 relative">
                <NavLink
                  to="/wishlist"
                  className={({ isActive }) =>
                    `relative p-2 rounded-full transition-all duration-300 ease-out
     flex items-center justify-center hover:bg-red-50
     ${
       isActive
         ? "text-red-500 bg-red-50"
         : "text-gray-700 hover:text-red-500"
     }`
                  }
                >
                  <CiHeart className="w-7 h-7" />
                </NavLink>

                <NavLink
                  to="/cartManage"
                  className={({ isActive }) =>
                    `relative p-2 rounded-full transition-all duration-300 ease-out
     flex items-center justify-center hover:bg-red-50
     ${
       isActive
         ? "text-red-500 bg-red-50"
         : "text-gray-700 hover:text-red-500"
     }`
                  }
                >
                  <MdOutlineShoppingCart className="w-7 h-7" />

                  {totalItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                      {totalItems}
                    </span>
                  )}
                </NavLink>

                {isAuthenticated ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className={`group relative p-2 rounded-full flex items-center justify-center
    transition-all duration-300 ease-out hover:bg-red-50
    ${
      isUserDropdownOpen
        ? "text-red-500 bg-red-50"
        : "text-gray-700 hover:text-red-500"
    }`}
                    >
                      <FiUser className="w-7 h-7" />
                    </button>

                    {isUserDropdownOpen && (
                      <div className="absolute right-0 top-full mt-3 w-60 bg-white/95 backdrop-blur-md border border-gray-100 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-2 z-50 text-gray-700 flex flex-col gap-1 transform origin-top-right transition-all duration-200">
                        <NavLink
                          to="/userProfile"
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 hover:text-red-500 rounded-lg text-sm font-medium transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <MdPersonOutline size={20} /> Manage My Account
                        </NavLink>
                        <div className="flex items-center gap-3 hover:text-gray-300 text-sm cursor-pointer">
                          <NavLink
                            to="/MyOrders"
                            className="flex items-center gap-3 px-4 py-2.5 w-full hover:bg-red-50 hover:text-red-500 rounded-lg text-sm font-medium transition-colors"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            <MdOutlineShoppingCart size={20} /> My Order
                          </NavLink>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 hover:text-red-500 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                          <MdClose size={20} /> My Cancellations
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 hover:text-red-500 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                          <MdStarOutline size={20} /> My Reviews
                        </div>
                        <div className="h-px bg-gray-100 my-1"></div>
                        <div
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 hover:text-red-500 rounded-lg text-sm font-medium transition-colors cursor-pointer text-red-500"
                          onClick={handleLogout}
                        >
                          <MdLogout size={20} /> Logout
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to="/auth/login"
                    className="cursor-pointer hover:bg-red-50 hover:text-red-500 p-2 rounded-full transition-all duration-300 text-gray-700"
                  >
                    <PiSignInBold className="w-7 h-7" />
                  </NavLink>
                )}
              </div>

              <button
                className="md:hidden text-3xl text-gray-700 hover:text-red-500 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <MdClose /> : <MdMenu />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg py-6 px-6 flex flex-col gap-6 z-50 animate-in slide-in-from-top-5 duration-200">
            <ul className="flex flex-col gap-4 text-base font-medium">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block w-full py-2 border-b border-gray-100 ${isActive ? "text-red-500 font-bold border-red-500" : "text-gray-700 hover:text-red-500"}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              {isAdmin && (
                <li>
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      `block w-full py-2 border-b border-gray-100 ${isActive ? "text-red-500 font-bold border-red-500" : "text-gray-700 hover:text-red-500"}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </NavLink>
                </li>
              )}
              {isAuthenticated && (
                <li>
                  <NavLink
                    to="/userProfile"
                    className={({ isActive }) =>
                      `block w-full py-2 border-b border-gray-100 ${isActive ? "text-red-500 font-bold border-red-500" : "text-gray-700 hover:text-red-500"}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Account
                  </NavLink>
                </li>
              )}
            </ul>

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 font-medium py-2"
              >
                <MdLogout size={20} /> Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
