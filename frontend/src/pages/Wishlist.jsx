import ProductCard from '../UI/ProductCard';
import { useCart } from '../context/useCart';
import { useWishlist } from '../context/useWishlist';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, loading } = useWishlist();
  const { addToCart } = useCart();
  console.log(wishlist ,'wishlist')
  const handleMoveToCart = (product) => {
    addToCart(product);
  };
  
  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-medium">Wishlist ({wishlist.length})</h1>
        <button 
            className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 cursor-pointer"
            onClick={() => {
                wishlist.forEach(p => addToCart(p));
            }}
        >
            Move All To Bag
        </button>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <ProductCard 
                key={product._id} 
                product={product} 
                onAddToCart={() => handleMoveToCart(product)}
                isInWishlist={true}
                onToggleWishlist={() => removeFromWishlist(product._id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500">Your wishlist is empty.</p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
