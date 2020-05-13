// contactController.js
// Import contact model
const Event = require('../Models/eventsModel');
const User = require('../Models/UserModel');
const EventCounting = require('../Models/EventCountingModel')
const Presence = require('../Models/PresenceModel')

exports.index =    function (req, res) {
    EventCounting.get(function (err, event_counting) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }else
       res.json({
           status: "success",
           message: "Event_Counting retrieved successfully",
           data: event_counting
       });


    });
};


exports.new = function (req, res) {

    Event.findById(req.body.event,function (err,event) {

        if(err||!event){
            res.writeHead(404);
            res.end("Can't Find the Event .");
        }

        let event_counting = new EventCounting();

        console.log(req.body)
        event_counting.name = req.body.name ;
        event_counting.event  = req.body.event ;

        event_counting.save(function (err) {
            if (err)
                res.json(err);
            else
                res.json({
                    message: 'New Event_Counting created!',
                    data: event_counting
                });
        });

    })


};


exports.getEventCountingList = function(req , res){

    EventCounting.find({event : req.headers.event}, function (err, event_counting) {
        if (err)
            res.send(err);
        res.json({
            message: 'Event_Counting details loading..',
            data: event_counting
        });
    });

}

exports.getEventCountingById = function (req, res) {
    EventCounting.findById(req.headers.id, function (err, event_counting) {
        if (err)
            res.send(err);
        res.json({
            message: 'Event_Counting details loading..',
            data: event_counting
        });
    });
};


exports.update = function (req, res) {
    EventCounting.findById(req.body.id, function (err, event_counting) {
        if (err)
            res.send(err);
        event_counting.name = req.body.name ;

        event_counting.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Event_Counting Info updated',
                data: event_counting
            });
        });
    });
};

exports.addPresence = function(req,res){

    EventCounting.findById(req.body.event_counting , function(err,event_counting){
       if(err){
           res.send(err);
       }else if(!event_counting){
           res.writeHead(404);
           res.end("Can't Find the EventCounting .");
       }else{
           User.findById(req.body.user , function(err,user){

               if(err){
                   console.log(err);
                   res.send(err);
               }else if(!user){
                   res.writeHead(404);
                   res.end("Can't Find the User .");
               }else{
                   let presence = new Presence();
                   presence.user = user.id;
                   presence.save(function (err) {
                       if(err){
                           console.log(err);
                           res.send(err);
                       }else{
                           let list = event_counting.presence_list ;
                           list.push(presence._id) ;
                           event_counting.presence_list = list;
                           console.log(event_counting);

                           event_counting.save(function (err) {
                               if(err){
                                   console.log(err);
                                   res.send(err);
                               } else{
                                   res.json(
                                       {
                                           message:"Presence add Successfullt" ,
                                           date : {
                                               name : user.name,
                                               event_counting : event_counting
                                           }
                                       }

                                   )
                               }

                           })
                       }
                   })
               }
           });
       }

    });


}


exports.delete = function (req, res) {
    EventCounting.remove({
        _id: req.headers.id
    }, function (err, event) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Event_Counting deleted'
        });
    });
};