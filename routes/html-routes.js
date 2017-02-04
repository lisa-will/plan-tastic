// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/../views/calendar.html"));
  });
app.get("/dashboard", function(req, res) {
    res.sendFile(path.join(__dirname + "/../views/dashboard.html"));
  });
app.get("/tasks", function(req, res) {
    res.sendFile(path.join(__dirname + "/../views/tasks.html"));
  });
app.get("/reminders", function(req, res) {
    res.sendFile(path.join(__dirname + "/../views/reminders.html"));
  });
app.get("/calendar-page", function(req, res) {
    res.sendFile(path.join(__dirname + "/../views/calendar.html"));
  });


};

//../public/views/