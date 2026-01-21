import ProductCard from "../UI/ProductCard";
import { useCart } from "../context/useCart";
import { useWishlist } from "../context/useWishlist";
import { ThreeDot } from "react-loading-indicators";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const Wishlist = () => {
  const {
    wishlist,
    removeFromWishlist,
    clearWishlist,
    loading: globalLoading,
  } = useWishlist();

  const { addToCart } = useCart();
  const [removingId, setRemovingId] = useState(null);

  const [moveAllLoading, setMoveAllLoading] = useState(false);
  const [removingIds, setRemovingIds] = useState(new Set());

  const isRemoving = (id) => removingIds.has(id);

  const visibleWishlist = useMemo(
    () => wishlist?.filter((p) => !isRemoving(p._id)) ?? [],
    [wishlist, removingIds],
  );

  const handleRemove = async (productId) => {
    if (isRemoving(productId)) return;

    setRemovingIds((prev) => new Set(prev).add(productId));

    try {
      await removeFromWishlist(productId);
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
    }
  };

  const handleMoveToCart = async (product) => {
    addToCart(product);

  
    setRemovingId(product._id);

    setTimeout(async () => {
      await handleRemove(product._id);
      setRemovingId(null);
    }, 500); 
  };

  const handleMoveAllToBag = async () => {
    if (moveAllLoading) return;

    setMoveAllLoading(true);

    try {
      visibleWishlist.forEach(addToCart);
      await clearWishlist();
      setRemovingIds(new Set());
    } catch (error) {
      console.error("Failed to move all to bag:", error);
    } finally {
      setMoveAllLoading(false);
    }
  };

  if (globalLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 p-10">
        <ThreeDot variant="pulsate" color="#020202" size="medium" />
        <p className="text-gray-600 mt-3">Loading your wishlist...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-medium">
          Wishlist {visibleWishlist.length > 0 && `(${visibleWishlist.length})`}
        </h1>

        {visibleWishlist.length > 0 && (
          <button
            className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition
                       flex items-center gap-2 disabled:opacity-50"
            onClick={handleMoveAllToBag}
            disabled={moveAllLoading}
          >
            {moveAllLoading ? (
              <>
                <ThreeDot variant="pulsate" color="#020202" size="small" />
                <span>Moving...</span>
              </>
            ) : (
              "Move All To Bag"
            )}
          </button>
        )}
      </div>

      {visibleWishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleWishlist.map((product) => {
            const removing = isRemoving(product._id);

            return (
              <div
                key={product._id}
                className={`transition-all duration-300 ${
                  removing ? "opacity-50 scale-95 pointer-events-none" : ""
                }`}
              >
                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{
                    opacity: removingId === product._id ? 0 : 1,
                    scale: removingId === product._id ? 0.95 : 1,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={() => handleMoveToCart(product)}
                    isInWishlist
                    onToggleWishlist={() => handleRemove(product._id)}
                    isRemoving={removing}
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
