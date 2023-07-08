const { DataTypes } = require('sequelize');

const  todolist = require('../utils/database');


const lista = todolist.define('todo', {
    id :  {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    title :{
        type: DataTypes.STRING(30)
    },
    description : {
        type: DataTypes.STRING(100)
    },
    completed : {
        type:DataTypes.BOOLEAN
    },
});


module.exports = lista;