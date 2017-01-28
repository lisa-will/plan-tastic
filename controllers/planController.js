// // Getting all the buttons 
var button = document.querySelectorAll('button.paper-button');
 
// Traversing the buttons 
[].forEach.call(buttons, function(button) {
    // New PaperRipple for the button 
    var ripple = new PaperRipple();
    
    // Adding ripple container to the button 
    button.appendChild(ripple.$);
 
    // Subscribing to 'mousedown' and 'mouseup' button events to activate ripple effect 
    // when a user clicks on the button. 
    button.addEventListener('mousedown', function(ev) {
        ripple.downAction(ev);
    });
    button.addEventListener('mouseup', function() {
        ripple.upAction();
    });
});

var express = require("express");

var router = express.Router();
// Import the model (cat.js) to use its database functions.
var cat = require("../models/cat.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  res.redirect("/cats");
});

router.get("/cats", function(req, res) {
  cat.all(function(data) {
    var hbsObject = {
      cats: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/cats/create", function(req, res) {
  cat.create([
    "name", "sleepy"
  ], [
    req.body.name, req.body.sleepy
  ], function() {
    res.redirect("/cats");
  });
});

router.put("/cats/update/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  cat.update({
    sleepy: req.body.sleepy
  }, condition, function() {
    res.redirect("/cats");
  });
});

router.delete("/cats/delete/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  cat.delete(condition, function() {
    res.redirect("/cats");
  });
});

// Export routes for server.js to use.
module.exports = router;
