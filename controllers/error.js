//TODO page for login error

exports.get404 = (req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' });
  };

exports.getLoginError = (req, res, next) => {
  res.send("error logging in")};