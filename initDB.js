/**
 * Created by 63160 on 8/23/2017.
 */
require('babel-core/register')({
    presets: ['stage-3']
});

const model = require('./model.js');
model.sync();

console.log('init db ok.');
process.exit(0);