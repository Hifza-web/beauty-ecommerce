const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const Product = require("./models/Product");

// We will read the components/products.ts file and extract the array using eval or Function
const seedDatabase = async () => {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // 2. Read products.ts
    const productsFilePath = path.join(__dirname, "../components/products.ts");
    let content = fs.readFileSync(productsFilePath, "utf8");

    // 3. Clean up the TS specific stuff so we can evaluate it
    // Remove the export and type definitions
    content = content.replace(/export type Product = \{[\s\S]*?\};/, "");
    content = content.replace(/export const products: Product\[\] = /, "return ");
    
    // Evaluate the array
    const getProducts = new Function(content);
    const productsArray = getProducts();

    // 4. Map the frontend ID to something else or just remove it if MongoDB generates _id
    const mappedProducts = productsArray.map(p => ({
      name: p.name,
      price: p.price,
      description: p.description,
      category: p.category,
      image: p.image,
      rating: p.rating,
      badge: p.badge || null,
      stock: 100 // default stock
    }));

    // 5. Clear existing products and insert new ones
    await Product.deleteMany();
    console.log("Cleared existing products from DB");

    await Product.insertMany(mappedProducts);
    console.log(`Successfully seeded ${mappedProducts.length} products!`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
