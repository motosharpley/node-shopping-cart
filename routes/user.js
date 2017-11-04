const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user/index', { title: 'User' });
});

// User Sign up
router.get('/signup', function(req, res, next) {
  res.render('user/signup', { title: 'User' });
});

// User Sign in
router.get('/signin', function(req, res, next) {
  res.render('user/signin', { title: 'User' });
});

module.exports = router;
