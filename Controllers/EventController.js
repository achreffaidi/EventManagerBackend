// contactController.js
// Import contact model
Events = require('../Models/eventsModel');
const User = require('../Models/UserModel');

// Handle index actions
exports.index =    function (req, res) {
   Events.get(function (err, events) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }else
       res.json({
           status: "success",
           message: "Events retrieved successfully",
           data: events
       });


    });
};
// Handle create contact actions
exports.new = function (req, res) {

    var events = new Events();
    console.log(req.body)
    events.name = req.body.name ? req.body.name : events.name;
    events.admin  = req.body.admin ? req.body.admin : events.admin ;
    events.start_date = req.body.start_date ;
    events.end_date = req.body.end_date ;
    events.description = req.body.description ;
    events.location = req.body.location ;

// save the contact and check for errors
    events.save(function (err) {
        if (err)
             res.json(err);
        else
        res.json({
            message: 'New Events created!',
            data: events
        });
    });
};
// Handle view contact info
exports.view = function (req, res) {
    Events.findById(req.params.Events_id, function (err, events) {
        if (err)
            res.send(err);
        res.json({
            message: 'Events details loading..',
            data: events
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
    Events.findById(req.params.events_id, function (err, events) {
        if (err)
            res.send(err);
        events.name = req.body.name ? req.body.name : events.name;
        events.admin = req.body.admin;
// save the contact and check for errors
        Events.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: events
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Events.remove({
        _id: req.params.events_id
    }, function (err, events) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'events deleted'
        });
    });
};