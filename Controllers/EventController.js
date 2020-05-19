
Events = require('../Models/eventsModel');
const User = require('../Models/UserModel');
const Tag = require('../Models/TagModel');


exports.index =    function (req, res) {
   Events.get(function (err, events) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }else{
            var list = [];
            let count = 0 ;

            for(let i = 0  ; i<events.length ;i++){
               User.findById(events[i].admin,function(err,user){
                   if(err||!user){
                       res.status(404);
                       res.send("Can't find User :"+events[i].admin)
                   }else{

                       list.push({
                           id: events[i].id,
                           name : events[i].name,
                           admin : user.name,
                           description : events[i].description,
                           location : events[i].location,
                           start_date : events[i].start_date,
                           end_date : events[i].end_date,
                           tags : events[i].tags
                       })


                     count++ ;
                     if(count===events.length){
                         res.json({
                             status: "success",
                             message: "Events retrieved successfully",
                             data: list
                         });
                     }
                   }


               })


            }





        }






    });
};

exports.getEventByAdmin =    function (req, res) {
    Events.find({admin:req.headers.user},function (err, events) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }else{

            res.json({
                status: "success",
                message: "Events retrieved successfully",
                data: events
            });

        }
    });
};
exports.new = function (req, res) {


    var events = new Events();
    console.log(req.body)
    events.name = req.body.name ? req.body.name : events.name;
    events.admin  = req.userId ;
    events.start_date = req.body.start_date ;
    events.end_date = req.body.end_date ;
    events.description = req.body.description ;
    events.location = req.body.location ;

// save the contact and check for errors
    events.save(function (err) {
        if (err)
             res.json(err);
        else
        res.json({
            message: 'New Events created!',
            data: events
        });
    });
};
exports.view = function (req, res) {
    Events.findById(req.params.Events_id, function (err, events) {
        if (err)
            res.send(err);
        res.json({
            message: 'Events details loading..',
            data: events
        });
    });
};
exports.update = function (req, res) {
    Events.findById(req.params.events_id, function (err, events) {
        if (err)
            res.send(err);
        events.name = req.body.name ? req.body.name : events.name;
        events.admin = req.body.admin;
        events.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: events
            });
        });
    });
};
exports.delete = function (req, res) {
    Events.remove({
        _id: req.params.id
    }, function (err, events) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'events deleted'
        });
    });
};


exports.addTag = function(req,res){

    Events.findById(req.body.event,function(err,event){
       if(err){
           res.send(err);
       } else{

           if(!event.tags.includes(req.body.tag)){

               Tag.findById(req.body.tag,function (err,tag) {

                   if(err){
                       res.json({
                           message : "Can't find Tag"
                       })

                   }else{

                       tag.count = tag.count + 1 ;
                       tag.save(function (err) {
                           if(err){
                               res.json({
                                   message : "Can't increment Tag"
                               })
                           }else{
                               let list = event.tags ;
                               list.push(req.body.tag);
                               event.tags =list ;
                               event.save(
                                   function (err) {
                                   if(err){
                                       console.log(err);
                                       res.json({
                                           message : "Can't add the Tag"
                                       })
                                   }else{
                                       res.json({
                                           message : "Tag add successfully"
                                       })
                                   }
                                   }
                               )

                           }

                       })

                   }


               })


           }else{

               res.json({
                   message : "Tag Already assigned"
               })

           }

       }
    });


}
exports.removeTag = function(req,res){

    Events.findById(req.headers.event,function(err,event){
        if(err){
            res.send(err);
        } else{

            if(event.tags.includes(req.headers.tag)){

                Tag.findById(req.headers.tag,function (err,tag) {

                    if(err){
                        res.json({
                            message : "Can't find Tag"
                        })

                    }else{

                        tag.count = tag.count - 1 ;
                        tag.save(function (err) {
                            if(err){
                                res.json({
                                    message : "Can't decrement Tag"
                                })
                            }else{
                                let list = event.tags ;
                                 list.splice(list.indexOf(req.headers.tag), 1);
                                console.log(list);
                                event.tags = list ;
                                event.save(
                                    function (err) {
                                        if(err){
                                            res.json({
                                                message : "Can't remove the Tag"
                                            })
                                        }else{
                                            res.json({
                                                message : "Tag removed successfully"
                                            })
                                        }
                                    }
                                )

                            }

                        })

                    }


                })


            }else{

                res.json({
                    message : "Tag Not assigned"
                })

            }

        }
    });


}

exports.getTags = function(req,res){

    Events.findById(req.headers.event,function(err,event){
        if(err){
            res.send(err);
        } else{

                res.json({
                    message : "Event Tags",
                    data : event.tags
                })



        }
    });


}


exports.getLastFive = function(req,res){

    Events.find({start_date : {$gte: new Date()}}).sort({start_date : 1}).limit(Number(req.headers.count)).exec(function (err,events) {
        if(err){
          res.send(err);
        }
        res.json({
            message : "Events",
            data : events
        })
    })
}

exports.getEventsWithTopTags = function(req,res){

    Tag.find({}).sort({count:-1}).limit(Number(req.headers.number_tags)).exec(function(err,tags){
        if(err){
            res.send(err);
        }else{
            let list = [];
            let count = 0 ;
            for(let i = 0 ; i<tags.length;i++){
                Events.find({tags:tags[i].id}).limit(Number(req.headers.number_events)).exec(function(err,events){
                   if(err){
                       res.send(err);
                   }else{
                       list.push({
                          tag : tags[i] ,
                          events : events
                       });
                       count++;
                       if(count === tags.length){
                           res.json({
                               message : "Categories",
                               data : list
                           })
                       }
                   }


                });
            }


        }


    });




}

exports.getEventsByTag = function(req,res){

    Events.find({tags: req.headers.tag}).exec(function(err,events){
        if(err){
            res.send(err);
        }else{
            res.json({
                message : "Events retrieved Successfully",
                data : events
            })
        }


    });




}