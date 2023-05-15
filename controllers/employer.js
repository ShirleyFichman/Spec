exports.getHome = (req, res, next) => {
    res.render('employer/example', {
      pageTitle: 'Home Page',
      path: '/',
    });
  };