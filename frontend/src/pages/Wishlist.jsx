import ProductCard from '../UI/ProductCard';
import { useCart } from '../context/useCart';
import { useWishlist } from '../context/useWishlist';
import { ThreeDot } from 'react-loading-indicators';
import { useState } from 'react';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, loading: globalLoading } = useWishlist();
  const { addToCart } = useCart();

  
  const [removingIds, setRemovingIds] = useState(new Set());

  const isRemoving = (id) => removingIds.has(id);

  const handleRemove = async (productId) => {
  
    if (isRemoving(productId)) return;

  
    setRemovingIds((prev) => new Set([...prev, productId]));

    try {
      await removeFromWishlist(productId); 
     
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
    
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
   
    }
  };

  const handleMoveToCart = (product) => {
    addToCart(product);
   
  };

  if (globalLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 p-10">
        <ThreeDot variant="pulsate" color="#020202" size="medium" text="" />
        <p className="text-gray-600 mt-3">Loading your wishlist...</p>
      </div>
    );
  }

  const visibleWishlist = wishlist?.filter((p) => !isRemoving(p._id)) ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-medium">
          Wishlist {visibleWishlist.length ? `(${visibleWishlist.length})` : ''}
        </h1>

        {visibleWishlist.length > 0 && (
          <button
            className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => visibleWishlist.forEach((p) => addToCart(p))}
            disabled={visibleWishlist.length === 0}
          >
            Move All To Bag
          </button>
        )}
      </div>

      {visibleWishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {wishlist.map((product) => {
            const removing = isRemoving(product._id);

            return (
              <div
                key={product._id}
                className={`transition-all duration-300 ${
                  removing ? 'opacity-50 scale-95 pointer-events-none' : ''
                }`}
              >
                <ProductCard
                  product={product}
                  onAddToCart={() => handleMoveToCart(product)}
                  isInWishlist={true}
                  onToggleWishlist={() => handleRemove(product._id)}
                  
                  isRemoving={removing}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            {removingIds.size > 0 ? ' ' : 'Your wishlist is empty.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Wishlist; 