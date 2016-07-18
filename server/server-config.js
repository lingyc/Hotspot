import bodyParser from 'body-parser';
import path from 'path';
import session from 'express-session';

export default function(app, express, passport, db) {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '/../build')));
  app.use(express.static(path.join(__dirname, '/../node_modules')));
  app.use(express.static(path.join(__dirname, './server-test')));
  app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user[0].id);
  });

  passport.deserializeUser(function(id, done) {
    db.findUser(id)
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  });
}
