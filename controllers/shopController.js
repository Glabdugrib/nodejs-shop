const Product = require('../models/product');

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

exports.getIndex = (req, res, next) => {
   Product.fetchAll(products => {
      res.render('shop/index', {
         pageSection: 'Shop',
         pageTitle: 'Products',
         path: '/',
         products: products,
      });
   });
};

exports.getCart = (req, res, next) => {
   res.render('shop/cart', {
      pageSection: 'Shop',
      pageTitle: 'Your Cart',
      path: '/cart',
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
