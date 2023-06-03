const Sequelize= require('sequelize'); 
const sequelize= require('../util/database'); 

const User_Profile = sequelize.define('User_Profile', {
  }, { timestamps: false });

  module.exports= User_Profile;