const Sequelize = require('sequelize');

const db = require('../config/database');

const Permission = db.define('permission', {
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    value: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});
Permission.sync();

module.exports = Permission;