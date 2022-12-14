const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
   res.render('admin/edit-product', {
      pageSection: 'Admin Products',
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
   });
};

exports.getEditProduct = (req, res, next) => {
   const productId = req.params.productId;
   Product.findById(productId, product => {
      if (!product) {
         return res.redirect(req.baseUrl + '/404');
      }
      res.render('admin/edit-product', {
         pageSection: 'Admin Products',
         pageTitle: 'Edit Product',
         path: '/admin/edit-product',
         editing: true,
         product: product
      });
   });
};

exports.postEditProduct = (req, res, next) => {
   const id = req.body.id;
   const title = req.body.title;
   const imageUrl = req.body.imageUrl;
   const price = req.body.price;
   const description = req.body.description;
   const product = new Product(id, title, imageUrl, description, price);
   product.save();
   res.redirect('/admin/products');
};

exports.postAddProduct = (req, res, next) => {
   const title = req.body.title;
   const imageUrl = req.body.imageUrl;
   const price = req.body.price;
   const description = req.body.description;
   const product = new Product(null, title, imageUrl, description, price);
   product.save();
   res.redirect('/');
};

exports.getProducts = (req, res, next) => {
   Product.fetchAll(products => {
      res.render('admin/products', {
         pageSection: 'Admin Products',
         pageTitle: 'Products',
         path: '/admin/products',
         products: products,
      });
   });
};

exports.postDeleteProduct = (req, res, next) => {
   const productId = req.body.productId;
   Product.deleteById(productId);
   res.redirect('/admin/products');
};
