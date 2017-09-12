const APIError = require('../rest').APIError;



var gid = 10000;

function nextID() {
    gid++;
    return 't'+gid;
}

var todos = [];



module.exports={
    'GET /todo': async ctx=>{
        ctx.render('TODO.html');
    },

    'GET /todo.html': async ctx=>{
        ctx.render('TODO.html');
    },

    'GET /api/todos': async ctx=>{
        "use strict";
        ctx.rest({
            todos:todos
        });
    },

    'POST /api/todos': async (ctx, next) =>{
        "use strict";
        var
            t = ctx.request.body,
            todo;
        if (!t.name || !t.name.trim()){
            throw new APIError()
        }
    }

};