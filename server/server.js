import express from 'express';
import path from 'path';
import serverConfig from './server-config';
import db from './db/spotQueries';
const app = express();
const port = process.env.PORT || 8000;

serverConfig(app, express);

// Render the main splash page upon arrival
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './server-test/index.html'));
});


// Create users
router.get('/signup', function(req, res) {
  res.render('signup');
});

// Navigate to login
router.get('/login', function(req, res) {
  res.render('login');
});


app.post('/', login);

// Log users out

// RESTFUl API for retrieving spots from the db
app.get('/api/spots', db.getAllSpots);
app.get('/api/spots/:id', db.getSingleSpot);
app.post('/api/spots', db.createSpot);
app.put('/api/spots/:id', db.updateSpot);
app.delete('/api/spots/:id', db.removeSpot);


app.listen(port, () => {
  console.log('server started on port');
});

function login() {

}
