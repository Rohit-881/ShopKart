import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, ShoppingCart, User as UserIcon, LogOut, Package } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import api from '../axiosCalls/axios';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const fetchWishlistCount = async () => {
      if (user) {
        try {
          const { data } = await api.get('/wishlist');
          setWishlistCount(data.count);
        } catch (error) {
          console.error("Error fetching wishlist count", error);
        }
      } else {
        setWishlistCount(0);
      }
    };
    
    fetchWishlistCount();

    const handleWishlistUpdate = () => {
      fetchWishlistCount();
    };

    window.addEventListener('wishlist-updated', handleWishlistUpdate);
    return () => window.removeEventListener('wishlist-updated', handleWishlistUpdate);
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return parts[0][0].toUpperCase();
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f06e38] to-[#ff8c5a] flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 group-hover:shadow-orange-500/30 transition-all duration-300">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-gray-900">
                Shop<span className="text-[#f06e38]">Kart</span>
              </span>
            </Link>
          </div>

          {/* Centered Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/home"
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive('/home') || isActive('/')
                  ? 'bg-orange-50 text-[#f06e38] font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive('/products')
                  ? 'bg-orange-50 text-[#f06e38] font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
              }`}
            >
              Products
            </Link>
            <Link
              to="/wishlist"
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive('/wishlist')
                  ? 'bg-orange-50 text-[#f06e38] font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
              }`}
            >
              Wishlist
            </Link>
            <Link
              to="/orders"
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive('/orders')
                  ? 'bg-orange-50 text-[#f06e38] font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
              }`}
            >
              Orders
            </Link>
          </div>

          {/* Right Icons & User Profile */}
          <div className="flex items-center space-x-3 sm:space-x-5 text-gray-600">
            {/* Orders Icon */}
            <Link
              to="/orders"
              title="My Orders"
              className={`p-2 rounded-xl transition-all ${
                isActive('/orders') ? 'text-[#f06e38] bg-orange-50' : 'hover:text-gray-900 hover:bg-gray-100/80'
              }`}
            >
              <Package className="w-5 h-5" />
            </Link>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              title="Wishlist"
              className={`p-2 rounded-xl transition-all relative ${
                isActive('/wishlist') ? 'text-[#f06e38] bg-orange-50' : 'hover:text-gray-900 hover:bg-gray-100/80'
              }`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              title="Shopping Cart"
              className={`p-2 rounded-xl transition-all relative ${
                isActive('/cart') ? 'text-[#f06e38] bg-orange-50' : 'hover:text-gray-900 hover:bg-gray-100/80'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#f06e38] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white shadow-xs">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Greeting & Logout */}
            {user ? (
              <div className="flex items-center pl-2 sm:pl-3 border-l border-gray-200 space-x-2 sm:space-x-3">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200/80 px-2.5 py-1.5 rounded-full">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#f06e38] to-[#ff9066] text-white flex items-center justify-center text-[10px] font-bold">
                    {getInitials(user.fullName)}
                  </div>
                  <span className="text-xs font-semibold text-gray-800 hidden sm:block max-w-[90px] truncate">
                    {user.fullName.split(' ')[0]}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                title="Sign In"
                className="flex items-center gap-1.5 bg-[#f06e38] hover:bg-[#d95d2c] text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm"
              >
                <UserIcon className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
