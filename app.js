//TODO add a profile model when ready and create relations to user
//TODO add app.use(employerRoutes); when employer controllers added
//TODO delet dummy user when adding authentication
//TODO adding try catch blocks to handle errors

const path = require('path');
const express= require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const User= require('./models/user');
const Position= require('./models/position');
const Employer= require('./models/employer');

const app= express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const employerRoutes = require('./routes/employer');
const userRoutes = require('./routes/user');
const generalRoutes = require('./routes/general');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); 

app.use((req, res, next) =>{
    User.findByPk(1)
    .then(user => {
        req.user=user;
        next();
    })
    .catch(err => {
        console.log(err);
    })
});

app.use('/user', userRoutes);
app.use('/employer', employerRoutes);
app.use(generalRoutes);
app.use(errorController.get404);

Position.belongsTo(Employer, {constraints: true, onDelete: 'CASCADE'});

sequelize.sync().then(result => {
    return User.findByPk(1);
})
.then(user => {
    if (!user) {
        return User.create({email: 'test@test.com', password: 'test'});
    }
    return user;
})
.then(user =>{
    app.listen(3000);
})
.catch(err =>{
    console.log(err);
});
