import express from 'express';
import path from 'path';
import serverConfig from './server-config';
import db from './db/queries';
const app = express();
const port = process.env.PORT || 8000;


serverConfig(app, express);

// Render the main splash page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../build/index.html'));
});

app.post('/', login);

// RESTFUl API
app.get('/api/spots', db.getAllSpots);
app.get('/api/spots/:id', db.getSingleSpot);
app.post('/api/spots', upload, db.createSpot);
app.put('/api/spots/:id', db.updateSpot);
app.delete('/api/spots/:id', db.removeSpot);


app.listen(port, () => {
  console.log('server started on port');
});

function login() {

}
