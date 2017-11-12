const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const User = require('../models/user');


router.use('/', ensureAuthenticated, function(req, res, next) {
  next();
});

// Dashboard route - /db
router.get('/', function(req, res, next) {
  Product.find(function(err, docs) {
  res.render('dashboard/index', { title: 'Dashboard', products: docs });
  });
});

// Add Product form Route
router.get('/add_product', function(req, res){
  res.render('dashboard/add_product', {
      title:'Add Product'
  });
});

// Create Product Route
router.post('/add_product', function(req, res){
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('description', 'Description is required').notEmpty();
  req.checkBody('price', 'Price is required').notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if(errors){
      res.render('add_product', {
          title:'Add Product',
          errors:errors
      });
  } else {
      let product = new Product();
      product.imagePath = req.body.imagePath;
      product.title = req.body.title;
      product.description = req.body.description;
      product.price = req.body.price;
  
      product.save(function(err){
          if(err){
              console.log(err);
              return;
          } else {
              req.flash('success', 'Product Added');
              res.redirect('/db');
          }
      });
  } 
});

// Edit Product
router.get('/edit/:id', function(req, res){
    Product.findById(req.params.id, function(err, product){
        res.render('dashboard/edit_product', {
            title:'Edit Product',
            product:product
        });
    });
});

// update product route
router.post('/edit/:id', function(req, res){
    let product = {};
    product.imagePath = req.body.imagePath;
    product.title = req.body.title;
    product.description = req.body.description;
    product.price = req.body.price;

    let query = {_id:req.params.id};

    Product.update(query, product, function(err){
        if(err){
            console.log(err);
            return;
        } else {
            req.flash('success', 'Product Updated');
            res.redirect('/db');
        }
    });
});

// Delete Product
router.delete('/:id', function(req, res) {
  let query = {_id:req.params.id}

  Product.remove(query, function(err) {
      if(err){
          console.log(err);
      }
      res.send('product deleted');
  });
});


// Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('danger','Please login');
        res.redirect('/user/signin');
    }
}

module.exports = router;

