import mongoose from 'mongoose';
import Product from '../models/productModel';


const products = [
 {
    "name": "ASUS ROG Strix G16",
    "description": "16-inch gaming laptop with RTX 4070, Intel i7-13650HX, 16GB DDR5, 1TB SSD",
    "price": 142990,
    "category": "computer",
    "images": ["https://example.com/rog-g16-1.jpg", "https://example.com/rog-g16-2.jpg"],
    "stock": 18,
    "oldPrice": 159990,
    "discount": 11,
    "isNewArrival": true,
    "rating": 4.7,
    "reviews": 142
  },
  {
    "name": "iPhone 16 Pro Max 256GB",
    "description": "Titanium finish, A18 Pro chip, 48MP triple camera, 6.9-inch display",
    "price": 144900,
    "category": "phone",
    "images": ["https://example.com/iphone16promax-1.jpg"],
    "stock": 34,
    "oldPrice": 0,
    "discount": 0,
    "isNewArrival": true,
    "rating": 4.8,
    "reviews": 389
  },
  {
    "name": "Samsung Galaxy Watch 7 44mm",
    "description": "AMOLED display, AI health tracking, Wear OS 5, Sapphire crystal",
    "price": 28999,
    "category": "smartWatch",
    "images": ["https://example.com/gw7-1.jpg", "https://example.com/gw7-2.jpg"],
    "stock": 62,
    "oldPrice": 32999,
    "discount": 12,
    "rating": 4.6,
    "reviews": 214
  },
  {
    "name": "Sony Alpha 7 IV Mirrorless Camera",
    "description": "33MP full-frame, 4K 60p, Real-time Eye AF, 10fps burst",
    "price": 219990,
    "category": "Camera",
    "images": ["https://example.com/a7iv-1.jpg", "https://example.com/a7iv-2.jpg", "https://example.com/a7iv-3.jpg"],
    "stock": 9,
    "oldPrice": 249990,
    "discount": 12,
    "rating": 4.9,
    "reviews": 187
  },
  {
    "name": "Sony WH-1000XM5 Wireless Headphones",
    "description": "Industry-leading noise cancellation, 30-hour battery, LDAC support",
    "price": 29990,
    "category": "Headphone",
    "images": ["https://example.com/xm5-1.jpg"],
    "stock": 45,
    "oldPrice": 34990,
    "discount": 14,
    "rating": 4.8,
    "reviews": 521
  },
  {
    "name": "Logitech G Pro X Superlight 2",
    "description": "Wireless gaming mouse, 63g ultra-light, HERO 2 sensor, 4000Hz",
    "price": 13999,
    "category": "Gaming",
    "images": ["https://example.com/superlight2-1.jpg"],
    "stock": 73,
    "oldPrice": 15999,
    "discount": 13,
    "rating": 4.7,
    "reviews": 312
  },
  {
    "name": "MacBook Air M3 13-inch",
    "description": "M3 chip, 16GB RAM, 512GB SSD, Liquid Retina display",
    "price": 114900,
    "category": "computer",
    "images": ["https://example.com/mba-m3-1.jpg", "https://example.com/mba-m3-2.jpg"],
    "stock": 22,
    "oldPrice": 124900,
    "discount": 8,
    "isNewArrival": true,
    "rating": 4.8,
    "reviews": 198
  },
  {
    "name": "Google Pixel 9 Pro",
    "description": "50MP triple camera, Tensor G4, 6.3-inch OLED 120Hz",
    "price": 99900,
    "category": "phone",
    "images": ["https://example.com/pixel9pro-1.jpg"],
    "stock": 41,
    "oldPrice": 109900,
    "discount": 9,
    "isNewArrival": true,
    "rating": 4.6,
    "reviews": 167
  },
  {
    "name": "Apple Watch Ultra 2",
    "description": "Titanium case, S9 SiP, 3000 nits display, Precision dual-frequency GPS",
    "price": 89900,
    "category": "smartWatch",
    "images": ["https://example.com/ultra2-1.jpg"],
    "stock": 28,
    "oldPrice": 0,
    "discount": 0,
    "isNewArrival": false,
    "rating": 4.7,
    "reviews": 304
  },
  {
    "name": "Canon EOS R6 Mark II",
    "description": "24.2MP, 40fps electronic shutter, 6K RAW video, Dual Pixel AF II",
    "price": 214990,
    "category": "Camera",
    "images": ["https://example.com/r6m2-1.jpg", "https://example.com/r6m2-2.jpg"],
    "stock": 11,
    "oldPrice": 239990,
    "discount": 10,
    "rating": 4.8,
    "reviews": 96
  },

  {
    "name": "OnePlus Nord Buds 3 Pro",
    "description": "49dB ANC, 12.4mm driver, 44-hour playback, Spatial Audio",
    "price": 2999,
    "category": "Headphone",
    "images": ["https://example.com/nordbuds3pro-1.jpg"],
    "stock": 184,
    "oldPrice": 3299,
    "discount": 9,
    "rating": 4.4,
    "reviews": 842
  },
  {
    "name": "Razer BlackWidow V4 Pro",
    "description": "Mechanical keyboard, Green switches, RGB per-key, 8 macro keys",
    "price": 22999,
    "category": "Gaming",
    "images": ["https://example.com/blackwidow-v4-1.jpg"],
    "stock": 37,
    "oldPrice": 26999,
    "discount": 15,
    "rating": 4.6,
    "reviews": 231
  },
  {
    "name": "Dell XPS 14 9440",
    "description": "14.5\" OLED touch, Intel Ultra 7, RTX 4050, 32GB RAM, 1TB",
    "price": 189990,
    "category": "computer",
    "images": ["https://example.com/xps14-1.jpg"],
    "stock": 14,
    "oldPrice": 209990,
    "discount": 10,
    "isNewArrival": true,
    "rating": 4.7,
    "reviews": 89
  },
  {
    "name": "Nothing Phone (2a) Plus",
    "description": "6.7\" AMOLED 120Hz, Dimensity 7350 Pro, Glyph interface",
    "price": 27999,
    "category": "phone",
    "images": ["https://example.com/nothing2aplus-1.jpg"],
    "stock": 68,
    "oldPrice": 29999,
    "discount": 7,
    "rating": 4.5,
    "reviews": 543
  },
  {
    "name": "Garmin Venu 3",
    "description": "AMOLED display, Advanced sleep coaching, ECG, 14-day battery",
    "price": 44990,
    "category": "smartWatch",
    "images": ["https://example.com/venu3-1.jpg"],
    "stock": 31,
    "oldPrice": 47990,
    "discount": 6,
    "rating": 4.6,
    "reviews": 176
  },
  {"name":"ASUS ROG Strix G16","description":"16-inch gaming laptop RTX 4070 i7-13650HX 16GB 1TB","price":142990,"category":"computer","images":["rog-g16-1.jpg","rog-g16-2.jpg"],"stock":18,"oldPrice":159990,"discount":11,"isNewArrival":true,"rating":4.7,"reviews":142},
  {"name":"iPhone 16 Pro Max 256GB","description":"A18 Pro • 48MP triple camera • 6.9-inch","price":144900,"category":"phone","images":["iphone16promax.jpg"],"stock":34,"oldPrice":0,"discount":0,"isNewArrival":true,"rating":4.8,"reviews":389},
  {"name":"Samsung Galaxy Watch 7 44mm","description":"AMOLED • AI Health • Wear OS 5","price":28999,"category":"smartWatch","images":["gw7-1.jpg"],"stock":62,"oldPrice":32999,"discount":12,"rating":4.6,"reviews":214},
  {"name":"Sony WH-1000XM5","description":"Best ANC • 30h battery • LDAC","price":29990,"category":"Headphone","images":["xm5.jpg"],"stock":45,"oldPrice":34990,"discount":14,"rating":4.8,"reviews":521},
  {"name":"Logitech G Pro X Superlight 2","description":"63g • HERO 2 • 4000Hz polling","price":13999,"category":"Gaming","images":["superlight2.jpg"],"stock":73,"oldPrice":15999,"discount":13,"rating":4.7,"reviews":312},
  {"name":"MacBook Air M3 13","description":"M3 • 16/512GB • Liquid Retina","price":114900,"category":"computer","images":["mba-m3.jpg"],"stock":22,"oldPrice":124900,"discount":8,"isNewArrival":true,"rating":4.8,"reviews":198},
  {"name":"Canon EOS R6 Mark II","description":"40fps • 6K RAW • Dual Pixel AF II","price":214990,"category":"Camera","images":["r6m2.jpg"],"stock":11,"oldPrice":239990,"discount":10,"rating":4.8,"reviews":96},
  {"name":"OnePlus Nord Buds 3 Pro","description":"49dB ANC • 44h playback","price":2999,"category":"Headphone","images":["nordbuds3pro.jpg"],"stock":184,"oldPrice":3299,"discount":9,"rating":4.4,"reviews":842},
  {"name":"Razer BlackWidow V4 Pro","description":"Green switches • RGB • 8 macro keys","price":22999,"category":"Gaming","images":["blackwidow-v4.jpg"],"stock":37,"oldPrice":26999,"discount":15,"rating":4.6,"reviews":231},
  {"name":"Google Pixel 9 Pro","description":"Tensor G4 • 50MP triple • 120Hz OLED","price":99900,"category":"phone","images":["pixel9pro.jpg"],"stock":41,"oldPrice":109900,"discount":9,"isNewArrival":true,"rating":4.6,"reviews":167}

];

async function seedProducts() {
  try {
   
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');

  

    const inserted = await Product.insertMany(products, {
      ordered: false,         
    });

    console.log(`Successfully inserted ${inserted.length} products`);

  } catch (err) {
    console.error("Error during insertMany:", err);

    if (err.writeErrors) {
      console.log("Write errors:", err.writeErrors.length);
      err.writeErrors.forEach(e => console.log(e.err.errmsg));
    }
  } finally {
    mongoose.connection.close();
  }
}

seedProducts();