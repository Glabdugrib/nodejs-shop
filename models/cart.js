const fs = require('fs');
const path = require('path');

const p = path.join(
   path.dirname(require.main.filename),
   'data',
   'cart.json'
);

module.exports = class Cart {

   static addProduct(id, productPrice) {
      // Fetch previous cart
      fs.readFile(p, (err, fileContent) => {
         let cart = { products: [], totalPrice: 0 };
         if (!err) {
            cart = JSON.parse(fileContent);
         }
         // Analyze cart => find existing products
         const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
         const existingProduct = cart.products[existingProductIndex];
         let updatedProduct;
         // If existingProduct already exists
         if (existingProduct) {
            // Increase qty
            updatedProduct = { ...existingProduct };
            updatedProduct.quantity++;
            // Substitute old one with new one
            cart.products = [...cart.products];
            cart.products[existingProductIndex] = updatedProduct;
         } // If not
         else {
            // Create new one
            updatedProduct = {
               id: id,
               quantity: 1
            };
            // Add it to the list
            cart.products = [...cart.products, updatedProduct];
         }
         cart.totalPrice += +productPrice;
         fs.writeFile(p, JSON.stringify(cart), (err) => {
            console.log(err);
         })
      });
   }

   static deleteProduct(id, productPrice) {
      fs.readFile(p, (err, fileContent) => {
         if(err) {
            return;
         }
         const updatedCart = {...JSON.parse(fileContent)};
         const product = updatedCart.products.find(prod => prod.id === id);
         if (!product) {
            return;
         }
         updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
         updatedCart.totalPrice -= product.quantity * productPrice; 
         fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
            console.log(err);
         })
      });
   }

   static getCart(cb) {
      fs.readFile(p, (err, fileContent) => {
         const cart = JSON.parse(fileContent);
         if(err) {
            cb(null);
         } else {
            cb(cart);
         }
      });
   }
}