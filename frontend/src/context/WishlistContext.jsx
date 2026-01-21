import { useState, useEffect, useRef } from 'react';
import Api from '../service/Api';
import { useAuth } from './useAuth';
import { WishlistContext } from './Contexts';

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const didFetch = useRef(false);

  useEffect(() => {
    if (isAuthenticated) {
      if (didFetch.current) return;
      didFetch.current = true;
      fetchWishlist();
    } else {
      didFetch.current = false;
      setWishlist([]);
    }
  }, [isAuthenticated]);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const res = await Api.getWishlist();
      if (res.success) {
        setWishlist(res.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (product) => {
    try {
      const res = await Api.addToWishlist(product._id || product.id);
      if (res.success) {
        setWishlist(res.data);
      }
      return res;
    } catch (error) {
      console.error("Failed to add to wishlist", error);
      throw error;
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const res = await Api.removeFromWishlist(productId);
      if (res.success) {
        setWishlist(res.data);
      }
      return res;
    } catch (error) {
      console.error("Failed to remove from wishlist", error);
      throw error;
    }
  };

  const clearWishlist = async () => {
    try {
      const res = await Api.clearWishlist();
      if (res.success) {
        setWishlist([]);
      }
    } catch (error) {
      console.error("Failed to clear wishlist", error);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(p => (p._id || p.id) === productId);
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      addToWishlist, 
      removeFromWishlist, 
      clearWishlist,
      isInWishlist,
      loading 
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
