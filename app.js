const path = require('path');
const express= require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const user= require('./models/user');

const app= express();

app.set('view engine', 'ejs');
app.set('views', 'views');

//const employerRoutes = require('./routes/employer');
const userRoutes = require('./routes/user');
const generalRoutes = require('./routes/general');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); 

app.use('/user', userRoutes);
app.use(generalRoutes);
//app.use(employerRoutes);

app.use(errorController.get404);

sequelize.sync().then(result => {
    console.log(result);
    app.listen(3000);
}).catch(err =>{
    console.log(err);
});
