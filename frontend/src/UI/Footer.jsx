import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'

const footerLinks = [
  {
    title: 'Account',
    items: ['My Account', 'Login / Register', 'Cart', 'Wishlist', 'Shop'],
  },
  {
    title: 'Quick Link',
    items: ['Privacy Policy', 'Terms Of Use', 'FAQ', 'Contact'],
  },
]

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        <div>
          <h3 className="text-white text-lg font-semibold mb-4 hover:text-gray-200 cursor-pointer">Exclusive</h3>
          <p className="mb-2">Subscribe</p>
          <p className="text-sm mb-4">Get 10% off your first order</p>

          <div className="flex items-center border border-gray-500 rounded-md overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent px-3 py-2 text-sm w-full focus:outline-none"
            />
            <button className="px-3 text-white hover:text-gray-400 cursor-pointer">
              <MdKeyboardDoubleArrowRight />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
          <p className="text-sm mb-2  hover:text-gray-200 cursor-pointer hover:underline">111 Bijoy sarani, Dhaka,</p>
          <p className="text-sm mb-2 hover:text-gray-200 cursor-pointer hover:underline">DH 1515, Bangladesh.</p>
          <p className="text-sm mb-2 hover:text-gray-200 cursor-pointer hover:underline">exclusive@gmail.com</p>
          <p className="text-sm hover:text-gray-200 cursor-pointer hover:underline">+88015-88888-9999</p>
        </div>

        {footerLinks.map((section) => (
          <div key={section.title}>
            <h3 className="text-white text-lg font-semibold mb-4">{section.title}</h3>
            <ul className="space-y-2 text-sm">
              {section.items.map((item) => (
                <li key={item} className="hover:text-gray-200 cursor-pointer hover:underline">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Download App</h3>
          <p className="text-xs mb-3">Save $3 with App New User Only</p>

          <div className="flex gap-4 text-lg">
            <FaFacebookF className="hover:text-blue-400 cursor-pointer" />
            <FaTwitter  className="hover:text-gray-600 cursor-pointer"/>
            <FaInstagram className="hover:text-red-400 cursor-pointer" />
            <FaLinkedinIn  className="hover:text-white  cursor-pointer"/>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
        © Copyright Rimel 2022. All right reserved
      </div>
    </footer>
  )
}

export default Footer
