const express = require('express');
const router = express();
const bcrypt = require('bcryptjs');

const User = require('../models/User')

router.get('/login', (req,res,next) => res.render('login'));

router.get('/register', (req,res,next) => res.render('register'));

// Register handle 
router.post('/register', (req,res) => {
    // console.log(req.body);
    const {name, email, password, password2} = req.body;

    let errors = [];

    if( !name || !email || !password || !password2)
        errors.push({msg: "Please fill all fields"});
    
    if( password != password2)
        errors.push({msg: "Password didn't match"});

    if(errors.length > 0)
    {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    }
    else {
        User.findOne({email: email})
        .then(user => {
            if(user){
                //user exists
                errors.push({msg:'Email is already registered'})
                res.render('register', {
                    errors: errors,
                    name: name,
                    email: email,
                    password: password,
                    password2: password2
                });
            }
            else {
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password
                }); 

                // console.log(newUser)
                // res.send('hello'); 

                //hash password
                bcrypt.genSalt(10, (err,salt) => 
                    bcrypt.hash(newUser.password, salt, (err,hash) => {
                        if(err) throw err;

                        newUser.password = hash;

                        newUser.save()
                            .then(user => {
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                }))
                    
            }
            
        })
    }
})
module.exports = router;
 