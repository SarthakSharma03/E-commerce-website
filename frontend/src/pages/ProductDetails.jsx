import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Api from '../service/Api';
import { TbTruckDelivery } from "react-icons/tb";
import { LuRefreshCw } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useCart } from '../context/useCart';
import { useWishlist } from '../context/useWishlist';
import SectionTitle from '../UI/SectionTitle';
import ProductCard from '../UI/ProductCard';
import Rating from '../UI/Rating';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchProduct = async () => {
      try {
        const res = await Api.getProductById(id, { signal: controller.signal });
        if (res?.data) {
          const p = res.data;
          if (!p.title && p.name) p.title = p.name;
          setProduct(p);
          if (p.colors?.length > 0) setSelectedColor(p.colors[0]);
          if (p.sizes?.length > 0) setSelectedSize(p.sizes[0]);
        }
      } catch (error) {
        if (error?.name !== 'AbortError') {
          console.error("Failed to fetch product", error);
        }
      }
    };
    
    const fetchRelated = async () => {
      try {
        const res = await Api.getProducts({ limit: 12, signal: controller.signal });
        if (res?.data) {
          const all = res.data;
          const related = all.filter(p => (p._id || p.id) !== id).slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        if (error?.name !== 'AbortError') {
          console.error("Failed to fetch related products", error);
        }
      }
    };

    let didRun = false;
    if (!didRun) {
      didRun = true;
      fetchProduct();
      fetchRelated();
      window.scrollTo(0, 0);
    }
    return () => controller.abort();
  }, [id]);

  const handleToggleWishlist = () => {
      if (!product) return;
      if (isInWishlist(product._id)) {
          removeFromWishlist(product._id);
      } else {
          addToWishlist(product);
      }
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
      <div className="flex flex-col md:flex-row gap-10">
     
        <div className="flex-1 flex gap-4">
          <div className="hidden md:flex flex-col gap-4">
            {product.images && product.images.length > 0 ? (
              product.images.map((img, idx) => (
                <div key={idx} className="w-24 h-24 bg-gray-100 rounded-md cursor-pointer flex items-center justify-center border border-gray-200 hover:border-black transition-colors">
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-20 h-20 object-contain" />
                </div>
              ))
            ) : (
               <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center">
                  <span className="text-xs text-gray-400">No Image</span>
               </div>
            )}
          </div>
          <div className="flex-1 bg-gray-100 rounded-md flex items-center justify-center h-125">
             <img 
               src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg'} 
               alt={product.title} 
               className="w-3/4 max-h-100 object-contain" 
               onError={(e) => { e.target.src = '/placeholder.jpg'; }}
             />
          </div>
        </div>

      
        <div className="flex-1 space-y-6">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <Rating value={product.rating} reviews={product.reviews || 0} />
          <div className="text-xl font-medium">${product.price}</div>
          <p className="text-sm text-gray-600 border-b pb-6 border-gray-300">
            {product.description}
          </p>

          <div className="space-y-4">
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-4">
                <span className="text-lg">Colors:</span>
                <div className="flex gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-5 h-5 rounded-full border-2 ${selectedColor === color ? 'border-black' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="flex items-center gap-4">
                <span className="text-lg">Size:</span>
                <div className="flex gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-8 h-8 rounded border text-sm font-medium transition-colors
                        ${selectedSize === size ? 'bg-red-500 text-white border-red-500' : 'border-gray-300 hover:border-red-500'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-4 py-4">
               <div className="flex items-center border border-gray-300 rounded">
                 <button 
                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
                   className="px-3 py-2 border-r border-gray-300 hover:bg-red-500 hover:text-white transition-colors hover:cursor-pointer"
                 >
                   -
                 </button>
                 <span className="px-6 py-2 font-medium w-12 text-center">{quantity}</span>
                 <button 
                   onClick={() => setQuantity(quantity + 1)}
                   className="px-3 py-2 border-l border-gray-300 hover:bg-red-500 hover:text-white transition-colors hover:cursor-pointer"
                 >
                   +
                 </button>
               </div>
               
               <button 
                 onClick={() => {
                   addToCart(product, quantity);
                   navigate('/cartManage');
                 }}
                 className="flex-1 bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition-colors"
               >
                 Buy Now
               </button>
               
               <button 
                onClick={handleToggleWishlist}
                className="border border-gray-300 p-2 rounded hover:bg-gray-100 hover:cursor-pointer" 
              >
                {isInWishlist(product._id) ? <FaHeart className="w-6 h-6 text-red-500" /> : <CiHeart className="w-6 h-6" />}
              </button>
            </div>
            
            <div className="border border-gray-300 rounded divide-y divide-gray-300 mt-6">
              <div className="p-4 flex items-center gap-4">
                <TbTruckDelivery className="w-8 h-8" />
                <div>
                  <h4 className="font-medium">Free Delivery</h4>
                  <p className="text-xs text-gray-500 underline">Enter your postal code for Delivery Availability</p>
                </div>
              </div>
              <div className="p-4 flex items-center gap-4">
                <LuRefreshCw className="w-8 h-8" />
                <div>
                  <h4 className="font-medium">Return Delivery</h4>
                  <p className="text-xs text-gray-500">Free 30 Days Delivery Returns. <span className="underline">Details</span></p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="mt-20">
        <SectionTitle 
            eyebrow="Related Item" 
            title="Related Products" 
            action={
                <button 
                    onClick={() => navigate('/explore')} 
                    className="text-sm font-medium border border-gray-300 px-8 py-3 rounded hover:bg-gray-100 transition-colors"
                >
                    View All
                </button>
            }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {relatedProducts.map((p) => (
            <ProductCard
              key={p._id || p.id}
              product={p}
              onAddToCart={() => addToCart(p)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
