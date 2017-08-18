module.exports={
    'GET /': async ctx=>{
        ctx.render('index.html', {
            title:'Welcome!'
        });
    }
};