import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Api from '../service/Api'
import ProfileSidebar from '../components/profile/ProfileSidebar'
import ProfileForm from '../components/profile/ProfileForm'
import MyOrders from '../components/profile/MyOrders'

const UserProfile = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'profile'
  
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  })
  
  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const data = await Api.getMe()
        if (mounted && data) {
          setUser({
            name: data.name || '',
            email: data.email || '',
            address: data.address || '',
            phone: data.phone || ''
          })
        }
      } catch (error) {
        console.error('Failed to fetch profile', error)
        if (error.message.includes('401')) navigate('/auth/login')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [navigate])
  
  const handleUserUpdate = (updatedData) => {
      setUser(prev => ({...prev, ...updatedData}));
  }

  if (loading) return <div className="p-10 text-center">Loading...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:px-10">
      <div className="flex justify-between items-center mb-10">
        <div className="text-sm text-gray-500">
          Home / <span className="text-black">My Account</span>
        </div>
        <div>
          Welcome! <span className="text-red-500">{user.name}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-10 md:gap-20">
        <ProfileSidebar active={activeTab} />

        <div className="w-full md:w-3/4 shadow-sm p-6 md:p-10 border border-gray-100 rounded-sm">
          {activeTab === 'profile' && <ProfileForm user={user} onUserUpdate={handleUserUpdate} />}
          {activeTab === 'orders' && <MyOrders />}
          {activeTab !== 'profile' && activeTab !== 'orders' && (
             <div className="text-center text-gray-500">
               Coming Soon
             </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
