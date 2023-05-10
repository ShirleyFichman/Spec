const Sequelize= require('sequelize'); // the package

const sequelize= require('../util/database'); // have the connection pool

//the password might be changed later for safety and auth reasons and email should be checked that is email
//should add more relevant fields like experience, summary, cv, location etc

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports= User;