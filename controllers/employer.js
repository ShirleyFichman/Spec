//TODO change id of employer to the real one instead of dummy
//TODO create the get post employer page

const Employer = require("../models/employer");
const Job = require("../models/job");
const User = require("../models/user");

exports.getHome = (req, res, next) => {
    res.render('employer/home', {
      pageTitle: 'Home Page',
      path: '/',
    });
  };

exports.getPostEmployer = (req, res, next) => {
  const userId=1;
    res.render('employer/post-employer', {
      pageTitle: 'Create New Employer',
      path: '/',
      userId: userId
    });
  };

exports.postEmployer = (req, res, next) => {
    const userId=1;
    const companyName = req.body.companyName;
    const intro = req.body.intro;
    User.findByPk(userId)
    .then(user => {
      user.isEmployer= true;
      return user.save();
    }).then(result =>{
      Employer.create({
        companyName: companyName,
        intro: intro,
        userId: userId
      }).then(employer =>{
        res.redirect('/employer/home/'+employer.id);
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
    .catch(err => console.log(err))
  }

exports.getPostJob = (req, res, next) => {
    const employerId = 1;
    Employer.findByPk(employerId)
    .then(employer => {
      res.render('employer/post-job', 
      {
        pageTitle: 'Create Job',
        path: '/jobs',
        employer: employer,
        editing: true
      })
    }).catch(err => console.log(err))
  };
  
exports.postJob = (req, res, next) => {
    const employerId = 1;
    const title = req.body.title;
    const requirements = req.body.requirements;
    const summary = req.body.summary;

    Job.create({
      employerId: employerId,
      title: title,
      requirements: requirements,
      summary: summary
    })
    res.redirect('/employer/jobs/'+employerId);
  };
  
exports.getJobs = (req, res, next) => {
    const employerId = 1;
    Job.findAll({where:{employerId: employerId}})
    .then(jobs =>{
      res.render('employer/jobs', {
        pageTitle: 'Jobs Page',
        path: '/jobs',
        employerId: employerId,
        jobs: jobs
      });
    })
    .catch(err => console.log(err));
  };
  