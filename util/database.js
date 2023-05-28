const Sequelize= require('sequelize');

const sequelize= new Sequelize('heroku_c5beb4270d9a2a8', 'b63b20ed161995', '3f2d7566', {
    dialect: 'mysql',
    host: 'eu-cdbr-west-03.cleardb.net', 
    port: '3306'
});

module.exports= sequelize;
