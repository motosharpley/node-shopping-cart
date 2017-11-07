const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');

const csrfProtection = csrf();
router.use(csrfProtection);

/* GET user profile */
router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('user/profile', { title: 'User' });
});

// logout
router.get('/logout', isLoggedIn, function(req, res, next) {
  req.logOut();
  res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next) {
  next();
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
  let messages = req.flash('error')
  res.render('user/signin', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

