import { NavLink } from 'react-router-dom';

const ProfileSidebar = ({ active }) => {
  const sidebarItems = [
    {
      title: 'Manage My Account',
      links: [
        { label: 'My Profile', to: '/userProfile?tab=profile', active: active === 'profile' || !active },
        { label: 'Address Book', to: '#', active: active === 'address' }, 
        { label: 'My Payment Options', to: '#', active: active === 'payment' } 
      ]
    },
    {
      title: 'My Orders',
      links: [
        { label: 'My Orders', to: '/userProfile?tab=orders', active: active === 'orders' },
        { label: 'My Returns', to: '#', active: active === 'returns' },
        { label: 'My Cancellations', to: '#', active: active === 'cancellations' }
      ]
    },
    {
      title: 'My WishList',
      links: []
    }
  ];

  return (
    <div className="w-full md:w-1/4 space-y-6">
      {sidebarItems.map((section, idx) => (
        <div key={idx}>
          <h3 className="font-medium mb-2 text-black">{section.title}</h3>
          {section.links.length > 0 && (
            <ul className="space-y-2 text-gray-500 ml-4 text-sm">
              {section.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <NavLink 
                    to={link.to} 
                    className={`${link.active ? 'text-red-500 font-medium' : 'hover:text-black'} cursor-pointer block transition-colors`}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProfileSidebar;
