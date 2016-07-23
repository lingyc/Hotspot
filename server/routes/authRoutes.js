import path from 'path';
import passport from 'passport';
import isAuthenticated from '../auth/isAuthenticated';

export default function(app) {
  // AUTHENTICATION
  app.route('/login')
    .get((req, res) => {
      res.render('login', {errMsg: false});
    })
    .post(passport.authenticate('local-login', {
      successRedirect: '/spots',
      failureRedirect: '/login'
    }));

  app.route('/signup')
    .get((req, res) => {
      res.render('signup');
    })
    .post(passport.authenticate('local-signup', {
      successRedirect: '/spots',
      failureRedirect: '/signup'
    }));
  // route for facebook authentication and login
  // different scopes while logging in
  app.get('/auth/facebook',
    passport.authenticate('facebook', { session: false, scope: 'email' }
  ));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { session: false, failureRedirect: '/login' }));

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
 // isAuthenticated,
 console.log(isAuthenticated);
  // Get all of a user's spots.
  app.get('/spots', isAuthenticated,
  function(req, res) {
    console.log('redirected to spots');
    res.sendFile(path.join(__dirname, '/../../index.html')); // index.html for react app
  });

}
