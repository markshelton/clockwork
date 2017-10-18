const passport = require("passport");
const User = require("../models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

// Setup options for Local Strategy
const localOptions = { usernameField: "email" }; // defaults: username, password

const secret = process.env.SECRET;

// Create Local strategy
const localLogin = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  User.findOne({ email: email }, function(err, user) {
    if (err) {
      return done(err);
    } else if (!user) {
      return done(null, false);
    } else {
      user.comparePassword(password, function(err, isMatch) {
        if (err) {
          return done(err);
        } else if (!isMatch) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      });
    }
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false);
    } else if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(localLogin);
passport.use(jwtLogin);
