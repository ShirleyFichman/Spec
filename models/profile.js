//TODO add fields to Profile such as date of birth, cv, photo, intro...

const Sequelize= require('sequelize'); 

const sequelize= require('../util/database'); 

const Profile = sequelize.define('profile', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports= Profile;