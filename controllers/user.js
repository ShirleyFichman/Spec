exports.getHome = (req, res, next) => {
    res.render('user/home', {
      pageTitle: 'Home Page',
      path: '/',
      userId: req.user.id,
    });
  };

exports.getJobs = (req, res, next) => {
    res.render('user/jobs', {
      pageTitle: 'Jobs Page',
      path: '/jobs',
      userId: req.user.id,
    });
  };

exports.getProfile = (req, res, next) => {
    res.render('user/profile', {
      pageTitle: 'Profile Page',
      path: '/profile',
      userId: req.user.id,
      editing: false
    });
  };
  