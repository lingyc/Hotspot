import express from 'express';
import path from 'path';
import serverConfig from './server-config';
import db from './db/db';
import passport from 'passport';
// import { passportJwtConfig } from './auth';
import auth from './auth';

const app = express();
const port = process.env.PORT || 8000;

serverConfig(app, express, passportJwtConfig);

// Render the main splash page upon arrival
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/splash.html'));
});

// Route to signup page
app.get('/signup', function(req, res) {
  res.sendFile(path.join(__dirname, './views/signup.html'));
});

// create new users
app.post('/signup', function(req, res) {
  // do server-side check of inputs

  // hash the password, store the user, redirect to /spots
  auth.hashPassword(req.body.password)
    .then((userToStore) => db.createUser(userToStore))
    .then((results) => res.redirect('/spots'))
    .catch((err) => res.send('error!'));

});

// Navigate to login
app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, './views/login.html'));
});

app.post('/login', auth.isAuthenticated(), (req, res) => {
  res.redirect('/spots');
});

// Get all of a user's spots.
app.get('/spots', function(req, res) {
  res.render('spots');
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
