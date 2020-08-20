const express = require('express');
const passport = require('passport');
const router = express();


router.get('/', (req,res,next) => res.render('welcome'));
router.get('/dashboard', (req,res,next) => res.render('dashboard'));
module.exports = router;
 
 