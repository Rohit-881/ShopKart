import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import api from '../axiosCalls/axios';

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data.order);
      } catch (err) {
        setError('Could not fetch order details.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-xl font-medium animate-pulse text-gray-600">Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
        <p className="text-xl text-red-500 font-medium">{error}</p>
        <Link to="/orders" className="text-[#f06e38] font-medium hover:underline">View My Orders</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle className="w-24 h-24 text-green-500" />
      </div>
      
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Order Placed Successfully!</h1>
      <p className="text-lg text-gray-600 mb-8">Thank you for shopping with ShopKart. Your order has been saved successfully.</p>
      
      <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 text-left mb-8 space-y-4">
        <div className="flex justify-between border-b pb-4">
          <span className="text-gray-600">Order ID</span>
          <span className="font-medium text-gray-900">{order._id}</span>
        </div>
        <div className="flex justify-between border-b pb-4">
          <span className="text-gray-600">Total Amount</span>
          <span className="font-bold text-[#f06e38]">₹{order.totalAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between border-b pb-4">
          <span className="text-gray-600">Payment Status</span>
          <span className="font-medium text-green-600">{order.paymentStatus}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Order Status</span>
          <span className="font-medium text-blue-600">{order.status}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link to="/orders" className="px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
          View My Orders
        </Link>
        <Link to="/products" className="px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
