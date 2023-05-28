//TODO adding CV with multer

const Sequelize= require('sequelize'); 
const sequelize= require('../util/database'); 

const Profile = sequelize.define('profile', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fullName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl:{
        type: Sequelize.STRING,
        allowNull: false
    },
    intro:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    location:{
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports= Profile;