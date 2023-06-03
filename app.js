//TODO make the home page home with nav to login

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
const User_Profile= require('./models/user_profile');

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
//routes for auth
//routes for general

Position.belongsTo(Employer, {constraints: true, onDelete: 'CASCADE'});
User.hasOne(Profile, { through: User_Profile });
Profile.belongsTo(User, { through: User_Profile, 
  foreignKey: 'userId',
  constraints: true,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE' });
  

//{ force: true }
sequelize.sync().then(result => {
    app.listen(process.env.PORT || 3000);
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
    User.findOrCreate({
      where: { email: userProfile.emails[0]['value']},
      defaults: {name: userProfile.displayName}
      }).then(user => {
        let userId=user[0]['dataValues']['id'];
        console.log(Number. isInteger(userId));
        user[0].createProfile({userId: userId, fullName: userProfile.displayName});
        res.redirect('/user/'+userId);
      }).catch(err => console.log(err));
  });
  app.use(generalRoutes);
  app.use(errorRoutes);