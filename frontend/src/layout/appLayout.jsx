
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../UI/Header'
import Footer from '../UI/Footer'
import { useEffect } from 'react'

const AppLayout = () => {
  const location = useLocation()
 
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout
