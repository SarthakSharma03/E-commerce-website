import { useContext } from 'react';
import { CartContext } from './Contexts';

export const useCart = () => useContext(CartContext);
