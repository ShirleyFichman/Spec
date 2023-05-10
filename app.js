const path = require('path');
const express= require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const User= require('./models/user');
const Position= require('./models/position');
const Employer= require('./models/employer');
//const Profile= require('./models/profile');

const app= express();

app.set('view engine', 'ejs');
app.set('views', 'views');

//const employerRoutes = require('./routes/employer');
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
app.use(generalRoutes);
//app.use(employerRoutes);

app.use(errorController.get404);

//User.hasOne(Profile);
//Profile.belongsTo(User);
Position.belongsTo(Employer, {constraints: true, onDelete: 'CASCADE'});

//delete the {force: true} when in production
//remember to delete dummy user

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
