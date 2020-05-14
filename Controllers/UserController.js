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
    user.email  = req.body.email;
    user.number=req.body.number;
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

exports.login = function (req, res) {


    var user = new User();
    user.password  = req.body.password ? req.body.password : user.password ;
    user.email  = req.body.email;
// save the contact and check for errors
    User.findOne({ email:user.email , password: user.password}, function (err, userFound) {

        if (err||!userFound)
            res.json({
                message: "error",
                error:err
            });
        else
            res.json({
                message: 'Existing user',
                id: userFound._id
            });

    })
};
