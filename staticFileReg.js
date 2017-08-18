const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

function staticFileReg(url, dir) {
    return async (ctx,next)=>{
        let requestPath = ctx.request.path;
        if (requestPath.startsWith(url)){
            let fp = path.join(dir, requestPath.substring(url.length));
            if(await fs.exists(fp)){
                ctx.response.type = mime.lookup(fp);
                ctx.response.body = await fs.readFile(fp);
            }else{
                ctx.response.status = 404;
            }
        }else {
            await next();
        }
    };
}

module.exports = staticFileReg;