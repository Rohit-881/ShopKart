import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, ShoppingCart, User as UserIcon, LogOut, Package } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import api from '../axiosCalls/axios';

const Navbar = () => {
  const navigate = useNavigate();
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
        }git
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

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-extrabold text-2xl text-gray-900 tracking-tight">ShopKart</span>
            </Link>
          </div>

          {/* Centered Links (Hidden on mobile) */}
          <div className="hidden md:flex space-x-8">
            <Link to="/products" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">Products</Link>
            <Link to="/wishlist" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">Wishlist</Link>
            <Link to="/cart" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">Cart</Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">New Arrivals</Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">Contact</Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6 text-gray-600">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-800 hidden sm:block">
                  Hi, {user.fullName.split(' ')[0]}
                </span>
                <button onClick={handleLogout} title="Logout" className="hover:text-red-500 transition-colors cursor-pointer">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" title="Sign In" className="hover:text-gray-900 transition-colors">
                <UserIcon className="w-5 h-5" />
              </Link>
            )}
            
            <Link to="/orders" className="hover:text-gray-900 transition-colors relative flex items-center gap-1" title="My Orders">
              <Package className="w-5 h-5" />
            </Link>
            <Link to="/wishlist" className="hover:text-gray-900 transition-colors relative flex items-center gap-1">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="hover:text-gray-900 transition-colors relative flex items-center gap-1">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#f06e38] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
