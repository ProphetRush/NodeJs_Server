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

    'GET /api/todos/:id': async ctx=> {
        for (var t of todos){
            if(t.id === ctx.params.id){
                ctx.rest(t);
                break;
            }
        }
    },



    'POST /api/todos': async (ctx, next) =>{
        "use strict";
        var
            t = ctx.request.body,
            todo;
        if (!t.name || !t.name.trim()){
            throw new APIError('Invalid input', 'Missing name input!');
        }
        if(!t.description || !t.description.trim()){
            throw new APIError('Invalid input', 'Missing description!');
        }
        todo = {
            id: nextID(),
            name: t.name.trim(),
            description: t.description.trim()
        };
        todos.push(todo);
        ctx.rest(todo);
    },

    'PUT /api/todos/:id': async (ctx) => {
        var t = ctx.request.body;
        var index = -1;
        var todo;
        if(!t.name || !t.name.trim())
            throw new APIError('Invalid input', 'Missing name!');
        if(!t.description || !t.description.trim())
            throw new APIError('Invalid input', 'Missing description');
        for(var i=0; i<todos.length; i++){
            if(todos[i].id === ctx.params.id) index = i;
        }
        if(index == -1){
            throw new APIError('not found', 'todo not found by id: '+ctx.params.id);
        }
        todo = todos[index];
        todo.name = t.name.trim();
        todo.description = t.description.trim();
        ctx.rest(todo);
    },

    'DELETE /api/todos/:id': async (ctx) => {
        var index = -1;
        for(var i=0; i<todos.length; i++){
            if(todos[i].id === ctx.params.id) index = i;
        }
        if(index == -1){
            throw new APIError('not found', 'todo not found by id: '+ctx.params.id);
        }
        ctx.rest(todos.splice(index,1)[0]);
    }

};
