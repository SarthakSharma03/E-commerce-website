import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShieldAlt, FaUserSecret, FaDatabase, FaLock, FaCookieBite, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const sections = [
  {
    id: 1,
    title: "Introduction",
    icon: <FaShieldAlt />,
    content: "Welcome to Exclusive. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you."
  },
  {
    id: 2,
    title: "Information We Collect",
    icon: <FaDatabase />,
    content: (
      <ul className="list-disc ml-6 space-y-2">
        <li><strong>Identity Data:</strong> First name, last name, username or similar identifier.</li>
        <li><strong>Contact Data:</strong> Billing address, delivery address, email address and telephone numbers.</li>
        <li><strong>Transaction Data:</strong> Details about payments and other details of products purchased.</li>
        <li><strong>Technical Data:</strong> IP address, login data, browser type and version, time zone setting.</li>
      </ul>
    )
  },
  {
    id: 3,
    title: "How We Use Your Data",
    icon: <FaUserSecret />,
    content: (
      <ul className="list-disc ml-6 space-y-2">
        <li>To perform the contract we are about to enter into or have entered into with you.</li>
        <li>Where it is necessary for our legitimate interests and your interests do not override those.</li>
        <li>Where we need to comply with a legal or regulatory obligation.</li>
      </ul>
    )
  },
  {
    id: 4,
    title: "Data Security",
    icon: <FaLock />,
    content: "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know."
  },
  {
    id: 5,
    title: "Cookies",
    icon: <FaCookieBite />,
    content: "We use cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site."
  }
];

const PrivacyPolicy = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last Updated: January 2026
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: section.id * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-red-500 text-xl">
                    {section.icon}
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {section.title}
                  </span>
                </div>
                {openSection === section.id ? (
                  <FaChevronUp className="text-gray-400" />
                ) : (
                  <FaChevronDown className="text-gray-400" />
                )}
              </button>
              
              <AnimatePresence>
                {openSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-100"
                  >
                    <div className="px-6 py-5 text-gray-600 leading-relaxed bg-gray-50/50">
                      {section.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center text-gray-500 text-sm"
        >
          <p>
            If you have any questions about this privacy policy, please contact us at{' '}
            <a href="#" className="text-red-500 hover:underline">
              exclusive@gmail.com
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
