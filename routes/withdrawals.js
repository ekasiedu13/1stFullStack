const express = require('express');
const router = express.Router();

const db = require('../config/database');
const Withdrawal = require('../models/Withdrawal');

router.get('/withdrawals', (req, res) => 
    Withdrawal.findAll()
        .then((withs) => {
            console.log(withs)
            res.sendStatus(200);
        })
        .catch((err) => console.log(err))
    
);

router.get('/withdrawals/view/:id', (req, res) => 
    Withdrawal.findAll()
        .then((withs) => {
            console.log(withs)
            res.sendStatus(200);
        })
        .catch((err) => console.log(err))
    
);


router.post('/withdrawal/make', (req, res) =>{
    const withData = {
        userId: "1",
        depId: "1"
    };

    let {userId, depId} = withData;


    // Insert into table
    Withdrawal.create({
        userId, 
        depId
    })
    .then(withd => res.redirect('/withdrawals'))
    .catch((err) => console.log(err));
});

module.exports = router;