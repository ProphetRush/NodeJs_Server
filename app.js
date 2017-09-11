const Koa = require('koa');
const staticFileReg = require('./staticFileReg');
const templating = require('./templating');
const isProduction = process.env.NODE_ENV === 'production';
const bodyParser = require('koa-bodyparser');
const controller = require('./controller')
const app = new Koa();


app.use(async (ctx, next)=>{
    console.log(`Process ${ctx.request.method}: ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

if(! isProduction){
    app.use(staticFileReg('/static/', __dirname + '/static'));
}

app.use(bodyParser());


app.use(staticFileReg('/static', __dirname+'/static'));

app.use(templating('views',{
    noCache: !isProduction,
    watch: !isProduction
}));

app.use(controller());
app.listen(3000, host="0.0.0.0");
console.log("Server is running...")