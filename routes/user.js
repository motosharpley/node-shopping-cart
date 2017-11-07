const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');

const csrfProtection = csrf();
router.use(csrfProtection);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user/profile', { title: 'User' });
});

// User Sign up
router.get('/signup', function(req, res, next) {
  let messages = req.flash('error')
  res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

// User Sign in
router.get('/signin', function(req, res, next) {
  res.render('user/signin', { title: 'User' });
});

module.exports = router;
