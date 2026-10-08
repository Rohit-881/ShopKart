import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../axiosCalls/axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    if (!user) {
      setCartItems([]);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get('/cart');
      setCartItems(data.cart || []);
    } catch (err) {
      console.error('Failed to fetch cart', err);
      setError('Unable to load your cart.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId) => {
    try {
      const { data } = await api.post(`/cart/${productId}`);
      setCartItems(data.cart);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { 
        success: false, 
        message: err.response?.data?.message || 'Failed to add to cart' 
      };
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const { data } = await api.patch(`/cart/${productId}`, { quantity });
      setCartItems(data.cart);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { 
        success: false, 
        message: err.response?.data?.message || 'Failed to update quantity' 
      };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { data } = await api.delete(`/cart/${productId}`);
      setCartItems(data.cart);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, message: 'Failed to remove from cart' };
    }
  };

  // Derived Values
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((total, item) => {
    // Handling case where product might be null if it was deleted from db
    if (item.product) {
       return total + (item.product.price * item.quantity);
    }
    return total;
  }, 0);

  const value = {
    cartItems,
    loading,
    error,
    cartCount,
    cartSubtotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    refreshCart: fetchCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
