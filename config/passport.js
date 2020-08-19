const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/User');

// Load Admin Model
// const Admin = require('../models/Admin');


module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done)=> {
            // Match user
            User.findOne({ email: email })
                .then(user =>{
                    if (!user){
                        return done(null, false, { message: "Email or Password Incorrect" });
                    }

                    // Match Password
                    bcrypt.compare(password, user.password, (err, isMatch)=>{
                        if (err) throw err;

                        if(isMatch){
                            return done(null, user);
                        }

                        else{
                            return done(null, false, { message: 'Email or Password Incorrect'});
                        }
                    });
                })
                .catch((err) => console.log(err));

                
            User.findOne({ where: {isAdmin: 'true'} })
                .then(admin =>{
                    if (!admin){
                        return done(null, false, { message: "Email or Password Incorrect" });
                    }

                    // Match Password
                    bcrypt.compare(password, admin.password, (err, isMatch)=>{
                        if (err) throw err;

                        if(isMatch){
                            return done(null, admin);
                        }

                        else{
                            return done(null, false, { message: 'Password Incorrect'});
                        }
                    });
                })
                .catch((err) => console.log(err));
        })
    );

    passport.serializeUser((user, done) =>{
        done(null, user.id);
    });

    passport.deserializeUser((id, done) =>{
        User.findById(id, (err, user) =>{
            done(err, user);
        });
    });



    passport.serializeUser((admin, done) =>{
        done(null, admin.id);
    });

    passport.deserializeUser((id, done) =>{
        User.findById(id, (err, admin) =>{
            done(err, admin);
        });
    });
};
