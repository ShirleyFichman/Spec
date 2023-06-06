//TODO change id of profile to the real one instead of dummy
const User = require('../models/user');
const Profile = require('../models/profile');
/*
const applyUserId = (req, res, next) => {
  const userId = req.params.userId;
  req.user = userId;
  console.log("user id: ", req.user);
  res.send();
  };
  */

exports.getHome= (req, res, next) =>{
  res.render('user/home', {
    pageTitle: 'Home Page',
    path: '/',
    userId: req.params.userId,
  });
}

exports.getJobs = (req, res, next) => {
    res.render('user/jobs', {
      pageTitle: 'Jobs Page',
      path: '/jobs',
      userId: req.userId,
    });
  };

exports.getProfile = (req, res, next) => {
  const userId = 1;
  User.findByPk(userId).then(user=>{
    user.getProfile()
    .then(profile =>{
      res.render('user/profile', {
        pageTitle: 'Profile Page',
        path: '/profile',
        profile: profile,
        editing: false,
      });
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
  };


exports.getEditProfile = (req, res, next) => {
  console.log("in edit profile");
  const userId = 1;
  User.findByPk(userId).then(user=>{
    user.getProfile()
    .then(profile =>{
      res.render('user/edit-profile', {
        pageTitle: 'Edit Profile Page',
        path: '/profile',
        profile: profile,
        editing: true,
      });
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
  };


  exports.postEditProfile= (req, res, next) => {
    const profileId = 1;
    const updatedFullName = req.body.fullName;
    const updatedLocation = req.body.location;
    const updatedImageUrl = req.body.imageUrl;
    const updatedIntro = req.body.intro;
    Profile.findByPk(profileId)
      .then(profile => {
        profile.fullNAme = updatedFullName;
        profile.location = updatedLocation;
        profile.imageUrl = updatedImageUrl;
        profile.intro = updatedIntro;
        return profile.save();
      })
      .then(result => {
        console.log('updated profile');
        res.redirect('/user/profile/'+profileId);
      })
      .catch(err => console.log(err));
  }
  