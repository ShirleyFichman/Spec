exports.getHome = (req, res, next) => {
    res.render('general/home', {
      pageTitle: 'Home Page',
      path: '/',
    });
  };