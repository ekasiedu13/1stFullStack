const Sequelize = require('sequelize');

const db = require('../config/database');

const Deposit = db.define('deposit', {
    userId: {
        type: Sequelize.INTEGER
    },
    amount: {
        type: Sequelize.NUMBER
    },
    duration: {
        type: Sequelize.INTEGER,
        unique: true
    },
    maturity: {
        type: Sequelize.DATE
    },
    interest: {
        type: Sequelize.DECIMAL,
        defaultValue: Sequelize.NOW
    },
    redemptionValue: {
        type: Sequelize.NUMBER
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Deposit;