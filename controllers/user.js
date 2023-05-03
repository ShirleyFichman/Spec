exports.getExample = (req, res, next) => {
    res.render('user/example', {
      pageTitle: 'Example',
      path: '/',
    });
  };