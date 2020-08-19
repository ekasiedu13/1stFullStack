const express = require('express');
const router = express.Router();

const Sequelize = require('sequelize');
const db = require('../config/database');
const Op = Sequelize.Op;

const Deposit = require('../models/Deposit');
const Withdrawal = require('../models/Withdrawal');
const User = require('../models/User');


router.get('/login', (req, res, next)=>{
    res.render('adlogin');
});

router.get('/logout', (req, res, next)=>{
    res.render('adlogin');
});

router.post('/login', (req, res, next)=>{
    // res.render('clients');
})

router.get('/dashboard', (req, res) => 
    res.render('admin', {layout : 'adm'}));


/*  

/deposit
/withdrawal
/allClients
/allDeposits
/allWithdrawals

*/
router.get('/', (req, res) => {
    res.render('adlogin')}
);

// router.get('/', (req, res) => {
//     res.render('admin', {layout : 'adm'})}
// );

router.get('/deposit', (req, res) => {
    res.render('deposit')}
);
router.get('/withdrawal', (req, res) => {
    res.render('withdrawal')}
);
router.get('/allClients', pagination(User),(req, res) => {
    // res.send(res.pagination);
    res.render('allClients',{results:res.pagination});
    }
);
router.get('/allDeposits', (req, res) => {
    res.render('allDeposits')}
);
router.get('/allWithdrawals', (req, res) => {
    res.render('allWithdrawals')}
);

router.get('/deposits', (req, res) => 
    Deposit.findAll()
        .then((deps) => {
            console.log(deps)
            res.render('deposit');
            // res.sendStatus(200);
        })
        .catch((err) => console.log(err))
    
);

router.get('/deposits/:id', (req, res) => {
        const id = req.params.id;

        Deposit.findAll({
            where: {
            userId: {[Op.like]: `% ${id} %`}
            }
        })
        .then((dep) => {
            console.log(dep)
            res.sendStatus(200);
        })
        .catch((err) => console.log(err))
    
});

function pagination(model){
    return async(req, res, next) => {
        let page = Number(req.query.page);
        let limit = Number(req.query.limit);

        if(!limit || limit === 0){
            limit = 10;
        }

        if(!page || page === 0){
            page = 1;
        }
        
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {}
        
        if (startIndex > 0){
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        const count = await model.count();

        if (endIndex < count){
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        try {
            results.results = await model.findAll({ attributes: ['id', 'firstName', 'lastName','email','phone','nok', 'nokPhone'], offset: startIndex, limit: limit });
            res.pagination = results;
            next();
        } catch (e) {
            res.status(500).json({message: e.message});
        }


        
    }
};

router.post('/deposit/make/', (req, res) =>{
    let {fullName, email, phone, amount, duration, maturity, redemptionValue} = req.body;

    async function getUserId(email, phone) {
        return User.findOne({
          where: {
            email : email,
            phone : phone
          }
        })
    }

    await.getUserId(email,phone).then(function(result){
       return userId = (result.id);
    });

    if (userId === null){
        res.render('/deposit', {error:"No user found"})
    }

    else{

        // User.findAll({
        //     where: {
        //       firstName: '',
        //       email: '',
        //       phone: ''
        //     }
        //   }).then(userId=>{

        //   })
        //     .catch()


        // const depData = {
        //     userId: id,
        //     amount: "50000",
        //     duration: "180",
        //     maturity: 20/11/2020,
        //     interest: 17,
        //     redemptionValue: 63000,
        //     status: true
        // };

        // let {userId, amount, duration, maturity, interest, redemptionValue, status} = depData;


        // Insert into table
        Deposit.create({
            userId, 
            amount,
            duration,
            maturity, 
            interest,
            redemptionValue,
            status : true
        })
        .then(dep => res.redirect('/deposit'))
        .catch(err => console.log(err));
    }
});

router.get('/withdrawals', (req, res) => 
    Withdrawal.findAll()
        .then((withs) => {
            console.log(withs)
            res.sendStatus(200);
        })
        .catch((err) => console.log(err))
    
    );

router.post('/withdrawal/make', (req, res) =>{
    const withData = {
        userId: 1,
        depId: 1
    };

    let {userId, depId} = withData;


    // Insert into table
    Withdrawal.create({
        userId, 
        depId
    })
    .then(withd => res.redirect('/withdrawal'))
    .catch((err) => console.log(err));
});

// Get user
// router.get('/', (req, res) => 
//     User.findAll()
//         .then((users) => {
//             console.log(users)
//             res.sendStatus(200);
//         })
//         .catch((err) => console.log(err))
    
//     );


// Render page
// router.get('/search', (req, res) => 
//     res.render('searchDep')
// );

// Allow registration

// router.get('/../register', (req, res) => 
//     sequelize
//         .query('SELECT allow FROM allowreg where allow === true', { raw: true })
//         .then(allow => {
//         if (allow === ''){
//             res.redirect('/clients');
//         }

//         else {
//             res.render('/register')
//         }
//     })
    
//     .catch((err) => {throw err})
// );

router.post('/login', (req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/clients',
        failureFlash: true
    })(req, res, next);
});


module.exports = router;