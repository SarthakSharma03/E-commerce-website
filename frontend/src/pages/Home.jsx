import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection'
import SectionTitle from '../UI/SectionTitle'
import ProductCard from '../UI/ProductCard'
import Category from '../UI/Category'
import saleImage from '../images/sale-product.png'
import NewArrival from '../UI/NewArrival'
import FeatureCard from '../components/FeatureCard'
import { GrDeliver } from "react-icons/gr";
import { FaHeadphones } from "react-icons/fa6";
import { SiMoneygram } from "react-icons/si";
import Api from '../service/Api';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let didFetch = false;
    const controller = new AbortController();
    const fetchProducts = async () => {
      if (didFetch) return;
      didFetch = true;
      try {
        const res = await Api.getProducts({ limit: 12, signal: controller.signal });
        if (res?.data) {
          setProducts(res.data);
        }
      } catch (error) {
        if (error?.name !== 'AbortError') {
          console.error("Failed to fetch products", error);
        }
      }
    };
    fetchProducts();
    return () => controller.abort();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const bestSelling = products.slice(0, 4);
  const exploreProducts = products.slice(4, 8);

  return (
    <div className="overflow-hidden">
     
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeroSection />
      </motion.div>

   
      
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
        <SectionTitle eyebrow="This Month" title="Best Selling Products" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> 
          {bestSelling.map((p) => (
            <div key={p._id || p.id}>
              <ProductCard
                product={p}
                onAddToCart={() => addToCart(p)}
                onToggleProducts={() => handleProductClick(p._id || p.id)}
              />
           </div>
          ))}
        </div> 
      </div>
      
    
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <Category className='pb-6' />
      </motion.div>
      
    
      <motion.div 
        className='mx-auto max-w-7xl px-4 md:px-6 py-10'
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <img src={saleImage} alt="Sale" className="w-full object-cover rounded-lg shadow-sm" />
      </motion.div>
     
 {/* Explore Products Section */}
      <motion.div 
        className="mx-auto max-w-7xl px-4 md:px-6 py-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp}>
          <SectionTitle eyebrow="Our Products" title="Explore Our Products" />
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={staggerContainer}
        >
          {exploreProducts.map((p) => (
            <motion.div key={p._id || p.id} variants={fadeInUp}>
              <ProductCard
                product={p}
                onAddToCart={() => addToCart(p)}
                onToggleProducts={() => handleProductClick(p._id || p.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
     
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <NewArrival/>
      </motion.div>
      
     
      <motion.section 
        className="mx-auto max-w-7xl px-4 md:px-6 py-8 grid gap-8 grid-cols-1 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp}>
          <FeatureCard
            icon={<GrDeliver />}
            title="FREE AND FAST DELIVERY"
            description="Free delivery for all orders over $140"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <FeatureCard
            icon={<FaHeadphones />}
            title="24/7 CUSTOMER SERVICE"
            description="Friendly 24/7 customer support"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <FeatureCard
            icon={<SiMoneygram />}
            title="MONEY BACK GUARANTEE"
            description="We return money within 30 days"
          />
        </motion.div>
      </motion.section>
    </div>
  )
}

export default Home
