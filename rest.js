/**
 * Created by 63160 on 9/12/2017.
 */
module.exports = {
    APIError: function (code, message) {
        this.code = code || 'internal unknown error',
        this.message = message || ''
    },
    restify: (pathPrefix) => {
        "use strict";
        pathPrefix = pathPrefix || '/api/';
        return async (ctx, next) => {
            if(ctx.request.path.startsWith(pathPrefix)){
                console.log(`Process API ${ctx.request.method} ${ctx.request.url}...`);
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                }
                try{
                    await next();
                }catch (e){
                    console.log('Process API Error...');
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code: e.code || 'internal unknown error',
                        message: e.message || ''
                    };

                }

            }else {
                await next();
            }
        };

    }
};