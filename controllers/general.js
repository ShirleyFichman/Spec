exports.getHome = (req, res, next) => {
    res.render('general/home', {
      pageTitle: 'Home Page',
      path: '/',
    });
  };

  //should render jobs page
  exports.getJobs = (req, res, next) => {
    res.render('general/home', {
      pageTitle: 'Jobs Page',
      path: '/jobs',
    });
  };