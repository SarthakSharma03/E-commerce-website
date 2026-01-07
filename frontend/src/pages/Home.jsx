import { useEffect, useState } from 'react';
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
    <div>
      <HeroSection />

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
        <SectionTitle eyebrow="This Month" title="Best Selling Products" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bestSelling.map((p) => (
            <ProductCard
              key={p._id || p.id}
              product={p}
              onAddToCart={() => addToCart(p)}
              onToggleProducts={() => handleProductClick(p._id || p.id)}
            />
          ))}
        </div>
      </div>
      
      <Category className='pb-6' />
      
      <div className='mx-auto max-w-7xl px-4 md:px-6 py-10'>
        <img src={saleImage} alt="Sale" className="w-full object-cover" />
      </div>
     
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
        <SectionTitle eyebrow="Our Products" title="Explore Our Products" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {exploreProducts.map((p) => (
            <ProductCard
              key={p._id || p.id}
              product={p}
              onAddToCart={() => addToCart(p)}
              onToggleProducts={() => handleProductClick(p._id || p.id)}
            />
          ))}
        </div>
      </div>
      
      <NewArrival/>
      
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-8 grid gap-8 grid-cols-1 md:grid-cols-3">
        <FeatureCard
          icon={<GrDeliver />}
          title="FREE AND FAST DELIVERY"
          description="Free delivery for all orders over $140"
        />
        <FeatureCard
          icon={<FaHeadphones />}
          title="24/7 CUSTOMER SERVICE"
          description="Friendly 24/7 customer support"
        />
        <FeatureCard
          icon={<SiMoneygram />}
          title="MONEY BACK GUARANTEE"
          description="We return money within 30 days"
        />
      </section>
    </div>
  )
}

export default Home
