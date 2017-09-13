/**
 * Created by prophet on 17-9-13.
 */
const db = require('../db');
module.exports = db.defineModel('todos',{
    name: db.STRING(40),
    description: db.STRING(100),
    duetime: {
        allowNull: true,
        type: db.DATE
    }
});