exports.getHome = (req, res, next) => {
  const userId = req.params.userId;
    res.render('user/home', {
      pageTitle: 'Home Page',
      path: '/',
      userId: userId,
    });
  };

exports.getJobs = (req, res, next) => {
    res.render('user/jobs', {
      pageTitle: 'Jobs Page',
      path: '/jobs',
      userId: req.userId,
    });
  };

exports.getProfile = (req, res, next) => {
  const userId = req.params.userId;
  const profile= Profile.findByPk(userId);
    res.render('user/profile', {
      pageTitle: 'Profile Page',
      path: '/profile',
      userId: userId,
      profile: profile,
      editing: false
    });
  };
  