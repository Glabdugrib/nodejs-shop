const path = require('path');

const express = require('express');

const productController = require('../controllers/productController');

const router = express.Router();

router.get('/products/create', productController.create)

module.exports = router;