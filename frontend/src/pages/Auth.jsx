import { Outlet } from 'react-router-dom'
import image from '../images/login-bg.jpg'
const Auth = () => {
  return (
    <div className="w-full min-h-screen flex items-center">
      <div className="hidden md:block md:w-1/2 h-screen">
        <img
          src={image}
          alt="Authentication background picture "
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 flex justify-center px-6 py-10">
        <div className="w-full max-w-sm">
      <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Auth
