const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const keys = require('../config/keys');

const options = {
  jwt: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secret,
  },
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(options.jwt, async (jwt_payload, done) => {
      const currentUser = await User.findById(jwt_payload.id);
      if (currentUser) {
        return done(null, currentUser);
      }
      return done(null, false);
    })
  );
};
