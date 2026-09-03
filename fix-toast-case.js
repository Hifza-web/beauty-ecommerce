const fs = require('fs');
const files = [
  'components/Best.tsx',
  'components/TrendingProducts.tsx',
  'app/[slug]/page.tsx',
  'app/shop/page.tsx',
  'app/product/[id]/page.tsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Standardize lowercase/uppercase wishlist to capital Wishlist in setToast
  content = content.replace(/setToast\(`\$\{product\.name\} (added to|removed from) wishlist`\)/gi, 'setToast(\`\${product.name} $1 Wishlist\`)');

  // Fix title logic to be robust
  content = content.replace(/\{toast\.includes\("Wishlist"\)\s*\?\s*\(toast\.includes\("removed"\)\s*\?\s*"Removed from Wishlist"\s*:\s*"Added to Wishlist"\)\s*:\s*"Added to Bag"\}/g, 
  `{toast.toLowerCase().includes("wishlist") ? (toast.toLowerCase().includes("removed") ? "Removed from Wishlist" : "Added to Wishlist") : "Added to Bag"}`);
  
  // Fix title logic if it wasn't replaced yet
  content = content.replace(/\{toast\.includes\("Wishlist"\)\s*\?\s*"Added to Wishlist"\s*:\s*"Added to Bag"\}/g, 
  `{toast.toLowerCase().includes("wishlist") ? (toast.toLowerCase().includes("removed") ? "Removed from Wishlist" : "Added to Wishlist") : "Added to Bag"}`);

  // Fix message string replacements robustly
  content = content.replace(/\{toast\.replace\(' added to cart', ''\)\.replace\(' added to Wishlist', ''\)\.replace\(' removed from Wishlist', ''\)\.replace\(' added to wishlist', ''\)\}/g,
  `{toast.replace(/ added to cart/i, '').replace(/ added to wishlist/i, '').replace(/ removed from wishlist/i, '')}`);
  
  content = content.replace(/\{toast\.replace\(' added to cart', ''\)\.replace\(' added to Wishlist', ''\)\}/g,
  `{toast.replace(/ added to cart/i, '').replace(/ added to wishlist/i, '').replace(/ removed from wishlist/i, '')}`);

  fs.writeFileSync(file, content);
});
console.log('Fixed case sensitivity for toast!');
