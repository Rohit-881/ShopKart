import { Truck, ShieldCheck, HeadphonesIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="w-full h-2/3 py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#efefef] rounded-[2rem] grid grid-cols-1 md:grid-cols-2 w-full shadow-sm overflow-hidden">
          {/* Text Content */}
          <div className="p-10 md:p-16 lg:p-24 flex flex-col justify-center items-start">
            <h1 className="text-5xl lg:text-7xl font-serif text-[#0f172a] mb-6 leading-[1.1] tracking-tight">
              Discover Your<br />Style
            </h1>
            <p className="text-lg lg:text-xl text-gray-500 mb-10">
              Shop the latest trends & exclusive offers
            </p>
            <button className="bg-[#f06e38] hover:bg-[#d95d2c] text-white px-10 py-3.5 rounded-xl font-medium text-lg transition-colors shadow-sm cursor-pointer">
              Shop Now
            </button>
          </div>

          {/* Image Content with padding */}
          <div className="p-4 md:p-6 lg:p-8 flex">
            <img
              src="/hero.jpg"
              alt="Fashion Model"
              className="w-full h-[400px] md:h-[300px] lg:h-[350px] object-cover object-center rounded-[1.5rem] shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="flex flex-col items-center justify-center pt-4 md:pt-0">
              <Truck className="w-8 h-8 text-gray-700 mb-3" strokeWidth={1.5} />
              <h3 className="text-sm font-semibold text-gray-900">Free Shipping</h3>
            </div>
            <div className="flex flex-col items-center justify-center pt-4 md:pt-0">
              <ShieldCheck className="w-8 h-8 text-gray-700 mb-3" strokeWidth={1.5} />
              <h3 className="text-sm font-semibold text-gray-900">Secure Checkout</h3>
            </div>
            <div className="flex flex-col items-center justify-center pt-4 md:pt-0">
              <HeadphonesIcon className="w-8 h-8 text-gray-700 mb-3" strokeWidth={1.5} />
              <h3 className="text-sm font-semibold text-gray-900">24/7 Support</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-gray-900">Featured Collections</h2>
          <div className="w-16 h-1 bg-brand-600 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden bg-gray-100 aspect-square rounded-sm mb-4">
              <img
                src="/spring.jpg"
                alt="Spring Fashion"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-center text-lg font-medium text-gray-900">Spring Fashion</h3>
          </div>

          {/* Card 2 */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden bg-gray-100 aspect-square rounded-sm mb-4">
              <img
                src="/watches.jpg"
                alt="Luxury Watches"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-center text-lg font-medium text-gray-900">Luxury Watches</h3>
          </div>

          {/* Card 3 */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden bg-gray-100 aspect-square rounded-sm mb-4">
              <img
                src="/home.jpg"
                alt="Home Essentials"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-center text-lg font-medium text-gray-900">Home Essentials</h3>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
