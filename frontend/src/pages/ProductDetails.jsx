import { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import Api from '../service/Api';
import { TbTruckDelivery } from "react-icons/tb";
import { LuRefreshCw } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { MdLocationOn, MdCheckCircle, MdCancel, MdRefresh } from "react-icons/md";
import { useCart } from '../context/useCart';
import { useWishlist } from '../context/useWishlist';
import SectionTitle from '../UI/SectionTitle';
import ProductCard from '../UI/ProductCard';
import Rating from '../UI/Rating';
import { useAuth } from '../context/useAuth';
import { toast } from 'react-toastify';


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user, isAuthenticated, setUser } = useAuth();
  
  const [pincode, setPincode] = useState('');
  
  useEffect(() => {
    if (user?.pincode) {
        setPincode(user.pincode);
    }
  }, [user]);

  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [checkingPincode, setCheckingPincode] = useState(false);

  const checkDelivery = async () => {
    if (!pincode || pincode.trim() === '') {
      toast.error("Please enter a pincode");
      return;
    }
    
    // Remove any spaces and validate
    const cleanPincode = pincode.trim().replace(/\s/g, '');
    
    if (cleanPincode.length !== 6) {
      toast.error("Please enter a valid 6-digit pincode");
      return;
    }
    
    if (!/^\d+$/.test(cleanPincode)) {
      toast.error("Pincode should contain only numbers");
      return;
    }
    
    setCheckingPincode(true);
    try {
        const res = await Api.checkPincode(cleanPincode);
        if (res.success) {
            setDeliveryStatus({ 
              available: res.isDeliverable, 
              message: res.message, 
              location: res.location 
            });
            setPincode(cleanPincode);
            
            if (res.isDeliverable) {
                toast.success(res.message);
                if (isAuthenticated && user) {
                    const updatedUser = { ...user, pincode: cleanPincode };
                    setUser(updatedUser);
                    localStorage.setItem('user_info', JSON.stringify(updatedUser));
                }
            } else {
                toast.error(res.message);
            }
        } else {
             setDeliveryStatus({ available: false, message: res.message });
             toast.error(res.message);
        }
    } catch (error) {
        console.error(error);
        toast.error(error.message || "Failed to check delivery availability");
        setDeliveryStatus(null);
    } finally {
        setCheckingPincode(false);
    }
  };

  const handlePincodeKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      checkDelivery();
    }
  };
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);

  // Update quantity when product stock changes
  useEffect(() => {
    if (product && product.stock !== undefined) {
      if (product.stock === 0) {
        setQuantity(0);
      } else {
        // If current quantity exceeds stock, adjust it
        const currentQty = quantity;
        if (currentQty > product.stock) {
          setQuantity(product.stock);
        } else if (currentQty === 0) {
          setQuantity(1);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchProduct = async () => {
      try {
        const res = await Api.getProductById(id, { signal: controller.signal });
        if (res?.data) {
          const p = res.data;
          if (!p.title && p.name) p.title = p.name;
          setProduct(p);
          if (p.images?.length > 0) setSelectedImage(p.images[0]);
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

  const handleRateProduct = async (ratingValue) => {
    if (!isAuthenticated) {
      toast.error('Please log in to rate products');
      return;
    }
    setIsSubmittingRating(true);
    try {
      const res = await Api.rateProduct(id, ratingValue);
      if (res?.success && res.data) {
        setProduct(res.data);
        setUserRating(ratingValue);
        toast.success('Thanks for your rating!');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to submit rating');
    } finally {
      setIsSubmittingRating(false);
    }
  };

  const handleToggleWishlist = async () => {
    if (!product) return;
    
    const prevState = wishlisted;
    setWishlisted(!prevState);

    try {
      if (prevState) {
          await removeFromWishlist(product._id);
          toast.info("Removed from wishlist");
      } else {
          await addToWishlist(product);
          toast.success("Added to wishlist");
      }
    } catch (error) {
      setWishlisted(prevState);
      toast.error("Something went wrong");
    }
  }
  
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    if (product) {
      setWishlisted(isInWishlist(product._id));
    }
  }, [product, isInWishlist]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-25 w-25 border-b-2 border-red-500"></div>
        Loading......
      </div>
    );
  }


  return (
    <>
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
      <div className="flex flex-col md:flex-row gap-10">
     
        <div className="flex-1 flex gap-4">
          <div className="hidden md:flex flex-col gap-4">
            {product.images && product.images.length > 0 ? (
              product.images.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedImage(img)}
                  className={`w-24 h-24 bg-gray-100 rounded-md cursor-pointer flex items-center justify-center border transition-colors ${selectedImage === img ? 'border-black' : 'border-gray-200 hover:border-black'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-20 h-20 object-contain" />
                </div>
              ))
            ) : (
               <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center">
                  <span className="text-xs text-gray-400">No Image</span>
               </div>
            )}
          </div>
          <div className="flex-1 bg-gray-100 rounded-md flex items-center justify-center h-125 overflow-hidden">
             <img 
               src={selectedImage || (product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg')} 
               alt={product.title} 
               className="w-full h-full object-contain" 
               onError={(e) => { e.target.src = '/placeholder.jpg'; }}
             />
          </div>
        </div>

      
        <div className="flex-1 space-y-6">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <div className="flex items-center gap-3">
            <Rating value={product.rating} />
            <span className="text-sm text-gray-600">
              {product.reviews || 0} review{(product.reviews || 0) === 1 ? '' : 's'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700">Rate this product:</span>
            <Rating
              value={userRating || product.rating}
              interactive
              onChange={handleRateProduct}
            />
            {isSubmittingRating && (
              <span className="text-xs text-gray-500">Saving...</span>
            )}
          </div>
          <div className="text-xl font-medium">${product.price}</div>
          <div className="text-l font-medium">Category : {product.category}</div>
          
          {/* Stock Display Section */}
          <div className="flex items-center gap-3 py-2">
            <span className="text-lg font-medium">Stock:</span>
            {product.stock > 0 ? (
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock > 10 
                    ? 'bg-green-100 text-green-800' 
                    : product.stock > 5 
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {product.stock} {product.stock === 1 ? 'item' : 'items'} available
                </span>
                {product.stock <= 5 && (
                  <span className="text-xs text-orange-600 font-medium">Low stock!</span>
                )}
              </div>
            ) : (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                Out of Stock
              </span>
            )}
          </div>
          
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
                   disabled={product.stock === 0}
                   className="px-3 py-2 border-r border-gray-300 hover:bg-red-500 hover:text-white transition-colors hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   -
                 </button>
                 <span className="px-6 py-2 font-medium w-12 text-center">{quantity}</span>
                 <button 
                   onClick={() => setQuantity(Math.min((product.stock || 0), quantity + 1))}
                   disabled={product.stock === 0 || quantity >= (product.stock || 0)}
                   className="px-3 py-2 border-l border-gray-300 hover:bg-red-500 hover:text-white transition-colors hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   +
                 </button>
               </div>
               
               <button 
                 onClick={() => {
                   if (product.stock === 0) {
                     toast.error('Product is out of stock');
                     return;
                   }
                   if (quantity > (product.stock || 0)) {
                     toast.error(`Only ${product.stock} items available in stock`);
                     setQuantity(product.stock);
                     return;
                   }
                   addToCart(product, quantity);
                   navigate('/cartManage');
                 }}
                 disabled={product.stock === 0}
                 className="flex-1 bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 {product.stock === 0 ? 'Out of Stock' : 'Buy Now'}
               </button>
               
               <button 
                onClick={handleToggleWishlist}
                className="border border-gray-300 p-2 rounded hover:bg-gray-100 hover:cursor-pointer" 
              >
                {wishlisted ? <FaHeart className="w-6 h-6 text-red-500" /> : <CiHeart className="w-6 h-6" />}
              </button>
            </div>
            
        
            <div className="border border-gray-200 rounded-lg mt-6 overflow-hidden bg-linear-to-br from-gray-50 to-white">
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <TbTruckDelivery className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">Check Delivery Availability</h4>
                    <p className="text-xs text-gray-500 mb-3">Enter your pincode to check if we deliver to your area</p>
                    
                    {!deliveryStatus ? (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1 relative">
                          <MdLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input 
                            type="text" 
                            placeholder="Enter 6-digit pincode" 
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm placeholder:text-gray-400"
                            value={pincode}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                              setPincode(value);
                            }}
                            onKeyPress={handlePincodeKeyPress}
                            maxLength={6}
                            disabled={checkingPincode}
                          />
                        </div>
                        <button 
                          onClick={checkDelivery}
                          disabled={checkingPincode || !pincode || pincode.length !== 6}
                          className="px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm flex items-center justify-center gap-2 min-w-[120px]"
                        >
                          {checkingPincode ? (
                            <>
                              <LuRefreshCw className="w-4 h-4 animate-spin" />
                              Checking...
                            </>
                          ) : (
                            <>
                              <MdCheckCircle className="w-4 h-4" />
                              Check
                            </>
                          )}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className={`p-4 rounded-lg border-2 ${
                          deliveryStatus.available 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-red-50 border-red-200'
                        }`}>
                          <div className="flex items-start gap-3">
                            {deliveryStatus.available ? (
                              <MdCheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                            ) : (
                              <MdCancel className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <p className={`text-sm font-semibold ${
                                deliveryStatus.available ? 'text-green-800' : 'text-red-800'
                              }`}>
                                {deliveryStatus.message}
                              </p>
                              {deliveryStatus.available && deliveryStatus.location && (
                                <div className="mt-2 pt-2 border-t border-green-200">
                                  <div className="flex items-start gap-2">
                                    <MdLocationOn className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                    <div className="text-xs text-green-700">
                                      <p className="font-medium">{deliveryStatus.location.name}</p>
                                      <p className="text-green-600">
                                        {deliveryStatus.location.district}, {deliveryStatus.location.state}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => { 
                            setDeliveryStatus(null); 
                            setPincode('');
                          }}
                          className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                        >
                          <MdRefresh className="w-4 h-4" />
                          Check Another Pincode
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
              <div className="p-4 flex items-center gap-4">
                <LuRefreshCw className="w-8 h-8" />
                <div>
                  <h4 className="font-medium">Return Delivery</h4>
                  <p className="text-xs text-gray-500">Free 30 Days Delivery Returns. <span className="underline"><NavLink to='/return-policy'>Details</NavLink></span></p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="mt-20 p-5">
        <SectionTitle 
            eyebrow="Related Item" 
            title="Related Products" 
            action={
                <button 
                onClick={() => navigate('/explore')} 
                className="text-sm font-medium border border-gray-300 px-8 py-3 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                >
                    View All
                </button>
            }
            />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 my-5">
          {relatedProducts.map((p) => (
            <ProductCard
            key={p._id || p.id}
            product={p}
            onAddToCart={() => addToCart(p)}
            onToggleProducts={() => navigate(`/product/${p._id || p.id}`)}
            />
          ))}
        </div>
      </div>
 
  </>
  );
};

export default ProductDetails;
