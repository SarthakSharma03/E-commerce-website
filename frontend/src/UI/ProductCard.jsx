import { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaEye } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import defaultProductImage from "../images/product.jpeg";
import { useWishlist } from "../context/useWishlist";
import Rating from "./Rating";
import { toast } from "react-toastify";

const ProductCard = ({
  product,
  image,
  title,
  price,
  oldPrice,
  rating = 0,
  onAddToCart,
  onToggleWishlist,
  onToggleProducts,
  isInWishlist,
}) => {
  const { addToWishlist, removeFromWishlist, isInWishlist: checkWishlist } =
    useWishlist();

  const [added, setAdded] = useState(false);

  const displayImage = (product?.images && product.images[0]) || product?.image || image || defaultProductImage;
  const displayTitle = product?.name || title;
  const displayPrice = product?.price || price;
  const displayOldPrice = product?.oldPrice || oldPrice;
  const displayRating = product?.rating || rating;
  
  const productId = product?._id || product?.id;

  const isActuallyWishlisted =
    isInWishlist !== undefined
      ? isInWishlist
      : productId
      ? checkWishlist(productId)
      : false;
      
  const [wishlisted, setWishlisted] = useState(isActuallyWishlisted);

  useEffect(() => {
    setWishlisted(isActuallyWishlisted);
  }, [isActuallyWishlisted]);

  const handleWishlist = async (e) => {
    e.stopPropagation();

    if (onToggleWishlist) {
        onToggleWishlist();
        return;
    }

    if (!productId) return;


    const previousState = wishlisted;
    setWishlisted(!previousState);

    try {
      if (previousState) {
        await removeFromWishlist(productId);
        toast.info("Removed from wishlist");
      } else {
        await addToWishlist(product);
        toast.success("Added to wishlist");
      }
    } catch {
      setWishlisted(previousState);
      toast.error("Something went wrong");
    }
  };

  const handleAdd = () => {
    if (onAddToCart) onAddToCart();

    setAdded(true);
    toast.success("Added to cart!");
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shxadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group hover:scale-110">
    <div className="group relative rounded-lg border border-gray-200 bg-white">
      <div className="relative">  
        <button
          onClick={handleWishlist}
          className="absolute right-3 top-3 rounded-full bg-white p-2 shadow hover:bg-gray-50 cursor-pointer"
        >
          {wishlisted ? (
            <FaHeart className="h-5 w-5 text-red-500" />
          ) : (
            <CiHeart className="h-5 w-5" />
          )}
        </button>

      

        <img
          src={displayImage}
          alt={displayTitle}
           onClick={onToggleProducts}
          className="h-44 w-full object-contain p-4 cursor-pointer"
        />

     
        <button
          onClick={handleAdd}
          className={`absolute bottom-0 left-0 right-0 px-4 py-2 text-sm text-white cursor-pointer
            transition-all duration-300
            ${
              added
                ? "bg-green-600 scale-105"
                : "bg-black hidden group-hover:block"
            }`}
        >
          {added ? (
            <span className="flex items-center justify-center gap-2">
              Added to Cart <IoMdCheckmark />
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Add To Cart <MdOutlineShoppingCart />
            </span>
          )}
        </button>
      </div>

      <div className="space-y-1 p-3">
        <div className="line-clamp-1 text-sm">{displayTitle}</div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-red-500">
            ${displayPrice}
          </span>
          {displayOldPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${displayOldPrice}
            </span>
          )}
        </div>
        <Rating value={displayRating} />
      </div>
    </div>
    </div>
  );
};

export default ProductCard;
