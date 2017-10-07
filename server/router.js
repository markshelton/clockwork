const Authentication = require("./controllers/auth");
const passportService = require("./services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false }); // session is for cookies
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  app.post("/signin", requireSignin, Authentication.signin);
  app.post("/signup", Authentication.signup);
  app.get("");
};
