const express= require('express');
const bodyParser = require('body-parser');

const app= express();

app.set('view engine', 'ejs');
app.set('views', 'views');

//const employerRoutes = require('./routes/employer');
const userRoutes = require('./routes/user');
//const generalRoutes = require('./routes/general');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', userRoutes);
//app.use(employerRoutes);
//app.use(generalRoutes);

//app.use(errorController.get404);

app.use(errorController.get404);

app.listen(3000);