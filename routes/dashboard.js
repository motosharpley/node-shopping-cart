const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Admin = require('../models/admin');

// Dashboard route /db
router.get('/', function(req, res, next) {
  res.render('dashboard/index', { title: 'NodeCart' });
});

// Edit Article
// router.get('/edit/:id', ensureAuthenticated, function(req, res){
//     Article.findById(req.params.id, function(err, article){
//         if(article.author != req.user._id){
//             req.flash('danger', 'Not Authorized');
//             res.redirect('/');
//         }
//         res.render('edit_article', {
//             title:'Edit Article',
//             article:article
//         });
//     });
// });

// update post route
// router.post('/edit/:id', function(req, res){
//     let article = {};
//     article.title = req.body.title;
//     article.body = req.body.body;
//     article.author = req.body.author;

//     let query = {_id:req.params.id}

//     Article.update(query, article, function(err){
//         if(err){
//             console.log(err);
//             return;
//         } else {
//             req.flash('success', 'Article Updated');
//             res.redirect('/');
//         }
//     });
// });

// Add Product form Route
router.get('/add_product', ensureAuthenticated, function(req, res){
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
                res.redirect('/');
            }
        });
    } 
});

// Delete Article
// router.delete('/:id', function(req, res){
//     if(!req.user._id){
//         res.status(500).send();
//     }

//     let query = {_id:req.params.id}

//     Product.findById(req.params.id, function(err, product){
//         if(product.Admin != req.user._id){
//             res.status(500).send();
//         } else {
//             Article.remove(query, function(err){
//                 if(err){
//                     console.log(err);
//                 }
//                 res.send('Success');
//             });  
//         }
//     });
// });

// Get Single Article
// router.get('/:id', function(req, res){
//     Article.findById(req.params.id, function(err, article){
//         User.findById(article.author, function(err, user){
//             res.render('article', {
//                 article:article,
//                 author: user.name
//             });
//         });        
//     });
// });

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

