// contactController.js
// Import contact model
const User = require('../Models/UserModel');
const Events = require('../Models/eventsModel');
const Plan = require('../Models/planModel')
const Request = require('../Models/RequestModel')
// Handle index actions

// Handle create contact actions
exports.createRequest = function (req, res) {

    console.log(req.body.name)


    Events.findById(req.body.event, function (err, event) {
        if (err||!event){
            res.status(400);
            res.send("Can't find the event ")
        }else{
            User.findById(req.body.user, function (err , user) {

                if(err||!user){
                    res.status(400);
                    res.send("Cant' find User")
                }else{
                    Plan.findById(req.body.plan ,function (err,plan) {
                        if(err||!plan){
                            res.status(400);
                            res.send("Cant' find Plan")
                        }else{

                            var request = new Request() ;
                            request.user = user ;
                            request.event = event ;
                            request.plan = plan ;
                            request.save(function (err) {
                                if (err)
                                    res.json(err);
                                else
                                    res.json({
                                        message: 'Request created!',
                                        data: request
                                    });
                            });


                        }
                    })
                }
            })
        }







    });


};

exports.getRequestsByEvent = function (req,res) {

    Request.find({'event':req.headers.event},function(err,requests){

        if(err){
            res.send(err) ;
        }else{

            let list = [];
            let count = 0;
            requests.forEach(function(x){

                User.findById(x.user,function (err,user) {
                    if(!err&&user){
                        Plan.findById(x.plan , function (err,plan) {

                            if(!err&&plan){
                                list.push({
                                    "request":x,
                                    "user":user,
                                    "plan":plan
                                })
                                count++;
                                if(count===requests.length) res.json({
                                    "requests":list
                                })
                            }

                        })


                    }


                })

            });

        }

    });

}



exports.getRequestsByUser = function (req,res) {

    Request.find({'user':req.headers.user},function(err,requests){

        if(err){
            res.send(err) ;
        }else{

            let list = [];
            let count = 0;
            requests.forEach(function(x){

                Events.findById(x.event,function (err,event) {
                    if(!err&&event){
                        Plan.findById(x.plan , function (err,plan) {

                            if(!err&&plan){
                                list.push({
                                    "request":x,
                                    "event":event,
                                    "plan":plan
                                })
                                count++;
                                if(count===requests.length) res.json({
                                    "requests":list
                                })
                            }

                        })


                    }


                })

            });

        }

    });

}


exports.update = function(req , res){

    console.log(req.body);
    Request.findById(req.body.id,function (err,request) {
        if (err){
            res.status(400);
            res.send("Casting Problem")
        }
        if(!request){
            res.status(400);
            res.send("Can't find Request")
        }

        request.state = req.body.state ;


        request.save();

        res.json({
            message: 'Request Updated',
            data : request
        });

    })




}


