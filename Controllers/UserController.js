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
            let token = jwt.sign({
                id: user._id
            }, config.secret, {
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


    console.log(req.body);
    User.findOne({ email:req.body.email }, function (err, user) {

        if (err||!user)
        {
            res.writeHead(404);
            res.end("Cannot find this user.");
        }
        else {

            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)


           if(passwordIsValid){
               let token = jwt.sign({
                   id: user._id ,
                   isAdmin : user.isAdmin

               }, config.secret, {
                   expiresIn: 864000 // expires in 10 days
               });
               res.json({
                   message: 'Existing user',
                   token: token ,
                   name : user.name ,
                   id: user.id
               });
           }else{
               res.status(444).json({
                   message:"password or mail incorrect"
               })
           }

        }
    })
};


exports.loginAsAdmin = function (req, res) {

    User.findOne({ email:req.body.email }, function (err, user) {

        console.log(req.body);
        if (err||!user)
        {
            res.writeHead(404);
            res.end("Cannot find this user.");
        }
        else {

            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
            if(!user.isAdmin || !passwordIsValid ){
                res.status(444).json({
                    message :"You are not an Admin"
                })
            } else
            if(passwordIsValid){
                let token = jwt.sign({
                    id: user._id ,
                    isAdmin : user.isAdmin
                }, config.secret, {
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
        req.isAdmin = decoded.isAdmin;
        next();
    });
}

exports.verifyAdmin = function(req, res, next) {
    if(!req.isAdmin){
        res.status(444).json({
            message :"You are not an Admin"
        });
    }else next();
}

