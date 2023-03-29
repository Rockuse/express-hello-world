const { resolve } = require('path');

const AuthMethod = {
  checkLoggedIn: (req, res, next) => {
    const isLoggedIn = true;
    if (!isLoggedIn) {
      return res.status(401).json({ error: 'You Must Log In' });
    }
    next();
  },
  verifyCallback: (accessToken, refreshToken, profile, done) => {
    console.log('Google profile', profile);
    done(null, profile);
  },
};

const AUTH_OPTIONS = {
  callbackURL: '/google/callback',
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};
const AuthRouter = (router, passport) => {
  router.get('/secret', (req, res) => {
    res.sendFile(resolve(__dirname, '../public/index.html'));
  });
  router.get('/google', passport.authenticate('google', { scope: ['email'] }));
  router.get(
    '/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/failure',
      successRedirect: '/',
      session: true,
    }),
    (req, res) => { console.log('google called us back!'); },
  );
  router.get('/logout', (req, res) => { res.logout(); });
  router.get('/failure', (req, res) => { res.send('Failed to log in!'); });
  router.get('/success', (req, res) => { res.send('Failed to log in!'); });
  return router;
};

module.exports = { AUTH_OPTIONS, AuthMethod, AuthRouter };
