exports.getHome = (req, res, next) => {
    res.render('user/example', {
      pageTitle: 'Home Page',
      path: '/',
    });
  };

exports.getJobs = (req, res, next) => {
    res.render('user/example', {
      pageTitle: 'Jobs Page',
      path: '/jobs',
    });
  };

exports.getProfile = (req, res, next) => {
    res.render('user/example', {
      pageTitle: 'Profile Page',
      path: '/profile',
    });
  };


// I need a user model in order to address the user itself and forward his id in the routes