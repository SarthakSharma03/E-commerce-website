
import { motion } from "framer-motion";
import StatCard from "../components/StatCard";
import TeamCard from "../components/TeamCard";
import FeatureCard from "../components/FeatureCard";
import { GrDeliver } from "react-icons/gr";
import { FaHeadphones } from "react-icons/fa6";
import { SiMoneygram } from "react-icons/si";
import { HiUsers } from "react-icons/hi";
import { TbMoneybag } from "react-icons/tb";
import { BsCoin } from "react-icons/bs";
import { NavLink } from "react-router-dom";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const About = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto max-w-7xl px-6 py-12 overflow-hidden"
    >
     
      <motion.p variants={itemVariants} className="mb-10 text-sm text-gray-500">
        <span className="text-gray-400 hover:underline cursor-pointer"> <NavLink to='/home'>Home</NavLink></span> / <span className="text-black font-medium">About</span>
      </motion.p>

    
      <section className="grid gap-12 md:grid-cols-2 items-center mb-24">
        <motion.div variants={itemVariants} className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black">
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Launched in 2015, Exclusive is South Asia’s premier online shopping
            marketplace with an active presence in Bangladesh. Supported by a wide
            range of tailored marketing, data, and service solutions, Exclusive
            has 10,500 sellers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast pace. Exclusive offers a diverse assortment in categories
            ranging from consumer electronics to household goods, beauty, fashion,
            sports equipment, and groceries.
          </p>
        </motion.div>
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative h-100 md:h-125 w-full rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
            alt="Our Story"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </section>

      <motion.section variants={itemVariants} className="my-24">
        <div className="grid gap-6 m-auto sm:grid-cols-2 md:grid-cols-3 ">
        
          <StatCard
            icon={<BsCoin className="w-12 h-12" />}
            value="33k"
            label="Monthly Product Sale"
          
          />
          <StatCard
            icon={<HiUsers className="w-12 h-12" />}
            value="45.5k"
            label="Customer active on site"
          />
          <StatCard
            icon={<TbMoneybag className="w-12 h-12" />}
            value="25k"
            label="Anual gross sale in our site"
          />
        </div>
      </motion.section>

   
      <motion.section variants={itemVariants} className="my-24">
        <div className="text-center mb-12">
           <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
           <p className="text-gray-500 max-w-2xl mx-auto">
             The talented people behind the scenes making shopping easier for you.
           </p>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
            <TeamCard
              image="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
              name="Tom Cruise"
              role="Founder & Chairman"
            />
          </motion.div>
          <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
            <TeamCard
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
              name="Emma Watson"
              role="Managing Director"
            />
          </motion.div>
          <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
            <TeamCard
              image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop"
              name="Will Smith"
              role="Product Designer"
            />
          </motion.div>
        </div>
      </motion.section>

     
      <motion.section variants={itemVariants} className="grid gap-8 md:grid-cols-3 mb-12">
        <FeatureCard
          icon={<GrDeliver className="w-10 h-10" />}
          title="FREE AND FAST DELIVERY"
          description="Free delivery for all orders over $140"
        />
        <FeatureCard
          icon={<FaHeadphones className="w-10 h-10" />}
          title="24/7 CUSTOMER SERVICE"
          description="Friendly 24/7 customer support"
        />
        <FeatureCard
          icon={<SiMoneygram className="w-10 h-10" />}
          title="MONEY BACK GUARANTEE"
          description="We return money within 30 days"
        />
      </motion.section>
    </motion.div>
  );
};

export default About;
