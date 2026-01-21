
import { motion } from 'framer-motion';
import { FaBoxOpen, FaShippingFast, FaExclamationTriangle, FaExchangeAlt, FaMoneyBillWave } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight"
          >
            RETURN <span className="text-red-500">POLICY</span>
          </motion.h1>
          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto"
          >
            Simple, transparent, and hassle-free returns. We want you to love what you ordered.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          <PolicyCard 
            icon={<FaBoxOpen />}
            title="30-Day Returns"
            description="You have 30 days after receiving your item to request a return. Item must be unworn, unused, with tags, and in original packaging."
            delay={0.1}
          />
          <PolicyCard 
            icon={<FaShippingFast />}
            title="How to Start"
            description="Contact us at exclusive@gmail.com. If accepted, we’ll send you a return shipping label and instructions."
            delay={0.2}
          />
          <PolicyCard 
            icon={<FaExclamationTriangle />}
            title="Damages & Issues"
            description="Inspect your order upon reception. Contact us immediately if the item is defective, damaged or if you receive the wrong item."
            delay={0.3}
          />
          <PolicyCard 
            icon={<FaExchangeAlt />}
            title="Exchanges"
            description="The fastest way to ensure you get what you want is to return the item you have, and once accepted, make a separate purchase."
            delay={0.4}
          />
          <PolicyCard 
            icon={<FaMoneyBillWave />}
            title="Refunds"
            description="We will notify you once we’ve received and inspected your return. If approved, you’ll be automatically refunded on your original payment method."
            delay={0.5}
          />
          <PolicyCard 
            icon={<FaExclamationTriangle />}
            title="Non-returnable Items"
            description="Perishable goods, custom products, personal care goods, hazardous materials, flammable liquids, or gases cannot be returned."
            delay={0.6}
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gray-900 rounded-3xl p-8 md:p-16 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Our customer support team is available 24/7 to help you with any issues regarding your returns or refunds.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-600 transition-colors shadow-lg cursor-pointer"
          >
            <NavLink to='/contactUs'>
            Contact Support
            </NavLink>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

const PolicyCard = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
    >
      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-red-500 text-2xl shadow-sm mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm">
        {description}
      </p>
    </motion.div>
  );
};

export default ReturnPolicy;
