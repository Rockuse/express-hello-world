const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const { AUTH_OPTIONS, AuthMethod, AuthRouter } = require('./config.auth');
const { getConfig } = require('./config.env');

module.exports = (app, express) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '..', 'build')));
  app.use(express.urlencoded({ extended: false }));
  passport.use(new Strategy(AUTH_OPTIONS, AuthMethod.verifyCallback));
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    // User.findById(id).then(user => {
    //   done(null, user)
    // })//req.user
    done(null, id);
  });
  app.use(helmet());

  app.use(cookieSession({
    name: 'session',
    maxAge: 1000 * 60 * 60 * 24,
    keys: [getConfig('cookie_key_1'), getConfig('cookie_ke_2')],
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/', AuthRouter(express.Router(), passport));
  return app;
};
