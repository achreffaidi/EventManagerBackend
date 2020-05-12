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


//TODO add tests if the event doesn't exist !!  => same with all other functions !
exports.new = function (req, res) {

    console.log(req.body);
    User.findOne({'email':req.body.email},function(err,user){
        if(err){
            res.send(err);
        }else{
            if(!user){
               res.writeHead(404);
                res.end("Can't find The User", 'utf-8');
            }else{
                let staff = new Staff();
                console.log(user);
                staff.user = user.id;
                staff.permissions = req.body.permissions ;
                staff.event = req.body.event ;


// save the contact and check for errors
                staff.save(function (err) {
                    if (err)
                        res.json(err);
                    else
                        res.json({
                            message: 'New Staff Added!',
                            data: staff
                        });
                });


            }
        }

    })


};

exports.update = function (req, res) {


    console.log(req.body);
    Staff.findById(req.body.id,function(err,staff){
        if(err){
            res.send(err);
        }else{
            if(!staff){
                res.writeHead(404);
                res.end("Can't find Staff", 'utf-8');
            }else{

                staff.permissions = req.body.permissions ;


                staff.save(function (err) {
                    if (err)
                        res.json(err);
                    else
                        res.json({
                            message: 'Staff updated',
                            data: staff
                        });
                });


            }
        }

    })


};



exports.getStaffByEvent = function (req,res) {

    Staff.find({'event':req.headers.event},function(err,staffs){

        if(err){
            res.send(err) ;
        }else{

            let list = [];
            let count = 0;
            staffs.forEach(function(x){

                User.findById(x.user,function (err,user) {
                    if(!err&&user){
                       list.push({
                           "id":x.id,
                            "permissions":x.permissions,
                            "user":user
                       })
                    }
                    count++;
                    if(count===staffs.length) res.json({
                        "staffs":list
                    })
                })

            });

        }

    });



}

exports.getPermissions = function (req,res) {

    let permissions = [
        "permission 1",
        "permission 2",
        "permission 3",
        "permission 4",
        "permission 5",
    ]
    res.json({
        "permissions": permissions
    })

}


exports.delete = function(req,res){

    Staff.deleteOne({_id: req.headers.id}, function(err, results) {
        if (err){
            console.log("failed");
            throw err;
        }
        res.json({
            "message":"delete successfully",
            "data":results
        })

        console.log("success");
    });

}
