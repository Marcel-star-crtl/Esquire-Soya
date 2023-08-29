const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Home | Esquire Soya'});
});

router.get('/contact-us', (req, res) => {
    res.render('contact-us', {title: 'contact-us | Esquire Soya'});
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login | Esquire Soya' });
});

router.get('/404', (req, res) => {
    res.render('404', { title: '404 | Esquire Soya'});
});

router.get('/register', (req, res) => {
    res.render('register', {title: 'register | Esquire Soya'});
});

router.get('/cart', (req, res) => {
    res.render('cart', {title: 'cart | Esquire Soya'});
});

router.get('/product-details', (req, res) => {
    res.render('product-details', {title: 'product-details | Esquire Soya'});
});

module.exports = router;
