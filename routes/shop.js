const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// shop route
router.get('/', function(req, res, next) {
  Product.find(function(err, docs) {
    res.render('shop/index', { title: 'NodeCart', products: docs });
  });  
});

router.get('/detail', function(req, res, next) {
  res.render('shop/detail', { title: 'NodeCart' });
});

router.get('/cart', function(req, res, next) {
  res.render('shop/cart', { title: 'NodeCart' });
});

module.exports = router;
