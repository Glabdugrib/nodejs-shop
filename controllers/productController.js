// const User = require('User');

exports.create = (req, res) => {
   res.render('product/create', {
      pageTitle: 'Create Product',
      url: '/products/create',
   });
}