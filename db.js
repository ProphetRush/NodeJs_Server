/**
 * Created by 63160 on 8/20/2017.
 */
//To forcibly define the properties of all models, it means all models will gain the attributes that it automatically defined.
const Sequelize = require('sequelize');
const sqlConfig = require('./config');
const uuid = require('uuid');
const ID_TYPE = Sequelize.STRING(50);


//UUID Generator
function generateId() {
    return uuid.v4();
}


//create a new sequelize instance using config data
var sequelize = new Sequelize(sqlConfig.database, sqlConfig.username, sqlConfig.password, {
    host: sqlConfig.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 1000
    }
});


/*if the attributes pass in contains an object and it has type attr,
then read the allowNull properties, which default is not allowed.*/
function defineModel(name, attributes) {
    var attrs = {};
    for (let key in attributes){
        let value = attributes[key];
        if(typeof value === 'object' && value['type']){
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }

    attrs.id = {
        type: ID_TYPE,
        primaryKey: true
    };

    attrs.ctime = {
        type: Sequelize.DATE,
        allowNull: false
    };

    attrs.mtime = {
        type: Sequelize.DATE,
        allowNull: false
    }

    attrs.version = {
        type: Sequelize.INTEGER,
        allowNull: false
    };

    console.log('model defined for tables: ' + name + '\n' + JSON.stringify(attrs, function (k,v) {
            if (k === 'type'){
                for (let key in Sequelize){
                    if (key === 'ABSTRACT' || key === 'NUMBER'){
                        continue;
                    }
                    let dbType = Sequelize[key];
                    if(typeof dbType === 'function'){
                        if (v instanceof dbType){
                            if(v._length){
                                return `${dbType.key}(${v._length})`;
                            }
                            return dbType.key;
                        }
                        if (v === dbType){
                            return dbType.key;
                        }

                    }
                }
            }
            return v;
        }, ' '));

    /* if the entity is not newly created, then update the mtime and the version of the entity,
    else then create an unique id and set the ctime and initial vertion to this entity.
     */
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if(obj.isNewRecord){
                    console.log('will create new entity...' + obj);
                    if(!obj.id){
                        obj.id = generateId();
                    }
                    obj.ctime = now;
                    obj.mtime = now;
                    obj.version = 0;
                }else{
                    console.log('will update record..');
                    obj.mtime = now;
                    obj.version++;
                }
            }
        }
    });
}


//let type attrs in exported object points to the type object in sequenlize package.
const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATE', 'BOOLEAN'];

var exp = {
    defineModel: defineModel,
    sync: () =>{
        "use strict";
        if(process.env.NODE_ENV !== 'production'){
            sequelize.sync({force: true});
        }else{
            throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
        }
    }
};

for(let type of TYPES){
    exp[type] = Sequelize[type];
}

exp.ID = ID_TYPE;
exp.generateId = generateId;
module.exports = exp;