//TODO change id of profile to the real one instead of dummy
const User = require('../models/user');
const Profile = require('../models/profile');
const Job = require('../models/job');
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

exports.postApply = (req, res, next) => {
  const jobId=1
  const userId=1
  //Sending cv for this job to the email of employer
  //marking this job as already applied
  Job.findOne({where:{id: jobId}})
  .then(job =>{
    res.render('user/successful-applied', {
      pageTitle: 'Successful Applied',
      path: '/jobs',
      userId: userId,
    });
  })
  .catch(err => console.log(err));
  };

exports.getJobs = (req, res, next) => {
  const userId=1
  Job.findAll().then(jobs => {
    res.render('user/jobs', {
      pageTitle: 'Jobs Page',
      path: '/jobs',
      userId: userId,
      jobs: jobs,
    });
  }).catch(err => console.log(err))
  };

exports.getProfile = (req, res, next) => {
  const userId = 1;
  User.findByPk(userId).then(user=>{
    user.getProfile()
    .then(profile =>{
      res.render('user/profile', {
        pageTitle: 'Profile Page',
        path: '/profile',
        userId: req.params.userId,
        profile: profile,
        editing: false,
      });
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
  };


exports.getEditProfile = (req, res, next) => {
  const userId = 1;
  User.findByPk(userId).then(user=>{
    user.getProfile()
    .then(profile =>{
      res.render('user/edit-profile', {
        pageTitle: 'Edit Profile Page',
        path: '/profile',
        userId: req.params.userId,
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
        profile.fullName = updatedFullName;
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
  