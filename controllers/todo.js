const APIError = require('../rest').APIError;
const model = require('../model');
let todoModel = model.todos;


var gid = 10000;

function nextID() {
    gid++;
    return 't'+gid;
}

var todos = [];
todoModel.findAll().then(function (resp) {
    for(t of resp) todos.push(t.dataValues);
}).catch(function (e) {
    console.log(e);
});



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
        todo = await todoModel.create({
            name: t.name.trim(),
            description: t.description.trim(),
            duetime: null
        });
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
        todo = (await todoModel.findAll({
            where:{
                id: ctx.params.id
            }
        }))[0];
        todo.name = t.name.trim();
        todo.description = t.description.trim();
        await todo.save();
        todos[index] = todo.dataValues;
        ctx.rest(todo.dataValues);
    },

    'DELETE /api/todos/:id': async (ctx) => {
        var index = -1;
        var todo;
        for(var i=0; i<todos.length; i++){
            if(todos[i].id === ctx.params.id) index = i;
        }
        if(index == -1){
            throw new APIError('not found', 'todo not found by id: '+ctx.params.id);
        }
        todo = await((await todoModel.findAll({
            where:{
                id: ctx.params.id
            }
        }))[0]).destroy();
        ctx.rest(todos.splice(index,1)[0]);
    }

};
