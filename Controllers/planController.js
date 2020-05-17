const User = require('../Models/UserModel');
const Events = require('../Models/eventsModel');
const Plan = require('../Models/planModel')
// Handle index actions

exports.createPlan = function (req, res) {


    console.log(req.body);
    console.log(req.body.name)
    var plan = new Plan() ;

    Events.findById(req.body.event, function (err, event) {
        if (err){
            res.status(400);
            res.send("Casting Problem")
        }else{
            if (!event) {
                res.status(404);
                res.send("Can't find the event")
            }else{
                plan.name = req.body.name ;
                plan.event = req.body.event ;
                plan.description = req.body.description ;
                plan.options = req.body.options ;
                plan.cost = req.body.cost ;
                plan.color = req.body.color ;


                plan.save();

                res.json({
                    message: 'Plans created',
                    data : plan
                });
            }
        }




    });



};

exports.getPlans = function (req , res){

    Plan.find({'event':req.headers.event} , function(err , plans){
       if(err){
           res.send(err) ;
       }
       res.json({
           "plans":plans
       })
    });
}


exports.deletePlan = function(req,res){

    Plan.deleteOne({_id: req.headers.id}, function(err, results) {
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


exports.updatePlan = function(req , res){

    Plan.findById(req.body.id,function (err,plan) {
        if (err){
            res.status(400);
            res.send("Casting Problem")
        }
        if(!plan){
            res.status(400);
            res.send("Can't find Plan")
        }

        plan.name = req.body.name ;
        plan.event = req.body.event ;
        plan.description = req.body.description ;
        plan.options = req.body.options ;
        plan.cost = req.body.cost ;
        plan.color = req.body.color ;

        plan.save();

        res.json({
            message: 'Plans Updated',
            data : plan
        });

    })




}


