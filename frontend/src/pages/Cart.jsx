import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
  const { cartItems, loading, error, cartCount, cartSubtotal, updateQuantity, removeFromCart } = useCart();

  const handleUpdateQuantity = async (productId, currentQuantity, change, stock) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;
    if (newQuantity > stock) {
      alert('Cannot exceed available stock!');
      return;
    }
    await updateQuantity(productId, newQuantity);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center items-center">
        <p className="text-xl text-gray-600 font-medium animate-pulse">Loading your cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center space-y-4">
        <p className="text-xl text-red-500 font-medium">{error}</p>
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
          Try Again
        </button>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center space-y-6 text-center">
        <div className="text-6xl">🛒</div>
        <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="text-gray-500 max-w-sm">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="mt-4 px-8 py-3 bg-[#f06e38] text-white font-semibold rounded-lg hover:bg-[#e05d27]">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="flex-1 space-y-6">
          {cartItems.map((item) => {
            if (!item.product) return null; // Defensive check
            const { product, quantity } = item;
            
            return (
              <div key={product._id} className="flex flex-col sm:flex-row items-center sm:items-start bg-white p-6 rounded-xl shadow-sm border border-gray-200 gap-6">
                <img
                  src={product.image || 'https://via.placeholder.com/150'}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-lg border border-gray-100"
                />
                
                <div className="flex-1 flex flex-col justify-between w-full h-full">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                    <p className="text-xl font-bold text-gray-900">₹{product.price}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 sm:mt-0 pt-4 border-t border-gray-100 sm:border-0 sm:pt-0">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button 
                        onClick={() => handleUpdateQuantity(product._id, quantity, -1, product.stock)}
                        disabled={quantity <= 1}
                        className="p-2 hover:bg-gray-50 text-gray-600 disabled:opacity-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-medium text-gray-900">{quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(product._id, quantity, 1, product.stock)}
                        disabled={quantity >= product.stock}
                        className="p-2 hover:bg-gray-50 text-gray-600 disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="text-lg font-bold text-gray-900 hidden sm:block">
                        ₹{(product.price * quantity).toLocaleString()}
                      </p>
                      <button 
                        onClick={() => removeFromCart(product._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                        title="Remove from cart"
                      >
                        <Trash2 className="w-5 h-5" />
                        <span className="hidden sm:inline text-sm font-medium">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-96">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-gray-600">
              <div className="flex justify-between">
                <span>Items ({cartCount})</span>
                <span>₹{cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Subtotal</span>
                <span className="text-2xl font-bold text-[#f06e38]">₹{cartSubtotal.toLocaleString()}</span>
              </div>
            </div>

            <Link to="/checkout" className="w-full block text-center py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-bold text-lg transition-colors shadow-md">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
