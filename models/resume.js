const Sequelize= require('sequelize'); 
const sequelize= require('../util/database'); 

const Resume = sequelize.define('resume', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fileName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    filePath: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fileSize: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports= Resume;