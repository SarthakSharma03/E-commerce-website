
import { motion } from 'framer-motion';
import { FaGavel, FaCopyright, FaUserCheck, FaShoppingBag, FaCreditCard } from 'react-icons/fa';

const TermsOfUse = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-black py-12 px-8 text-center">
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Terms of Use
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 text-lg"
          >
            Please read these terms carefully before using our services.
          </motion.p>
        </div>

        <div className="p-8 md:p-12 space-y-12">
          <motion.section variants={itemVariants} className="flex gap-6">
            <div className="shrink-0 mt-1">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-xl">
                <FaGavel />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Exclusive (“we,” “us” or “our”), concerning your access to and use of the Exclusive website. By accessing the site, you agree that you have read, understood, and agreed to be bound by all of these Terms of Use.
              </p>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-xl">
                <FaCopyright />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed">
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us.
              </p>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="flex gap-6">
            <div className="shrink-0 mt-1">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-500 text-xl">
                <FaUserCheck />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Representations</h2>
              <p className="text-gray-600 leading-relaxed">
                By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Use.
              </p>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="flex gap-6">
            <div className="shrink-0 mt-1">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 text-xl">
                <FaShoppingBag />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Products</h2>
              <p className="text-gray-600 leading-relaxed">
                We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors.
              </p>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="flex gap-6">
            <div className="shrink-0 mt-1">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 text-xl">
                <FaCreditCard />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Purchases and Payment</h2>
              <p className="text-gray-600 leading-relaxed">
                We accept various forms of payment. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site. You further agree to promptly update your account and payment information, including email address, payment method, and payment card expiration date.
              </p>
            </div>
          </motion.section>
        </div>

        <div className="bg-gray-50 p-8 text-center border-t border-gray-100">
          <p className="text-gray-500">
            Questions regarding these Terms of Use? Contact us at{' '}
            <a href="#" className="text-black font-semibold hover:underline">
              exclusive@gmail.com
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsOfUse;
