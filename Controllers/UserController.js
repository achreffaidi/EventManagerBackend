const User = require('../Models/UserModel');
const Events = require('../Models/eventsModel');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

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
exports.new = function (req, res) {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    var user = new User();
    user.name = req.body.name ? req.body.name : user.name ;
    user.password  =  hashedPassword ;
    user.email  = req.body.email;
    user.number=req.body.number;


    user.save(function (err) {
        if (err)
             res.json(err);
        else
        {
            let token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 864000 // expires in 10 days
            });
            res.json({
                message: ' Created Successfully',
                token: token ,
                name : user.name ,
                id: user.id
            });
        }
    });
};


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



// save the contact and check for errors
    User.findOne({ email:req.body.email }, function (err, user) {

        if (err||!user)
        {
            res.writeHead(404);
            res.end("Cannot find this user.");
        }
        else {

            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)


           if(passwordIsValid){
               let token = jwt.sign({ id: user._id }, config.secret, {
                   expiresIn: 864000 // expires in 10 days
               });
               res.json({
                   message: 'Existing user',
                   token: token ,
                   name : user.name ,
                   id: user.id
               });
           }

        }
    })
};




exports.verifyToken = function(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({auth: false, message: 'No token provided.'});

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err)
            return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});

        // if everything good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
}

