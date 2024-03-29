//TODO change id of profile to the real one instead of dummy
//TODO marking job as already applied
const User = require('../models/user');
const Profile = require('../models/profile');
const Job = require('../models/job');
const Resume = require('../models/resume');
const config = require('../config.json');

const nodemailer = require("nodemailer");
const Employer = require('../models/employer');

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email,
    pass: config.pass
  },
});

exports.getHome= (req, res, next) =>{
  res.render('user/home', {
    pageTitle: 'Home Page',
    path: '/',
    userId: req.params.userId,
  });
}

exports.postApply = (req, res, next) => {
  const jobId = req.params.jobId;
  const userId = req.params.userId;

  Job.findOne({where:{id: jobId}})
  .then(job =>{
    Employer.findByPk(job.employerId)
    .then(employer => {
      User.findByPk(employer.userId)
      .then(userOfEmployer =>{
        const employerEmail= userOfEmployer.email;
        Profile.findOne({where: {userId: userId}})
        .then(profile =>{
          Resume.findOne({where: {profileId: profile.id}})
          .then(resume =>{
            if (resume != null)
            {
              transporter.sendMail({
                from: "spec <"+config.email+">",
                to: employerEmail, 
                subject: "Application for <"+job.title+">", 
                attachments:[{
                  filename: resume.fileName,
                  path: resume.filePath
                }]
              });
              res.render('user/successful-applied', {
                pageTitle: 'Successful Applied',
                path: '/jobs',
                userId: userId,
              });
            }
            else
            {
              console.log("no resume");
            }
          })
          .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
  };

exports.getJobs = (req, res, next) => {
  const userId = req.params.userId;
  Job.findAll().then(jobs => {
    res.render('user/jobs', {
      pageTitle: 'Jobs Page',
      path: '/jobs',
      userId: userId,
      jobs: jobs,
    });
  }).catch(err => console.log(err))
  };

  exports.getEmployerPage = (req, res, next) => {
    const userId = req.params.userId;
    const employerId = req.params.employerId;
    Employer.findByPk(employerId)
    .then(employer => {
      res.render('user/employer-page', {
        pageTitle: 'Employer Page',
        path: '/jobs',
        userId: userId,
        employer: employer,
      });
    }).catch(err => console.log(err))
    };

exports.getProfile = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
  .then(user=>{
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
  const userId = req.params.userId;
  User.findByPk(userId).then(user=>{
    user.getProfile()
    .then(profile =>{
      res.render('user/edit-profile', {
        pageTitle: 'Edit Profile Page',
        path: '/profile',
        userId: userId,
        profile: profile,
        editing: true,
      });
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
  };

  exports.postEditProfile= (req, res, next) => {
    const userId = req.params.userId;
    const updatedFullName = req.body.fullName;
    const updatedLocation = req.body.location;
    const updatedImageUrl = req.body.imageUrl;
    const updatedIntro = req.body.intro;
    
    Profile.findOne({where: {userId: userId}})
    .then(profile => {
      profile.fullName = updatedFullName;
      profile.location = updatedLocation;
      profile.imageUrl = updatedImageUrl;
      profile.intro = updatedIntro;
      return profile.save();
    })
    .then(result => {
      res.redirect('/user/profile/'+userId);
    })
    .catch(err => console.log(err));
  };

  exports.postResume= (req, res, next) => {
    const userId = req.params.userId;
    if  (req.file) {
      const { originalname, path, size } = req.file;
      Profile.findOne({where: {userId: userId}})
      .then(profile => {
        profile.createResume({
        fileName: originalname,
        filePath: path,
        fileSize: size
      })
      .then(resume => {
        res.redirect('/user/profile/'+userId);
      })
      .catch(err => console.log(err));
    })
    }
    else {
      res.redirect('/user/profile/'+userId);
    }
  };

exports.deleteAccount = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
  .then(user => {
    console.log("in deleteAccount");
    user.destroy();
    res.redirect('/');
  })
  .catch(err => console.log(err));
};