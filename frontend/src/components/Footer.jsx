import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, ShieldCheck, Truck, RotateCcw, ArrowRight, Heart, X, CheckCircle2 } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const modalContent = {
    shipping: {
      title: 'Shipping Policy',
      content: 'We provide Free Express Delivery on all orders over $50. All standard orders are dispatched within 24 hours and delivered in 2–4 business days with full real-time tracking.',
    },
    returns: {
      title: '30-Day Returns & Exchanges',
      content: 'If you are not 100% satisfied with your purchase, you can return or exchange any unworn item within 30 days of delivery. Refunds are credited to your original payment method within 3–5 working days.',
    },
    support: {
      title: '24/7 Customer Care',
      content: 'Our team is here to assist you anytime. Email us at support@shopkart.com or chat with our automated assistant for instant help with your orders and deliveries.',
    },
    privacy: {
      title: 'Privacy Policy',
      content: 'Your privacy and security are paramount. We use industry-standard 256-bit SSL encryption. We never sell or share your personal details with third-party marketers.',
    },
    terms: {
      title: 'Terms of Service',
      content: 'All products listed on ShopKart are authentic and guaranteed. Orders placed on the platform are subject to our verified merchant agreements and buyer protection policies.',
    },
    cookies: {
      title: 'Cookie Preferences',
      content: 'We use necessary cookies for session authentication, shopping cart persistence, and preference storage to ensure the best browsing experience.',
    },
  };

  return (
    <footer className="bg-[#0f172a] text-gray-300 mt-20 border-t border-gray-800 relative">
      {/* Policy / Info Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white text-gray-900 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-3 text-[#f06e38]">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="text-lg font-bold text-gray-900">{modalContent[activeModal]?.title}</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              {modalContent[activeModal]?.content}
            </p>
            <button
              onClick={() => setActiveModal(null)}
              className="w-full bg-[#f06e38] hover:bg-[#d95d2c] text-white py-2.5 rounded-xl font-medium text-sm transition-colors cursor-pointer shadow-sm"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* Top Value Proposition Bar */}
      <div className="border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 p-3 rounded-xl bg-gray-900/40">
              <div className="w-12 h-12 rounded-xl bg-[#f06e38]/10 flex items-center justify-center text-[#f06e38] flex-shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Free Express Shipping</h4>
                <p className="text-xs text-gray-400 mt-0.5">On all domestic orders over $50</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4 p-3 rounded-xl bg-gray-900/40">
              <div className="w-12 h-12 rounded-xl bg-[#f06e38]/10 flex items-center justify-center text-[#f06e38] flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Secure Payment</h4>
                <p className="text-xs text-gray-400 mt-0.5">Razorpay & 256-bit SSL secured</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4 p-3 rounded-xl bg-gray-900/40">
              <div className="w-12 h-12 rounded-xl bg-[#f06e38]/10 flex items-center justify-center text-[#f06e38] flex-shrink-0">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">30-Day Easy Returns</h4>
                <p className="text-xs text-gray-400 mt-0.5">Hassle-free money back guarantee</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4 p-3 rounded-xl bg-gray-900/40">
              <div className="w-12 h-12 rounded-xl bg-[#f06e38]/10 flex items-center justify-center text-[#f06e38] flex-shrink-0">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">100% Authentic</h4>
                <p className="text-xs text-gray-400 mt-0.5">Directly sourced premium goods</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 inline-flex">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#f06e38] to-[#ff8c5a] flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                Shop<span className="text-[#f06e38]">Kart</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Your destination for handpicked premium apparel, luxury accessories, and modern essentials. Designed for those who value quality and effortless style.
            </p>
            
            {/* Newsletter input */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Subscribe for 15% off</p>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-10 pr-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#f06e38] transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#f06e38] hover:bg-[#d95d2c] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-orange-500/20"
                >
                  Join
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              {subscribed && (
                <p className="text-xs text-green-400 mt-2 font-medium">
                  🎉 Thank you for subscribing! Your discount code is on its way.
                </p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Shop</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-[#f06e38] transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-[#f06e38] transition-colors">
                  Spring Fashion
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-[#f06e38] transition-colors">
                  Luxury Watches
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-[#f06e38] transition-colors">
                  Home Essentials
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-400 hover:text-[#f06e38] transition-colors">
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Customer Care</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/orders" className="text-gray-400 hover:text-[#f06e38] transition-colors">
                  Track Your Orders
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-[#f06e38] transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveModal('shipping')}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveModal('returns')}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  Returns & Refunds
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveModal('support')}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer text-left"
                >
                  24/7 Live Support
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Guarantee */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Why ShopKart</h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f06e38]"></span>
                Curated collections
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f06e38]"></span>
                Verified quality checks
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f06e38]"></span>
                Instant Razorpay checkout
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f06e38]"></span>
                50,000+ satisfied shoppers
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800/80 bg-gray-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ShopKart Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setActiveModal('privacy')}
              className="hover:text-gray-400 cursor-pointer transition-colors"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('terms')}
              className="hover:text-gray-400 cursor-pointer transition-colors"
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('cookies')}
              className="hover:text-gray-400 cursor-pointer transition-colors"
            >
              Cookie Preferences
            </button>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for modern shoppers
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
