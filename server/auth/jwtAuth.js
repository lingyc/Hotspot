import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import passport from 'passport';

export const jwtAuthConfig = function(findOrCreateUser) {
  passport.use(new JwtStrategy({
    secretOrKey: 'i like turtles',
    jwtFromRequest: ExtractJwt.fromAuthHeader()
  }, function(jwt, done) {
    findOrCreateUser({ id: jwt.sub })
    .then((user) => {
      if (user.length > 0) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch((err) => done(err, false));
  }
  ));
};
