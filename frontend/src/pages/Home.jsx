import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, HeadphonesIcon, RotateCcw, Sparkles, ArrowRight, Star, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="w-full py-6 md:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#f6f6f7] via-[#efefef] to-[#e8e9ec] rounded-[2.5rem] grid grid-cols-1 md:grid-cols-2 w-full shadow-sm border border-gray-200/60 overflow-hidden relative">
          
          {/* Subtle background glow circle */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Text Content */}
          <div className="p-8 sm:p-12 md:p-14 lg:p-20 flex flex-col justify-center items-start relative z-10">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-orange-200/60 text-[#f06e38] text-xs sm:text-sm font-semibold mb-6 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#f06e38]" />
              <span>Spring & Summer 2026 Collection</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#0f172a] mb-5 leading-[1.1] tracking-tight">
              Discover Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-[#f06e38] to-[#d95d2c]">
                Signature Style
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-md leading-relaxed">
              Shop curated contemporary fashion, luxury timepieces, and modern living essentials designed for effortless elegance.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="bg-[#f06e38] hover:bg-[#d95d2c] text-white px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <a
                href="#collections"
                className="bg-white/80 hover:bg-white text-gray-800 border border-gray-300/80 px-7 py-3.5 rounded-xl font-medium text-base transition-all hover:shadow-xs inline-flex items-center gap-2 cursor-pointer"
              >
                Explore Collections
              </a>
            </div>

            {/* Micro Trust Proof */}
            <div className="mt-10 pt-6 border-t border-gray-300/60 w-full flex items-center gap-6 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Authentic</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Express Shipping</span>
              </div>
            </div>
          </div>

          {/* Image Content with Badges */}
          <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center relative">
            <div className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] rounded-[2rem] overflow-hidden shadow-xl border border-white/50">
              <img
                src="/hero.jpg"
                alt="Fashion Model Collection"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

              {/* Floating Review Badge */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-lg border border-white/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#f06e38] flex-shrink-0">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-gray-900">4.9 / 5.0</span>
                    <span className="text-[10px] text-gray-500">• 50k+ Happy Customers</span>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">Top Rated Online Store</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Features Bar (4 Key Pillars) */}
      <section className="bg-white py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/70 border border-gray-200/50 hover:border-orange-200 hover:bg-orange-50/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-gray-100 flex items-center justify-center text-[#f06e38] flex-shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Free Express Shipping</h3>
                <p className="text-xs text-gray-500 mt-0.5">Complimentary for orders over $50</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/70 border border-gray-200/50 hover:border-orange-200 hover:bg-orange-50/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-gray-100 flex items-center justify-center text-[#f06e38] flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">100% Secure Checkout</h3>
                <p className="text-xs text-gray-500 mt-0.5">Protected by Razorpay & SSL</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/70 border border-gray-200/50 hover:border-orange-200 hover:bg-orange-50/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-gray-100 flex items-center justify-center text-[#f06e38] flex-shrink-0">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">30-Day Easy Returns</h3>
                <p className="text-xs text-gray-500 mt-0.5">Hassle-free return policy</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/70 border border-gray-200/50 hover:border-orange-200 hover:bg-orange-50/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-gray-100 flex items-center justify-center text-[#f06e38] flex-shrink-0">
                <HeadphonesIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">24/7 Dedicated Care</h3>
                <p className="text-xs text-gray-500 mt-0.5">Always ready to assist you</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Collections Section */}
      <section id="collections" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#f06e38] mb-2">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Curated Selection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 tracking-tight">Featured Collections</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-md">Discover handpicked styles designed for modern tastes and everyday comfort.</p>
          </div>
          <Link
            to="/products"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-[#f06e38] hover:text-[#d95d2c] transition-colors group"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <Link to="/products" className="group cursor-pointer block rounded-3xl overflow-hidden bg-white border border-gray-200/70 shadow-xs hover:shadow-xl transition-all duration-300">
            <div className="relative overflow-hidden aspect-[4/5]">
              <img
                src="/spring.jpg"
                alt="Spring Fashion"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-gray-900 shadow-xs">
                New Season
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-serif font-semibold mb-1 group-hover:text-orange-300 transition-colors">
                  Spring Fashion
                </h3>
                <p className="text-gray-200 text-xs sm:text-sm line-clamp-2 mb-3">
                  Lightweight apparel, chic silhouettes, and seasonal essentials.
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-300 group-hover:translate-x-1 transition-transform">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 2 */}
          <Link to="/products" className="group cursor-pointer block rounded-3xl overflow-hidden bg-white border border-gray-200/70 shadow-xs hover:shadow-xl transition-all duration-300">
            <div className="relative overflow-hidden aspect-[4/5]">
              <img
                src="/watches.jpg"
                alt="Luxury Watches"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-gray-900 shadow-xs">
                Craftsmanship
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-serif font-semibold mb-1 group-hover:text-orange-300 transition-colors">
                  Luxury Watches
                </h3>
                <p className="text-gray-200 text-xs sm:text-sm line-clamp-2 mb-3">
                  Precision chronographs and statement timepieces built to last.
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-300 group-hover:translate-x-1 transition-transform">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 3 */}
          <Link to="/products" className="group cursor-pointer block rounded-3xl overflow-hidden bg-white border border-gray-200/70 shadow-xs hover:shadow-xl transition-all duration-300">
            <div className="relative overflow-hidden aspect-[4/5]">
              <img
                src="/home.jpg"
                alt="Home Essentials"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-gray-900 shadow-xs">
                Minimalist Living
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-serif font-semibold mb-1 group-hover:text-orange-300 transition-colors">
                  Home Essentials
                </h3>
                <p className="text-gray-200 text-xs sm:text-sm line-clamp-2 mb-3">
                  Modern décor accents and functional designs for comfortable living.
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-300 group-hover:translate-x-1 transition-transform">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </Link>

        </div>
      </section>

      {/* Social Proof & Customer Reviews */}
      <section className="bg-gray-50/80 py-20 border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-1 text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <h2 className="text-3xl font-serif text-gray-900 mb-3">Loved by Shoppers Worldwide</h2>
            <p className="text-gray-600 text-sm">Read real feedback from verified customers who shop with ShopKart every day.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-7 rounded-2xl border border-gray-200/70 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                "The fabric quality and craftsmanship are genuinely premium. Arrived within two days and fits true to size. Couldn't be happier!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-orange-100 text-[#f06e38] font-bold text-xs flex items-center justify-center">
                  SM
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Sophia Martinez</h4>
                  <p className="text-[11px] text-emerald-600 font-medium">Verified Customer</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-gray-200/70 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                "The luxury chronograph watch looks even more striking in person. Seamless payment with Razorpay and quick order tracking."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 font-bold text-xs flex items-center justify-center">
                  DR
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">David Reynolds</h4>
                  <p className="text-[11px] text-emerald-600 font-medium">Verified Customer</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-gray-200/70 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                "ShopKart has made online shopping enjoyable again. Great selection, transparent delivery updates, and exceptional customer care."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-600 font-bold text-xs flex items-center justify-center">
                  AK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Ananya Kapoor</h4>
                  <p className="text-[11px] text-emerald-600 font-medium">Verified Customer</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Modern Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-gray-900 via-[#1e293b] to-gray-900 rounded-[2.5rem] p-10 sm:p-14 text-center text-white relative overflow-hidden shadow-xl">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#f06e38]/20 rounded-full blur-2xl pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Ready to Elevate Your Style?</h2>
            <p className="text-gray-300 text-sm sm:text-base mb-8">
              Explore our full collection today with fast shipping, secure payment options, and hassle-free 30-day returns.
            </p>
            <Link
              to="/products"
              className="bg-[#f06e38] hover:bg-[#d95d2c] text-white px-9 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
