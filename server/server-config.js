import bodyParser from 'body-parser';
import path from 'path';
import passport from 'passport'
import {Strategy} as JwtStrategy from 'passport-jwt';
import {ExtractJwt} from 'passport-jwt';


export default function(app, express) {
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '/../build')));
  app.use(express.static(path.join(__dirname, '/../node_modules')));
  app.use(express.static(path.join(__dirname, './server-test')));
  app.use(passport.initialize());
}
