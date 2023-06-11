//TODO remove dummy user

const User = require('../models/user');
const Employer = require('../models/employer');

exports.getHome=(req, res, next) => {
  const userId = 1;
  User.findByPk(userId).then(user=>{
    if(user.isEmployer == null)
    {
      res.render('general/home', {
        pageTitle: 'Home Page',
        path: '/',
        userId: userId,
      });
    }
    else if (user.isEmployer)
    {
      Employer.findOne({where: {userId: userId}})
      .then(employer => {
        res.redirect('/employer/home/'+employer.id);
      }).catch(err => console.log(err))
    }
    else
    {
      res.redirect('/user/home/'+userId);
    }
  }).catch(err => console.log(err))
};

exports.getAuth=(req, res, next) => {
  console.log("in get auth");
  res.render('general/auth', {
      pageTitle: 'Login Page',
      path: '/',
    });
};

