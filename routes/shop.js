const express = require('express');
const router = express.Router();

// shop route
router.get('/', function(req, res, next) {
  res.render('shop/index', { title: 'NodeCart' });
});

router.get('/detail', function(req, res, next) {
  res.render('shop/detail', { title: 'NodeCart' });
});

router.get('/cart', function(req, res, next) {
  res.render('shop/cart', { title: 'NodeCart' });
});

module.exports = router;
