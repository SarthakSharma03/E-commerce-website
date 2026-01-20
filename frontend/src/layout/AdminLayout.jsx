import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { MdDashboard, MdAddBox, MdLogout, MdMessage } from 'react-icons/md';
import { FaBox } from 'react-icons/fa';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">

      <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-red-500">Admin Panel</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-red-50 text-red-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <MdDashboard size={24} />
            <span className="font-medium">Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/products/add"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-red-50 text-red-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <MdAddBox size={24} />
            <span className="font-medium">Add Product</span>
          </NavLink>

       <NavLink
  to="/admin/orders"
  end={false}
  className={({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive
        ? 'bg-red-50 text-red-500'
        : 'text-gray-600 hover:bg-gray-50'
    }`
  }
>
  <FaBox size={24} />
  <span className="font-medium">Orders</span>
</NavLink>

          <NavLink
            to="/admin/messages"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-red-50 text-red-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <MdMessage size={24} />
            <span className="font-medium">Messages</span>
          </NavLink>

          <div className="mt-auto pt-6">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              <MdLogout size={24} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-red-500">Admin</h1>
          <button onClick={handleLogout} className="text-gray-600">
            <MdLogout size={24} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
