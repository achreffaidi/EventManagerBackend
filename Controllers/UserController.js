// contactController.js
// Import contact model
const User = require('../Models/UserModel');
const Events = require('../Models/eventsModel');
// Handle index actions
exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }

        res.json({
            status: "success",
            message: "User retrieved successfully",
            data: users
        });
    });
};
// Handle create contact actions
exports.new = function (req, res) {
    var user = new User();
    user.name = req.body.name ? req.body.name : user.name ;
    user.password  = req.body.password ? req.body.password : user.password ;
// save the contact and check for errors
    user.save(function (err) {
        if (err)
             res.json(err);
        else
        res.json({
            message: 'New User created!',
            data: user
        });
    });
};
// Handle view contact info
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'User details loading..',
            data: user
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        user.name = req.body.name ? req.body.name : user.name;
        user.password = req.body.password;
// save the contact and check for errors
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: user
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    User.remove({
        _id: req.params.user_id
    }, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'User deleted'
        });
    });
};
exports.events = function (req, res) {

    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        Events.find({admin:user._id},function (err , events) {
            if(err)
                res.send(err);
            res.json({
                message: 'User details loading..',
                data: events
            });
        })

    });

};

