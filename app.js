//TODO add a profile model when ready and create relations to user
//TODO move success to general routes
//TODO add user from google auth to db

const path = require('path');
const express= require('express');
const bodyParser = require('body-parser');
const helmet= require('helmet')
const compression= require('compression')
const session = require('express-session');
const passport = require('passport');

require('dotenv').config({ path: './var.env' });
const sequelize = require('./util/database');

const User= require('./models/user');
const Position= require('./models/position');
const Employer= require('./models/employer');
const Profile= require('./models/profile');

const app= express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const employerRoutes = require('./routes/employer');
const userRoutes = require('./routes/user');
const generalRoutes = require('./routes/general');
const errorRoutes = require('./routes/error');

app.use(helmet());
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); 

app.use('/user', userRoutes);
app.use('/employer', employerRoutes);

  
Position.belongsTo(Employer, {constraints: true, onDelete: 'CASCADE'});
Profile.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync({ force: true }).then(result => {
    return User.findByPk(1);
})
.then(user => {
    if (!user) {
        return User.create({email: 'test@test.com', name: 'test'});
    }
    return user;
})
.then(user =>{
    app.listen(process.env.PORT || 3000);
})
.catch(err =>{
    console.log(err);
});

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
  }));
  
  var userProfile;
   
  app.use(passport.initialize());
  app.use(passport.session());
   
  app.get('/success', (req, res) => {
    res.render('general/success', {
        pageTitle: 'Login Page',
        path: '/',
        user: userProfile,
    });
  });
   
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
   
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
  
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.CLIENT_GOOGLE_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_GOOGLE_SECRET;
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/success');
  });

  app.get('/error', (req, res) => res.send("error logging in"));
  app.use(generalRoutes);
  app.use(errorRoutes);