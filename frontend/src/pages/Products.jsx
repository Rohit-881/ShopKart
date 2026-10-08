import { useState, useEffect } from 'react';
import api from '../axiosCalls/axios';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Constructing query string dynamically based on state
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      if (sort) params.append('sort', sort);

      // Make API Request
      const response = await api.get(`/products?${params.toString()}`);
      setProducts(response.data.products);
    } catch (err) {
      setError('Something went wrong while loading products.');
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch products whenever search, category, or sort state changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300); // Debounce to prevent too many API calls while typing
    return () => clearTimeout(timer);
  }, [search, category, sort]);

  const [wishlistIds, setWishlistIds] = useState(new Set());

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await api.get('/wishlist');
        const ids = new Set(data.wishlist.map(item => item._id));
        setWishlistIds(ids);
      } catch (err) {
        console.error("Failed to fetch wishlist ids", err);
      }
    };
    fetchWishlist();
    
    const handleWishlistUpdate = () => fetchWishlist();
    window.addEventListener('wishlist-updated', handleWishlistUpdate);
    return () => window.removeEventListener('wishlist-updated', handleWishlistUpdate);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-serif text-gray-900 mb-8">All Products</h1>
        
        {/* Search & Filter Component */}
        <SearchBar 
          search={search} 
          setSearch={setSearch} 
          category={category} 
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
        />

        {/* Dynamic UI States */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 text-gray-600 space-y-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#f06e38]"></div>
            <p className="text-lg">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-16 bg-red-50 rounded-xl border border-red-100">
            <p className="text-lg font-medium">{error}</p>
            <button onClick={fetchProducts} className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Try Again
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-2xl font-medium text-gray-900 mb-2">No products found.</h3>
            <p className="text-gray-500">Try searching with a different keyword or category.</p>
            <button 
              onClick={() => { setSearch(''); setCategory(''); setSort(''); }}
              className="mt-6 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                initialIsWishlisted={wishlistIds.has(product._id)} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
