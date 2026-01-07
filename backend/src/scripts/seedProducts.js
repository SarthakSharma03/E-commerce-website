import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../../models/productModel.js';
import  productImg from '../images/product.jpg'
import ps5 from '../images/ps-5.jpg'
import speakers from '../images/speakers.avif'
import perfume from '../images/perfume.webp'
import womenFashion from '../images/womenFashion.jpg'

dotenv.config();

const products = [
    {
    id: 101,
    title: 'Fleece Hoodie',
    image: productImg,
    price: 49,
    oldPrice: 69,
    rating: 4.1,
    reviews: 88,
    description: "Stay warm and stylish with this premium fleece hoodie. Made from soft, breathable material, it's perfect for everyday wear. Features a kangaroo pocket and adjustable drawstring hood.",
    colors: ['#e11d48', '#000000'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 102,
    title: 'Sneakers',
    image: productImg,
    price: 89,
    oldPrice: 119,
    rating: 4.4,
    reviews: 120,
    description: "Experience ultimate comfort with our latest sneakers. Designed for both running and casual wear, these shoes feature a cushioned sole and breathable mesh upper.",
    colors: ['#ffffff', '#000000'],
    sizes: ['40', '41', '42', '43', '44']
  },
  {
    id: 103,
    title: 'Wireless Earbuds',
    image: productImg,
    price: 59,
    rating: 4.3,
    reviews: 45,
    description: "Crystal clear sound with active noise cancellation. These wireless earbuds offer up to 24 hours of battery life with the charging case. Sweat and water-resistant.",
    colors: ['#000000', '#ffffff'],
    sizes: []
  },
  {
    id: 104,
    title: 'Smart Lamp',
    image: productImg,
    price: 39,
    rating: 4.0,
    reviews: 30,
    description: "Control your lighting with voice commands or via app. This smart lamp offers 16 million colors and adjustable brightness. Compatible with Google Home and Alexa.",
    colors: ['#ffffff'],
    sizes: []
  },
  {
    id: 201,
    title: 'PlayStation 5',
    image: ps5,
    price: 499,
    rating: 4.9,
    reviews: 500,
    description: "The latest console from Sony features lightning-fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback, adaptive triggers, and 3D Audio.",
    colors: ['#ffffff'],
    sizes: []
  },
  {
    id: 202,
    title: 'Women’s Collections',
    image: womenFashion,
    price: 120,
    rating: 4.5,
    reviews: 76,
    description: "Elegant and trendy collection for women. Includes a variety of styles suitable for any occasion.",
    colors: ['#000000', '#e11d48'],
    sizes: ['S', 'M', 'L']
  },
  {
    id: 203,
    title: 'Speakers',
    image: speakers,
    price: 199,
    rating: 4.6,
    reviews: 90,
    description: "High-fidelity sound for your home. These speakers deliver deep bass and crisp highs.",
    colors: ['#000000'],
    sizes: []
  },
  {
    id: 204,
    title: 'Perfume',
    image: perfume,
    price: 85,
    rating: 4.7,
    reviews: 150,
    description: "A long-lasting fragrance that captivates the senses. Perfect for evening wear.",
    colors: [],
    sizes: ['50ml', '100ml']
  },
  {
    id: 205,
    title: 'Denim Jacket',
    image: productImg,
    price: 99,
    oldPrice: 129,
    rating: 4.3,
    reviews: 64,
    description: 'Classic denim jacket with a modern fit. Durable fabric suitable for all seasons.',
    colors: ['#000000', '#1e40af'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 206,
    title: 'Running Shoes',
    image: productImg,
    price: 110,
    oldPrice: 150,
    rating: 4.6,
    reviews: 140,
    description: 'Lightweight running shoes with shock absorption and breathable design.',
    colors: ['#000000', '#ffffff'],
    sizes: ['40', '41', '42', '43', '44']
  },
  {
    id: 207,
    title: 'Bluetooth Headphones',
    image: productImg,
    price: 79,
    rating: 4.2,
    reviews: 89,
    description: 'Over-ear headphones with deep bass and noise isolation.',
    colors: ['#000000'],
    sizes: []
  },
  {
    id: 208,
    title: 'Gaming Chair',
    image: productImg,
    price: 249,
    rating: 4.7,
    reviews: 210,
    description: 'Ergonomic gaming chair with lumbar support and adjustable height.',
    colors: ['#000000', '#dc2626'],
    sizes: []
  },
  {
    id: 209,
    title: 'Smart Watch',
    image: productImg,
    price: 199,
    oldPrice: 249,
    rating: 4.4,
    reviews: 180,
    description: 'Track your fitness, heart rate, and notifications on the go.',
    colors: ['#000000', '#ffffff'],
    sizes: []
  },
  {
    id: 210,
    title: 'Casual T-Shirt',
    image: productImg,
    price: 29,
    rating: 4.1,
    reviews: 56,
    description: 'Soft cotton T-shirt perfect for everyday comfort.',
    colors: ['#ffffff', '#000000', '#e11d48'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 211,
    title: 'Leather Wallet',
    image: productImg,
    price: 45,
    rating: 4.5,
    reviews: 98,
    description: 'Premium leather wallet with multiple card slots.',
    colors: ['#000000', '#78350f'],
    sizes: []
  },
  {
    id: 212,
    title: 'Office Backpack',
    image: productImg,
    price: 89,
    rating: 4.6,
    reviews: 134,
    description: 'Spacious backpack with laptop compartment and water-resistant fabric.',
    colors: ['#000000'],
    sizes: []
  },
  {
    id: 213,
    title: 'Wireless Mouse',
    image: productImg,
    price: 35,
    rating: 4.2,
    reviews: 75,
    description: 'Ergonomic wireless mouse with adjustable DPI.',
    colors: ['#000000'],
    sizes: []
  },
  {
    id: 214,
    title: 'Mechanical Keyboard',
    image: productImg,
    price: 129,
    rating: 4.8,
    reviews: 260,
    description: 'RGB mechanical keyboard with tactile switches.',
    colors: ['#000000'],
    sizes: []
  },
  {
    id: 215,
    title: 'Winter Coat',
    image: productImg,
    price: 179,
    oldPrice: 219,
    rating: 4.5,
    reviews: 102,
    description: 'Insulated winter coat designed for extreme cold.',
    colors: ['#000000', '#1e293b'],
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 216,
    title: 'Yoga Mat',
    image: productImg,
    price: 39,
    rating: 4.4,
    reviews: 67,
    description: 'Non-slip yoga mat with excellent cushioning.',
    colors: ['#7c3aed', '#22c55e'],
    sizes: []
  },
  {
    id: 217,
    title: 'Sunglasses',
    image: productImg,
    price: 59,
    rating: 4.3,
    reviews: 88,
    description: 'UV-protected sunglasses with stylish frame.',
    colors: ['#000000'],
    sizes: []
  },
  {
    id: 218,
    title: 'Formal Shoes',
    image: productImg,
    price: 120,
    rating: 4.5,
    reviews: 73,
    description: 'Elegant formal shoes made from genuine leather.',
    colors: ['#000000'],
    sizes: ['40', '41', '42', '43', '44']
  },
  {
    id: 219,
    title: 'Smart TV 55"',
    image: productImg,
    price: 699,
    rating: 4.7,
    reviews: 340,
    description: 'Ultra HD Smart TV with HDR and built-in streaming apps.',
    colors: ['#000000'],
    sizes: []
  },
  {
    id: 220,
    title: 'Coffee Maker',
    image: productImg,
    price: 149,
    rating: 4.4,
    reviews: 92,
    description: 'Brew rich and flavorful coffee at home.',
    colors: ['#000000', '#ffffff'],
    sizes: []
  },
  {
    id: 221,
    title: 'Air Fryer',
    image: productImg,
    price: 179,
    rating: 4.6,
    reviews: 160,
    description: 'Cook crispy meals with little to no oil.',
    colors: ['#000000'],
    sizes: []
  },
  {
    id: 222,
    title: 'Bedside Table Lamp',
    image: productImg,
    price: 49,
    rating: 4.1,
    reviews: 34,
    description: 'Minimalist bedside lamp with warm lighting.',
    colors: ['#ffffff'],
    sizes: []
  },
  {
    id: 223,
    title: 'Power Bank 20000mAh',
    image: productImg,
    price: 59,
    rating: 4.5,
    reviews: 210,
    description: 'High-capacity power bank with fast charging support.',
    colors: ['#000000'],
    sizes: []
  },
  {
    id: 224,
    title: 'Wireless Charger',
    image: productImg,
    price: 39,
    rating: 4.2,
    reviews: 66,
    description: 'Fast wireless charging pad compatible with multiple devices.',
    colors: ['#000000'],
    sizes: []
  },
  {
    id: 225,
    title: 'Travel Duffel Bag',
    image: productImg,
    price: 99,
    rating: 4.4,
    reviews: 58,
    description: 'Durable duffel bag perfect for weekend trips.',
    colors: ['#000000'],
    sizes: []
  },
  {
    id: 226,
    title: 'Men’s Watch',
    image: productImg,
    price: 159,
    rating: 4.6,
    reviews: 120,
    description: 'Classic analog watch with stainless steel strap.',
    colors: ['#000000'],
    sizes: []
  },
  {
    id: 227,
    title: 'Hair Dryer',
    image: productImg,
    price: 69,
    rating: 4.3,
    reviews: 77,
    description: 'Powerful hair dryer with heat control.',
    colors: ['#000000'],
    sizes: []
  },
  {
    id: 228,
    title: 'Electric Kettle',
    image: productImg,
    price: 49,
    rating: 4.2,
    reviews: 51,
    description: 'Fast boiling electric kettle with auto shut-off.',
    colors: ['#ffffff'],
    sizes: []
  },
  {
    id: 229,
    title: 'Home Office Desk',
    image: productImg,
    price: 299,
    rating: 4.7,
    reviews: 84,
    description: 'Spacious desk designed for productivity.',
    colors: ['#000000'],
    sizes: []
  },
  {
    id: 230,
    title: 'Floor Carpet',
    image: productImg,
    price: 139,
    rating: 4.4,
    reviews: 46,
    description: 'Soft and durable carpet for living rooms.',
    colors: ['#a16207'],
    sizes: []
  },
  {
    id: 231,
    title: 'Wall Clock',
    image: productImg,
    price: 29,
    rating: 4.0,
    reviews: 22,
    description: 'Modern wall clock with silent movement.',
    colors: ['#000000'],
    sizes: []
  },
  {
    id: 232,
    title: 'Desk Organizer',
    image: productImg,
    price: 25,
    rating: 4.1,
    reviews: 19,
    description: 'Keep your workspace tidy and organized.',
    colors: ['#000000'],
    sizes: []
  },
  {
    id: 233,
    title: 'Bluetooth Speaker Mini',
    image: speakers,
    price: 79,
    rating: 4.5,
    reviews: 132,
    description: 'Portable speaker with powerful sound and long battery life.',
    colors: ['#000000'],
    sizes: []
  },
  {
    id: 234,
    title: 'Luxury Perfume',
    image: perfume,
    price: 120,
    rating: 4.8,
    reviews: 190,
    description: 'Premium fragrance with long-lasting notes.',
    colors: [],
    sizes: ['50ml', '100ml']
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    await Product.deleteMany({});
    console.log('Products cleared');

    const transformed = products.map(p => ({
      name: p.title ?? p.name ?? 'Product',
      description: p.description ?? '',
      price: p.price ?? 0,
      category: p.category ?? 'General',
      image: p.image,
      stock: typeof p.stock === 'number' ? p.stock : 0,
      oldPrice: typeof p.oldPrice === 'number' ? p.oldPrice : undefined,
      discount: typeof p.discount === 'number' ? p.discount : 0,
      isNewArrival: !!p.isNewArrival,
      rating: typeof p.rating === 'number' ? p.rating : 0,
      reviews: typeof p.reviews === 'number' ? p.reviews : 0,
    }));
    await Product.insertMany(transformed);
    console.log('Products seeded successfully');

    process.exit();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
