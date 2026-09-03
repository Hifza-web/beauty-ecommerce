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

  // Fix handleAddToCart (remove Math.random())
  content = content.replace(/id:\s*Math\.random\(\),.*?\/\/\s*Temporary ID for hardcoded items/g, 'id: product.id || product._id,');

  // Fix handleWishlist (remove tempId logic)
  content = content.replace(/const tempId = product\.name\.length;[\s\S]*?if\s*\(isInWishlist\(tempId\)\)\s*\{\s*removeFromWishlist\(tempId\);\s*\}\s*else\s*\{\s*addToWishlist\(\{\s*id:\s*tempId,(?:\s*id:\s*product\.id,)?/g, 
  `const pid = product.id || product._id;
    if (isInWishlist(pid)) {
      removeFromWishlist(pid);
      setToast(\`\${product.name} removed from Wishlist\`);
    } else {
      addToWishlist({
        id: pid,`);

  // General handleWishlist fix for places where tempId wasn't used but removeFromWishlist has no toast
  content = content.replace(/if\s*\(isInWishlist\(product\.id(?:\s*as\s*any)?\)\)\s*\{\s*removeFromWishlist\(product\.id\);\s*\}/g, 
  `if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      setToast(\`\${product.name} removed from Wishlist\`);
    }`);

  // General handleWishlist fix for app/product/[id]/page.tsx
  content = content.replace(/if\s*\(isInWishlist\(product\._id(?:\s*as\s*any)?\)\)\s*\{\s*removeFromWishlist\(product\._id\);\s*\}/g, 
  `if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      setToast(\`\${product.name} removed from Wishlist\`);
    }`);

  // Fix JSX Toast Title logic
  content = content.replace(/\{toast\.includes\("Wishlist"\)\s*\?\s*"Added to Wishlist"\s*:\s*"Added to Bag"\}/g, 
  `{toast.includes("Wishlist") ? (toast.includes("removed") ? "Removed from Wishlist" : "Added to Wishlist") : "Added to Bag"}`);

  // Fix JSX Toast Message logic
  content = content.replace(/\{toast\.replace\(' added to cart', ''\)\.replace\(' added to Wishlist', ''\)\}/g, 
  `{toast.replace(' added to cart', '').replace(' added to Wishlist', '').replace(' removed from Wishlist', '').replace(' added to wishlist', '')}`);

  fs.writeFileSync(file, content);
});
console.log('Fixed Toast UI in all files');
