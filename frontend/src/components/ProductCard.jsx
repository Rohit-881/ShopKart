import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../axiosCalls/axios';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, initialIsWishlisted = false }) => {
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const [wishlistStatus, setWishlistStatus] = useState('idle'); // idle, saving, error
  const [errorMessage, setErrorMessage] = useState('');
  const [cartAdding, setCartAdding] = useState(false);
  const [cartError, setCartError] = useState('');

  const { addToCart, cartItems } = useCart();
  
  // Check if this product is already in the cart
  const cartItem = cartItems.find(item => item.product?._id === product._id);
  const isInCart = !!cartItem;
  const currentQuantityInCart = cartItem?.quantity || 0;

  useEffect(() => {
    setIsWishlisted(initialIsWishlisted);
  }, [initialIsWishlisted]);

  const handleToggleWishlist = async (e) => {
    e.preventDefault(); 
    if (wishlistStatus === 'saving') return;

    try {
      setWishlistStatus('saving');
      const { data } = await api.patch(`/wishlist/${product._id}/toggle`);
      setIsWishlisted(data.action === 'added');
      setWishlistStatus('idle');
      window.dispatchEvent(new Event('wishlist-updated'));
    } catch (error) {
      setWishlistStatus('error');
      setErrorMessage('Unable to update wishlist. Please try again.');
      setTimeout(() => setWishlistStatus('idle'), 3000); 
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (cartAdding) return;
    
    // Prevent adding if stock is exceeded
    if (currentQuantityInCart >= product.stock) {
      setCartError('Out of stock');
      setTimeout(() => setCartError(''), 3000);
      return;
    }

    setCartAdding(true);
    const result = await addToCart(product._id);
    if (!result.success) {
      setCartError(result.message || 'Failed to add');
      setTimeout(() => setCartError(''), 3000);
    }
    setCartAdding(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="relative h-64 bg-gray-100 overflow-hidden group">
        <img
          src={product.image || 'https://via.placeholder.com/400x400?text=No+Image'}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        {/* Stock Status Badge */}
        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <span className="text-xs font-semibold text-[#f06e38] mb-1 uppercase tracking-wider">
          {product.category}
        </span>
        <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Price & Stock info */}
        <div className="mb-4">
          <p className="text-xl font-bold text-gray-900">₹{product.price}</p>
          <p className="text-sm text-gray-500">
            {product.stock > 0 ? `${product.stock} units left` : 'Currently unavailable'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex flex-col gap-2">
          <button
            onClick={handleAddToCart}
            disabled={cartAdding || product.stock === 0 || currentQuantityInCart >= product.stock}
            className="w-full block text-center bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-lg font-medium transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {cartAdding ? 'Adding...' : cartError ? cartError : isInCart ? 'Add Another' : 'Add to Cart'}
          </button>

          <Link
            to={`/products/${product._id}`}
            className="w-full block text-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 py-2.5 rounded-lg font-medium transition-colors"
          >
            View Details
          </Link>
          
          <button
            onClick={handleToggleWishlist}
            disabled={wishlistStatus === 'saving'}
            className="w-full block text-center bg-white border border-gray-300 hover:bg-gray-50 disabled:bg-gray-50 text-gray-700 py-2.5 rounded-lg font-medium transition-colors"
          >
            {wishlistStatus === 'saving' ? (
              '⏳ Saving...'
            ) : wishlistStatus === 'error' ? (
              errorMessage
            ) : isWishlisted ? (
              '♥ Remove from Wishlist'
            ) : (
              '♡ Add to Wishlist'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
