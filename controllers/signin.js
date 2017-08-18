module.exports={
    'POST /signin': async ctx =>{
        var
            username = ctx.request.body.username || '',
            password = ctx.request.body.password || '';
        if (username === 'Prophet' && password === '123456'){
            ctx.render('signin-ok.html',{
                title:'Signin Sucess',
                name:username
            });
        }else {
            ctx.render('signin-failed.html',{
                title:'Signin failed'
            });
        }

    }
};