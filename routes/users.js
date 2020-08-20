const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs')

const db = require('../config/database');
const User = require('../models/User');


router.get('/', (req, res) => 
    res.render('clients')
);

router.get('/login', (req, res) => 
    res.render('clients')
);

router.get('/logout', (req, res) => 
    res.render('clients')
);

router.get('/dashboard', (req, res) => 
    res.render('user')
);



router.post('/register', (req, res) =>{
    // const data = {
    //     firstName: "Emmanuel",
    //     lastName: "Asiedu",
    //     email: "e.k.asiedu13@gmail.com",
    //     password: 123456,
    //     phone: 233574644251,
    //     nok: "Priscilla Asiedu",
    //     nokPhone: 233555252682
    // };

    let {firstName, lastName, email, password, password2, phone, nok, nokPhone} = req.body;
    let errors = [];

    if(!firstName || !lastName || !email || !password || !password2 || !phone || !nok || !nokPhone) {
        errors.push({ msg: 'Please fill all fields'});
    }

    if((phone.length < 9) || (isNaN(phone) === true)) {
        errors.push({ msg: 'Incorrect phone number'});
    }

    if((nokPhone.length < 9) || (isNaN(nokPhone) === true)) {
        errors.push({ msg: 'Incorrect NOK contact'});
    }

    if(password != password2){
        errors.push({msg: 'Passwords do not match'});
    }

    if(password.length < 8){
        errors.push({msg: 'Password should be at least 8 characters'});
    }

    // if(password.length < 8){
    //     errors.push({msg: 'Password should be at least 8 characters'});
    // }

    // const paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    // const paswd=  /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    const paswd=  /^(?=.{8,25}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*/;
    // const paswd=  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
    
    if(!password.match(paswd)){
        errors.push({msg: 'Password should contain at least a number, An Upper Case and lower case. No special Characters required'});
    }

    if(errors.length > 0){
        res.render('register', {
            errors,
            firstName,
            lastName,
            email,
            phone,
            nok,
            nokPhone
        });
    }

    else{
        
        User.findOne( {where: {email: email}})
        .then(user => {
            if(user){
                errors.push({ msg: 'Email is already registered'});
                res.render('/register', {
                    errors,
                    firstName, 
                    lastName, 
                    email,
                    phone,
                    nok,
                    nokPhone
                });
            } 
            else {
                const newUser = new User({
                    firstName, 
                    lastName, 
                    email,
                    phone,
                    password, 
                    nok,
                    nokPhone
                });

                // User.create({
                //     firstName, 
                //     lastName, 
                //     email,
                //     phone,
                //     password, 
                //     nok,
                //     nokPhone})

                    //Hash Password
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;

                    newUser.password = hash;
                    newUser.save()
                    .then(user => {
                        
                        req.flash('success_msg', 'You are now registered and can log in');
                        res.redirect('/clients');
                       

                        // {
                        //     success_msg = "You are now registered and can log in";
                        // }

                        // (req, res) => {
                        //     req.session.sessionFlash = {
                        //     status: true,
                        //     type: "success",
                        //     message: "You are now registered and can log in"
                        //     }
                        // }
                        // res.redirect('/clients')
                    })
                    .catch(err=> console.log(err));
                }))
            }
                        
        });
        


        //     // Insert into table
        //     User.create({
        //     firstName, 
        //     lastName, 
        //     email,
        //     phone,
        //     password, 
        //     nok,
        //     nokPhone
        //     // ,
        //     // createdAt,
        //     // updatedAt
        // })
        // .then(user => res.redirect('/clients'))
        // .catch((err) => console.log(err));
    }
    
});

router.post('/login', (req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/clients',
        failureFlash: true
    })(req, res, next);
});


module.exports = router;