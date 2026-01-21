import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Account",
    links: [
      { name: "My Account", path: "/userProfile" },
      { name: "Login / Register", path: "/auth/login" },
      { name: "Cart", path: "/cartManage" },
      { name: "Wishlist", path: "/wishlist" },
      { name: "Shop", path: "/products" },
    ],
  },
  {
    title: "Quick Link",
    links: [
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "Terms Of Use", path: "/terms-of-use" },
      { name: "Return Policy", path: "/return-policy" },
      { name: "Contact", path: "/contactUs" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center lg:text-left place-items-center lg:place-items-start">
       
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
            <p className="text-sm mb-2 hover:text-gray-200 cursor-pointer">
              111 Bijoy sarani, Dhaka,
            </p>
            <p className="text-sm mb-2 hover:text-gray-200 cursor-pointer">
              DH 1515, Bangladesh.
            </p>
            <p className="text-sm mb-2 hover:text-gray-200 cursor-pointer">
              exclusive@gmail.com
            </p>
            <p className="text-sm hover:text-gray-200 cursor-pointer">
              +88015-88888-9999
            </p>
          </div>

       
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white text-lg font-semibold mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="hover:text-gray-200  hover:underline cursor-pointer transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

       
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Download App
            </h3>
            <p className="text-xs mb-4">
              Save $3 with App New User Only
            </p>

            <div className="flex justify-center lg:justify-start gap-4 text-lg">
              <FaFacebookF className="hover:text-blue-400 cursor-pointer transition-colors" />
              <FaTwitter className="hover:text-sky-400 cursor-pointer transition-colors" />
              <FaInstagram className="hover:text-pink-400 cursor-pointer transition-colors" />
              <FaLinkedinIn className="hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
        © Copyright Rimel 2022. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
