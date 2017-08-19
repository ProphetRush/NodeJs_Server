module.exports={
    'GET /': async ctx=>{
        ctx.render('index.html', {
            title:'Welcome!'
        });
    },
    'GET /index.html': async ctx=>{
        ctx.render('index.html', {
            title:'Welcome!'
        });
    }
};