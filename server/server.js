import express from 'express';
import path from 'path';
import serverConfig from './server-config';
import Spot from './db/spotQueries';
import User from './db/userQueries';
import passport from 'passport';
import { passportJwtConfig } from './auth';
import auth from './auth';

const app = express();
const port = process.env.PORT || 8000;

serverConfig(app, express, passportJwtConfig);

// Render the main splash page upon arrival
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './server-test-views/splash.html'));
});

// Route to signup page
app.get('/signup', function(req, res) {
  res.sendFile(path.join(__dirname, './server-test-views/signup.html'));
});

// create new users
app.post('/signup', function(req, res) {
  // do server-side check of inputs

  // hash the password, store the user, redirect to /spots
  User.hashPassword(req.body.password)
    .then((userToStore) => User.createUser(userToStore))
    .then((results) => res.redirect('/spots'))
    .catch((err) => res.send('error!'));

});

// Navigate to login
app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, './server-test-views/login.html'));
});

app.post('/login', auth.isAuthenticated(), (req, res) => {
  res.redirect('/spots');
});

// Get all of a user's spots.
app.get('/spots', function(req, res) {
  res.render('spots');
});


// Log users out

// RESTFUl API for retrieving spots from the db
app.get('/api/spots', Spot.getAllSpots);
app.get('/api/spots/:id', Spot.getSingleSpot);
app.post('/api/spots', Spot.createSpot);
app.put('/api/spots/:id', Spot.updateSpot);
app.delete('/api/spots/:id', Spot.removeSpot);


app.listen(port, () => {
  console.log('server started on port');
});
