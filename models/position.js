const Sequelize= require('sequelize'); // the package

const sequelize= require('../util/database'); // have the connection pool

const Position = sequelize.define('position', {
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

module.exports= Position;