/**
 * Created by 63160 on 8/23/2017.
 */
const uuid = require('uuid');
const model = require('../model');
const crypto = require('crypto');

let User = model.User;

module.exports={
    'GET /signup': async ctx =>{
        ctx.render('signup.html');
    },

    'POST /signup': async ctx =>{
        var
            username = ctx.request.body.username || '',
            password = ctx.request.body.password || '',
            password2 = ctx.request.body.password2 || '',
            email = ctx.request.body.email || '';
        if(username!==''){
            if(password!==''){
                if(password2 === password){
                    var newUser = await User.create({
                        username: username,
                        pwd: crypto.createHash('md5').update(password).digest('hex'),
                        email: email
                    });
                    console.log('Sucessfully created:' + JSON.stringify(newUser));
                    ctx.render('signup-ok.html');
                }else{
                    console.log('Two password must be same!')
                }
            }else{
                console.log('You must input a password!')
            }
        }else{
            console.log('You must input a username!')
        }
    }
};
