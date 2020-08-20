const Sequelize = require('sequelize');

const db = require('../config/database');

const User = db.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    nok: {
        type: Sequelize.STRING
    },
    nokPhone: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
});

module.exports = User;