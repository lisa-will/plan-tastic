var express = require("express");

// Import the model (burger.js) to use its database functions.
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
module.exports = function(app) {

// app.get("/", function(req, res) {
//   res.redirect("/calendar");
// });

app.get("/calendar", function(req, res) {
   //console.log(db);
    db.calendar.findAll({raw: true})
    .then(function(dbcalendar) {
      console.log(dbcalendar);
    res.send(dbcalendar);
    });
});

app.post("/calendar/add-event", function(req, res) {
    db.calendar.create({
      title: req.body.title,
      start: req.body.start,
      end: req.body.end,
      allDay: req.body.allDay
    })
    .then(function(dbcalendar) {
       res.send({status: 'success', id: dbcalendar.id});
    });
});

app.put("/calendar/update-title", function(req, res) {

    db.calendar.update({
        title: req.body.title,
      },
      {
        where: {
          id: req.body.id
        }
      })
    .then(function(dbcalendar) {
       res.send({status: 'success', id: dbcalendar.id});
    });
  });

app.put("/calendar/update-when", function(req, res) {

    db.calendar.update({
        start: req.body.start,
        end: req.body.end
      },
      {
        where: {
          id: req.body.id
        }
      })
    .then(function(dbcalendar) {
       res.send({status: 'success', id: dbcalendar.id});
    });
  });

// app.put("/calendar/resize", function(req, res) {

//     db.calendar.update({
//         start: req.body.start,
//         end: req.body.end
//       },
//       {
//         where: {
//           id: req.body.id
//         }
//       })
//     .then(function(dbcalendar) {
//        res.send({status: 'success', id: dbcalendar.id});
//     });
//   });

app.delete("/calendar/delete", function(req, res) {

    db.calendar.destroy(
      {
        where: {
          id: req.body.id
        }
      })
    .then(function(dbcalendar) {
      res.send({status: 'success', id: dbcalendar.id});
    });
  });


}