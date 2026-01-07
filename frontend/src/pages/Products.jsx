import { useEffect, useState } from 'react';
import ProductCard from '../UI/ProductCard';
import SectionTitle from '../UI/SectionTitle';
import Api from '../service/Api';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    let didFetch = false;
    const controller = new AbortController();
    const fetchProducts = async () => {
      if (didFetch) return;
      didFetch = true;
      try {
        const res = await Api.getProducts({ limit: 24, signal: controller.signal });
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

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
      <SectionTitle eyebrow="All Products" title="Our Collection" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard
            key={p._id || p.id}
            image={p.image}
            title={p.name || p.title}
            price={p.price}
            oldPrice={p.oldPrice}
            rating={p.rating}
            onAddToCart={() => addToCart(p)}
            onToggleWishlist={() => {}}
            onToggleProducts={() => handleProductClick(p._id || p.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
