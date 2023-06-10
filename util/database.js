const Sequelize= require('sequelize');

const sequelize= new Sequelize('spec', 'root', 'Shirley2721996', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports= sequelize;
