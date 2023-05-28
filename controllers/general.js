exports.getHome = (req, res, next) => {
    res.render('general/home', {
      pageTitle: 'Home Page',
      path: '/',
    });
  };

  exports.getJobs = (req, res, next) => {
    res.render('general/jobs', {
      pageTitle: 'Jobs Page',
      path: '/jobs',
    });
  };
