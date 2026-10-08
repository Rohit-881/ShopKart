import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/product.model.js';

dotenv.config();

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shopkart');
    console.log('Connected to MongoDB');

    // Fetch data from DummyJSON API
    console.log('Fetching products from DummyJSON API...');
    const response = await fetch('https://dummyjson.com/products?limit=100');
    const data = await response.json();
    const dummyProducts = data.products;

    console.log(`Fetched ${dummyProducts.length} products. Inserting into database...`);

    // Map and prepare data
    const productsToInsert = dummyProducts.map((p) => ({
      name: p.title,
      description: p.description,
      // DummyJSON price is in USD, multiply by 80 for INR
      price: Math.round(p.price * 80),
      category: p.category,
      // DummyJSON provides thumbnail or images array
      image: p.thumbnail || (p.images && p.images[0]) || 'https://via.placeholder.com/600x600?text=No+Image',
      stock: p.stock > 0 ? p.stock : Math.floor(Math.random() * 50) + 10,
    }));

    // Generate 15 Dummy Toy Products
    const toyProducts = Array.from({ length: 15 }).map((_, index) => ({
      name: `Awesome Toy Model ${index + 1}`,
      description: `A fantastic and fun toy for kids of all ages. Model ${index + 1} features interactive elements and safe materials.`,
      price: Math.floor(Math.random() * 2000) + 500, // INR 500 to 2500
      category: 'toys',
      image: `https://via.placeholder.com/600x600?text=Toy+Model+${index + 1}`,
      stock: Math.floor(Math.random() * 100) + 20,
    }));

    // Generate 10 Dummy Books
    const bookProducts = Array.from({ length: 10 }).map((_, index) => ({
      name: `Bestseller Book Vol ${index + 1}`,
      description: `An engaging and thrilling read that will keep you on the edge of your seat. Volume ${index + 1}.`,
      price: Math.floor(Math.random() * 800) + 200, // INR 200 to 1000
      category: 'books',
      image: `https://via.placeholder.com/600x600?text=Book+Vol+${index + 1}`,
      stock: Math.floor(Math.random() * 50) + 10,
    }));

    // Combine all products
    const allProducts = [...productsToInsert, ...toyProducts, ...bookProducts];

    // Clear existing products so we don't mix old fakestoreapi products with new ones
    console.log('Clearing old products from database...');
    await Product.deleteMany({});
    
    // Insert into DB
    await Product.insertMany(allProducts);
    console.log('Products seeded successfully!');

    process.exit();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
