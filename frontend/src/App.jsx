import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppLayout from './layout/appLayout'
import Auth from './pages/Auth'
import LoginForm from './pages/auth/LoginForm'
import SignupForm from './pages/auth/SignupForm'
import ForgetPasswordForm from './pages/auth/ForgetPasswordForm.jsx';
import CartManage from './pages/CartManage'
import ContactUs from './pages/ContactUs'
import Home from './pages/Home'
import Payment from './pages/Payment'
import Products from './pages/Products'
import UserProfile from './pages/UserProfile'
import Wishlist from './pages/Wishlist'
import About from './pages/About'
import ProductDetails from './pages/ProductDetails'
import Explore from './pages/Explore'
import Checkout from './pages/Checkout'
import MyOrders from './components/profile/MyOrders.jsx';
import OrderSuccess from './pages/OrderSuccess'
import Error from './pages/Error'

import { RequireAuth, GuestOnly } from './hoc/withAuth.jsx'
import { RequireAdmin } from './hoc/withAdmin.jsx';
import AdminLayout from './layout/AdminLayout.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminSignup from './pages/admin/AdminSignup.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import ProductForm from './pages/admin/ProductForm.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    errorElement: <Error />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      {
        path: 'auth',
        element: <GuestOnly><Auth /></GuestOnly>,
        children: [
          { index: true, element: <Navigate to="login" replace /> },
          { path: 'login', element: <LoginForm /> },
          { path: 'signup', element: <SignupForm /> },
          { path: 'forget-password', element: <ForgetPasswordForm />}
        ]
      },
      { path: 'cartManage', element: <RequireAuth><CartManage /></RequireAuth> },
      { path: 'checkout', element: <RequireAuth><Checkout /></RequireAuth> },
      { path: 'payment', element: <RequireAuth><Payment /></RequireAuth> },
      { path: 'order-success/:id', element: <RequireAuth><OrderSuccess /></RequireAuth> },
      { path: 'contactUs', Component: ContactUs },
      { path: 'home', Component: Home },
      { path: 'products', Component: Products },
      { path: 'product/:id', Component: ProductDetails },
      { path: 'explore', Component: Explore },
      { path: 'userProfile', element: <RequireAuth><UserProfile /></RequireAuth> },
      { path: 'Myorders', element:<RequireAuth><MyOrders /></RequireAuth>},
      { path: 'wishlist', element: <RequireAuth><Wishlist /></RequireAuth> },
      { path: 'about', Component: About },
      { path: '*', element: <Error title="404 Not Found" message="The page you are looking for does not exist." /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />, // Layout for admin pages
    children: [
      { index: true, element: <Navigate to="products/add" replace /> },
      { path: 'login', element: <AdminLogin /> },
      { path: 'signup', element: <AdminSignup /> },
      { 
        path: 'dashboard', 
        element: <RequireAdmin><Dashboard /></RequireAdmin> 
      },
      { 
        path: 'products/add', 
        element: <RequireAdmin><ProductForm /></RequireAdmin> 
      },
      { 
        path: 'products/edit/:id', 
        element: <RequireAdmin><ProductForm /></RequireAdmin> 
      },
    ]
  }
])

const App = () => (
  <>
    <RouterProvider router={router} />
    <ToastContainer position="bottom-right" autoClose={2000} />
  </>
)

export default App
