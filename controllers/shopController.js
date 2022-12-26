const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
   Product.fetchAll(products => {
      res.render('shop/product-list', {
         pageSection: 'Shop',
         pageTitle: 'All Products',
         path: '/products',
         products: products,
      });
   });
};

exports.getProduct = (req, res, next) => {
   const productId = req.params.productId; // extract params from url
   Product.findById(productId, product => {
      res.render('shop/product-detail', {
         pageSection: 'Shop',
         pageTitle: 'Product Details',
         path: '/products',
         product: product,
      });
   });
};

exports.getIndex = (req, res, next) => {
   res.render('shop/index', {
      pageSection: '',
      pageTitle: '',
      path: '/',
   });
};

exports.getCart = (req, res, next) => {
   Cart.getCart(cart => {
      Product.fetchAll(products => {
         const cartProducts = [];
         for (product of products) {
            const cartProductData = cart.products.find(prod => prod.id === product.id);
            if (cartProductData) {
               cartProducts.push({productData: product, qty: cartProductData.qty});
            }
         }
         res.render('shop/cart', {
            pageSection: 'Shop',
            pageTitle: 'Your Cart',
            path: '/cart',
            products: cartProducts
         });
      });
   });
};

exports.postCart = (req, res, next) => {
   const productId = req.body.productId;
   Product.findById(productId, (product) => {
      Cart.addProduct(productId, product.price);
   });
   res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
   const prodId = req.body.productId;
   Product.findById(prodId, product => {
      Cart.deleteProduct(prodId, product.price);
   });
};

exports.getOrders = (req, res, next) => {
   res.render('shop/orders', {
      pageSection: 'Shop',
      pageTitle: 'Your Orders',
      path: '/orders',
   });
};

exports.getCheckout = (req, res, next) => {
   res.render('shop/checkout', {
      pageSection: 'Shop',
      pageTitle: 'Checkout',
      path: '/checkout',
   });
};
