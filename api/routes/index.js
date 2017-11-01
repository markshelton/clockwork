const Authentication = require("../controllers/auth");
const Calendar = require("../controllers/calendar");
const passportService = require("../services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false }); // session is for cookies
const requireLogin = function(req, res, next) {
  passport.authenticate("local", { session: false }, function(err, user, info) {
    if (err) next(err);
    else if (!user) res.status(401).json({ error: info.error });
    else res.json(user);
  })(req, res, next);
};

module.exports = function(app) {
  app.post("/users/login", requireLogin, Authentication.login_user);
  app.post("/users", Authentication.create_user);
  app.delete("/users", requireAuth, Authentication.delete_user);
  app.post("/users/password", Authentication.send_user_password_token);
  app.get("/users/password", Authentication.check_user_password_token);
  app.put("/users/password", requireAuth, Authentication.update_user_password);
  app.get("/tasks", requireAuth, Calendar.fetch_tasks);
  app.get("/tasks/:id", requireAuth, Calendar.fetch_task);
  app.delete("/tasks/:id", requireAuth, Calendar.delete_task);
  app.post("/tasks", requireAuth, Calendar.create_task);
  app.put("/tasks/:id", requireAuth, Calendar.update_task);
};
