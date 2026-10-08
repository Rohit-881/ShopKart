import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../axiosCalls/axios';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${id}`);
        setProduct(response.data.product);
      } catch (err) {
        setError('Something went wrong while loading the product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f06e38]"></div>
        <p className="text-lg text-gray-600 mt-4">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
        <div className="text-center bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <p className="text-red-500 font-semibold text-lg mb-4">{error}</p>
          <Link to="/products" className="text-[#f06e38] hover:underline font-medium">
            &larr; Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
        <div className="text-center bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <p className="text-gray-900 font-semibold text-lg mb-4">Product not found.</p>
          <Link to="/products" className="text-[#f06e38] hover:underline font-medium">
            &larr; Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <Link to="/products" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </Link>

        <div className="flex flex-col md:flex-row gap-12 bg-white">
          
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square border border-gray-100 relative">
              <img 
                src={product.image || 'https://via.placeholder.com/600x600?text=No+Image'} 
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.stock === 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white font-bold px-4 py-2 rounded-lg text-sm">
                  Out of Stock
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <span className="text-sm font-semibold text-[#f06e38] uppercase tracking-widest mb-2">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {product.stock > 0 ? `${product.stock} units in stock` : 'Currently unavailable'}
              </span>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Add to Cart Button */}
            <div className="mt-auto">
              <button 
                disabled={product.stock === 0}
                className={`w-full py-4 rounded-xl flex items-center justify-center text-lg font-medium transition-all ${
                  product.stock > 0 
                  ? 'bg-gray-900 hover:bg-gray-800 text-white cursor-pointer shadow-md hover:shadow-lg' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-6 h-6 mr-3" />
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
