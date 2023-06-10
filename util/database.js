const Sequelize= require('sequelize');

const sequelize= new Sequelize('spec', 'root', 'Shirley2721996', {
    dialect: 'mysql',
    host: 'localhost'
    //port: '3306'
});

module.exports= sequelize;
