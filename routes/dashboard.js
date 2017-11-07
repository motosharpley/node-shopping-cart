const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Admin = require('../models/admin');

// Dashboard route /db
router.get('/', function(req, res, next) {
  res.render('dashboard/index', { title: 'NodeCart' });
});

module.exports = router;

