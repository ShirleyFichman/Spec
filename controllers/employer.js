//TODO change id of employer to the real one instead of dummy

const Employer = require("../models/employer");
const Job = require("../models/job");
const User = require("../models/user");

exports.getHome = (req, res, next) => {
  const employerId = req.params.employerId;
    res.render('employer/home', {
      pageTitle: 'Home Page',
      path: '/',
      employerId: employerId
    });
  };

exports.getCompanyPage = (req, res, next) => {
  const employerId = req.params.employerId;
  Employer.findByPk(employerId)
    .then(employer => {
      res.render('employer/company-page', {
        pageTitle: 'Company Page',
        path: '/company-page',
        employerId: employerId, 
        employer: employer
    });
    }).catch(err => console.log(err))
  };

exports.getPostEmployer = (req, res, next) => {
  const userId = req.params.userId;
    res.render('employer/post-employer', {
      pageTitle: 'Create New Employer',
      path: '/',
      userId: userId,
      employerId: userId
    });
  };

exports.postEmployer = (req, res, next) => {
  const userId = req.params.userId;
    const companyName = req.body.companyName;
    const intro = req.body.intro;
    const logoUrl = req.body.logoUrl;
    User.findByPk(userId)
    .then(user => {
      user.isEmployer= true;
      return user.save();
    }).then(result =>{
      Employer.create({
        companyName: companyName,
        intro: intro,
        logoUrl: logoUrl,
        userId: userId
      }).then(employer =>{
        res.redirect('/employer/home/'+employer.id);
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
    .catch(err => console.log(err))
  };

exports.getPostJob = (req, res, next) => {
  const employerId = req.params.employerId;
    Employer.findByPk(employerId)
    .then(employer => {
      res.render('employer/post-job', 
      {
        pageTitle: 'Create Job',
        path: '/jobs',
        employerId: employerId,
        employer: employer,
        editing: true
      })
    }).catch(err => console.log(err))
  };
  
exports.postJob = (req, res, next) => {
  const employerId = req.params.employerId;
  const title = req.body.title;
  const requirements = req.body.requirements;
  const summary = req.body.summary;

  Job.create({
    employerId: employerId,
    title: title,
    requirements: requirements,
    summary: summary
  });
  res.redirect('/employer/jobs/'+employerId);
  };
  
exports.getJobs = (req, res, next) => {
  const employerId = req.params.employerId;
  Employer.findByPk(employerId)
    .then(employer => {
      Job.findAll({where:{employerId: employerId}})
    .then(jobs =>{
      res.render('employer/jobs', {
        pageTitle: 'Jobs Page',
        path: '/jobs',
        employerId: employerId,
        companyName: employer.companyName,
        jobs: jobs
      });
    })
    .catch(err => console.log(err));
  })};
  
exports.getEditJob = (req, res, next) => {
  const employerId = req.params.employerId;
  const jobId = req.params.jobId;
  Job.findOne({where:{id: jobId}})
    .then(job =>{
      res.render('employer/edit-job', {
        pageTitle: 'Edit Job',
        path: '/jobs',
        employerId: employerId,
        job: job
      });
    })
    .catch(err => console.log(err));
  };

exports.editJob = (req, res, next) => {
  const employerId = req.params.employerId;
  const jobId = req.params.jobId;
  const updatedTitle = req.body.title;
  const updatedRequirements= req.body.requirements;
  const updatedSummary = req.body.summary;
    
  Job.findByPk(jobId)
  .then(job => {
    job.title = updatedTitle;
    job.requirements = updatedRequirements;
    job.summary = updatedSummary;
    return job.save();
  }) 
  .then(result => {
    res.redirect('/employer/jobs/'+employerId);
  })
  .catch(err => console.log(err));
  };

exports.deleteJob = (req, res, next) => {
  const employerId = req.params.employerId;
  const jobId = req.params.jobId;
  Job.findByPk(jobId)
  .then(job => {
    job.destroy();
    res.redirect('/employer/jobs/'+employerId);
  })
  .catch(err => console.log(err));
  };

exports.getEditCompany = (req, res, next) => {
  const employerId = req.params.employerId;
  Employer.findByPk(employerId)
  .then(employer => {
    res.render('employer/edit-company-page', {
      pageTitle: 'Edit Company Page',
      path: '/company-page',
      employerId: employerId, 
      employer: employer
  });
  }).catch(err => console.log(err))
};

exports.editCompany = (req, res, next) => {
  const employerId = req.params.employerId;
  const updatedName= req.body.companyName;
  const updatedIntro= req.body.intro;
  const updatedLogoUrl=  req.body.logoUrl;
  Employer.findByPk(employerId)
  .then(employer => {
    employer.companyName= updatedName;
    employer.intro= updatedIntro;
    employer.logoUrl= updatedLogoUrl;
    return employer.save();
  })
  .then(result => {
    res.redirect('/employer/company-page/'+employerId);
  })
  .catch(err => console.log(err));
};