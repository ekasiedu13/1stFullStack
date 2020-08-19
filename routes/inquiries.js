const express = require('express');
const router = express.Router();

const db = require('../config/database');
const Inquiry = require('../models/Inquiry');


router.post('/contactUs', (req, res) =>{

    let {fname, lname, email, contact, country, amount} = req.body;
    let errors = [];

    if (!fname){
        errors.push({ text: 'Please enter your First Name'});
    }
    if (!lname){
        errors.push({ text: 'Please enter your Last Name'});
    }
    if (!email){
        errors.push({ text: 'Please enter your Email'});
    }
    if (!contact){
        errors.push({ text: 'Please enter your Contact Number'});
    }
    if (!country){
        errors.push({ text: 'Please enter your Country'});
    }
    if (!amount){
        errors.push({ text: 'Please select the amount you wish to invest'});
    }

    if (errors.length > 0){
        res.render('contact', {
            errors,
            fname,
            lname,
            email,
            contact,
            country,
            amount
        })
    }

    else {

        // Insert into table
        Inquiry.create({
            fname, 
            lname, 
            email,
            contact,
            country,
            amount
            // ,
            // createdAt,
            // updatedAt
        })
        .then(inquiry => res.redirect('/contactUs'))
        .catch((err) => console.log(err));
    }

});

module.exports = router;