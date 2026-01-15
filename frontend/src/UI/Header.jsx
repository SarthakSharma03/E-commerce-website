import { useState } from 'react'
import { CiHeart } from 'react-icons/ci'
import { MdOutlineShoppingCart, MdMenu, MdClose, MdLogout, MdPersonOutline, MdStarOutline } from 'react-icons/md'
import { PiSignInBold } from 'react-icons/pi'
import { FiUser } from 'react-icons/fi'
import { NavLink, useNavigate } from 'react-router-dom'
import Api from '../service/Api'
import { useAuth } from '../context/useAuth'
import { useCart } from '../context/useCart'

const navLinks = [
  { label: 'Home', to: '/home' },
  { label: 'Contact', to: '/contactUs' },
  { label: 'About', to: '/about' },
  { label: 'Explore', to: '/explore' },
]

const linkClassName = ({ isActive }) =>
  `cursor-pointer pb-1 transition-colors hover:text-black hover:border-b hover:border-gray-400 ${isActive ? 'text-black border-b border-gray-400' : 'text-black'}`
 
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const { totalItems } = useCart()

  const isAdmin = user?.role === 'admin'

  const handleLogout = async () => {
    await Api.logout().catch(() => null)
    await logout()
    navigate('/auth/login')
  }

  return (
    <header className="w-full  z-50 font-sans pt-3.5 sticky top-0  bg-white ">
     
  
      <nav className="w-full border-b border-gray-200 pt-4 pb-4">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-12">
          
            <div className="text-2xl font-bold tracking-wide">
              <NavLink to="/home">Exclusive</NavLink>
            </div>

         
            <ul className="hidden md:flex items-center space-x-12 text-base font-normal text-black">
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


            <div className="flex items-center space-x-6">
              <div className="flex items-center gap-4 relative">
                <NavLink to="/wishlist" className="cursor-pointer hover:bg-gray-100 p-1 rounded-full transition-colors">
                  <CiHeart className="w-6 h-6 text-black" />
                </NavLink>

                <NavLink to="/cartManage" className="cursor-pointer hover:bg-gray-100 p-1 rounded-full transition-colors relative" >
                  <MdOutlineShoppingCart className="w-6 h-6 text-black" />
                   {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </NavLink>
                
                {isAuthenticated ? (
                   <div className="relative">
                      <button 
                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                        className={`cursor-pointer p-1 rounded-full transition-colors ${isUserDropdownOpen ? 'bg-red-500 text-white' : 'hover:bg-gray-100 text-black'}`}
                      >
                        <FiUser className="w-6 h-6" />
                      </button>

                      {isUserDropdownOpen && (
                        <div className="absolute right-0 top-full mt-2 w-56 bg-black/40 backdrop-blur-md rounded shadow-lg p-4 z-50 text-white flex flex-col gap-3">
                           <NavLink to="/userProfile" className="flex items-center gap-3 hover:text-gray-300 text-sm" onClick={() => setIsUserDropdownOpen(false)}>
                              <MdPersonOutline size={20} /> Manage My Account
                           </NavLink>
                           <div className="flex items-center gap-3 hover:text-gray-300 text-sm cursor-pointer">
                             <NavLink to="/MyOrders" className="flex items-center gap-3 hover:text-gray-300 text-sm" onClick={() => setIsUserDropdownOpen(false)}>
                             <MdOutlineShoppingCart size={20} /> My Order
                             </NavLink>
                             
                    
                         
                           </div>
                           <div className="flex items-center gap-3 hover:text-gray-300 text-sm cursor-pointer">
                              <MdClose size={20} /> My Cancellations
                           </div>
                           <div className="flex items-center gap-3 hover:text-gray-300 text-sm cursor-pointer">
                              <MdStarOutline size={20} /> My Reviews
                           </div>
                           <div className="flex items-center gap-3 hover:text-gray-300 text-sm cursor-pointer" onClick={handleLogout}>
                              <MdLogout size={20} /> Logout
                           </div>
                        </div>
                      )}
                   </div>
                ) : (
                  <NavLink to="/auth/login" className="cursor-pointer hover:bg-gray-100 p-1 rounded-full transition-colors" >
                    <PiSignInBold className="w-6 h-6 text-black" />
                  </NavLink>
                )}
              </div>
              
             
              <button 
                className="md:hidden text-2xl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <MdClose /> : <MdMenu />}
              </button>
            </div>
          </div>
        </div>

    
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg py-4 px-6 flex flex-col gap-4 z-50">
            <ul className="flex flex-col gap-4 text-base font-medium">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink 
                    to={link.to} 
                    className={({ isActive }) => 
                      `block w-full py-2 ${isActive ? 'text-red-500 font-semibold' : 'text-black'}`
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
                      `block w-full py-2 ${isActive ? 'text-red-500 font-semibold' : 'text-black'}`
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
                       `block w-full py-2 ${isActive ? 'text-red-500 font-semibold' : 'text-black'}`
                     }
                     onClick={() => setIsMenuOpen(false)}
                   >
                     My Account
                   </NavLink>
                 </li>
               )}
            </ul>
        
             {isAuthenticated && (
                <button onClick={handleLogout} className="text-left text-red-500 font-medium">Logout</button>
             )}
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
