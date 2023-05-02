const express= require('express');
const bodyParser = require('body-parser');

const app= express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const companyRoutes = require('./routes/company');
const userRoutes = require('./routes/user');
const generalRoutes = require('./routes/general');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', userRoutes);
app.use(companyRoutes);
app.use(generalRoutes);

app.listen(3000);