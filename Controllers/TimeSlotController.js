const Events = require('../Models/eventsModel');
const TimeSlot = require('../Models/TimeSlotModel');


exports.new = function (req, res) {



    let timeslot = new TimeSlot();

    Events.findById(req.body.event, function (err, event) {
        if (err){
            res.status(400);
            res.send("Casting Problem")
        }else{
            if (!event) {
                res.status(404);
                res.send("Can't find the event")
            }else{
                timeslot.event = req.body.event ;
                timeslot.start_date = req.body.start_date ;
                timeslot.end_date = req.body.end_date ;
                timeslot.title = req.body.title ;
                timeslot.location = req.body.location ;
                timeslot.save();

                res.json({
                    message: 'TimeSlot created',
                    data : timeslot
                });
            }
        }




    });



};

exports.getTimeSlotsByEvent= function (req , res){

    TimeSlot.find({'event':req.headers.event} , function(err , timeslots){
       if(err){
           res.send(err) ;
       }
       res.json({
           "timeslots":timeslots
       })
    });
}


exports.delete = function(req,res){

    TimeSlot.deleteOne({_id: req.headers.id}, function(err, results) {
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




