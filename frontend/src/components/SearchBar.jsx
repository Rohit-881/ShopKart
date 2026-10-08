import { Search } from 'lucide-react';

const SearchBar = ({ search, setSearch, category, setCategory, sort, setSort }) => {
  const categories = [
    { label: 'Beauty & Personal Care', value: 'beauty' },
    { label: 'Fragrances', value: 'fragrances' },
    { label: 'Furniture', value: 'furniture' },
    { label: 'Groceries', value: 'groceries' },
    { label: 'Home Decoration', value: 'home-decoration' },
    { label: 'Kitchen Accessories', value: 'kitchen-accessories' },
    { label: 'Laptops', value: 'laptops' },
    { label: "Men's Shirts", value: 'mens-shirts' },
    { label: "Men's Shoes", value: 'mens-shoes' },
    { label: "Toys & Games", value: 'toys' },
    { label: "Books", value: 'books' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      {/* Search Input */}
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f06e38]"
        />
        <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Category Dropdown */}
      <div className="w-full md:w-64">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f06e38] bg-white cursor-pointer"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>

      {/* Sort Dropdown */}
      <div className="w-full md:w-48">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f06e38] bg-white cursor-pointer"
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
