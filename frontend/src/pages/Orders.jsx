import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../axiosCalls/axios';
import { Package } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders');
        setOrders(data.orders);
      } catch (err) {
        setError('Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-xl font-medium animate-pulse text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
        <p className="text-xl text-red-500 font-medium">{error}</p>
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-gray-900 text-white rounded-lg">Try Again</button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center space-y-6 text-center">
        <Package className="w-24 h-24 text-gray-300" />
        <h2 className="text-2xl font-bold text-gray-900">You have not placed any orders yet.</h2>
        <Link to="/products" className="mt-4 px-8 py-3 bg-[#f06e38] text-white font-semibold rounded-lg hover:bg-[#e05d27]">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Orders</h1>
      
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gray-50 border-b border-gray-200 p-4 sm:px-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <p className="text-sm text-gray-500">Order #{order._id}</p>
                <p className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'short', year: 'numeric'
                })}</p>
              </div>
              <div className="flex flex-col sm:items-end">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                  order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
                <p className="font-bold text-gray-900 mt-1">Total: ₹{order.totalAmount.toLocaleString()}</p>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 sm:px-6">
              <div className="divide-y divide-gray-100">
                {order.items.map((item, index) => (
                  <div key={index} className="py-4 flex gap-4 items-center">
                    <img 
                      src={item.image || 'https://via.placeholder.com/80'} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Footer */}
            <div className="bg-gray-50 border-t border-gray-200 p-4 sm:px-6 flex justify-end">
              <Link to={`/order-success/${order._id}`} className="text-sm font-medium text-[#f06e38] hover:text-[#e05d27]">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
