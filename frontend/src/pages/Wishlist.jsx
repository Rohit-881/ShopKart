import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../axiosCalls/axios';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError(false);
      const { data } = await api.get('/wishlist');
      setWishlist(data.wishlist);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await api.delete(`/wishlist/${productId}`);
      setWishlist(wishlist.filter(item => item._id !== productId));
      window.dispatchEvent(new Event('wishlist-updated'));
    } catch (err) {
      console.error(err);
      alert('Failed to remove product from wishlist');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center items-center">
        <p className="text-xl text-gray-600 font-medium animate-pulse">Loading your wishlist...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center space-y-4">
        <p className="text-xl text-red-500 font-medium">Unable to load wishlist.</p>
        <button 
          onClick={fetchWishlist}
          className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center space-y-6 text-center">
        <div className="text-6xl">❤️</div>
        <h2 className="text-2xl font-bold text-gray-900">Your wishlist is empty</h2>
        <p className="text-gray-500 max-w-sm">Save products you love and find them here later.</p>
        <Link 
          to="/products"
          className="mt-4 px-8 py-3 bg-[#f06e38] text-white font-semibold rounded-lg hover:bg-[#e05d27] transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">My Wishlist</h1>
        <p className="text-gray-500 mt-2">{wishlist.length} {wishlist.length === 1 ? 'product' : 'products'} saved</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="relative h-64 bg-gray-100 overflow-hidden group">
              <img
                src={product.image || 'https://via.placeholder.com/400x400?text=No+Image'}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
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
              
              <div className="mb-4">
                <p className="text-xl font-bold text-gray-900">₹{product.price}</p>
                <p className="text-sm text-gray-500">
                  {product.stock > 0 ? `${product.stock} units left` : 'Currently unavailable'}
                </p>
              </div>

              <div className="mt-auto space-y-2">
                <Link
                  to={`/products/${product._id}`}
                  className="w-full block text-center bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-lg font-medium transition-colors"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleRemove(product._id)}
                  className="w-full block text-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2.5 rounded-lg font-medium transition-colors"
                >
                  Remove ❤️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
