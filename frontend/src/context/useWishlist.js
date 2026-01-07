import { useContext } from 'react';
import { WishlistContext } from './Contexts';

export const useWishlist = () => useContext(WishlistContext);
