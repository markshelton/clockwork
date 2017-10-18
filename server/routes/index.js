const Authentication = require("../controllers/auth");
const Calendar = require("../controllers/calendar");
const passportService = require("../services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false }); // session is for cookies
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  app.post("/signin", requireSignin, Authentication.signin);
  app.post("/signup", Authentication.signup);
  app.get("/tasks", requireAuth, Calendar.fetch_tasks);
  app.get("/tasks/:id", requireAuth, Calendar.fetch_task);
  app.delete("/tasks/:id", requireAuth, Calendar.delete_task);
  app.post("/tasks", requireAuth, Calendar.create_task);
  app.post("/tasks/:id", requireAuth, Calendar.update_task);
};
