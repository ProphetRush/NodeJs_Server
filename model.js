/**
 * Created by 63160 on 8/23/2017.
 */
const fs = require('fs');
const db = require('./db');

let files = fs.readdirSync(__dirname + '/models');
let js_files = files.filter((f)=>{
    "use strict";
    return f.endsWith('.js');
}, files);

module.exports = {};

for (let f of js_files){
    console.log(`import model from file ${f}`);
    let name = f.substring(0, f.length - 3);
    module.exports[name] = require(__dirname + '/models/' + f);
}

module.exports.sync = () => {
    "use strict";
    db.sync();
};