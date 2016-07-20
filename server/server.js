import express from 'express';
import path from 'path';
import serverConfig from './server-config';
import db from './db/db';
import passport from 'passport';
import {facebookAuthConfig} from './auth/fbAuth';
import {localConfig} from './auth/localAuth';
// passport.authenticate('jwt', { session: false })
const app = express.Router();
const port = process.env.PORT || 8000;

serverConfig(app, express, passport, db);
facebookAuthConfig(db.findOrCreateUser);
localConfig(db);
// Render the main splash page upon arrival
app.get('/', (req, res) => {
  console.log('redirected back');
  res.render('index');
});

app.route('/login')
  .get((req, res) => {
    res.render('login');
  })
  .post((req, res, next) => {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) {
        return next(err); // will generate a 500 error
      }
      if (!user) {
        return res.render('login', {errMsg: 'Sorry, it doesn\'t look like you\'re signed up'});
      }
      req.login(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.redirect('/spots');
      });
    })(req, res, next);
  });

app.route('/signup')
  .get((req, res) => {
    res.render('signup');
  })
  .post((req, res, next) => {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) {
        return next(err); // will generate a 500 error
      }
      if (!user) {
        return res.render('signup'), {errMsg: 'sorry, something went wrong with our database :('};
      }
      req.login(user, function(err) {
        if (err) {
          console.error(err);
          return next(err);
        }
        return res.redirect('/spots');
      });
    })(req, res, next);
  });




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

// Get all of a user's spots.
app.get('/spots',
function(req, res) {
  console.log('redirected to spots');
  res.sendFile(path.join(__dirname, './views/spots.html')); // index.html for react app
});

// RESTFUl API for retrieving spots from the db
app.get('/api/spots', db.getAllSpots);
app.get('/api/spots/:id', db.getSingleSpot);
app.post('/api/spots', db.createSpot);
app.put('/api/spots/:id', db.updateSpot);
app.delete('/api/spots/:id', db.removeSpot);


app.listen(port, () => {
  console.log('server started on port');
});
