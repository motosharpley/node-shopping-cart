const express = require('express');
const router = express.Router();
const csrf = require('csurf');

const csrfProtection = csrf();
router.use(csrfProtection);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user/index', { title: 'User' });
});

// User Sign up
router.get('/signup', function(req, res, next) {
  res.render('user/signup', { csrfToken: req.csrfToken() });
});

router.post('/signup', function(req, res, next) {
  res.redirect('/');
});

// User Sign in
router.get('/signin', function(req, res, next) {
  res.render('user/signin', { title: 'User' });
});

module.exports = router;
