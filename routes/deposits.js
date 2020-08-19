const express = require('express');
const router = express.Router();

const db = require('../config/database');
const Deposit = require('../models/Deposit');

router.get('/deposits', (req, res) => 
    Deposit.findAll()
        .then((deps) => {
            console.log(deps)
            res.sendStatus(200);
        })
        .catch((err) => console.log(err))
    
    );

router.post('/deposit/make', (req, res) =>{
    const depData = {
        userId: "2",
        amount: "50000",
        duration: "180",
        maturity: 20/11/2020,
        interest: 17,
        redemptionValue: 63000,
        status: true
    };

    let {userId, amount, duration, maturity, interest, redemptionValue, status} = depData;


    // Insert into table
    Deposit.create({
        userId, 
        amount, 
        duration,
        maturity, 
        interest,
        redemptionValue,
        status
    })
    .then(dep => res.redirect('/deposits'))
    .catch((err) => console.log(err));
});

module.exports = router;