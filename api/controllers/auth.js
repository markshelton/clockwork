const jwt = require("jwt-simple");

const User = require("../models/user");
const transporter = require("../utils/email");
//const resetPasswordEmail = require("../templates/reset_password");

exports.login_user = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  user = req.user; // Passport provides user on request
  res.json({ token: tokenForUser(user) });
};

exports.create_user = function(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide an email and a password" }); // Unprocessable Entity
  }
  User.findOne({ email }, function(err, existingUser) {
    if (err) return next(err);
    if (existingUser)
      return res.status(422).send({ error: "Email is already in use" });
    const user = new User({ email, password });
    user.save(function(err) {
      if (err) return next(err);
    });
    return res.status(200).json({ token: tokenForUser(user) });
  });
};

exports.delete_user = function(req, res, next) {
  User.findByIdAndRemove(req.user._id, function(err, user) {
    if (err) return next(err);
    if (!user)
      return res.status(422).send({ error: "User couldn't be deleted" });
    else return res.sendStatus(200);
  });
};

exports.send_user_password_token = function(req, res, next) {
  const { email } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) return next(err);
    if (!user)
      return res.status(422).send({ error: "Email address couldn't be found" });
    else {
      const token = user.setToken();
      try {
        send_token_to_email(token, user);
        return res.sendStatus(200);
      } catch (e) {
        console.log(e);
        return res.status(401).send({ error: "Email couldn't be sent" });
      }
    }
  });
};

exports.check_user_password_token = function(req, res, next) {
  const { passwordToken, email } = req.body;
  User.getByToken(passwordToken, { email }, function(err, user) {
    if (err) return next(err);
    if (!user)
      return res
        .status(422)
        .send({ error: "Reset password token has expired" });
    else {
      user.resetToken();
      return res.sendStatus(200);
    }
  });
};

exports.update_user_password = function(req, res, next) {
  const { password } = req.body;
  User.findByIdAndUpdate(req.user._id, { password }, function(err, user) {
    if (err) return next(err);
    if (!user)
      return res.status(422).send({ error: "Couldn't update password" });
  });
};

// helpers

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET);
}

function send_token_to_email(token, user) {
  transporter.sendMail(message, (error, info) => {
    if (error) throw error;
    console.log("Message sent: %s", info.messageId);
  });
}
