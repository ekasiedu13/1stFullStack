const Sequelize = require('sequelize');

const db = require('../config/database');

const Withdrawal = db.define('withdrawal', {
    userId: {
        type: Sequelize.INTEGER
    },
    depId: {
        type: Sequelize.INTEGER,
    }
});

module.exports = Withdrawal;