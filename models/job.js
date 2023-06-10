const Sequelize= require('sequelize'); 
const sequelize= require('../util/database'); 

const Job = sequelize.define('job', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    requirements: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    summary: {
        type: Sequelize.TEXT,
        allowNull: true
    },
});

module.exports= Job;