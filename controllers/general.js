exports.getAuth=(req, res, next) => {
  res.render('general/auth', {
      pageTitle: 'Login Page',
      path: '/',
    });
};

exports.getJobs = (req, res, next) => {
    res.render('general/jobs', {
      pageTitle: 'Jobs Page',
      path: '/jobs',
    });
};
