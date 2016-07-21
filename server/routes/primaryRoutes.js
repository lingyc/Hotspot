export default function(app) {
  app.get('/', (req, res) => {
    console.log('redirected back');
    res.render('index');
  });

  // Get all of a user's spots.
  app.get('/spots', isAuthenticated,
  function(req, res) {
    console.log('redirected to spots');
    res.sendFile(path.join(__dirname, '/../index.html')); // index.html for react app
  });
}
