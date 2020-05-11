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



    /*
// save the contact and check for errors
    plan.save(function (err) {
        if (err)
            res.json(err);
        else
            res.json({
                message: 'Plan created!',
                data: plan
            });
    });


     */
};


