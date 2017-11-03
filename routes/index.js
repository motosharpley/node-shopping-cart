const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NodeCart' });
});
// shop route
router.get('/shop', function(req, res, next) {
  res.render('shop/index', { title: 'NodeCart' });
});

module.exports = router;
