const Sequelize= require('sequelize');

const sequelize= new Sequelize('spec', 'root', 'spec', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports= sequelize;