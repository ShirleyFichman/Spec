const Sequelize= require('sequelize'); 
const sequelize= require('../util/database'); 

const Employer = sequelize.define('employer', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    companyName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    intro: {
        type: Sequelize.TEXT,
        allowNull: true
    }
});

module.exports= Employer;