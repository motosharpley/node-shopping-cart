const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Cart = require('../models/cart');

// shop routes
router.get('/', function(req, res, next) {
  Product.find(function(err, docs) {
    res.render('shop/index', { title: 'NodeCart', products: docs });
  });
});

router.get('/detail', function(req, res, next) {
  res.render('shop/detail', { title: 'NodeCart' });
});

// Cart Routes
router.get('/cart', function(req, res, next) {
  if (!req.session.cart) {
    return res.render('shop/cart', { products: null });
  }
  let cart = new Cart(req.session.cart);
  res.render('shop/cart', { products: cart.generateArray(), totalPrice: cart.totalPrice })
});

router.get('/add-to-cart/:id', function(req, res, next) {
  let productId = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/shop/cart');
  });
});

// Checkout
router.get('/checkout', function(req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shop/cart');
  }
  let cart = new Cart(req.session.cart);
  res.render('shop/checkout', { products: cart.generateArray(), totalPrice: cart.totalPrice })
});

module.exports = router;
