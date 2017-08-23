const uuid = require('uuid');
const model = require('../model');
const crypto = require('crypto');

let User = model.User;

module.exports={
    'POST /signin': async ctx =>{
        var
            username = ctx.request.body.username || '',
            password = ctx.request.body.password || '',
            selected = (await User.findAll({
                where: {
                    username: username
                }
            }))[0];
        if(selected !== undefined){
            if (selected.pwd === crypto.createHash('md5').update(password).digest('hex')){
                ctx.render('signin-ok.html',{
                    title:'Signin Sucess',
                    name:username
                });
            }else {
                ctx.render('signin-failed.html',{
                    title:'Signin failed'
                });
            }
        }else {
            ctx.render('signin-failed.html',{
                title:'Signin failed'
            });
        }


    }
};