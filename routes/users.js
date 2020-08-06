const express = require('express');
const router = express();

router.get('/login', (req,res,next) => res.render('login'));

router.get('/register', (req,res,next) => res.render('register'));

module.exports = router;
 