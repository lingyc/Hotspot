import express from 'express';
import path from 'path';
import serverConfig from './server-config';
import db from './db/db';
import passport from 'passport';
import {facebookAuthConfig} from './auth/fbAuth';
import localAuthConfig from './auth/localAuth';

// passport.authenticate('jwt', { session: false })
const app = express();
const port = process.env.PORT || 8000;

localAuthConfig(db);
facebookAuthConfig(db);
serverConfig(app, db);
// Render the main splash page upon arrival
app.get('/', (req, res) => {
  console.log('redirected back');
  res.render('index');
});

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

// Get all of a user's spots.
app.get('/spots',
function(req, res) {
  console.log('redirected to spots');
  res.sendFile(path.join(__dirname, './views/mainapp.html')); // index.html for react app
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
