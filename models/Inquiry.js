const Sequelize = require('sequelize');

const db = require('../config/database');

const Inquiry = db.define('inquiry', {
    fname: {
        type: Sequelize.STRING
    },
    lname: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    },
    contact: {
        type: Sequelize.STRING
    },
    amount: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

module.exports = Inquiry;