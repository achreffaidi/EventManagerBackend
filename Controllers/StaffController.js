const Events = require('../Models/eventsModel');
const User = require('../Models/UserModel');
const Staff = require('../Models/staffModel');


// Handle index actions
exports.index = function (req, res) {
    Staff.get(function (err, staffs) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Staff retrieved successfully",
            data: staffs
        });
    });
};
// Handle create contact actions
exports.new = function (req, res) {

    var staff = new Staff();
    staff.user = req.body.user ;
    staff.permissions = req.body.permissions ;
    staff.event = req.body.event ;


// save the contact and check for errors
    staff.save(function (err) {
        if (err)
             res.json(err);
        else
        res.json({
            message: 'New Staff created!',
            data: staff
        });
    });
};


