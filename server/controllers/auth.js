const jwt = require("jwt-simple");
const User = require("../models/user");

const secret = process.env.SECRET;

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, secret);
}

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  user = req.user; // Passport provides user on request
  res.json({ token: tokenForUser(user) });
};

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide an email and a password" }); // Unprocessable Entity
  }

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    } else if (existingUser) {
      return res.status(422).send({ error: "Email is already in use" });
    } else {
      // Unprocessable Entity
      const user = new User({
        email: email,
        password: password
      });
      user.save(function(err) {
        if (err) {
          return next(err);
        }
      });
      res.json({ token: tokenForUser(user) });
    }
  });
};
