/**
 * Created by 63160 on 8/21/2017.
 */
const db = require('../db');

module.exports = db.defineModel('user', {
    email:{
        type: db.STRING(100),
        allowNull: true
    },
    username: db.STRING(30),
    pwd: db.STRING(45)
});